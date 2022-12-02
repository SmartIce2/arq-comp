create database smartIce;
use smartIce;

create table empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar (80),
nomeFantasia varchar (45),
CNPJ varchar (30),
email varchar (80),
senha varchar (16),
telefone1 varchar (14),
telefone2 varchar (14)
);

insert into empresa values 
(null, 'UNILEVER BRASIL LTDA', 'Kibon', '61.068.276/0001-04', 'kibon@unilever.com', 'sabordesorvete12' , '(11)5897-8954', '(11)95897-8954'),
(null, 'NESTLÉ BRASIL LTDA', 'Nestlé', '60.409.075/0001-52', 'nestle@brasil.com', 'moranguinho123' ,'(11)5874-3216', '(11)95874-3216'),
(null, 'OGGI SORVETES LTDA', 'Oggi Alimentos', '09.507.293/0001-72', 'oggi@alimentos.com', 'limaolima' ,'(11)5472-3986', '(11)95472-3986'),
(null, 'Euphoria Ice Cream Comercio de Alimentos LTDA', 'Ben & Jerry´s', '20.241.041/0001-87', 'benejerrys@euphoria.com', 'chocolate943' ,'(11)5697-4321', '(11)95697-4321'),
(null, 'COMERCIO DE SORVETES ESKIMO LTDA', 'ESKIMO SORVETES', '18.934.526/0001-04', 'eskimo@sorvetes.com', 'sorvetefeijao' , '(11)5688-8686', '(11)95688-8686'),
(null, 'MILANO COMERCIO VAREJISTA DE ALIMENTOS S.A.','BACIO DI LATTE', '11.950.487/0066-35', 'baciodilatte@milano.com', 'sonhodevalsa' ,'(11)5661-6161', '(11)95661-6161');

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(80),
senha varchar(20),
funcao varchar(45),
check (funcao = 'analista junior' or funcao = 'analista pleno' or funcao = 'analista senior'),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
) auto_increment = 100; 

insert into usuario values
(null, 'Renato.R', 'renato.rodrigues@kibon.com', 'chicabon123', 'analista junior', 1),
(null, 'Natalia.S', 'natalia.senna@nestle.com', 'napolitanotano', 'analista senior', 2),
(null, 'Daniele.M', 'daniele.mauda@oggi.com', 'pistache2000', 'analista pleno', 3),
(null, 'Luciana.P', 'luciana.panato@benejerrys.com', 'frutasvermelhas!!', 'analista junior', 4),
(null, 'Pedro.M', 'pedro.marques@eskimo.com', 'abacatecomcalda', 'analista junior', 5),
(null, 'Fabiano.F', 'fabiano.freitas@baciodilatte.com', 'hortelachocolate', 'analista pleno', 6);

create table endereco (
idEndereco int primary key auto_increment,
CEP varchar(30), 
logradouro varchar(50),
bairro varchar(45),
cidade varchar(45),
estado char(2),
numero int,
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

insert into endereco values 
(null, '04543-011', 'Av. Presidente Juscelino Kubitschek', 'Itaim Bibi', 'São Paulo', 'SP', 1309, 1),
(null, '04730-090', 'Av. das Nações Unidas', 'Várzea de Baixo', 'São Paulo', 'SP', 17007, 2),
(null, '29111-175', 'Avenida Quinta', 'COBILANDIA', 'VILA VELHA', 'ES', 30, 3),
(null, '01426-003', 'Rua Oscar Freire', 'Cerqueira Cesar', 'São Paulo', 'SP', 957, 4),
(null, '11706-005', 'Avenida Presidente Kennedy', 'BALNEARIO PAQUETA', 'PRAIA GRANDE', 'SP', 11619, 5),
(null, '02240-000', 'Avenida Doutor Antonio Maria Laet', 'PARADA INGLESA', 'SAO PAULO','SP', 566, 6);

create table enderecoEmpresa (
	fkEndereco int,
    foreign key (fkEndereco) references endereco (idEndereco),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa),
    complemento varchar(30),
    andar varchar(3)
);

insert into enderecoEmpresa values
	(1, 1, 'Shopping Itaquera', '6'),
    (2, 2, 'Shopping Butantã', '5'),
    (3, 3, 'Shopping Eldorado', '2'),
    (4, 4, 'Shopping Aricanduva', '1'),
    (5, 5, 'Shopping Iguatemi', '3'),
    (6, 6, 'Shopping Cidade São Paulo ', '0');

