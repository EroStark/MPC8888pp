DROP DATABASE IF EXISTS mpc8888db;
CREATE DATABASE mpc8888db;

\c mpc8888db

CREATE TABLE instrumentLibrary (
    instrument_ID SERIAL PRIMARY KEY , 
    instrument BYTEA
); 

