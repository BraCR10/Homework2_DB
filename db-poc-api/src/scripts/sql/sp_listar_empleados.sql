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
	@inFiltro VARCHAR(64),
	@outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    -- Limpieza de espacios en blanco
    SET @inFiltro = LTRIM(RTRIM(@inFiltro));

    -- Si el filtro está vacío, se listan todos los empleados activos
    IF (@inFiltro = '')
    BEGIN
      SELECT 
        E.Nombre,
        E.ValorDocumentoIdentidad,
        P.Nombre AS NombrePuesto,
        E.SaldoVacaciones
      FROM 
        Empleado E
        INNER JOIN Puesto P ON E.IdPuesto = P.Id
      WHERE 
        E.EsActivo = 1
      ORDER BY 
        E.Nombre ASC;

      SET @outResultCode = 0;
      RETURN;
    END

    -- Si el filtro contiene solo letras y espacios (búsqueda por nombre)
    IF (@inFiltro LIKE '%[^0-9]%')
    BEGIN
      SELECT 
        E.Nombre,
        E.ValorDocumentoIdentidad,
        P.Nombre AS NombrePuesto,
        E.SaldoVacaciones
      FROM 
        Empleado E
        INNER JOIN Puesto P ON E.IdPuesto = P.Id
      WHERE 
        E.EsActivo = 1
        AND E.Nombre LIKE '%' + @inFiltro + '%'
      ORDER BY 
        E.Nombre ASC;

      SET @outResultCode = 0;
      RETURN;
    END

    -- Si el filtro contiene solo números (búsqueda por documento)
    IF (@inFiltro NOT LIKE '%[^0-9]%')
    BEGIN
      SELECT 
        E.Nombre,
        E.ValorDocumentoIdentidad,
        P.Nombre AS NombrePuesto,
        E.SaldoVacaciones
      FROM 
        Empleado E
        INNER JOIN Puesto P ON E.IdPuesto = P.Id
      WHERE 
        E.EsActivo = 1
        AND CAST(E.ValorDocumentoIdentidad AS VARCHAR) LIKE '%' + @inFiltro + '%'
      ORDER BY 
        E.Nombre ASC;

      SET @outResultCode = 0;
      RETURN;
    END

    SET @outResultCode = 0;
  END TRY
  BEGIN CATCH 
	SET @outResultCode=50005; -- Código 50005 significa que hubo un error listando los empleados
  END CATCH
  SET NOCOUNT OFF;
END
