import { Elysia } from "elysia";
import { login } from "./services/auth";
import { ILogin } from "./interfaces/auth";
import { jwt } from "@elysiajs/jwt";

const app = new Elysia();
const PORT: any = process.env.PORT;

app.group("/api/v1/auth", (router) =>
	router
		.use(
			jwt({
				name: "jwtSignToken",
				secret: process.env.JWT_SECRET!,
				exp: "1d",
			})
		)
		.get("/", async () => "Hello auth service")
		.post("/login", async ({ jwtSignToken, body, set, cookie: { accessToken } }) => {
			const payload = body as ILogin;
			const response = await login(payload);
			if (response.status === 200) {
				const token = await jwtSignToken.sign({ id: response.data.id, username: response.data.username });
				accessToken.value = token;
				response.data = { accessToken: token };
			}
			set.status = response.status;

			return response;
		})
);

app.listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

