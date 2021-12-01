CREATE DATABASE jobs;

CREATE TABLE job(
	job_id SERIAL PRIMARY KEY,
	company_name VARCHAR(255),
	job_title VARCHAR(255)
);
