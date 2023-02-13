-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS users_organizations CASCADE;
DROP TABLE IF EXISTS user_passwords CASCADE;
DROP TABLE IF EXISTS organization_passwords CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS invites CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  org_name VARCHAR(255) NOT NULL
);

CREATE TABLE users_organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user_passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  website_name VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE organization_passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  website_name VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE invites (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE NOT NULL
);
