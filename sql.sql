alter table users add column refresh_token varchar(255);



alter table categories add column business_id integer not null; 


 ALTER TABLE categories ADD CONSTRAINT fk_categories_business FOREIGN KEY (business_id) REFERENCES business (business_id)

 alter table categories alter column business_id SET NOT NULL; 



 CREATE TABLE clients(
    client_id SERIAL PRIMARY KEY,
    names VARCHAR(255) NOT NULL,
    lastnames VARCHAR(255) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender boolean NOT NULL,
    birthdate DATE,
    address VARCHAR(100) NOT NULL,
    create_at TIMESTAMP WITH TIME ZONE,
    active boolean NOT NULL,
    business_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_clients_business FOREIGN KEY (business_id) REFERENCES business(business_id),
    CONSTRAINT fk_users_business FOREIGN KEY (user_id) REFERENCES users(user_id)
 );

 insert into clients (names,lastnames,nickname,phone,gender,birthdate,address,create_at,active,business_id,user_id) values('julian','rueda','juli','3167673359','t','1990-12-31','callecita es la direccion',now(),'t',2,8);

 insert into clients (names,lastnames,nickname,phone,gender,birthdate,address,create_at,active,business_id,user_id) values('harold','guevara','jarold','316464646','t','1996-12-31','otra direccion',now(),'t',1,9);


 insert into clients (names,lastnames,nickname,phone,gender,birthdate,address,create_at,active,business_id,user_id) values('steven','muñoz','steven','316464646','t','1996-12-31','otra direccion',now(),'f',1,9);



alter table clients add column active boolean not null ;



 insert into clients (names,lastnames,nickname,phone,gender,birthdate,address,create_at,active,business_id,user_id) values('maria fernanda','ballesteros','mafe','3167673359','t','1990-12-31','callecita es la direccion',now(),'t',2,9);

 insert into clients (names,lastnames,nickname,phone,gender,birthdate,address,create_at,active,business_id,user_id) values('harold','guevara','jarold','316464646','t','1996-12-31','otra direccion',now(),'t',1,6);


 insert into clients (names,lastnames,nickname,phone,gender,birthdate,address,create_at,active,business_id,user_id) values('steven','muñoz','steven','316464646','t','1996-12-31','otra direccion',now(),'f',1,7);
