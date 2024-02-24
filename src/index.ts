import { Elysia } from "elysia";

const app = new Elysia();
const PORT = process.env.PORT;

app.group("/api/v1/auth", (router) => router.get("/", async () => "Hello auth service"));

app.listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

