-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Santiago Valverde>
-- Create date: <20/04/2025>
-- Description:	<Registrar login y eventos de este.>
-- =============================================
CREATE PROCEDURE [dbo].[sp_login]
(
    @inUsername VARCHAR(64),
    @inPassword VARCHAR(64),
    @inIP VARCHAR(64),
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    DECLARE @userId INT;
    DECLARE @intentosFallidos INT;
    DECLARE @fechaUltimoDeshabilitado DATETIME;

    -- Verificar si el usuario existe
    SELECT @userId = Id
    FROM dbo.Usuario
    WHERE Username = @inUsername;

    IF (@userId IS NULL)
    BEGIN
        SET @outResultCode = 50001; -- Usuario inválido
		
        -- Registrar intento fallido
        INSERT INTO dbo.BitacoraEvento (IdTipoEvento, Descripcion, IdPostByUser, PostInIP, PostTime)
        VALUES (2, 'Username no existe', NULL, @inIP, GETDATE());

		SELECT Descripcion AS detail
		FROM dbo.Error
		WHERE Codigo = @outResultCode;

        RETURN;
    END

    -- Contar intentos fallidos en últimos 30 minutos desde esta IP
    SELECT @intentosFallidos = COUNT(*)
    FROM dbo.BitacoraEvento
    WHERE IdTipoEvento = 2
      AND PostInIP = @inIP
      AND PostTime >= DATEADD(MINUTE, -30, GETDATE())
      AND IdPostByUser = @userId;

    -- Verificar si ya se ha deshabilitado en últimos 10 minutos
    SELECT TOP 1 @fechaUltimoDeshabilitado = PostTime
    FROM dbo.BitacoraEvento
    WHERE IdTipoEvento = 3 -- Login deshabilitado
      AND PostInIP = @inIP
      AND IdPostByUser = @userId
    ORDER BY PostTime DESC;

    IF (@intentosFallidos >= 5)
    BEGIN
        IF (@fechaUltimoDeshabilitado IS NULL OR DATEDIFF(MINUTE, @fechaUltimoDeshabilitado, GETDATE()) >= 10)
        BEGIN
            -- Registrar deshabilitación
            INSERT INTO dbo.BitacoraEvento (IdTipoEvento, Descripcion, IdPostByUser, PostInIP, PostTime)
            VALUES (3, NULL, @userId, @inIP, GETDATE());

            SET @outResultCode = 50003; -- Login deshabilitado

			SELECT Descripcion AS detail
			FROM dbo.Error
			WHERE Codigo = @outResultCode;

        END
        ELSE
        BEGIN
            SET @outResultCode = 50003; -- Login deshabilitado recientemente

			SELECT Descripcion AS detail
			FROM dbo.Error
			WHERE Codigo = @outResultCode;

        END
        RETURN;
    END

    -- Validar contraseña
    DECLARE @passwordCorrecta VARCHAR(64);
    SELECT @passwordCorrecta = Password
    FROM dbo.Usuario
    WHERE Id = @userId;

    IF (@passwordCorrecta <> @inPassword)
    BEGIN
        -- Registrar intento fallido
        INSERT INTO dbo.BitacoraEvento (
            IdTipoEvento, Descripcion, IdPostByUser, PostInIP, PostTime
        )
        VALUES (
            2,
            'Intento fallido. Total intentos recientes: ' + CAST(@intentosFallidos + 1 AS VARCHAR),
            @userId,
            @inIP,
            GETDATE()
        );

        SET @outResultCode = 50002; -- Contraseña incorrecta

		SELECT Descripcion AS detail
		FROM dbo.Error
		WHERE Codigo = @outResultCode;

        RETURN;
    END

    -- Login exitoso
    INSERT INTO dbo.BitacoraEvento (
        IdTipoEvento, Descripcion, IdPostByUser, PostInIP, PostTime
    )
    VALUES (
        1,
        'Login status',
        @userId,
        @inIP,
        GETDATE()
    );

    SET @outResultCode = 0; -- Login exitoso
	SELECT @userId AS Id;

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008; -- Error general de base de datos

	SELECT Descripcion AS detail
	FROM dbo.Error
	WHERE Codigo = @outResultCode;

  END CATCH
  SET NOCOUNT OFF;
END
GO