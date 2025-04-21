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
-- Create date: <20/04/2025>
-- Description:	<Registrar logout>
-- =============================================
CREATE PROCEDURE [dbo].[sp_logout]
(
    @inUserId INT,
    @inIP VARCHAR(64),
    @outResultCode INT OUTPUT
)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY

    INSERT INTO dbo.BitacoraEvento (
        IdTipoEvento,
        Descripcion,
        IdPostByUser,
        PostInIP,
        PostTime
    )
    VALUES (
        4,  -- Logout
        'Logout',
        @inUserId,
        @inIP,
        GETDATE()
    );

    SET @outResultCode = 0;

  END TRY
  BEGIN CATCH
    SET @outResultCode = 50008; -- Error en base de datos
  END CATCH
  SET NOCOUNT OFF;
END
GO