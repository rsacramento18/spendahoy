Create Table transaction (
  transaction_id serial,
  year int not null,
  month int not null,
  date timestamp,
  description varchar (100) not null,
  value decimal not null,
  balance decimal not null,
  type varchar (50) not null,
  organization_id int not null,
  category_id int,
  PRIMARY KEY(year, month, date, description, value, balance)
);

Alter Table transaction
  ADD CONSTRAINT fk_torganization_id
      FOREIGN KEY(organization_id) 
      REFERENCES organization(organization_id);

Alter Table transaction
  ADD CONSTRAINT fk_tcategory_id
      FOREIGN KEY(category_id) 
      REFERENCES category(category_id);

