CREATE USER dockeruser WITH PASSWORD 'dockeruser';

CREATE DATABASE streammeow;
GRANT ALL PRIVILEGES ON DATABASE "streammeow" TO dockeruser;

CREATE ROLE "root";