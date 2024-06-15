import { HttpResponse, http } from 'msw'
import speciesItems from './data/speciesItems'
import individualsItems from './data/individualsItems'



export const handlers = [

  //species routes
  http.get("/", () => {
    return HttpResponse.json(speciesItems)
  }),

  http.get("/info/:speciesId", () => {
    return HttpResponse.json(speciesItems[0])
  }),

  http.post("/", () => {
    speciesItems.push({id: 1, name: "item 1"})
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

