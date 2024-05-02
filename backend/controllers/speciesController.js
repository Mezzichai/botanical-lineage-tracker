const makeQuery = require("../utils/makeQuery")
const tryCatch = require("../middleware/higherOrder")
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const deleteFolderAndContents = require("../utils/deleteFolderAndContents");
const isJsonString = require("../utils/isJsonString");
const deleteAllExcept = require("../utils/deleteAllExcept");
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

//query
const getSpecies = tryCatch(async function(req, res, next) {
  const GET_ALL_SPECIES = `SELECT * 
                            FROM species 
                            ORDER BY date DESC`;

  const result = await makeQuery(GET_ALL_SPECIES)
  return res.send(result.rows).status(200)
})

const getSpecificSpeciesInfo = tryCatch(async function(req, res, next) {
  const GET_SPECIES = `SELECT *
                        FROM species
                        WHERE id = $1`;

  const speciesResult = await makeQuery(GET_SPECIES, req.params.speciesId)
  res.send(speciesResult.rows[0]).status(200)
})

const getIndividualInfo = tryCatch(async function(req, res, next) {
  const GET_INDIVIDUAL = `SELECT * 
                            FROM individual_plant
                            WHERE id = $1`;  
                        
  const individualResult = await makeQuery(GET_INDIVIDUAL, req.params.individualId)
  res.send(individualResult.rows).status(200)

})

const getGroupInfo = tryCatch(async function(req, res, next) {
  const GET_GROUP = `SELECT * 
                      FROM species_group
                      WHERE id = $1`;

  const groupResult = await makeQuery(GET_GROUP, req.params.groupId)
  res.send(groupResult.rows).status(200)

})

const getSpeciesMembers = tryCatch(async function(req, res, next) {
  const GET_SPECIES = `SELECT * 
  FROM species
  WHERE name = $1`;

  const GET_SPECIES_INDIVIDUALS = `SELECT * 
                FROM individualPlant
                WHERE species_id = $1`;

  const speciesResult = await makeQuery(GET_SPECIES, )
  const individualsResult = await makeQuery(GET_SPECIES_INDIVIDUALS, speciesResult.rows[0].id)
  res.send({species: speciesResult.rows, individuals: individualsResult.rows}).status(200)
})

const getSpecificSpeciesGroups = tryCatch(async function(req, res, next) {
  const GET_SPECIES = `SELECT * 
                        FROM species
                        WHERE name = $1`;

  const GET_SPECIES_GROUPS = `SELECT * 
                              FROM group
                              WHERE species_id = $1`;

  const speciesResult = await makeQuery(GET_SPECIES, )
  const groupsResult = await makeQuery(GET_SPECIES_GROUPS, speciesResult.rows[0].id)
  res.send({groups: groupsResult.rows}).status(200)
})

const getSpecificSpeciesSpecificGroup = tryCatch(async function(req, res, next) {
  const GET_SPECIES = `SELECT * 
                        FROM species
                        WHERE name = $1`;

  const GET_SPECIES_GROUP = `SELECT * 
                                FROM group
                                WHERE species_id = $1 AND name = $2`;

  const GET_GROUP_INDIVIDUALS = `SELECT * 
                                  FROM individualPlant
                                  WHERE group_id = $1`;

  const speciesResult = await makeQuery(GET_SPECIES, )
  const groupResult = await makeQuery(GET_SPECIES_GROUP, speciesResult.rows[0].id, )
  const individualsResult = await makeQuery(GET_GROUP_INDIVIDUALS, groupResult.rows[0].id, )
  res.send({group: groupResult.rows, individuals: individualsResult.rows}).status(200)
})




