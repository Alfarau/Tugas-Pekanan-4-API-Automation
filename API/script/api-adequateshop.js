const { TEST_DATA } = require("../data/testData");
const request = require("supertest")("http://restapi.adequateshop.com");
const expect =  require("chai").expect;

var randomNum
var token
var user_ID

randomNum = Math.floor(Math.random() * 1000);

//////////////////////////////////////////////// API REGISTRATION ////////////////////////////////////////////////
describe("User Registration", function(){
    it("Registration User Success",async function(){
        const response = await request
            .post("/api/authaccount/registration")
            .send({
                "name" : TEST_DATA.name,
                "email" : randomNum+TEST_DATA.email,
                "password" : TEST_DATA.password
            });

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("success");
        expect(response.body.data.Name).to.eql(TEST_DATA.name);
        expect(response.body.data.Email).to.eql(randomNum+TEST_DATA.email);
    }).timeout(10000);

    it("Registration User Failed - With Out Name",async function(){
        const response = await request
            .post("/api/authaccount/registration")
            .send({
                "name" : "",
                "email" : randomNum+TEST_DATA.email,
                "password" : TEST_DATA.password
            });

        expect(response.status).to.eql(400);
        expect(response.body.Message).to.eql("The request is invalid.");
    }).timeout(10000);

    it("Registration User Failed - With Out Email",async function(){
        const response = await request
            .post("/api/authaccount/registration")
            .send({
                "name" : TEST_DATA.name,
                "email" : "",
                "password" : TEST_DATA.password
            });

        expect(response.status).to.eql(400);
        expect(response.body.Message).to.eql("The request is invalid.");
    }).timeout(10000);

    it("Registration User Failed - With Out Password",async function(){
        const response = await request
            .post("/api/authaccount/registration")
            .send({
                "name" : TEST_DATA.name,
                "email" : randomNum+TEST_DATA.email,
                "password" : ""
            });

        expect(response.status).to.eql(400);
        expect(response.body.Message).to.eql("The request is invalid.");
    }).timeout(10000);

    it("Registration User Failed - Email Already Registered",async function(){
        const response = await request
            .post("/api/authaccount/registration")
            .send({
                "name" : TEST_DATA.name,
                "email" : randomNum+TEST_DATA.email,
                "password" : TEST_DATA.password
            });

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("The email address you have entered is already registered");
    }).timeout(10000);

    
})

//////////////////////////////////////////////// API LOGIN ////////////////////////////////////////////////
describe("User Login", function(){
    it("Login Success",async function(){
        const response = await request
            .post("/api/authaccount/login")
            .send({
                "email" : randomNum+TEST_DATA.email,
                "password" : TEST_DATA.password
            });
        
        token = response.body.data.Token;

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("success");
        expect(response.body.data.Name).to.eql(TEST_DATA.name);
        expect(response.body.data.Email).to.eql(randomNum+TEST_DATA.email);
    }).timeout(10000);

    it("Login Failed - Unregistered Email",async function(){
        const response = await request
            .post("/api/authaccount/login")
            .send({
                "email" : "farauNotRegistered@givmail.com",
                "password" : TEST_DATA.password
            });

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("invalid username or password");
    }).timeout(10000);

    it("Login Failed - Invalid Password",async function(){
        const response = await request
            .post("/api/authaccount/login")
            .send({
                "email" : randomNum+TEST_DATA.email,
                "password" : randomNum+TEST_DATA.password
            });

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("invalid username or password");
    }).timeout(10000);

    it("Login Failed - Empty Email",async function(){
        const response = await request
            .post("/api/authaccount/login")
            .send({
                "email" : "",
                "password" : randomNum+TEST_DATA.password
            });

        expect(response.status).to.eql(400);
        expect(response.body.Message).to.eql("The request is invalid.");
    }).timeout(10000);

    it("Login Failed - Empty Password",async function(){
        const response = await request
            .post("/api/authaccount/login")
            .send({
                "email" : randomNum+TEST_DATA.email,
                "password" : ""
            });

        expect(response.status).to.eql(400);
        expect(response.body.Message).to.eql("The request is invalid.");
    }).timeout(10000);

})

//////////////////////////////////////////////// API CREATE USER ////////////////////////////////////////////////
describe("Create User", function(){
    it("Create User Success",async function(){
        const response = await request
            .post("/api/users")
            .set({ Authorization: "Bearer "+token})
            .send({
                "name": TEST_DATA.user_name,
                "email": randomNum+TEST_DATA.user_email,
                "location": TEST_DATA.location
            });

        user_ID = response.body.id 

        expect(response.status).to.eql(201);
        expect(response.body.name).to.eql(TEST_DATA.user_name);
        expect(response.body.email).to.eql(randomNum+TEST_DATA.user_email);
    }).timeout(10000);

    it("Create User Failed - Registered Email",async function(){
        const response = await request
            .post("/api/users")
            .set({ Authorization: "Bearer "+token})
            .send({
                "name": TEST_DATA.user_name,
                "email": randomNum+TEST_DATA.user_email,
                "location": TEST_DATA.location
            });

        expect(response.status).to.eql(400);
        expect(response.body.Message).to.eql("Pleae try with different email address!");
    }).timeout(10000);

    it("Create User Failed - Invalid Token",async function(){
        const response = await request
            .post("/api/users")
            .set({ Authorization: "Bearer 944743cd-510f-4e73-9b30-53c069698891"})
            .send({
                "name": TEST_DATA.user_name,
                "email": randomNum+TEST_DATA.user_email,
                "location": TEST_DATA.location
            });

        expect(response.status).to.eql(401);
    }).timeout(10000);
})

//////////////////////////////////////////////// API GET USER BY ID ////////////////////////////////////////////////
describe("GET User By ID", function(){
    it("GET User By ID Success",async function(){
        const response = await request
            .get("/api/users/"+user_ID)
            .set({ Authorization: "Bearer "+token});

        expect(response.status).to.eql(200);
        expect(response.body.name).to.eql(TEST_DATA.user_name);
    }).timeout(10000);

    it("GET User By ID Failed - Invalid User ID",async function(){
        const response = await request
            .get("/api/users/InvalidUserID")
            .set({ Authorization: "Bearer "+token});

        expect(response.status).to.eql(400);
        expect(response.body.Message).to.eql("The request is invalid.");
    }).timeout(10000);

    it("GET User By ID Failed - Invalid Token",async function(){
        const response = await request
            .get("/api/users/InvalidUserID")
            .set({ Authorization: "Bearer 944743cd-510f-4e73-9b30-53c069698891"});

        expect(response.status).to.eql(401);
    }).timeout(10000);
})