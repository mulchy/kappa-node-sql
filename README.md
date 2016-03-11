# kappa-node-sql
Example of using the pg module in a express app

This app requires an existing Postgres DB. To create it, do the following: 

In your terminal
```
$ createdb node-app
```

In psql or Postico
```
CREATE TABLE people (
    id SERIAL NOT NULL,
    name character varying(80) NOT NULL,
    address text NOT NULL
);
```

To install dependencies, build the JS, and lauch the app: 

In your terminal
```
npm install && grunt && npm start
```
