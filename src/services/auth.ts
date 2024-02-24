import axios from "axios";
import { ILogin } from "../interfaces/auth";
import { baseResponse, baseResponseWithData } from "../utils/baseResponse";

const userServiceBaseUrl = process.env.USER_SERVICE_ENDPOINT as string;
async function login(payload: ILogin) {
	const { username, password } = payload;
	try {
		const response = await axios.get(`${userServiceBaseUrl}/find?username=${username}`);
		const { data } = response;
		const isMatch = await Bun.password.verify(password, data.data.password);
		if (!isMatch) {
			return baseResponse(401, "Unauthorized");
		}
		return baseResponseWithData(200, data.message, data.data);
	} catch (error) {
		return baseResponse(500, (error as Error).message);
	}
}

export { login };

