import type { GoodInCart } from "./GoodInCart";

class Cart {
    add(good: GoodInCart) {
        const goodsInCart = JSON.parse(localStorage.getItem("cart") || "[]") as GoodInCart[];
        console.log("good added in cart", good);
        const prevAddedGood = goodsInCart.findIndex((el) => {
            console.log(el);
            return el.pk == good.pk && el.color == good.color && el.size == good.size;
        });
        console.log("prevAdded", prevAddedGood);
        if (prevAddedGood != -1) {
            goodsInCart[prevAddedGood].quantity += good.quantity;
        } else {
            goodsInCart.push(good);
        }
        localStorage.setItem("cart", JSON.stringify(goodsInCart));
    }
    updateCart(goods: GoodInCart[]) {
        localStorage.setItem("cart", JSON.stringify(goods));
    }
    deleteFromCart(goodIndex: number) {
        const goodsInCart = JSON.parse(localStorage.getItem("cart") || "[]") as GoodInCart[];
        goodsInCart.splice(goodIndex);
        localStorage.setItem("cart", JSON.stringify(goodsInCart));
    }
    get(): GoodInCart[] {
        const goodsInCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
        return goodsInCart;
    }
    getLength(): number {
        const goodsInCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
        return goodsInCart.length;
    }
}

export default Cart;
