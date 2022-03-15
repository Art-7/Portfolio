-- This is the first query:

SELECT DISTINCT year from population_years;

-- Add your additional queries below:

SELECT DISTINCT year
FROM population_years;

-- What is the largest population size for Gabon in this dataset?
SELECT max(population)
FROM population_years
WHERE country = 'Gabon' ;

-- What were the 10 lowest population countries in 2005?
SELECT country, population
FROM population_years
WHERE year = 2005
ORDER BY population ASC
LIMIT 10;

-- What are all the distinct countries with a population of over 100 million in the year 2010?
SELECT DISTINCT country
FROM population_years
WHERE population > 100 AND year = 2010;

-- How many countries in this dataset have the word “Islands” in their name?
SELECT COUNT( DISTINCT country) AS 'Number of countries with word Islands in name'
FROM population_years
WHERE country LIKE "%islands%";

-- What is the difference in population between 2000 and 2010 in Indonesia?
-- Note: it’s okay to figure out the difference by hand after pulling the correct data.
-- Note re Note: Computer can do like a billion calculations a second or whatever. It can subtract this for me XD
SELECT (SELECT population FROM population_years WHERE country = 'Indonesia' AND year = 2010)-(SELECT population FROM population_years WHERE country = 'Indonesia' AND year = 2000) AS 'Population change 2000-2010';
