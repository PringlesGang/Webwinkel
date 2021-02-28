const arraySum = (a, b) => a + b;

function getItemAmountTextbox(item) {
    //Get all the items on the page
    let textbox = document.getElementsByName("item");

    //For every item on the page
    for (i = 0; i < textbox.length; i++) {
        //Get the one where the item name is right
        if (textbox[i].dataset.item == item.item) {
            textbox = textbox[i].childNodes;
            //For every tag relating to that item
            for (j = 0; j < textbox.length; j++) {
                //Get the textbox
                if (textbox[j].type == "number") {
                    return textbox[j];
                }
            }
        }
    }
}

function updateCart() {
    //Updates the amount of items in the cart and the price
    let cartAmount = 0;
    let cartWorth = 0;
    for (i = 0; i < document.getElementsByName("item").length; i++) { //For every item
        //Seek the amount of that item
        let itemAmount = document.getElementsByName("item")[i].childNodes;

        for (j = 0; j < itemAmount.length; j++) {
            if (itemAmount[j].type == "number") { //Get textbox
                itemAmount = parseInt(itemAmount[j].value); //Return its value
                break;
            }
        }

        //Update the amount of items in the cart and the price of those items
        cartAmount += itemAmount;
        cartWorth += itemAmount * document.getElementsByName("item")[i].dataset.price;
    }

    //Update the text on the page
    cartWorth = Math.round(cartWorth) / 100;
    document.getElementById("cart").innerHTML = "Cart: " + cartAmount + "</br>Price: €" + cartWorth;

    updateCookie();
}

function addItem(item) {
    //Adds 1 to the textbox
    let textbox = getItemAmountTextbox(item);

    if (parseInt(textbox.value) < item.stock) {
        textbox.value = parseInt(textbox.value) + 1;
        updateCart();
    }
}
function removeItem(item) {
    //Removes 1 from the textbox
    let textbox = getItemAmountTextbox(item);

    if (parseInt(textbox.value) > 0) {
        textbox.value = parseInt(textbox.value) - 1;
        updateCart();
    }
}

function emptyCart() {
    //Empties teh cart
    //Gets all items
    item = document.getElementsByName("item");
    for (let i = 0; i < item.length; i++) {
        //Sets the value of all the items' textboxes to 0
        let textbox = getItemAmountTextbox(item[i].dataset);
        textbox.value = "0";
    }
    updateCart();
}

function updateCookie() {
    //Get the cookie's value
    let cookieValue = "";
    item = document.getElementsByName("item");
    for (let i = 0; i < item.length; i++) {
        let textbox = getItemAmountTextbox(item[i].dataset);
        if (textbox.value > 0) {
            //If the cart has this item in its cart, add the id and amount to the cookie
            cookieValue += `${item[i].dataset.id},${textbox.value}:`;
        }
    }

    var d = new Date();
    d.setTime(d.getTime() + 24*60*60*1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = `cart=${cookieValue};${expires};path=/`;
}

function initialize() {
    updateCart();
    updateCookie();
}