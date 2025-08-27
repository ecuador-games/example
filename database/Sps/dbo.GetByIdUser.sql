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
-- Description:	Sp for get a user by id
-- =============================================
CREATE OR ALTER PROCEDURE dbo.GetByIdUser
	@Id INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;



SELECT Id,
                    Address,
                    Email,
                    Username,
                    FirstName,
                    LastName,
                    PhoneNumber
                    FROM dbo.Users WHERE Id = @id;
END
GO