export function parseCartCookie(cookie) {
    let cartItems = [];
    let parsedCookie = cookie.split(":");
    
    for (let i = 0; i < parsedCookie.length - 1; i++) {
        let itemId = parseInt(parsedCookie[i].split(",")[0]);
        let itemAmount = parseInt(parsedCookie[i].split(",")[1]);
        cartItems.push({id:itemId, amount:itemAmount});
    }

    return cartItems;
}