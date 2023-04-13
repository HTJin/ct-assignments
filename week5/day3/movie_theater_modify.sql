ALTER TABLE concession
ALTER COLUMN price TYPE NUMERIC(3,2);
UPDATE concession
SET price = 5.99
WHERE concession_id = 1;
UPDATE concession
SET price = 1.99
WHERE concession_id = 2;
SELECT * FROM concession;

ALTER TABLE ticket
ALTER COLUMN price TYPE NUMERIC(4,2);
UPDATE ticket
SET price = 9.99
FROM concession
WHERE employee_id = 1;
SELECT * FROM ticket;

ALTER TABLE room
ADD COLUMN wheelchair_access BOOLEAN;
UPDATE room
SET wheelchair_access = TRUE
WHERE doors > 2;
SELECT * FROM room;