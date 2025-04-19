-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Santiago Valverde>
-- Create date: <19/04/2025>
-- Description:	<Actualiza datos del empleado>
-- =============================================
CREATE PROCEDURE sp_actualizar_empleados
(
    @inValorDocIdentidad_Actual VARCHAR(16),
    @inNuevoNombre VARCHAR(64),
    @inNuevoValorDocIdentidad VARCHAR(16),
    @inNuevoIdPuesto INT,
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    -- Validación de nombre
    IF (@inNuevoNombre LIKE '%[^a-zA-Z ]%')
    BEGIN
      SET @outResultCode = 50009;
      RETURN;
    END

    -- Validación de cédula
    IF (@inNuevoValorDocIdentidad LIKE '%[^0-9]%')
    BEGIN
      SET @outResultCode = 50010;
      RETURN;
    END

    DECLARE @idEmpleado INT;

    SELECT @idEmpleado = id
    FROM Empleado
    WHERE ValorDocumentoIdentidad = @inValorDocIdentidad_Actual AND EsActivo = 1;

    IF (@idEmpleado IS NULL)
    BEGIN
      SET @outResultCode = 50004; -- No encontrado por documento actual
      RETURN;
    END

    -- Validar que nuevo nombre no exista en otro empleado
    IF EXISTS (
        SELECT 1 FROM Empleado 
        WHERE RTRIM(LTRIM(Nombre)) = RTRIM(LTRIM(@inNuevoNombre)) 
          AND id <> @idEmpleado
    )
    BEGIN
      SET @outResultCode = 50007;
      RETURN;
    END

    -- Validar que nuevo documento no exista en otro empleado
    IF EXISTS (
        SELECT 1 FROM Empleado 
        WHERE ValorDocumentoIdentidad = @inNuevoValorDocIdentidad
          AND id <> @idEmpleado
    )
    BEGIN
      SET @outResultCode = 50006;
      RETURN;
    END

    -- Realizar actualización
    UPDATE Empleado
    SET 
      Nombre = @inNuevoNombre,
      ValorDocumentoIdentidad = @inNuevoValorDocIdentidad,
      IdPuesto = @inNuevoIdPuesto
    WHERE 
      id = @idEmpleado;

    SET @outResultCode = 0;

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008;
  END CATCH
  SET NOCOUNT OFF;
END
GO