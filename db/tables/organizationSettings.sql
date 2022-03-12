Create Table organization_settings (
  organization_settings_id serial Primary Key,
  organization_id int,
  delimiter varchar (3) not null,
  encoding varchar (10) not null
);

Alter Table organization_settings 
  ADD CONSTRAINT fk_organization_id 
      FOREIGN KEY(organization_id) 
      REFERENCES organization(organization_id);

