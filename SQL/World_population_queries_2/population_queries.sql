--How many entries in the countries table are from Africa?
SELECT *
FROM countries
WHERE continent = 'Africa';
--56

--What was the total population of the continent of Oceania in 2005?
SELECT SUM(population)
FROM population_years
LEFT JOIN countries
	ON population_years.country_id = countries.id
WHERE year = 2005
GROUP BY continent
HAVING continent = 'Oceania';
-- 32.66417

--What is the average population of countries in South America in 2003?
SELECT AVG(population)
FROM population_years
JOIN countries
	ON population_years.country_id = countries.id
WHERE year = 2003 AND countries.continent = 'South America';
-- 25.8906514285714

--What country had the smallest population in 2007?
SELECT NAME, MIN(population)
FROM countries
JOIN population_years
	ON countries.id = population_years.country_id
WHERE year = 2007;
-- 0.00216

--What is the average population of Poland during the time period covered by this dataset?
SELECT AVG(population)
FROM population_years
JOIN countries
	ON population_years.country_id = countries.id
WHERE name = 'Poland';
--38.5606790909091

--How many countries have the word “The” in their name?
SELECT COUNT(name)
FROM countries
WHERE name LIKE 'The%' OR name LIKE '%THE';
--2 (technically 0, but some countries were added with the 'the' moved to the end)

--What was the total population of each continent in 2010?
SELECT SUM(population), continent
FROM population_years
JOIN countries
	ON population_years.country_id = countries.id
WHERE year = 2010
GROUP BY continent;
