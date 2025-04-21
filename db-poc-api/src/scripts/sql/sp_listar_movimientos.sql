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
-- Create date: <19/04/2025>
-- Description:	<Listar movimientos>
-- =============================================
CREATE PROCEDURE [dbo].[sp_listar_movimientos]
(
    @inValorDocumentoIdentidad VARCHAR(16),
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    -- Validar que el empleado existe y está activo
    IF NOT EXISTS (
        SELECT 1 FROM dbo.Empleado 
        WHERE ValorDocumentoIdentidad = @inValorDocumentoIdentidad AND EsActivo = 1
    )
    BEGIN
      SET @outResultCode = 50004; -- Error de base de datos
      RETURN;
    END

    -- Información general del empleado
    SELECT 
      E.ValorDocumentoIdentidad,
      E.Nombre,
      E.SaldoVacaciones
    FROM 
      dbo.Empleado E
    WHERE 
      E.ValorDocumentoIdentidad = @inValorDocumentoIdentidad;

    -- Movimientos del empleado, ordenados por fecha descendente
    SELECT 
      M.Fecha,
      TM.Nombre AS TipoMovimiento,
      M.Monto,
      M.NuevoSaldo,
      U.Username AS Usuario,
      M.PostInIP,
      M.PostTime
    FROM 
      dbo.Movimiento M
      INNER JOIN Empleado E ON M.IdEmpleado = E.Id
      INNER JOIN TipoMovimiento TM ON M.IdTipoMovimiento = TM.Id
      INNER JOIN Usuario U ON M.IdPostByUser = U.Id
    WHERE 
      E.ValorDocumentoIdentidad = @inValorDocumentoIdentidad
    ORDER BY 
      M.Fecha DESC;

    SET @outResultCode = 0;

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008; -- Error general de base de datos
  END CATCH
  SET NOCOUNT OFF;
END
GO