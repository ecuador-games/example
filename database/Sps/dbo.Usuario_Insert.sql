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
CREATE OR ALTER PROCEDURE dbo.Usuario_Insert 
	-- Add the parameters for the stored procedure here
	@Address varchar(300), 
	@Email varchar(100),
	@FirstName varchar(100),
	@LastName varchar(100),
	@Password varchar(100),
	@Telephone varchar(13)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	IF EXISTS (SELECT TOP 1 1 FROM usuario WHERE email= @Email)
		BEGIN
			SELECT '0' as code, 'Este Email ya existe' as message
			RETURN
		END
	INSERT INTO usuario(address, email, FirstName, LastName, Password, telephone)
                            VALUES(@Address, @Email, @FirstName, @LastName, @Password, @Telephone)


	IF (SCOPE_IDENTITY() > 0)
		BEGIN
			SELECT '1' as code, 'Insertado correctamente' as message
		END
	ELSE 
		BEGIN 
			SELECT '0' as code, 'No se pudo insertar' as message
		END
END
GO
