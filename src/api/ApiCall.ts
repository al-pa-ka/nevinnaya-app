interface ApiCall<RequestData, ResponseData> {
    doCall(data: RequestData, headers: Headers | Record<string, string> | undefined): Promise<ResponseData>;
}
interface ApiCallDecorator<RequestData, PrevResponseData, NewResponseData> extends ApiCall<RequestData, NewResponseData> {
    apiCall: ApiCall<RequestData, PrevResponseData>;
}

export type { ApiCall, ApiCallDecorator };
