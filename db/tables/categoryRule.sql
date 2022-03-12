Create Table category_rule (
  category_rule_id serial Primary Key,
  category_id int,
  rule_id int
);

Alter Table category_rule
  ADD CONSTRAINT fk_category_id
      FOREIGN KEY(category_id) 
      REFERENCES category(category_id);

Alter Table category_rule
  ADD CONSTRAINT fk_rule_id
      FOREIGN Key(rule_id)
      REFERENCES rule(rule_id);

