CREATE DATABASE jobs;

CREATE EXTENSION IF NOT EXIST "uuid-ossp"

CREATE TABLE job(
	job_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	job_title VARCHAR(255) NOT NULL,
	company_name VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL,
	job_link TEXT NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);
