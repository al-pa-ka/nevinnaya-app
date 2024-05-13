import type { ApiCall } from "./ApiCall";

import { DOMAIN } from "@/constants";
import BaseApiCall from "./BaseApiCall";
import ApiCallParser from "./BaseParserDecorator";

type AuthData = {
    login: string;
    password: string;
};
type Token = {
    token: string;
    exp_in: string;
};

class AuthCall implements ApiCall<AuthData, Token> {
    async doCall(
        data: AuthData,
        headers: Headers | Record<string, string> | undefined = undefined
    ): Promise<Token> {
        const call = new ApiCallParser<AuthData, Response, Token>(
            new BaseApiCall(`http://${DOMAIN}/users/auth/`, "POST")
        );
        return await call.doCall(data, headers);
    }
}

export default AuthCall;
