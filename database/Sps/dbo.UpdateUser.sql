USE example
go
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Samuel Martínez
-- Create date: 25/08/2025
-- Description:	Sp for update all users
-- =============================================
/*
Nombre: dbo.UpdateUsuario

Descripción:
    Actualiza los datos de un usuario existente en la tabla 'usuario' según el Id proporcionado.
    Si el usuario no existe, retorna un mensaje de error.
    Si la actualización es exitosa, retorna un mensaje de éxito.
    Si no se puede actualizar, retorna un mensaje de error.

Parámetros:
    @Id INT                  -- Identificador único del usuario a actualizar.
    @Address VARCHAR(300)    -- Nueva dirección del usuario.
    @FirstName VARCHAR(100)  -- Nuevo nombre del usuario.
    @LastName VARCHAR(100)   -- Nuevo apellido del usuario.
    @Email VARCHAR(100)      -- Nuevo correo electrónico del usuario.
    @Username VARCHAR(100)   -- Nuevo nombre de usuario.
    @PasswordHash VARCHAR(256) -- Nuevo hash de la contraseña.
    @PasswordSalt VARCHAR(128) -- Nueva sal de la contraseña.
    @PhoneNumber VARCHAR(13) -- Nuevo número de teléfono.

Retorna:
    code    message
    -----   --------------------------------------
    0       Actualizado correctamente
    50001   Este Usuario no existe
    50001   No se pudo actualizar

Notas:
    - Se recomienda validar los datos antes de llamar a este procedimiento.
    - El procedimiento no actualiza el campo 'Id'.
    - El procedimiento utiliza SCOPE_IDENTITY() para verificar la actualización, aunque para UPDATE se recomienda usar @@ROWCOUNT.
*/
CREATE OR ALTER PROCEDURE dbo.UpdateUser
	-- Add the parameters for the stored procedure here
    @Id INT,
	@Address varchar(300), 
    @FirstName varchar(100),
	@LastName varchar(100),
	@Email varchar(100),
	@Username varchar(100),
	@PasswordHash varchar(256),
	@PasswordSalt varchar(128),
	@PhoneNumber varchar(13)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	IF NOT EXISTS (SELECT TOP 1 1 FROM dbo.Users WHERE Id = @Id)
		BEGIN
			SELECT '50001' as code, 'Este Usuario no existe' as message
			RETURN
		END
	UPDATE dbo.Users
	SET Address = @Address,
		Email = @Email,
		FirstName = @FirstName,
		LastName = @LastName,
		PasswordHash = @PasswordHash,
		PasswordSalt = @PasswordSalt,
		PhoneNumber = @PhoneNumber,
		Username = @Username
	WHERE Id = @Id


	IF (SCOPE_IDENTITY() > 0)
		BEGIN
			SELECT '0' as code, 'Actualizado correctamente' as message
		END
	ELSE 
		BEGIN 
			SELECT '50001' as code, 'No se pudo actualizar' as message
		END
END
GO
