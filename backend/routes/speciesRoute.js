const controllers = require("../controllers/speciesController")
const deleteFolderImages = require("../middleware/deleteFolderImages")
const getNextId = require("../middleware/getNextId")
const router = require('express').Router()
const {speciesUpload, groupUpload, individualUpload} = require("../utils/upload")

router.get("/info/species/:speciesId", controllers.getSpecificSpeciesInfo) // get specific species info

router.get("/info/individual/:individualId", controllers.getIndividualInfo) // get specific individual info

router.get("/info/group/:groupId", controllers.getGroupInfo) // get specific group info

router.get("/", controllers.getSpecies) //get species

router.get("/:speciesId", controllers.getSpeciesMembers) //get a species' members

router.get("/:speciesName/groups", controllers.getSpecificSpeciesGroups)  //get groups of a species

router.get("/:speciesName/groups/:groupName", controllers.getSpecificSpeciesSpecificGroup)  //get individuals of species and group



router.post("/", getNextId, speciesUpload.array("images", 5), deleteFolderImages, controllers.createSpecies) // create a new species

router.post("/:speciesId/individual", getNextId, individualUpload.array("images", 5), deleteFolderImages, controllers.createSpeciesIndividual) // create a new individual in ${speciesId}

router.post("/:speciesId/group", getNextId, groupUpload.array("images", 5), deleteFolderImages, controllers.createSpeciesGroup) // create a new group in ${speciesId}



router.patch("/:speciesId", speciesUpload.array("images", 5), deleteFolderImages, controllers.editSpecies) // edit a species

router.patch("/:speciesId/:IndividualId", individualUpload.array("images", 5), deleteFolderImages, controllers.editSpeciesIndividual) // edit a individual

router.patch("/:speciesId/groups/:groupId", groupUpload.array("images", 5), deleteFolderImages, controllers.editSpeciesGroup) // create a new group in ${speciesId}



router.delete("/:speciesId", controllers.deleteSpecies) // delete a species

router.delete("/:speciesId/:IndividualId", controllers.deleteSpeciesIndividual) // delete a individual

router.delete("/:speciesId/groups/:groupId", controllers.deleteSpeciesGroup) // delete a group

module.exports = router