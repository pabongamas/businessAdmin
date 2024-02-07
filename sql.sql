alter table users add column refresh_token varchar(255);



alter table categories add column business_id integer not null; 


 ALTER TABLE categories ADD CONSTRAINT fk_categories_business FOREIGN KEY (business_id) REFERENCES business (business_id)

 alter table categories alter column business_id SET NOT NULL; 