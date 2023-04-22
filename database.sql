CREATE DATABASE IF NOT EXISTS chat_app;

use chat_app;
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (username, password) VALUES ('user1', '123456');
INSERT INTO users (username, password) VALUES ('user2', '123456');
INSERT INTO users (username, password) VALUES ('user3', '123456');
INSERT INTO users (username, password) VALUES ('user4', '123456');
INSERT INTO users (username, password) VALUES ('user5', '123456');
