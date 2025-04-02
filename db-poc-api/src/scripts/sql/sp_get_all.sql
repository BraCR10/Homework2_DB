-- =======================================================
-- Create Stored Procedure Template for Azure SQL Database
-- =======================================================
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
-- =============================================
-- Author:      <BRAC10>
-- Create Date: <19/3/2025>
-- Description: <Get all employees>
-- =============================================
CREATE PROCEDURE sp_get_all_employees(
    @outResultCode INT OUTPUT
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
        ORDER BY 
            E.id ;

        SET @outResultCode = 0; -- SUCCESS
    END TRY
    BEGIN CATCH
        SET @outResultCode = 5005; -- Error : DB errror
    END CATCH
    SET NOCOUNT OFF;
END
GO
