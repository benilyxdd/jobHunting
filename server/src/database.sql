CREATE DATABASE IF NOT EXIST jobs;

/* uuid generator */
CREATE EXTENSION IF NOT EXIST "uuid-ossp";

CREATE TABLE job(
	/*
		auto generated properties
	*/
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

	/*
		scraped properties
	*/
	company_name VARCHAR(255) NOT NULL, /* eg: Google */
	description TEXT NOT NULL,
	link TEXT NOT NULL, /* eg: https://career.google.com/ */
	nice_to_have TEXT[],
	requirments TEXT[] NOT NULL,
	responsibilities TEXT[],
	title VARCHAR(255) NOT NULL, /* eg: Junior frontend developer */
	location VARCHAR(255) NOT NULL  /* eg: Remote / US */
);
