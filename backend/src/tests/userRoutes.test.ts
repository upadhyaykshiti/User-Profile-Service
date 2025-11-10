import request from "supertest";
import app from "../app";
import AppDataSource from "../db";

// beforeAll(async () => {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//   }
// });

beforeAll(async () => {
  console.log("🔍 DB Config:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    db: process.env.DB_NAME,
  });

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});


afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe("Auth Routes", () => {
  const testUser = {
    email: "testuser9@example.com",
    password: "Password123@",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    console.log("REGISTER RESPONSE:", res.body);
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty("email", testUser.email);
  }, 15000);

  it("should login the existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send(testUser);

    console.log("LOGIN RESPONSE:", res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  }, 15000);
});
