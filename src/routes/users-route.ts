import { Elysia, t } from "elysia";
import { UserService } from "../services/user-service";

export const usersRoute = new Elysia({ prefix: "/api" })
  .post("/users", async ({ body, set }) => {
    try {
      await UserService.registerUser(body);
      set.status = 201;
      return { data: "ok" };
    } catch (error: any) {
      set.status = 400;
      return { error: error.message || "Terjadi kesalahan" };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    })
  });
