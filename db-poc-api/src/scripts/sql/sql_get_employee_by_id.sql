-- =======================================================
-- Create Stored Procedure Template for Azure SQL Database
-- =======================================================
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
-- =============================================
-- Author:      <BRAC10>
-- Create Date: <18/3/2025>
-- Description: <Get an employee>
-- =============================================
CREATE PROCEDURE sp_get_employee_by_id(
	@inId INT
    , @outResultCode INT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Retun data to backend
        SELECT 
            E.id AS ID
            , E.Nombre AS NameEmployee
            , E.Salario AS Salary 
        FROM 
            dbo.Empleado AS E
        WHERE 
            (E.id = @inId) ;
        SET @outResultCode = 0; -- SUCCESS
    END TRY
    BEGIN CATCH
        SET @outResultCode = 5005; -- Error : DB errror
    END CATCH
    SET NOCOUNT OFF;
END
GO
