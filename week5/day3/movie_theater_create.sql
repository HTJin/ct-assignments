CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    fname VARCHAR(50),
    lname VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(80),
    schedule DATE
);

CREATE TABLE concession (
    concession_id SERIAL PRIMARY KEY,
    product VARCHAR(30),
    quantity INTEGER,
    price INTEGER,
    customer_id INTEGER,
    employee_id INTEGER,
    FOREIGN KEY (employee_id)
        REFERENCES employee(employee_id)
);

CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    fname VARCHAR(50),
    lname VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(80),
    age INTEGER
);

CREATE TABLE movie (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    duration INTEGER,
    showtime DATE,
    genre VARCHAR(20),
    rating VARCHAR(20)
);

CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    capacity INTEGER,
    imax BOOLEAN,
    doors INTEGER,
    movie_id INTEGER,
    employee_id INTEGER,
    FOREIGN KEY (movie_id)
        REFERENCES movie(movie_id),
    FOREIGN KEY (employee_id)
        REFERENCES employee(employee_id)
);

CREATE TABLE ticket (
    ticket_id SERIAL PRIMARY KEY,
    price INTEGER,
    quantity INTEGER,
    time DATE,
    customer_id INTEGER,
    movie_id INTEGER,
    FOREIGN KEY (movie_id)
        REFERENCES movie(movie_id),
    FOREIGN KEY (customer_id)
        REFERENCES customer(customer_id)
);

CREATE TABLE customer_concession (
    sales_id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    concession_id INTEGER,
    FOREIGN KEY (customer_id)
        REFERENCES customer(customer_id),
    FOREIGN KEY (concession_id)
        REFERENCES concession(concession_id)
);