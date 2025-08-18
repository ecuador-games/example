--OPERACIONES TRANSACT SQL
--CRUD - (CREATE, READ, UPDATE, DELETE)
--INSERT - (CREATE)
/*
INSERT INTO usuario(Addresss, Email, FirstName, LastName, password, Telephone)
VALUES('Santo Domingo', 'samy.capitanteddy@gmail.com', 'Samuel', 'Martínesz', '12345', '0963407013')
*/

--SELECT > (READ
--SELECT * FROM usuario order by user_id desc

--UPDATE -> (UPDATE)
/*
UPDATE usuario SET Address = 'Santo Domingo',
Telephone = '05677890854'
WHERE user_id = 15
*/

--DELETE > (DELETE

--DELETE FROM usuario WHERE user_id = 1 

--EJERCICIOS DE LECTURA DE DATOS

SELECT * FROM usuario WHERE Id = 16

SELECT Id
	,Address
	,Email
	,FirstName
	,LastName
	,Telephone

FROM usuario WHERE Address = 'Manabi'

SELECT * FROM usuario WHERE FirstName LIKE '%s%'

SELECT *
FROM usuario
WHERE FirstName LIKE '%e%'
OR LastName LIKE '%e%'

SELECT * FROM usuario WHERE Id  IN (4,5)

SELECT * FROM usuario WHERE Id  NOT IN (4,5)