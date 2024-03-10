import "dotenv/config";
import supertest from "supertest";
import app from "../src/app.js";
import { connectToDatabase, disconnectDatabase } from "../src/utils/db.js";

const agent = supertest(app);

describe("Blog Tests", () => {
    let sessionCookies;
    let testBlogID;

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
                .post("/api/auth/login")
                .send({
                    username: process.env.ADMIN_USER,
                    password: process.env.ADMIN_PASS,
                })
                .expect(200);
            sessionCookies = response.headers["set-cookie"][0];

            const response2 = await agent
                .delete("/api/blogs/123123")
                .set("Cookie", sessionCookies)
                .expect(400);
            expect(response2.body.error).toBe("Invalid blog id");
            expect(response2.body.ok).toBe(false);
        });
    });

    describe("Verify Blogs", () => {
        it("should validate blog id", async () => {
            const response = await agent
                .delete("/api/blogs/123123")
                .set("Cookie", sessionCookies)
                .expect(400);
            expect(response.body.error).toBe("Invalid blog id");
            expect(response.body.ok).toBe(false);
        });
        it("should return error if blog does not exist", async () => {
            const response = await agent
                .delete("/api/blogs/65ed4746abc03020f4e185cc")
                .set("Cookie", sessionCookies)
                .expect(404);
            expect(response.body.error).toBe("Blog not found");
            expect(response.body.ok).toBe(false);
        });
    });

    describe("Create blogs", () => {
        it("should create a blog", async () => {
            const blogData = {
                title: "32 bit vs 64 bit processors, what's the difference?",
                summary:
                    "I find alot of people studying computer science and yet they dont have any clue as to what are the key differences between x86 and x64 processors. I will cover everything you need to understand about them in this blog",
                tags: ["x86", "x64", "architecture", "processors"],
                is_published: true,
                content:
                    "<h2 id='introduction'>Introduction</h2><p>Next.js is an amazing framework that makes writing complex server rendered React apps much easier, but there is one huge problem. Next.js’s caching mechanism is extremely complicated and can easily lead to bugs in your code that are difficult to debug and fix.</p><p>If you don’t understand how Next.js’s caching mechanism works it feels like you are constantly fighting Next.js instead of reaping the amazing benefits of Next.js’s powerful caching. That is why in this article I am going to break down exactly how every part of Next.js’s cache works so you can stop fighting it and finally take advantage of its incredible performance gains.</p><p>Before we get started, here is an image of how all the caches in Next.js interact with one another. I know this is overwhelming, but by the end of this article you will understand exactly what each step in this process does and how they all interact.</p><p class='responsive-img'><img src='/articleAssets/2023-12/next-js-app-router-cache/cache-interactions.png' alt='cache-interactions'></p><p>In the image above, you probably noticed the term “Build Time” and “Request Time”. To make sure this does not cause any confusion throughout the article, let me explain them before we move forward.</p><p><strong>Build time</strong> refers to when an aplication is built and deployed. Anything that is cached during this process (mostly static content) will be part of the build time cache. The build time cache is only updated when the application is rebuilt and redeployed.</p><p><strong>Request time</strong> refers to when a user requests a page. Typically, data cached at request time is dynamic as we want to fetch it directly from the data source when the user makes requests.</p><h2 id='nextjs-caching-mechanisms'>Next.js Caching Mechanisms</h2><p>Understanding Next.js's caching can seem daunting at first. This is because it is composed of four distinct caching mechanisms which each operating at different stages of your application and interacting in ways that can initially appear complex.</p><p>Here are the four caching mechanisms in Next.js:</p>",
            };
            const response = await agent
                .post("/api/blogs")
                .send(blogData)
                .set("Cookie", sessionCookies)
                .expect(201);
            expect(response.body.ok).toBe(true);
            expect(response.body.data).toStrictEqual({
                ...blogData,
                _id: expect.any(String),
                published_on: expect.any(String),
                slug: expect.any(String),
                __v: expect.any(Number),
            });
            testBlogID = response.body.data._id;
        });
    });

    describe("Edit blogs", () => {
        it("should edit a blog", async () => {
            const updatedTitle = "Nextjs caching system";
            const response = await agent
                .patch(`/api/blogs/${testBlogID}`)
                .send({ title: updatedTitle })
                .set("Cookie", sessionCookies)
                .expect(200);
            expect(response.body.ok).toBe(true);
            expect(response.body.data.title).toBe(updatedTitle);
        });
    });

    describe("Unpublish blogs", () => {
        it("should un-publish a blog", async () => {
            const response = await agent
                .patch(`/api/blogs/un-publish/${testBlogID}`)
                .set("Cookie", sessionCookies)
                .expect(200);
            expect(response.body.data.is_published).toBe(false);
            expect(response.body.ok).toBe(true);
        });
        it("should return error if blog is already un-published", async () => {
            const response = await agent
                .patch(`/api/blogs/un-publish/${testBlogID}`)
                .set("Cookie", sessionCookies)
                .expect(400);
            expect(response.body.error).toBe("Blog is already un-published");
            expect(response.body.ok).toBe(false);
        });
    });

    describe("Publish blogs", () => {
        it("should publish a blog", async () => {
            const response = await agent
                .patch(`/api/blogs/publish/${testBlogID}`)
                .set("Cookie", sessionCookies)
                .expect(200);
            expect(response.body.data.is_published).toBe(true);
            expect(response.body.ok).toBe(true);
        });
        it("should return error if blog is already published", async () => {
            const response = await agent
                .patch(`/api/blogs/publish/${testBlogID}`)
                .set("Cookie", sessionCookies)
                .expect(400);
            expect(response.body.error).toBe("Blog is already published");
            expect(response.body.ok).toBe(false);
        });
    });

    describe("Delete blogs", () => {
        it("should delete a blog", async () => {
            await agent
                .delete(`/api/blogs/${testBlogID}`)
                .set("Cookie", sessionCookies)
                .expect(204);
        });
    });
});
