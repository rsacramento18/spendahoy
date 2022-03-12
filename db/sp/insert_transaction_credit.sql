CREATE PROCEDURE insert_transaction_credit(
    year int, 
    month int, 
    date timestamp, 
    description varchar(100),
    value decimal,
    organization_id int,
    category_id int
)
LANGUAGE sql
AS $$
INSERT INTO transaction_credit (
  year,
  month,
  date, 
  description, 
  value, 
  organization_id, 
  category_id 
)
VALUES (
  year,
  month,
  date,
  description,
  value,
  organization_id,
  category_id
);
$$;
