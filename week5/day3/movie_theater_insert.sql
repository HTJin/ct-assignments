INSERT INTO customer (
    fname,
    lname,
    phone,
    email,
    age
) VALUES (
    'John',
    'Smith',
    '(123)123-12345',
    'jsmith888@gmail.com',
    33
);
SELECT * FROM customer;

INSERT INTO movie (
    title,
    duration,
    showtime,
    genre,
    rating
) VALUES (
    'Excellent Movie',
    96,
    '2023-04-12 18:00:00',
    'Action',
    'R'
);
SELECT * FROM movie;

INSERT INTO employee (
    fname, lname, phone, email, schedule
) VALUES (
    'Dave', 'Davidson', '444-444-4444', 'ddavidson@gmail.com', 'MWF'
);
SELECT * FROM employee;

INSERT INTO ticket (
    price, quantity, time, customer_id, movie_id
) VALUES (
    9.99, 3, '2023-04-12 18:00:00', 1, 1
);
SELECT * FROM ticket;

INSERT INTO concession (
    product, quantity, price, customer_id, employee_id
) VALUES (
    'chocolate bar', 50, 5.99, 1, 1
),(
    'some candy', 100, 1.99, 1, 1
);
SELECT * FROM concession;

INSERT INTO room (
    capacity, imax, doors, movie_id, employee_id
) VALUES
    (200, TRUE, 4, 1, 1),
    (100, FALSE, 2, 1, 1);
SELECT * FROM room;

INSERT INTO customer
VALUES
    (DEFAULT, 'Mike', 'Jones', '555-555-5555', 'immikejones@gmail.com', 15),
    (DEFAULT, 'Sally', 'Salsbury', '111-111-1111', 'sallysteak@gmail.com', 4);