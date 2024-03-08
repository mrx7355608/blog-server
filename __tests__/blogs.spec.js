import "dotenv/config";
import supertest from "supertest";
import app from "../src/app.js";
import { connectToDatabase, disconnectDatabase } from "../src/utils/db.js";

const agent = supertest(app);

describe("Blog Tests", () => {
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
        it.todo("should paginate blogs");
    });

    describe("Auth requests", () => {
        it.todo("should not allow un-authenticated requests");
        it.todo("should allow authenticated requests");
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
