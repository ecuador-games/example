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
-- Description:	Sp for get all users
-- =============================================
CREATE OR ALTER PROCEDURE dbo.Usuario_Get 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from usuario order by Id desc

END
GO
