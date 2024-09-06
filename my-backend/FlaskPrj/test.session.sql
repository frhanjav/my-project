

--comments

-- @block
CREATE TABLE User(
  id INT PRIMARY KEY AUTO_INCREMENT ,
  email VARCHAR(255) NOT NULL UNIQUE,
  bio TEXT,
  country VARCHAR(2)
);

-- @block
INSERT INTO Users (email, bio, country)
VALUES (
  'hello@world.com',
  'i love strangers!',
  'US'
);

--@bLock
INSERT INTO Users (email, bio, country)
VALUES
  ('hello@mamba.com', 'foo', 'US'),
  ('hola@munda.com', 'bar', 'MX'),
  ('bonjour@monde.com', 'baz', 'FR');

-- @block
SELECT email FROM Users
WHERE country = 'US'
AND email LIKE 'H%'

ORDER BY id DESC
LIMIT 2;

-- @block
CREATE INDEX email_index ON Users(email); 

-- @block
CREATE TABLE Rooms(
  id INT AUTO_INCREMENT,
  street VARCHAR(255),
  owner_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
INSERT INTO Rooms (owner_id, street)
VALUES 
  (1, 'san'),
  (1, 'ran'),
  (1, 'van'),
  (1, 'tan');

-- @block
SELECT * FROM Users
INNER JOIN Rooms
ON Rooms.owner_id = Users.id;

-- @block
CREATE TABLE Bookings(
  id INT AUTO_INCREMENT, 
  guest_id INT NOT NULL, 
  room_id INT NOT NULL, 
  check_in DATETIME, 
  PRIMARY KEY (id),
  FOREIGN KEY (guest_id) REFERENCES Users(id),
  FOREIGN KEY (room_id) REFERENCES Rooms(id)
);

-- @block
SELECT
  guest_id, 
  street, 
  check_in
FROM Bookings
INNER JOIN Rooms ON Rooms.owner_id = guest_id
WHERE guest_ id = 1
;

-- @block
SELECT
  room_id,
  guest_id,
  email,
  bio
FROM Bookings
INNER JOIN Users ON Users.id = guest_id
;

-- @bLock
DROP TABLE User;
