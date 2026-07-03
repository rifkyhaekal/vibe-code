import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => ({
    status: "ok",
    service: "Elysia + Drizzle + MySQL Backend",
  }))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
