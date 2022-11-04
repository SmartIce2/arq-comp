create user'insertCerveja'@'localhost'identified by 'sptech';

GRANT SELECT on ProjetoCerveja.hist_medida TO 'insertCerveja'@'localhost';

create database ProjetoCerveja;

use ProjetoCerveja;

select * from hist_medida;

create table hist_medida(
     idMedida INT PRIMARY KEY AUTO_INCREMENT,
     processo1 DECIMAL(5,2),
     processo2 DECIMAL(5,2),
     processo3 DECIMAL(5,2),
     processo4 DECIMAL(5,2),
     processo5 DECIMAL(5,2),
     processo6 DECIMAL(5,2),
     processo7 DECIMAL(5,2),
     processo8 DECIMAL(5,2),
     processo9 DECIMAL(5,2),
     processo10 DECIMAL(5,2),
     processo11 DECIMAL(5,2),
     processo12 DECIMAL(5,2),
     processo13 DECIMAL(5,2),
     processo14 DECIMAL(5,2),
     processo15 DECIMAL(5,2),
     DataHora DATETIME);
