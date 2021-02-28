function buy() {
    let cart = {
        address,
        name,
        cardNum,
        bankNum,
        products,
    };
    
    cart.address = document.getElementById('address').value;
    cart.name = document.getElementById('name').value;
    cart.cardNum = document.getElementById('cardNum').value;
    cart.bankNum = document.getElementById('bankNum').value;
    cart.products = parseCartCookie();
    console.log(parseCartCookie());
    apiPOST('/orders', cart);
}

function parseCartCookie() {
    cookie = document.cookie;
    let cartItems = [];
    let parsedCookie = cookie.split(":");
    
    parsedCookie[0] = parsedCookie[0].substring(5);
    for (let i = 0; i < parsedCookie.length - 1; i++) {
        let itemId = parseInt(parsedCookie[i].split(",")[0]);
        let itemAmount = parseInt(parsedCookie[i].split(",")[1]);
        cartItems.push({id:itemId, amount:itemAmount});
    }

    return cartItems;
}