USE example
go
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Samuel Mart�nez
-- Create date: 27/03/2024
-- Description:	Sp for get all users
-- =============================================
CREATE OR ALTER PROCEDURE dbo.InsertUser
	-- Add the parameters for the stored procedure here
	@Address varchar(300), 
	@Email varchar(100),
	@Username varchar(100),
	@FirstName varchar(100),
	@LastName varchar(100),
	@PasswordHash varchar(256),
	@PasswordSalt varchar(128),
	@PhoneNumber varchar(13)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	IF EXISTS (SELECT TOP 1 1 FROM dbo.Users WHERE email= @Email)
		BEGIN
			SELECT '50001' as code, 'Este Email ya existe' as message
			RETURN
		END
	INSERT INTO dbo.Users(Address, Email, FirstName, LastName, PasswordHash, PasswordSalt, PhoneNumber, Username)
                            VALUES(@Address, @Email, @FirstName, @LastName, @PasswordHash, @PasswordSalt, @PhoneNumber, @Username)


	IF (SCOPE_IDENTITY() > 0)
		BEGIN
			SELECT '0' as code, 'Insertado correctamente' as message
		END
	ELSE 
		BEGIN 
			SELECT '50001' as code, 'No se pudo insertar' as message
		END
END
GO
