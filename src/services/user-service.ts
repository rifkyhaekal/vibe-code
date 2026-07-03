import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export class UserService {
  static async registerUser(data: typeof users.$inferInsert) {
    // 1. Check if email is already registered
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    // 2. Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Save the user to the database
    await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return { success: true };
  }
}
