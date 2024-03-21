--OPERACIONES TRANSACT SQL
--CRUD - (CREATE, READ, UPDATE, DELETE)
--INSERT - (CREATE)
/*
INSERT INTO usuario(address, email, first_name, last_name, password, telephone)
VALUES('Santo Domingo', 'samy.capitanteddy@gmail.com', 'Samuel', 'Martínesz', '12345', '0963407013')
*/

--SELECT > (READ
--SELECT * FROM usuario order by user_id desc

--UPDATE -> (UPDATE)
/*
UPDATE usuario SET address = 'Santo Domingo',
telephone = '05677890854'
WHERE user_id = 15
*/

--DELETE > (DELETE

--DELETE FROM usuario WHERE user_id = 1 

--EJERCICIOS DE LECTURA DE DATOS

SELECT * FROM usuario WHERE user_id = 16

SELECT user_id
	,addres
	,email
	,first_name
	,last_name
	,telephone

SELECT * FROM usuario WHERE address = 'Manabi'

SELECT * FROM usuario WHERE first_name LIKE '%s%'

SELECT *
FROM usuario
WHERE first_name LIKE '%e%'
OR last_name LIKE '%e%'

SELECT * FROM usuario WHERE user_id  IN = (4,5)

SELECT * FROM usuario WHERE user_id  NOT IN = (4,5)