create table sensor (
idSensor int primary key auto_increment,
status_sensor varchar(20),
check (status_sensor = 'ativo' or status_sensor = 'desativado' or status_sensor = 'manutencao'),
dataHora_instalacao datetime
) auto_increment = 1000;

insert into sensor values 
(null, 'ativo', '2022-01-20 10:30:00'),
(null, 'ativo', '2022-02-13 11:45:00'),
(null, 'desativado', '2022-04-18 15:15:00'),
(null, 'ativo', '2022-05-17 14:30:00'),
(null, 'manutencao', '2022-09-15 09:50:00'),
(null, 'ativo', '2022-10-07 08:30:00');

create table freezer (
idFreezer int primary key auto_increment,
capacidade_litros int, 
tipo varchar(30),
check (tipo = 'freezer loja' or tipo = 'freezer veiculo'),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa),
fkSensor int,
foreign key (fkSensor) references sensor (idSensor)
);

insert into freezer values
(null, 80, 'freezer loja', 1, 1001),
(null, 1000, 'freezer veiculo', 2, 1002),
(null, 70, 'freezer loja', 3, 1003),
(null, 90, 'freezer loja', 4, 1004),
(null, 80, 'freezer loja', 5, 1005),
(null, 1000, 'freezer veiculo', 6, 1000);

create table hist_medida (
idRegistro int primary key auto_increment,
temperatura decimal(5,2),
dataHora datetime,
fkSensor int,
foreign key (fkSensor) references sensor (idSensor)
);

insert into hist_medida values
(null, -14, now(), 1000),
(null, 30, now(), 1001),
(null, 12, now(), 1002),
(null, 14, now(), 1003),
(null, 15, now(), 1004),
(null, 19, now(), 1005),
(null, -13.23, now(), 1000),
(null, 18, now(), 1001),
(null, 12, now(), 1002),
(null, 12, now(), 1003),
(null, 12, now(), 1004),
(null, -17.85, now(), 1000),
(null, -14.75, now(), 1000),
(null, -16.77, now(), 1000),
(null, -15.89, now(), 1000),
(null, -14, now(), 1000),
(null, 12, now(), 1000),
(null, 11, now(), 1005);



-- ------------------------------------------------------------------------------



select * from empresa;
select * from usuario;
select * from endereco;
select * from freezer;
select * from sensor;
select * from hist_medida;

-- funcionario e empresa

select usuario.nome, nomeFantasia from usuario
join empresa on fkEmpresa = idEmpresa; 

-- sensor e historico

select * from hist_medida 
join sensor on fkSensor = idSensor;

-- empresa e freezer

select *, empresa.nomeFantasia from freezer
join empresa on fkEmpresa = idEmpresa;

select empresa.idEmpresa,
       empresa.nomeFantasia,
       endereco.logradouro,
       endereco.numero,
	   freezer.tipo,
       freezer.capacidade_litros,
       sensor.status_sensor,
       hist_medida.temperatura,
       hist_medida.dataHora
       from freezer
join empresa on fkEmpresa = idEmpresa
join endereco on endereco.fkEmpresa = idEmpresa
join sensor on fkSensor = idSensor
join hist_medida on hist_medida.fkSensor = idSensor
where idEmpresa = '1';

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */


/*
comando para sql server - banco remoto - ambiente de produção
*/
create table empresa (
idEmpresa int primary key IDENTITY(1,1),
razaoSocial varchar (80),
nomeFantasia varchar (45),
CNPJ varchar (30),
email varchar (80),
senha varchar (16),
telefone1 varchar (14),
telefone2 varchar (14)
);

insert into empresa values 
('UNILEVER BRASIL LTDA', 'Kibon', '61.068.276/0001-04', 'kibon@unilever.com', 'sabordesorvete12' , '(11)5897-8954', '(11)95897-8954'),
('NESTLÉ BRASIL LTDA', 'Nestlé', '60.409.075/0001-52', 'nestle@brasil.com', 'moranguinho123' ,'(11)5874-3216', '(11)95874-3216'),
('OGGI SORVETES LTDA', 'Oggi Alimentos', '09.507.293/0001-72', 'oggi@alimentos.com', 'limaolima' ,'(11)5472-3986', '(11)95472-3986'),
('Euphoria Ice Cream Comercio de Alimentos LTDA', 'Ben & Jerry´s', '20.241.041/0001-87', 'benejerrys@euphoria.com', 'chocolate943' ,'(11)5697-4321', '(11)95697-4321'),
('COMERCIO DE SORVETES ESKIMO LTDA', 'ESKIMO SORVETES', '18.934.526/0001-04', 'eskimo@sorvetes.com', 'sorvetefeijao' , '(11)5688-8686', '(11)95688-8686'),
('MILANO COMERCIO VAREJISTA DE ALIMENTOS S.A.','BACIO DI LATTE', '11.950.487/0066-35', 'baciodilatte@milano.com', 'sonhodevalsa' ,'(11)5661-6161', '(11)95661-6161');

