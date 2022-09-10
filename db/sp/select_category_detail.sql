CREATE PROCEDURE select_category_detail(
  categoryID int
)
LANGUAGE SQL
as $$
RETURN QUERY SELECT * from category where category_id = categoryID;

RETURN QUERY select r.rule, o.operator from rule r
inner join category_rule cr on r.rule_id = cr.rule_id
inner join operator o on o.operator_id = r.operator_id
where cr.category_id = categoryID
group by r.rule, o.operator;
$$;
