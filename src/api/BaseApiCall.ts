import type { ApiCall } from "./ApiCall";

class BaseApiCall<RequestData> implements ApiCall<RequestData, Response> {
    constructor(
        private url: string,
        private method: string
    ) {
        this.url = url;
        this.method = method;
    }
    async doCall(
        data: RequestData,
        headers: Headers | Record<string, string> | undefined = undefined
    ): Promise<Response> {
        const HEADERS = new Headers();
        HEADERS.append("Content-Type", "application/json");
        if (headers) {
            Object.entries(headers).forEach((header) => {
                HEADERS.append(header[0], header[1]);
            });
        }
        return await fetch(this.url, {
            method: this.method,
            body: JSON.stringify(data),
            headers: HEADERS,
        });
    }
}

export default BaseApiCall;
