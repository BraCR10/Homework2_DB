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
-- Description:	<Registrar logout>
-- =============================================
CREATE PROCEDURE [dbo].[sp_logout]
USE [Database_Tarea2]
GO
/****** Object:  StoredProcedure [dbo].[sp_logout]    Script Date: 4/22/2025 2:08:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_logout]
(
    @inUserId INT,
    @inIP VARCHAR(32),
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

	DECLARE @detail VARCHAR(64);

    INSERT INTO dbo.BitacoraEvento (
        IdTipoEvento,
        Descripcion,
        IdPostByUser,
        PostInIP,
        PostTime
    )
    VALUES (
        4,  -- Logout
        'Logout',
        @inUserId,
        @inIP,
        GETDATE()
    );

    SET @outResultCode = 0;

	SELECT @detail = 'Sesión finalizada correctamente';

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008; -- Error en base de datos

	SELECT Descripcion AS detail
	FROM dbo.Error
	WHERE Codigo = @outResultCode;

  END CATCH
  SET NOCOUNT OFF;
END
GO