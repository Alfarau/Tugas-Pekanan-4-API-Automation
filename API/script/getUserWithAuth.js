const request = require("supertest")("http://restapi.adequateshop.com/api");
const expect =  require("chai").expect;

describe("GET /users", function(){
    it("returns all users",async function(){
        const response = await request
        .get("/users")
        .set({ Authorization: "Bearer 5a24cbb-1b29-4b0f-9cb6-1914cff94e0"});

        expect(response.status).to.eql(401)
    })
})
