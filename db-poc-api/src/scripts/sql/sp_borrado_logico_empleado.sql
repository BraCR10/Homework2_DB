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
-- Description:	<Hace un borrado lógico del empleado, o sea, cambia el valor de activo a 0.>
-- =============================================
CREATE PROCEDURE sp_borrado_logico_empleado
(
    @inValorDocumentoIdentidad VARCHAR(16),
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    -- Verificar existencia
    IF NOT EXISTS (
        SELECT 1 FROM dbo.Empleado
        WHERE ValorDocumentoIdentidad = @inValorDocumentoIdentidad AND EsActivo = 1
    )
    BEGIN
      SET @outResultCode = 50008; --No existe el empleado y no hay uno en específico
      RETURN;
    END

    -- Realizar borrado lógico
    UPDATE dbo.Empleado
    SET EsActivo = 0
    WHERE ValorDocumentoIdentidad = @inValorDocumentoIdentidad;

    SET @outResultCode = 0;

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008; --No se pudo actualizar correctamente.
  END CATCH
  SET NOCOUNT OFF;
END
GO