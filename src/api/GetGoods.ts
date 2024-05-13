import type { Good } from "@/goods/Good";
import { DOMAIN } from "@/constants";
import BaseApiCall from "./BaseApiCall";
import ApiCallParser from "./BaseParserDecorator";

const GET_GOOD = "goods/get/good";

type GetGoodRequest = {};

class GetGoods {
    async getGoods(requestData: any): Promise<Good[]> {
        const call = new ApiCallParser<GetGoodRequest, Response, Good[]>(
            new BaseApiCall(`http://${DOMAIN}/${GET_GOOD}/`, "POST")
        );
        return await call.doCall(requestData)
    }
}

export default GetGoods;
