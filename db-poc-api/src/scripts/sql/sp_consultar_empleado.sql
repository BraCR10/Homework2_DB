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
-- Description:	<Consulta a un empleado>
-- =============================================
CREATE PROCEDURE sp_consultar_empleado
(
    @inValorDocumentoIdentidad VARCHAR(16),
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    -- Buscar al empleado con datos requeridos
    SELECT 
      E.ValorDocumentoIdentidad,
      E.Nombre,
      P.Nombre AS NombrePuesto,
      E.SaldoVacaciones
    FROM Empleado E
    INNER JOIN Puesto P ON E.IdPuesto = P.Id
    WHERE 
      E.ValorDocumentoIdentidad = @inValorDocumentoIdentidad AND
      E.EsActivo = 1;

    SET @outResultCode = 0;

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008; --No existe el empleado.
  END CATCH
  SET NOCOUNT OFF;
END
GO