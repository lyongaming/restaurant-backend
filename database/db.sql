CREATE DATABASE restaurant;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS establishments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fname VARCHAR(30) UNIQUE NOT NULL,
    lname VARCHAR(30) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fname VARCHAR(30) UNIQUE NOT NULL,
    lname VARCHAR(30) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    position VARCHAR(15) NOT NULL,
    establishments_id UUID,
    FOREIGN KEY (establishments_id) REFERENCES establishments(id)
);

ALTER TABLE clients ADD COLUMN password VARCHAR(64) NOT NULL CHECK (length(password) > 7);