BEGIN;


DROP TABLE IF EXISTS users, stories CASCADE;


CREATE TABLE users (
  id          SERIAL        PRIMARY KEY,
  username    VARCHAR(64)   UNIQUE,
  first_name  VARCHAR(64)   NOT NULL,
  last_name   VARCHAR(64)   NOT NULL,
  password    VARCHAR(64)   NOT NULL,
  avatar_url  VARCHAR(500)  NOT NULL
);


CREATE TABLE stories (
  id           SERIAL          PRIMARY KEY,
  author_id    INTEGER         REFERENCES users(id),
  title        VARCHAR(100)    NOT NULL,
  body         VARCHAR(20000)  NOT NULL,
  image_url    VARCHAR(500)    NOT NULL,
  date_posted  VARCHAR(50)     NOT NULL
);


INSERT INTO users (username, first_name, last_name, password, avatar_url)
VALUES
('u1', 'Orange', 'Cat', '$2a$10$lbczBZ5YwKsO6eC2Tm.9/.Xtky/2qjoXVR607Zs0ejmriJengZFqS', './images/u1_headshot.jpg'),
('u2', 'Grey', 'Kitty', '$2a$10$XP3ZfjT33e0Qf.ANb8bJGegtVfhv1V7P2xsCry4I8W8p68.hBt/i2', './images/u2_headshot.jpg');


INSERT INTO stories (author_id, title, body, image_url, date_posted)
VALUES
(1, 'I really like the outdoors', 'Aenean lacinia bibendum nulla sed consectetur.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.', 'https://images.unsplash.com/photo-1430692032771-aae00435a3ff?dpr=1&auto=format&fit=crop&w=1080&h=NaN&q=80&cs=tinysrgb&crop=&bg=', 1491476523775),
(2, 'I love to create', 'Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.', 'https://images.unsplash.com/photo-1477777404980-710a373f2d7e?dpr=1&auto=format&fit=crop&w=1080&h=NaN&q=80&cs=tinysrgb&crop=&bg=', 1491562292752);


COMMIT;
