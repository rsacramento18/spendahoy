CREATE PROCEDURE insert_transaction(
    year int, 
    month int, 
    date timestamp, 
    description varchar(100),
    value decimal,
    balance decimal,
    type varchar(50),
    organization_id int,
    category_id int
)
LANGUAGE sql
AS $$
INSERT INTO transaction (
  year,
  month,
  date, 
  description, 
  value, 
  balance,
  type,
  organization_id, 
  category_id 
)
VALUES (
  year,
  month,
  date,
  description,
  value,
  balance,
  type,
  organization_id,
  category_id
);
$$;