const getNewIndividualName = tryCatch(async function(req, res, next) {
  const GET_HIGHEST_ID = `SELECT id 
                            FROM individuals
                            WHERE species_id = $1
                            ORDER BY id DESC
                            LIMIT 1`;

  const GET_SPECIES_NAME = `SELECT name 
                            FROM species
                            WHERE id = $1`;


  const nameResult = await makeQuery(GET_SPECIES_NAME, req.params.speciesId)
  const highestIdResult = await makeQuery(GET_HIGHEST_ID, req.params.speciesId)
  const highestId = highestIdResult.rows[0]
  let name = ""
  let letterPositionToUse = 0
  while (!isNameUnique("individual_plant", name)) {
    name = nameResult
    .split(" ")
    .map(word => word[letterPositionToUse])
    .join("")
    .toUpperCase()
    +
    String(highestId + 1);

    letterPositionToUse++
  };

  res.send({name}).status(200)
})



//create
const createSpecies = tryCatch(async function(req, res, next) {
  if (
    !req.body.name
  ) {
    res.status(400).send({ error: "Please complete all required fields" });
    return;
  }
  console.log("files", req.files)
  const clean = DOMPurify.sanitize(req.body.descriptionHTML);
  const ADD_SPECIES = `INSERT INTO species (id, name, images, description_delta, description_html, light_schedule, substrate_values, water_schedule)
                          VALUES ($1, $2, $3, $4, $5, COALESCE($6::jsonb, '[{"hours": 1, "month": "January"}, {"hours": 1, "hours": "February"}, {"hours": 1, "month": "March"}, {"hours": 1, "month": "April"}, {"hours": 1, "month": "May"}, {"hours": 1, "month": "June"}, {"hours": 1, "month": "July"}, {"hours": 1, "month": "August"}, {"hours": 1, "month": "September"}, {"hours": 1, "month": "October"}, {"hours": 1, "month": "November"}, {"hours": 1, "month": "December"}]'::jsonb), COALESCE($7::jsonb, '[{"percent": "50", "substrate": "pumice"}, {"percent": "50", "substrate": "soil"}]'::jsonb), COALESCE($8::jsonb, '[{"water_count": 1, "month": "January"}, {"water_count": 1, "month": "February"}, {"water_count": 1, "month": "March"}, {"water_count": 1, "month": "April"}, {"water_count": 1, "month": "May"}, {"water_count": 1, "month": "June"}, {"water_count": 1, "month": "July"}, {"water_count": 1, "month": "August"}, {"water_count": 1, "month": "September"}, {"water_count": 1, "month": "October"}, {"water_count": 1, "month": "November"}, {"water_count": 1, "month": "December"}]'::jsonb))`

                          
  const addSpeciesResult = await makeQuery(ADD_SPECIES, 
    req.params.speciesId,
    req.body.name,
    JSON.stringify(req.files),
    req.body.descriptionDelta,
    clean,
    req.body?.light_schedule,
    req.body.substrate_values.length ? JSON.stringify(req.body.substrate_values) : null,
    req.body.water_schedule.length ? JSON.stringify(req.body.water_schedule) : null,
  )
  res.send(addSpeciesResult.rowCount > 0).status(200)
})


