import { DOMAIN } from "@/constants";
import type { IUser } from "./user_unterface";
import type { ApiCall } from "@/api/ApiCall";
import AuthCall from "@/api/Auth";

class Admin implements IUser {
    PERMISSIONS = ["CAN_CREATE_GOODS"];
    token = "";
    exp_in = "";
    constructor() {
        this.restoreToken();
    }
    restoreToken() {
        const token = window.localStorage.getItem("token");
        if (token) {
            this.token = token;
        }
    }
    async authentificate(login: string, password: string): Promise<string> {
        const response = await new AuthCall().doCall({ login, password });
        this.setToken(response.token, response.exp_in);
        return response.token;
    }
    getPermissions(): string[] {
        return this.PERMISSIONS;
    }
    isAutentificated(): boolean {
        return Boolean(this.token);
    }
    setToken(token: string, exp_in: string | null = null): void {
        this.token = token;
        this.exp_in = exp_in || "";
        window.localStorage.setItem("token", this.token);
        if (exp_in) {
            window.localStorage.setItem("exp_in", this.exp_in);
        }
    }
    async doCall<RequestData, ResponseData>(
        apiCall: ApiCall<RequestData, ResponseData>,
        data: any,
        headers: Headers
    ): Promise<ResponseData> {
        data = Object.assign(
            {
                token: this.token,
            },
            data
        );
        return await apiCall.doCall(data, headers);
    }
}
export default Admin;
