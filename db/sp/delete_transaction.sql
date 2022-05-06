CREATE PROCEDURE delete_transaction(
  transacationID int
)
LANGUAGE sql
AS $$
UPDATE transaction
SET isdeleted = TRUE
WHERE transaction_id = transacationID;
$$;
