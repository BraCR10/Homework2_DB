-- =======================================================
-- Create Stored Procedure Template for Azure SQL Database
-- =======================================================
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO

-- =============================================
-- Author:      <BRACR10>
-- Create Date: <19/3/2025>
-- Description: <Insert Employee>
-- =============================================
CREATE PROCEDURE sp_create_employee
(
	@inNameEmployee VARCHAR(32)
  , @inSalary MONEY
  , @outResultCode INT OUTPUT

)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY
    
    DECLARE @employeeID INT;

    SELECT 
      @employeeID = E.id 
    FROM 
      dbo.Empleado AS E 
    WHERE 
      (E.Nombre = @inNameEmployee);
    
    IF (@employeeID IS  NULL)
    BEGIN
        INSERT INTO 
          dbo.Empleado (Nombre, Salario)
        VALUES 
          (@inNameEmployee, @inSalary);
        
        -- Retun data to backend
        SET @outResultCode = 0; -- SUCESS
    END
    ELSE
    BEGIN
      SET @outResultCode = 5001; -- Error : User already exist
    END
  END TRY
  BEGIN CATCH
    SET @outResultCode = 5005; -- Error : DB error
  END CATCH
  SET NOCOUNT OFF;
END
GO
