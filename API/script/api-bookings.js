const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect =  require("chai").expect;
const { BOOKING_DATA } = require("../data/testData");

var bookingID

//////////////////////////////////////////////// API CREATE BOOKING ////////////////////////////////////////////////
describe("Create Booking", function(){
    it("Create Booking Success",async function(){
        const response = await request
            .post("/booking")
            .send({
                "firstname" : BOOKING_DATA.firstname,
                "lastname" : BOOKING_DATA.lastname,
                "totalprice" : BOOKING_DATA.price,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            });

        expect(response.status).to.eql(200);
        expect(response.body.booking.firstname).to.eql(BOOKING_DATA.firstname);
        expect(response.body.booking.lastname).to.eql(BOOKING_DATA.lastname);
        expect(response.body.booking.price).to.eql(BOOKING_DATA.price);
        bookingID = response.body.bookingid;
    })
})

//////////////////////////////////////////////// API GET BOOKING ////////////////////////////////////////////////
describe("GET Booking", function(){
    it("GET Booking by ID Success",async function(){
        const response = await request
            .get("/booking/"+bookingID);

        expect(response.status).to.eql(200);
        expect(response.body.firstname).to.eql(BOOKING_DATA.firstname);
        expect(response.body.lastname).to.eql(BOOKING_DATA.lastname);
        expect(response.body.price).to.eql(BOOKING_DATA.price);
    })

    it("GET Booking by ID Failed - Invalid Booking ID",async function(){
        const response = await request
            .get("/booking/"+bookingID+"123");

        expect(response.status).to.eql(404);
    })

})

//////////////////////////////////////////////// API UPDATE BOOKING ////////////////////////////////////////////////
describe("Update Booking", function(){
    it("Update Booking Success",async function(){
        const response = await request
            .put("/booking/"+bookingID)
            .set({ Authorization: "Basic "+BOOKING_DATA.basicToken})
            .send({
                "firstname" : BOOKING_DATA.firstname+"Edit",
                "lastname" : BOOKING_DATA.lastname+"Edit",
                "totalprice" : BOOKING_DATA.price,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            });

        expect(response.status).to.eql(200);
        expect(response.body.booking.firstname).to.eql(BOOKING_DATA.firstname+"Edit");
        expect(response.body.booking.lastname).to.eql(BOOKING_DATA.lastname+"Edit");
    })
})

//////////////////////////////////////////////// API DELETE BOOKING ////////////////////////////////////////////////
describe("Delete Booking", function(){
    it("Delete Booking Success",async function(){
        const response = await request
            .del("/booking/"+bookingID)
            .set({ Authorization: "Basic "+BOOKING_DATA.basicToken});

        expect(response.status).to.eql(201);
    })
})
