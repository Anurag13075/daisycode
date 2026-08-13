import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@daisycode/database/client";
import { LOCAL_USER_ID } from "../lib/local-user";

const createSessionSchema = z.object({
  title: z.string(),
});

const createSessionValidator = zValidator("json", createSessionSchema, (result, c) => {
  if (!result.success) {
    return c.json({ error: "Invalid request body" }, 400);
  }
});

const app = new Hono()
  .get("/", async (c) => {
    const sessions = await db.session.findMany({
      where: { userId: LOCAL_USER_ID },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return c.json(sessions);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");

    const session = await db.session.findUnique({
      where: { id },
    });

    if (!session || session.userId !== LOCAL_USER_ID) {
      return c.json({ error: "Session not found" }, 404);
    }

    return c.json(session);
  })
  .post("/", createSessionValidator, async (c) => {
    const data = c.req.valid("json");

    const session = await db.session.create({
      data: {
        ...data,
        userId: LOCAL_USER_ID,
      },
    });

    return c.json(session, 201);
  });

export default app;
