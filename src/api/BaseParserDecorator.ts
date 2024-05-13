import type { ApiCallDecorator, ApiCall } from "./ApiCall";

class ApiCallParser<RequestData, _, ResponseData>
    implements ApiCallDecorator<RequestData, Response, ResponseData>
{
    constructor(public apiCall: ApiCall<RequestData, Response>) {
        this.apiCall = apiCall;
    }
    async doCall(
        data: RequestData,
        headers: Headers | Record<string, string> | undefined = undefined
    ): Promise<ResponseData> {
        const response = await this.apiCall.doCall(data, headers);
        return await response.json();
    }
}

export default ApiCallParser;
