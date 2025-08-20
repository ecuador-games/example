--Scripts de BD
--COMANDO PARA CREAR BASES DE DATOS
--CREATE DATABASE example;

--COMANDO PARA CREAR UNA TABLA;
--USE example;
--go

--DROP TABLE usuario

--USE example
--go

--CREATE TABLE usuario(
--	Id int not null primary key identity (1, 1),
--	Address varchar (300) null,
--	Email varchar (100) not null,
--	FirstName varchar (100) not null,
--	LastName varchar (100) not null,
--	Password varchar (100) not null,
--	Telephone varchar (13) null
--)

--AÑADIR COLUMNAS NUEVAS
-- ALTER TABLE usuario
-- ADD Username varchar(100),
--     PasswordHash varchar(256),
--     PasswordSalt varchar(128);

--COMANDO PARA RENOMBRAR COLUMNAS
--EXEC sp_rename 'usuario.Telephone', 'PhoneNumber', 'COLUMN';

--COMANDO PARA ELIMINAR COLUMNAS
--ALTER TABLE usuario 
--DROP COLUMN Password;

--COMANDO PARA ALTERAR COLUMNAS
--ALTER TABLE usuario 
--ALTER COLUMN PhoneNumber varchar(20);

--COMANDOS PARA VISUALIZAR LA INFORMACION
SELECT * FROM usuario;
