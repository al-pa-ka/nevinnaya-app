import type { Good } from "@/goods/Good";
import { DOMAIN } from "@/constants";

const GET_GOOD = "goods/get/good/";

class GetGoodByPk {
    async getGood(pk: number): Promise<Good> {
        console.log(DOMAIN);
        const response = await fetch(`http://${DOMAIN}/${GET_GOOD}`, {
            method: "POST",
            body: JSON.stringify({
                pk: pk,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const parsedResponse = (await response.json())[0];
        return parsedResponse;
    }
}

export default GetGoodByPk;
