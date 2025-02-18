# authentication service

This application is designed for a auth system.

###Technologies

- TypeScript
- Node JS
- Postgres
- Postman

###Installation

1. Clone from the Github `https://github.com/osherd/cartly.git`.
2. Go to the folder `cd backend`.
3. Initialize dependencies `npm install`.
4. Put ConnectionString for db connect - `....`
5. Create the database `shopping-cart-system`.
6. Run the app. Use `npm start`
7. I used for this assignment neon.tech - It's an open-source cloud database platform that provides a fully. (other databases optional)
   link - https://neon.tech/docs/introduction. Then Create a database = 'shopping-cart-system`.
   create tables with those 3 scripts above using neon SQL Editor

   Create User Table

   `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    resetToken TEXT NOT NULL,
    resetTokenExpiration TIMESTAMP,
    salt TEXT NOT NULL,
    FOREIGN KEY (id) REFERENCES users (id),
    created_at timestamptz NOT NULL DEFAULT (now()),
    updated_at timestamptz NOT NULL DEFAULT (now())
)`;

   Create Product Table

   `CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     sku varchar NOT NULL,
     name TEXT NOT NULL,
     sellingPrice bigint NOT NULL,
     stockQuantity bigint,
     expirationDate TEXT NOT NULL,
     created_at timestamptz NOT NULL DEFAULT (now()),
     updated_at timestamptz NOT NULL DEFAULT (now()),  
     constraint stock_nonnegative check (stockQuantity >= 0)
 )`;

   Create Cart Table
   `CREATE TABLE cart (
     id SERIAL PRIMARY KEY,
     userId TEXT NOT NULL,
     productId TEXT NOT NULL,
     stockQuantity TEXT NOT NULL,
     created_at timestamptz NOT NULL DEFAULT (now()),
     updated_at timestamptz NOT NULL DEFAULT (now())
 )`;

8. Call user SignUp API and put the return signature data on the next API calls as Bearer Token on Authorization - ![image](https://github.com/osherd/shopping-cart-app/assets/22489905/b87299d5-7fbe-45f8-9c47-9adbae5c7621)
9. Postman documentation for API endpoints - https://documenter.getpostman.com/view/30173055/2sA3XTeKxF
