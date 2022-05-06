CREATE PROCEDURE update_transaction_review(
  transacationID int
)
LANGUAGE sql
AS $$
UPDATE transaction
SET review = TRUE
WHERE transaction_id = transacationID;
$$;
