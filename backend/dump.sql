CREATE DATABASE botanical_lineage_store;

CREATE TABLE species (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL CHECK (LENGTH(name) >= 1),
  images jsonb,
  description_delta jsonb NOT NULL,
  description_html varchar,
  substrate_values jsonb DEFAULT '[{"percent": "50", "substrate": "pumice"}, {"percent": "50", "substrate": "soil"}]',
  light_values jsonb DEFAULT '[{"hours": 12, "month": "January"}, {"hours": 12, "month": "February"}, 
                                 {"hours": 12, "month": "March"}, {"hours": 12, "month": "April"}, 
                                 {"hours": 12, "month": "May"}, {"hours": 12, "month": "June"}, 
                                 {"hours": 12, "month": "July"}, {"hours": 12, "month": "August"}, 
                                 {"hours": 12, "month": "September"}, {"hours": 12, "month": "October"}, 
                                 {"hours": 12, "month": "November"}, {"hours": 12, "month": "December"}]',

  water_values jsonb DEFAULT '[{"water_count": 1, "month": "January"}, {"water_count": 1, "month": "February"}, 
                                 {"water_count": 1, "month": "March"}, {"water_count": 1, "month": "April"}, 
                                 {"water_count": 1, "month": "May"}, {"water_count": 1, "month": "June"}, 
                                 {"water_count": 1, "month": "July"}, {"water_count": 1, "month": "August"}, 
                                 {"water_count": 1, "month": "September"}, {"water_count": 1, "month": "October"}, 
                                 {"water_count": 1, "month": "November"}, {"water_count": 1, "month": "December"}]',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE species_group (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  images jsonb,
  description_delta jsonb NOT NULL,
  description_html varchar,
  substrate_values jsonb DEFAULT '[{"percent": "50", "substrate": "pumice"}, {"percent": "50", "substrate": "soil"}]',
  light_values jsonb DEFAULT '[{"hours": 12, "month": "January"}, {"hours": 12, "month": "February"}, 
                                 {"hours": 12, "month": "March"}, {"hours": 12, "month": "April"}, 
                                 {"hours": 12, "month": "May"}, {"hours": 12, "month": "June"}, 
                                 {"hours": 12, "month": "July"}, {"hours": 12, "month": "August"}, 
                                 {"hours": 12, "month": "September"}, {"hours": 12, "month": "October"}, 
                                 {"hours": 12, "month": "November"}, {"hours": 12, "month": "December"}]',
                                 
  water_values jsonb DEFAULT '[{"water_count": 1, "month": "January"}, {"water_count": 1, "month": "February"}, 
                                 {"water_count": 1, "month": "March"}, {"water_count": 1, "month": "April"}, 
                                 {"water_count": 1, "month": "May"}, {"water_count": 1, "month": "June"}, 
                                 {"water_count": 1, "month": "July"}, {"water_count": 1, "month": "August"}, 
                                 {"water_count": 1, "month": "September"}, {"water_count": 1, "month": "October"}, 
                                 {"water_count": 1, "month": "November"}, {"water_count": 1, "month": "December"}]',
  species_id integer
    NOT NULL
    REFERENCES species(id)
    ON DELETE CASCADE
);


CREATE TABLE individual_plant (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  images jsonb,
  description_delta jsonb NOT NULL,
  description_html varchar,
  substrate_values jsonb DEFAULT '[{"percent": "50", "substrate": "pumice"}, {"percent": "50", "substrate": "soil"}]',
  light_values jsonb DEFAULT '[{"hours": 12, "month": "January"}, {"hours": 12, "month": "February"}, 
                                 {"hours": 12, "month": "March"}, {"hours": 12, "month": "April"}, 
                                 {"hours": 12, "month": "May"}, {"hours": 12, "month": "June"}, 
                                 {"hours": 12, "month": "July"}, {"hours": 12, "month": "August"}, 
                                 {"hours": 12, "month": "September"}, {"hours": 12, "month": "October"}, 
                                 {"hours": 12, "month": "November"}, {"hours": 12, "month": "December"}]',
  water_values jsonb DEFAULT '[{"water_count": 1, "month": "January"}, {"water_count": 1, "month": "February"}, 
                                 {"water_count": 1, "month": "March"}, {"water_count": 1, "month": "April"}, 
                                 {"water_count": 1, "month": "May"}, {"water_count": 1, "month": "June"}, 
                                 {"water_count": 1, "month": "July"}, {"water_count": 1, "month": "August"}, 
                                 {"water_count": 1, "month": "September"}, {"water_count": 1, "month": "October"}, 
                                 {"water_count": 1, "month": "November"}, {"water_count": 1, "month": "December"}]',
  is_clone boolean DEFAULT false,
  group_id integer
    REFERENCES species_group(id)
    ON DELETE CASCADE,
  species_id integer
    NOT NULL
    REFERENCES species(id)
    ON DELETE CASCADE,
  UNIQUE(group_id, species_id)
);

CREATE TABLE parent_pair (
  id serial PRIMARY KEY,
  mother_id integer REFERENCES individual_plant(id) ON DELETE CASCADE NOT NULL ,
  father_id integer REFERENCES individual_plant(id) ON DELETE CASCADE,
  UNIQUE(mother_id, father_id)
);


CREATE TABLE child_parent_pair (
  individual_plant_id integer REFERENCES individual_plant(id) ON DELETE CASCADE,
  parent_pair_id integer REFERENCES parent_pair(id) ON DELETE CASCADE,
  id serial PRIMARY KEY
);


SELECT individualPlant.* AS plant 
  FROM individualPlant
  WHERE plant.parents_id IS NULL

SELECT individualPlant.* AS father
  FROM individualPlant
    JOIN parentPairs
      ON individualPlant.id === parentPairs.father_id
    WHERE parentPairs.mother_id === ${motherId}

SELECT id FROM parentPairs
WHERE ${mother_id} === parentPairs.mother_id
OFFSET ${offset}

SELECT individualPlant.*
  FROM individualPlant
  WHERE individualPlant.parents_id === ${parentsId}


