INSERT INTO customer 
VALUES 
    (DEFAULT, 'John', 'Smith', '(123)123-12345', 'jsmith888@gmail.com', 33);
SELECT * FROM customer;

INSERT INTO movie
VALUES 
    (DEFAULT, 'Excellent Movie', 96, '2023-04-12 18:00:00', 'Action', 'R');
SELECT * FROM movie;

INSERT INTO employee
VALUES 
    (DEFAULT, 'Dave', 'Davidson', '444-444-4444', 'ddavidson@gmail.com', 'MWF');
SELECT * FROM employee;

INSERT INTO ticket
VALUES
    (DEFAULT, 9.99, 3, '2023-04-12 18:00:00', 1, 1);
SELECT * FROM ticket;

INSERT INTO concession 
VALUES
    (DEFAULT, 'chocolate bar', 50, 5.99, 1, 1),
    (DEFAULT, 'some candy', 100, 1.99, 1, 1);
SELECT * FROM concession;

INSERT INTO room
VALUES
    (DEFAULT, 200, TRUE, 4, 1, 1),
    (DEFAULT, 100, FALSE, 2, 1, 1);
SELECT * FROM room;

INSERT INTO customer_concession
VALUES
    (DEFAULT, 1, 1);
SELECT * FROM customer_concession;