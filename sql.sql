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
    business_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_clients_business FOREIGN KEY (business_id) REFERENCES business(business_id),
    CONSTRAINT fk_users_business FOREIGN KEY (user_id) REFERENCES users(user_id)
 );

 insert into clients (names,lastnames,nickname,phone,gender,birthdate,address,create_at,business_id,user_id) values('julian','rueda','juli','3167673359','t','1990-12-31','callecita es la direccion',now(),3,8);



