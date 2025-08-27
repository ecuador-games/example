USE example
go
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Samuel Martínez
-- Create date: 27/03/2024
-- Description:	Sp for delete a user
-- =============================================
CREATE OR ALTER PROCEDURE dbo.DeleteUsuario
	@Id INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM usuario WHERE Id = @Id;

END
GO
