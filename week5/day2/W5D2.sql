-- 1. List all customers who live in Texas (use JOINs)
-- Expected: 5 people live in Texas. Jennifer Davis, Kim Cruz, Richard Mccrary, Bryan Hardison, Ian Still
SELECT first_name, last_name, postal_code, district
FROM customer
INNER JOIN address
ON customer.address_id = address.address_id
-- WHERE postal_code BETWEEN '73301' AND '88595';
WHERE district = 'Texas';

-- 2. Get all payments above $6.99 with the Customer's Full Name
-- Expected: 1406 payments
SELECT COUNT(*) AS payments FROM (
    SELECT first_name, last_name, amount
    FROM customer
    INNER JOIN payment
    ON customer.customer_id = payment.customer_id
    WHERE amount > 6.99
) AS count_amount;

-- 3. Show all customers names who have made payments over $175 (use subqueries)
-- Expected: 6 customers
SELECT first_name, last_name, (SELECT SUM(amount) FROM payment WHERE customer.customer_id = payment.customer_id) AS payments
FROM customer
WHERE customer_id IN (
    SELECT customer_id
    FROM payment
    GROUP BY customer_id
    HAVING SUM(amount) > 175
);

-- 4. List all customers that live in Nepal (use the city table)
-- Expected: 1 customer
SELECT first_name, last_name, country
FROM customer
INNER JOIN address
ON customer.address_id = address.address_id
INNER JOIN city
ON address.city_id = city.city_id
INNER JOIN country
ON city.country_id = country.country_id
WHERE country = 'Nepal';

-- 5. Which staff member had the most transactions?
-- Expected: Jon Stephens with 7304 transactions
SELECT first_name, last_name, COUNT(payment.staff_id) AS transactions
FROM staff
INNER JOIN payment
ON staff.staff_id = payment.staff_id
GROUP BY first_name, last_name
HAVING COUNT(payment.staff_id) = (
    SELECT MAX(transactions)
    FROM (
        SELECT first_name, last_name, COUNT(payment.staff_id) AS transactions
        FROM staff
        INNER JOIN payment
        ON staff.staff_id = payment.staff_id
        GROUP BY first_name, last_name
    ) AS max_count
);

-- 6. How many movies of each rating are there?
-- Expected: G: 178, PG: 194, PG-13: 223, R: 195, NC-17:210
SELECT rating, COUNT(rating)
FROM film
GROUP BY rating
ORDER BY rating;

-- 7. Show all customers who have made a single payment above $6.99 (Use Subqueries)
-- Expected: 130 customers made a single payment over $6.99
SELECT first_name, last_name,
    (SELECT amount FROM payment WHERE amount > 6.99 AND customer.customer_id = payment.customer_id) AS paid_value,
    (SELECT COUNT(payment_id) FROM payment WHERE amount > 6.99 AND customer.customer_id = payment.customer_id) AS payment_count
FROM customer
WHERE customer_id IN (
    SELECT customer_id
    FROM payment
    WHERE amount > 6.99
    GROUP BY customer_id
    HAVING COUNT(payment_id) = 1
);

-- 8. How many free rentals did our stores give away?
-- Expected: 24 free rentals
SELECT COUNT(rental.rental_id) AS free_rentals
FROM rental
-- INNER JOIN inventory
-- ON rental.inventory_id = inventory.inventory_id
-- INNER JOIN customer
-- ON rental.customer_id = customer.customer_id
-- INNER JOIN staff
-- ON rental.staff_id = staff.staff_id
-- INNER JOIN film
-- ON inventory.film_id = film.film_id
INNER JOIN payment
ON rental.rental_id = payment.rental_id
WHERE payment.amount = 0;