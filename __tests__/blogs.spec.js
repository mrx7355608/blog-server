import "dotenv/config";
import supertest from "supertest";
import app from "../src/app.js";
import { connectToDatabase, disconnectDatabase } from "../src/utils/db.js";

const agent = supertest(app);

describe("Blog Tests", () => {
    let sessionCookies;
    beforeAll(async () => await connectToDatabase());
    afterAll(async () => await disconnectDatabase());

    describe("Get blogs", () => {
        it("should return blogs with necessary fields only", async () => {
            const response = await agent.get("/api/blogs").expect(200);
            expect(response.body.ok).toBe(true);
            expect(response.body.data[0]).toStrictEqual({
                _id: expect.any(String),
                title: expect.any(String),
                summary: expect.any(String),
                content: expect.any(String),
                published_on: expect.any(String),
                slug: expect.any(String),
                tags: expect.any(Array),
            });
        });
        it("should paginate blogs", async () => {
            const response = await agent.get("/api/blogs?page=1").expect(200);
            expect(response.body.ok).toBe(true);
            expect(response.body.data.length).toBeLessThanOrEqual(10);
            expect(response.body.data.length).not.toBe(0);

            const response2 = await agent.get("/api/blogs?page=3").expect(200);
            expect(response2.body.ok).toBe(true);
            expect(response2.body.data.length).toBe(0);
        });
    });

    describe("Auth requests", () => {
        it("should not allow un-authenticated requests", async () => {
            const response = await agent.post("/api/blogs").expect(401);
            expect(response.body.ok).toBe(false);
            expect(response.body.error).toBe("Not authenticated");
        });
        it("should allow authenticated requests", async () => {
            const response = await agent
                .post("/auth/login")
                .send({})
                .expect(200);
        });
    });

    describe("Create blogs", () => {
        it.todo("should create a blog");
    });

    describe("Edit blogs", () => {
        it.todo("should edit a blog");
        it.todo("should return error if blog id is invalid");
        it.todo("should return error if blog does not exist");
    });

    describe("Delete blogs", () => {
        it.todo("should delete a blog");
        it.todo("should return error if blog id is invalid");
        it.todo("should return error if blog does not exist");
    });

    describe("Publish blogs", () => {
        it.todo("should delete a blog");
        it.todo("should return error if blog is already published");
    });

    describe("Unpublish blogs", () => {
        it.todo("should un-publish a blog");
        it.todo("should return error if blog is already un-published");
    });
});
