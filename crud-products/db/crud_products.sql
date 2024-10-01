CREATE DATABASE crud_products;

USE crud_products;

CREATE TABLE products (
    product_id SMALLINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_desc TEXT,
    product_price DECIMAL(6, 2)
)