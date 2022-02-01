const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const { startServer, stopServer } = require("../utils/database");


describe("User tests", () => {

    beforeAll(async () => {
        await startServer();
    })

    afterAll(async () => {
        await stopServer();
    })

    //=====================================================POST /user/create===============================================
    it("should create a new user", async () => {
        const response = await request.post('/users').send({
            email: "example@gmail.com",
            password: "example",
            name: "John"
        })
        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();
    })

    //======================================================POST /user/login && /user/me====================================
    it("should login a user", async () => {
        const response1 = await request.post('/users').send({
            email: "example@gmail.com",
            password: "example",
            name: "John"
        })
        expect(response1.statusCode).toBe(201);
        expect(response1.body.token).toBeDefined();

        const response2 = await request.post('/users/login').send({
            email: "example@gmail.com",
            password: "example"
        })
        expect(response2.statusCode).toBe(200);
        expect(response2.body.token).toBeDefined();

        const response3 = await request.get('/users/me').set('Authorization', 'Bearer ' + response2.body.token);
        expect(response3.statusCode).toBe(200);
        expect(response3.body.user.email).toBe('example@gmail.com');
        expect(response3.body.user.name).toBe('John');
    })

    it("should throw unauthorized error for faulty token", async () => {
        const response3 = await request
            .get('/users/me');
        //.set('Authorization', 'Bearer ' + response.body.token);
        expect(response3.statusCode).toBe(400);
    })


})