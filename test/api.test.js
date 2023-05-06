const request = require("supertest");
const { app } = require("../index");

describe("Get User Endpoint", () => {
  it("should return user data when a valid token is provided", async () => {
    // Login first to get the JWT token
    const loginRes = await request(app)
      .post("/auth/login")
      .send({
        email: "hafis.gov@gmail.com",
        password: "12345678",
      })
      .expect(200);

    const token = loginRes.body.data.token;

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty("status", "success");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("full_name");
    expect(res.body.data).toHaveProperty("email", "hafis.gov@gmail.com");
  });

  it("should return an error message when no token is provided", async () => {
    const res = await request(app).get("/auth/me").expect(401);

    expect(res.body).toHaveProperty("message", "Unauthorized");
  });
});
