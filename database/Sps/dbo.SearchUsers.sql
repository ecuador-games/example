USE example
go
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Samuel Martínez
-- Create date: 26/08/2025
-- Description:	Sp for search users
-- =============================================
CREATE OR ALTER PROCEDURE dbo.SearchUsers
	@SearchTerm NVARCHAR(100)
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
                    FROM dbo.Users 
                     WHERE FirstName LIKE '%' + @SearchTerm + '%'
                                    OR LastName LIKE '%' + @SearchTerm + '%'
                    ORDER BY Id DESC
                    

END
GO