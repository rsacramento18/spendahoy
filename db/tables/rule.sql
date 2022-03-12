Create Table rule (
  rule_id serial Primary Key,
  operator_id int,
  rule varchar (50) not null
);

Alter Table rule
  ADD CONSTRAINT fk_operator_id
      FOREIGN KEY(operator_id) 
      REFERENCES operator(operator_id);
