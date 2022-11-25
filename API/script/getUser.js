const request = require("supertest")("https://reqres.in/api");
const expect =  require("chai").expect;

describe("GET /users", function(){
    it("returns all users",async function(){
        const response = await request.get("/users");

        expect(response.status).to.eql(200)
        expect(response.body.data.length).to.eql(6);
    })
})
