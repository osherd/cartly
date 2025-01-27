
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    stock NUMBER NOT NULL,
);