const createSpeciesIndividual = tryCatch(async function(req, res, next) {
  const ADD_PARENTS = `INSERT INTO parentPairs (mother_id, father_id) 
                         VALUES ($1, $2)`

  const ADD_INDIVIDUAL = `INSERT INTO individualPlant (name, images, description, substrate_values, light_schedule, water_schedule, is_clone, parents_id, group_id, species_id)
                           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

  const addIndividualResult = await makeQuery(ADD_INDIVIDUAL, )
  res.send(addIndividualResult.rowCount > 0).status(200)
})


const createSpeciesGroup = tryCatch(async function(req, res, next) {
  const ADD_GROUP = `INSERT INTO group (name, images, description, species_id)
                           VALUES ($1, $2, $3, $4)`;

  const addGroupResult = await makeQuery(ADD_GROUP, )
  res.send(addGroupResult.rowCount > 0).status(200)
})



//edit
const editSpecies = tryCatch(async function(req, res, next) {
  const EDIT_SPECIES = `UPDATE species
                        SET 
                          name = COALESCE($1, name),
                          images = COALESCE($2, images),
                          description_delta = COALESCE($3, description_delta),
                          description_html = COALESCE($4, description_html),
                          substrate_values = COALESCE($5, substrate_values),
                          water_schedule = COALESCE($6, water_schedule)
                        WHERE id = $7`;

  let {name, descriptionDelta, descriptionHTML, substrate_values, water_schedule, parents, groupId, existing_images} = req.body;
  const speciesId = req.params.speciesId;
  existing_images = JSON.parse(existing_images)
  const imageNameRegex = /image(\d+)\.jpeg/;
  const images = [...req.files, ...existing_images].sort((a, b) => {
    const imageANumber = a.match(imageNameRegex);
    const imageBNumber = b.match(imageNameRegex);
    
    if (imageANumber && imageBNumber) {
      return imageANumber - imageBNumber
    } else {
      return -1
    }
  })

  const clean = DOMPurify.sanitize(descriptionHTML);
  const editGroupResult = await makeQuery(EDIT_SPECIES, 
    name, 
    JSON.stringify(images), 
    descriptionDelta,
    clean, 
    isJsonString(substrate_values) ? substrate_values : null,
    isJsonString(water_schedule) ? water_schedule : null,
    speciesId
  )
  res.send(editGroupResult.rowCount > 0).status(200)
})


const editSpeciesIndividual = tryCatch(async function(req, res, next) {
  const EDIT_INDIVIDUAL = `UPDATE individualPlant
                           SET 
                             name = COALESCE($1, name),
                             images = COALESCE($2, images),
                             description = COALESCE($3, description),
                             substrate_values = COALESCE($4, substrate),
                             light_schedule = COALESCE($5, light_schedule),
                             water_schedule = COALESCE($6, water_schedule),
                             is_clone = COALESCE($7, is_clone),
                             parents_id = COALESCE($8, parents_id),
                             group_id = COALESCE($9, group_id)
                           WHERE id = $10`;

  const editIndividualResult = await makeQuery(EDIT_INDIVIDUAL, )
  res.send(editIndividualResult.rowCount > 0).status(200)
})

const editSpeciesGroup = tryCatch(async function(req, res, next) {
  const EDIT_GROUP = `UPDATE group
                      SET 
                        name = COALESCE($1, name),
                        images = COALESCE($2, images),
                        description = COALESCE($3, description)
                      WHERE id = $4`;

  const editGroupResult = await makeQuery(EDIT_GROUP, )
  res.send(editGroupResult.rowCount > 0).status(200)
})



//delete
const deleteSpecies = tryCatch(async function(req, res, next) {
  const DELETE_SPECIES = `DELETE from species
                          WHERE id = $1`;

  const deleteSpeciesResult = await makeQuery(DELETE_SPECIES, req.params.speciesId)

  deleteFolderAndContents(req.body.speciesName)

  res.send(deleteSpeciesResult.rowCount > 0).status(200)
})

const deleteSpeciesIndividual = tryCatch(async function(req, res, next) {
  const DELETE_INDIVIDUAL = `DELETE from individualPlant
                             WHERE id = $1`;

  const deleteIndividualResult = await makeQuery(DELETE_INDIVIDUAL, req.params.individualId)
  deleteFolderAndContents(req.body.speciesName, req.body.individualName)
  res.send(deleteIndividualResult.rowCount > 0).status(200)
})

const deleteSpeciesGroup = tryCatch(async function(req, res, next) {
  const DELETE_GROUP = `DELETE from group
                        WHERE id = $1`;

  const deleteGroupResult = await makeQuery(DELETE_GROUP, req.params.groupId);
  deleteFolderAndContents(req.body.speciesName, req.body.groupName)
  res.send(deleteGroupResult.rowCount > 0).status(200);
})




module.exports = {
  deleteSpeciesGroup,
  deleteSpeciesIndividual,
  deleteSpecies,
  editSpecies,
  editSpeciesGroup,
  editSpeciesIndividual,
  createSpecies,
  createSpeciesGroup,
  createSpeciesIndividual,
  getSpecies,
  getSpecificSpeciesInfo,
  getSpeciesMembers,
  getSpecificSpeciesGroups,
  getIndividualInfo,
  getGroupInfo,
  getSpecificSpeciesSpecificGroup
}
