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
-- Create date: <19/03/2025>
-- Description:	<Inserta empleados a la base de datos.>
-- =============================================
CREATE PROCEDURE [dbo].[sp_insertar_empleado]
(
    @inNombreEmpleado VARCHAR(64),
    @inValorDocumentoIdentidad VARCHAR(16),
    @inIdPuesto INT,
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    -- Validación: el nombre debe ser alfabético (puede incluir espacios)
    IF (@inNombreEmpleado LIKE '%[^a-zA-Z ]%')
    BEGIN
      SET @outResultCode = 50009; -- Nombre de empleado no alfabético
      RETURN;
    END

    -- Validación: el valor de documento debe ser numérico
    IF (@inValorDocumentoIdentidad LIKE '%[^0-9]%')
    BEGIN
      SET @outResultCode = 50010; -- Valor de documento de identidad no alfabético
      RETURN;
    END

    -- Validación: no exista empleado con mismo nombre
    IF EXISTS (
        SELECT 1 FROM dbo.Empleado 
        WHERE RTRIM(LTRIM(Nombre)) = RTRIM(LTRIM(@inNombreEmpleado))
    )
    BEGIN
      SET @outResultCode = 50005; -- Empleado con mismo nombre ya existe en inserción
      RETURN;
    END

    -- Validación: no exista empleado con mismo documento
    IF EXISTS (
        SELECT 1 FROM dbo.Empleado 
        WHERE ValorDocumentoIdentidad = @inValorDocumentoIdentidad
    )
    BEGIN
      SET @outResultCode = 50004; -- Empleado con ValorDocumentoIdentidad ya existe en inserción
      RETURN;
    END

    -- Inserción del nuevo empleado
    INSERT INTO dbo.Empleado
    (
        IdPuesto,
        ValorDocumentoIdentidad,
        Nombre,
        FechaContratacion,
        SaldoVacaciones,
        EsActivo
    )
    VALUES
    (
        @inIdPuesto,
        @inValorDocumentoIdentidad,
        @inNombreEmpleado,
        GETDATE(),         -- Fecha actual como fecha de contratación
        0.0,               -- Saldo inicial por defecto
        1                  -- Activo
    );

    SET @outResultCode = 0; -- Éxito

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008; -- Error general de base de datos
  END CATCH
  SET NOCOUNT OFF;
END
GO