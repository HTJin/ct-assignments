-- 1. Create a procedure that adds a late fee to any customer who returned their rental after 7 days.
CREATE OR REPLACE PROCEDURE week_late_fee(fee DECIMAL(5,2))
LANGUAGE PLPGSQL
AS $WLF$
BEGIN
    UPDATE payment
    SET amount = amount + fee
    FROM rental
    WHERE AGE(return_date, rental_date) > '7 days' AND payment.rental_id = rental.rental_id;
    COMMIT;
END;
$WLF$;
CALL week_late_fee(190.00); # high late fee to go above 200 for next procedure

-- 2. Add a new column in the customer table for Platinum Member. This can be a boolean. Platinum Members are any customers who have spent over $200.
ALTER TABLE customer
ADD COLUMN IF NOT EXISTS platinum BOOLEAN;
-- Create a procedure that updates the Platinum Member column to True for any customer who has spent over $200 and False for any customer who has spent less than $200.
CREATE OR REPLACE PROCEDURE platinum_status()
AS $PS$
BEGIN
    UPDATE customer
    SET platinum = EXISTS (
        SELECT 1
        FROM payment
        WHERE payment.customer_id = customer.customer_id
        AND payment.amount > 200
    );
    COMMIT;
END;
$PS$
LANGUAGE PLPGSQL;
CALL platinum_status();

-- testing query
SELECT first_name, last_name, MAX(amount), platinum
FROM payment
INNER JOIN customer
ON payment.customer_id = customer.customer_id
GROUP BY first_name, last_name, customer.platinum
ORDER BY MAX(amount) DESC;