ALTER TABLE users
   ADD COLUMN refresh_token varchar(255);

ALTER TABLE categories
   ADD COLUMN business_id integer NOT NULL;

ALTER TABLE categories
   ADD CONSTRAINT fk_categories_business FOREIGN KEY (business_id) REFERENCES business(business_id)
      ALTER TABLE categories
         ALTER COLUMN business_id SET NOT NULL;

CREATE TABLE clients(
   client_id serial PRIMARY KEY,
   names varchar(255) NOT NULL,
   lastnames varchar(255) NOT NULL,
   nickname varchar(100) NOT NULL,
   phone varchar(20) NOT NULL,
   gender boolean NOT NULL,
   birthdate date,
   address varchar(100) NOT NULL,
   create_at timestamp with time zone,
   active boolean NOT NULL,
   business_id integer NOT NULL,
   user_id integer NOT NULL,
   CONSTRAINT fk_clients_business FOREIGN KEY (business_id) REFERENCES business(business_id),
   CONSTRAINT fk_users_business FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO clients(names, lastnames, nickname, phone, gender, birthdate, address, create_at, active, business_id, user_id)
   VALUES ('julian', 'rueda', 'juli', '3167673359', 't', '1990-12-31', 'callecita es la direccion', now(), 't', 2, 8);

INSERT INTO clients(names, lastnames, nickname, phone, gender, birthdate, address, create_at, active, business_id, user_id)
   VALUES ('harold', 'guevara', 'jarold', '316464646', 't', '1996-12-31', 'otra direccion', now(), 't', 1, 9);

INSERT INTO clients(names, lastnames, nickname, phone, gender, birthdate, address, create_at, active, business_id, user_id)
   VALUES ('steven', 'muñoz', 'steven', '316464646', 't', '1996-12-31', 'otra direccion', now(), 'f', 1, 9);

ALTER TABLE clients
   ADD COLUMN active boolean NOT NULL;

INSERT INTO clients(names, lastnames, nickname, phone, gender, birthdate, address, create_at, active, business_id, user_id)
   VALUES ('maria fernanda', 'ballesteros', 'mafe', '3167673359', 't', '1990-12-31', 'callecita es la direccion', now(), 't', 2, 9);

INSERT INTO clients(names, lastnames, nickname, phone, gender, birthdate, address, create_at, active, business_id, user_id)
   VALUES ('harold', 'guevara', 'jarold', '316464646', 't', '1996-12-31', 'otra direccion', now(), 't', 1, 6);

INSERT INTO clients(names, lastnames, nickname, phone, gender, birthdate, address, create_at, active, business_id, user_id)
   VALUES ('steven', 'muñoz', 'steven', '316464646', 't', '1996-12-31', 'otra direccion', now(), 'f', 1, 7);

ALTER TABLE products RENAME COLUMN id TO product_id;

CREATE TABLE methodpay(
   methodpay_id serial PRIMARY KEY,
   method varchar(50) NOT NULL,
   active boolean NOT NULL
);

CREATE TABLE sales(
   sale_id serial PRIMARY KEY,
   sale_date timestamp with time zone NOT NULL,
   client_id int NOT NULL,
   total numeric NOT NULL,
   active boolean NOT NULL,
   methodpay_id int,
   payment_date timestamp with time zone,
   total_pay numeric,
   pay_completed boolean NOT NULL,
   business_id integer NOT NULL,
   CONSTRAINT fk_sales_client FOREIGN KEY (client_id) REFERENCES clients(client_id),
   CONSTRAINT fk_sales_methodpay FOREIGN KEY (methodpay_id) REFERENCES methodpay(methodpay_id),
   CONSTRAINT fk_sales_business FOREIGN KEY (business_id) REFERENCES business(business_id)
);

CREATE TABLE sales_products(
   sale_id int,
   product_id int,
   item_sale int,
   quantity int,
   total_item_quantity numeric,
   PRIMARY KEY (sale_id, product_id, item_sale),
   CONSTRAINT fk_sales_products_sale FOREIGN KEY (sale_id) REFERENCES sales(sale_id),
   CONSTRAINT fk_sales_products_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO methodpay(method, active)
   VALUES ('Efectivo', TRUE);

INSERT INTO methodpay(method, active)
   VALUES ('Nequi', TRUE);

INSERT INTO methodpay(method, active)
   VALUES ('Tarjeta Credito', TRUE);

INSERT INTO sales(sale_date, client_id, total, active, methodpay_id,payment_date,total_pay,pay_completed,business_id)
values('now',8,1200000,'t',2,'now',1200000,'t',1);

INSERT INTO sales(sale_date, client_id, total, active,pay_completed,business_id)
values('now',2,100000,'t','f',1);


insert into sales_products(sale_id,product_id,item_sale,quantity,total_item_quantity) values(1,15,1,1,120000);

insert into sales_products(sale_id,product_id,item_sale,quantity,total_item_quantity) values(2,15,1,1,120000);