create table usuario (
idUsuario int primary key IDENTITY(100,1),
nome varchar(45),
email varchar(80),
senha varchar(20),
funcao varchar(45),
check (funcao = 'analista junior' or funcao = 'analista pleno' or funcao = 'analista senior'),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

insert into usuario values
('Renato.R', 'renato.rodrigues@kibon.com', 'chicabon123', 'analista junior', 1),
('Natalia.S', 'natalia.senna@nestle.com', 'napolitanotano', 'analista senior', 2),
('Daniele.M', 'daniele.mauda@oggi.com', 'pistache2000', 'analista pleno', 3),
('Luciana.P', 'luciana.panato@benejerrys.com', 'frutasvermelhas!!', 'analista junior', 4),
('Pedro.M', 'pedro.marques@eskimo.com', 'abacatecomcalda', 'analista junior', 5),
('Fabiano.F', 'fabiano.freitas@baciodilatte.com', 'hortelachocolate', 'analista pleno', 6);

create table endereco (
idEndereco int primary key IDENTITY(1,1),
CEP varchar(30), 
logradouro varchar(50),
bairro varchar(45),
cidade varchar(45),
estado char(2),
numero int,
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

insert into endereco values 
('04543-011', 'Av. Presidente Juscelino Kubitschek', 'Itaim Bibi', 'São Paulo', 'SP', 1309, 1),
('04730-090', 'Av. das Nações Unidas', 'Várzea de Baixo', 'São Paulo', 'SP', 17007, 2),
('29111-175', 'Avenida Quinta', 'COBILANDIA', 'VILA VELHA', 'ES', 30, 3),
('01426-003', 'Rua Oscar Freire', 'Cerqueira Cesar', 'São Paulo', 'SP', 957, 4),
('11706-005', 'Avenida Presidente Kennedy', 'BALNEARIO PAQUETA', 'PRAIA GRANDE', 'SP', 11619, 5),
('02240-000', 'Avenida Doutor Antonio Maria Laet', 'PARADA INGLESA', 'SAO PAULO','SP', 566, 6);

create table enderecoEmpresa (
	fkEndereco int,
    foreign key (fkEndereco) references endereco (idEndereco),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa),
    complemento varchar(30),
    andar varchar(3)
);

insert into enderecoEmpresa values
	(1, 1, 'Shopping Itaquera', '6'),
    (2, 2, 'Shopping Butantã', '5'),
    (3, 3, 'Shopping Eldorado', '2'),
    (4, 4, 'Shopping Aricanduva', '1'),
    (5, 5, 'Shopping Iguatemi', '3'),
    (6, 6, 'Shopping Cidade São Paulo ', '0');

create table sensor (
idSensor int primary key IDENTITY(1000,1),
status_sensor varchar(20),
check (status_sensor = 'ativo' or status_sensor = 'desativado' or status_sensor = 'manutencao'),
dataHora_instalacao datetime
);

insert into sensor values 
('ativo', '2022-01-20 10:30:00'),
('ativo', '2022-02-13 11:45:00'),
('desativado', '2022-04-18 15:15:00'),
('ativo', '2022-05-17 14:30:00'),
('manutencao', '2022-09-15 09:50:00'),
('ativo', '2022-10-07 08:30:00');

create table freezer (
idFreezer int primary key IDENTITY(1,1),
capacidade_litros int, 
tipo varchar(30),
check (tipo = 'freezer loja' or tipo = 'freezer veiculo'),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa),
fkSensor int,
foreign key (fkSensor) references sensor (idSensor)
);

insert into freezer values
(80, 'freezer loja', 1, 1001),
(1000, 'freezer veiculo', 2, 1002),
(70, 'freezer loja', 3, 1003),
(90, 'freezer loja', 4, 1004),
(80, 'freezer loja', 5, 1005),
(1000, 'freezer veiculo', 6, 1000);

create table hist_medida (
idRegistro int primary key IDENTITY(1,1),
temperatura decimal(5,2),
dataHora datetime,
fkSensor int,
foreign key (fkSensor) references sensor (idSensor)
);


/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
