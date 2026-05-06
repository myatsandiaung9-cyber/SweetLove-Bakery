// 1. Function to add item to the cart
function addToCart(pName, pPrice, pImg) {
    // Get existing cart data from localStorage or create an empty array
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    // Check if the item already exists in the cart
    let itemIndex = cart.findIndex(item => item.name === pName);

    if (itemIndex > -1) {
        // If exists, increase the quantity
        cart[itemIndex].quantity += 1;
    } else {
        // If new, push a new product object
        cart.push({
            name: pName,
            price: pPrice,
            image: pImg,
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('myCart', JSON.stringify(cart));
    
    // Notification
    alert(pName + " has been added to your cart!");
}

// 2. Function to display items in Blog.html (Cart Page)
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let displayArea = document.getElementById('cart-items-container');

    if (!displayArea) return;

    if (cart.length === 0) {
        displayArea.innerHTML = "<h3 style='text-align:center;'>Your cart is empty.</h3>";
        return;
    }

    displayArea.innerHTML = "";

    cart.forEach((item, index) => {
        displayArea.innerHTML += `
            <div class="cart-item" style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding: 15px;">
                <img src="${item.image}" width="80" height="80" style="object-fit: cover; border-radius: 8px; margin-right: 20px;">
                
                <div style="flex: 1;">
                    <h4 style="margin: 0;">${item.name}</h4>
                    <p style="margin: 5px 0;">Price: ${item.price.toLocaleString()} Ks</p>
                    <p style="margin: 0;">Qty: <b>${item.quantity}</b></p>
                </div>

                <div style="text-align: right;">
                    <p style="font-weight: bold; color: #e91e63;">
                        Total: ${(item.price * item.quantity).toLocaleString()} Ks
                    </p>
                    <button onclick="removeFromCart(${index})"
                        style="color: red; cursor: pointer; border: none; background: none; text-decoration: underline;">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });
}

// 3. Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    displayCart(); // Refresh the display
}