import { HttpResponse, http } from 'msw'
import speciesItems from './data/speciesItems'
<<<<<<< HEAD
import individualsItems from './data/individualsItems'
=======
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8



export const handlers = [

  //species routes
  http.get("/", () => {
    return HttpResponse.json(speciesItems)
  }),

  http.get("/info/:speciesId", () => {
    return HttpResponse.json(speciesItems[0])
  }),

  http.post("/", () => {
<<<<<<< HEAD
    speciesItems.push({id: 1, name: "item 1"})
=======
    speciesItems.push({id: "1", name: "item 1"})
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
    return new HttpResponse("success", {status: 200})
  }),

  http.patch("/:speciesId", () => {
    speciesItems[0].name = "new species 1 name"
    return new HttpResponse("success", {status: 200})
  }),

  http.delete("/:speciesId", () => {
    speciesItems[0] = {}
    return new HttpResponse("success", {status: 200})
  })
]
<<<<<<< HEAD

  // individual routes
  http.get("/:speciesId", () => {
    return HttpResponse.json(individualsItems)
  }),

  http.post("/:speciesId/:groupId", () => {
    speciesItems.push({id: 1, name: "I001"})
    return new HttpResponse("success", {status: 200})
  }),
 
  http.patch("/:speciesId/:individualId", async () => {
    speciesItems[0].name = "I001 edited"
    return new HttpResponse("success", {status: 200})
  }),

  http.delete("/:speciesId/:IndividualId", () => {
    speciesItems[0] = {}
    return new HttpResponse("success", {status: 200})
  })
=======
//   // individual routes
//   http.get("/:speciesId", () => {
//     return HttpResponse.json(filteredNotes)
//   }),

//   http.post("/:speciesId/:groupId", () => {
//     return new HttpResponse("success", {status: 200})
//   }),
 
//   http.patch("/:speciesId/:individualId", async ({request, params}) => {
//     return new HttpResponse("success", {status: 200})
//   }),

//   http.delete("/:speciesId/:IndividualId", () => {
//     return new HttpResponse("success", {status: 200})
//   }),
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8




//   //groups routes
//   http.get("/:speciesId/groups", () => {
//     return HttpResponse.json()
//   }),

//   http.get("/:speciesId/:groupId", () => {
//     return HttpResponse.json()
//   }),

//   http.post("/:speciesId/group", () => {

//     return new HttpResponse("success", {status: 200})
//   }),
 
//   http.patch("/:speciesId/groups/:groupId", async ({request, params}) => {
//     return new HttpResponse("success", {status: 200})
//   }),

//   http.delete("/:speciesId/groups/:groupId", () => {
//     return new HttpResponse("success", {status: 200})
//   }),
// ]

