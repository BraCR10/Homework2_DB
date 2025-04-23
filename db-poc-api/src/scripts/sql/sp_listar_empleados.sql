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
-- Description:	<Listar empleados>
-- =============================================

CREATE PROCEDURE [dbo].[sp_listar_empleados]
(
    @outResultCode INT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT
            E.Id,
            E.IdPuesto,
            P.Nombre AS NombrePuesto,
            E.ValorDocumentoIdentidad,
            E.Nombre,
            E.FechaContratacion,
            E.SaldoVacaciones,
            E.EsActivo
        FROM 
            dbo.Empleado E
            INNER JOIN dbo.Puesto P ON E.IdPuesto = P.Id
        WHERE 
            E.EsActivo = 1
        ORDER BY 
            E.Nombre ASC;

        SET @outResultCode = 0;
    END TRY
    BEGIN CATCH 
        SET @outResultCode = 50008;

        SELECT Descripcion AS detail
        FROM dbo.Error
        WHERE Codigo = @outResultCode;
    END CATCH
    SET NOCOUNT OFF;
END
GO