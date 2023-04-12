-- 1. How many actors are there with the last name ‘Wahlberg’?
-- Expected: 2
SELECT COUNT(last_name)
FROM actor
WHERE last_name = 'Wahlberg';

-- 2. How many payments were made between $3.99 and $5.99?
-- Expected: 5607
SELECT COUNT(amount)
FROM payment
WHERE amount BETWEEN 3.99 AND 5.99;

-- 3. What film does the store have the most of? (search in inventory)
-- Expected: Multiple films are tied at 8
SELECT film_id, COUNT(film_id) AS film_count
FROM inventory
GROUP BY film_id
ORDER BY COUNT(film_id) DESC;
-- HAVING COUNT(film_id) = (
-- 	SELECT MAX(film_count)
-- 	FROM (
-- 		SELECT film_id, COUNT(film_id) AS film_count
-- 		FROM inventory
-- 		GROUP BY film_id
-- 	) AS max_count
-- );

-- 4. How many customers have the last name ‘William’?
-- Expected: 0
SELECT COUNT(last_name)
FROM actor
WHERE last_name = 'William';

-- 5. What store employee (get the id) sold the most rentals?
-- Expected: 1 - 8040
SELECT staff_id, COUNT(rental_id) AS rental_count
FROM rental
GROUP BY staff_id
ORDER BY COUNT(rental_id) DESC;
-- HAVING COUNT(rental_id) = (
-- 	SELECT MAX(rental_count)
-- 	FROM (
-- 		SELECT staff_id, COUNT(rental_id) AS rental_count
-- 		FROM rental
-- 		GROUP BY staff_id
-- 	) AS max_count
-- );

-- 6. How many different district names are there?
-- Expected: 378
SELECT COUNT(DISTINCT(district))
FROM address;

-- 7. What film has the most actors in it? (use film_actor table and get film_id)
-- Expected: film_id 508 - 15 actors
SELECT film_id, COUNT(actor_id) AS actors
FROM film_actor
GROUP BY film_id
ORDER BY COUNT(actor_id) DESC;
-- HAVING COUNT(actor_id) = (
-- 	SELECT MAX(actors)
-- 	FROM (
-- 		SELECT film_id, COUNT(actor_id) AS actors
-- 		FROM film_actor
-- 		GROUP BY film_id
-- 	) AS max_count
-- );

-- 8. From store_id 1, how many customers have a last name ending with ‘es’? (use customer table)
-- Expected: 13
SELECT COUNT(last_name)
FROM customer
WHERE last_name LIKE '%es'
GROUP BY store_id
HAVING store_id = 1;

-- 9. How many payment amounts (4.99, 5.99, etc.) had a number of rentals above 250 for customers with ids between 380 and 430? (use group by and having > 250)
-- Expected: 3
-- SELECT COUNT(amount_count)
-- FROM (
	SELECT COUNT(amount) as amount_count
	FROM payment
	WHERE customer_id BETWEEN 380 AND 430
	GROUP BY amount
	HAVING COUNT(rental_id) > 250;
-- ) AS count_count;

-- 10. Within the film table, how many rating categories are there? And what rating has the most movies total?
-- Expected: 5 ratings, PG-13 has the most
-- SELECT (SELECT COUNT(DISTINCT(rating)) FROM film), rating
-- FROM (
	SELECT rating, COUNT(rating)
	FROM film
	GROUP BY rating
	ORDER BY COUNT(rating) DESC;
	-- HAVING COUNT(rating) = (
	-- 	SELECT MAX(rating_count)
	-- 	FROM (
	-- 		SELECT COUNT(rating) AS rating_count
	-- 		FROM film
	-- 		GROUP BY rating
	-- 	) AS max_count
	-- )
-- ) AS most_rated;