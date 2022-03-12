Create Table transaction_credit (
  transaction_credit_id serial,
  year int not null,
  month int not null,
  date timestamp,
  description varchar (100) not null,
  value decimal not null,
  organization_id int not null,
  category_id int,
  PRIMARY KEY(year, month, date, description, value)
);

Alter Table transaction_credit
  ADD CONSTRAINT fk_torganization_id_credit
      FOREIGN KEY(organization_id) 
      REFERENCES organization(organization_id);

Alter Table transaction_credit
  ADD CONSTRAINT fk_tcategory_id_credit
      FOREIGN KEY(category_id) 
      REFERENCES category(category_id);

