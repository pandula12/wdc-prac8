SELECT address FROM address
WHERE address_id = (SELECT DISTINCT store_id FROM inventory
WHERE film_id = (SELECT film_id FROM film
WHERE title = 'TWISTED PIRATES'));
