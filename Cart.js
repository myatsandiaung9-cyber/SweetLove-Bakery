// let cart = JSON.parse(localStorage.getItem('bakery_cart')) || [];

// // 2. Global function to update ONLY the badge (Run this on every page)
// function updateGlobalBadge() {
//     const badge = document.getElementById('cart-count');
//     if (badge) {
//         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//         badge.innerText = totalItems;
//     }
// }

 // 3. Function to display items (Only runs on the Cart page)
/* function displayCart() {
     const container = document.getElementById('cart-items-container');
     const totalElement = document.getElementById('cart-total');
    
     // Always update the badge first
     updateGlobalBadge();

     if (!container) return; // Stop here if we aren't on the cart page

     container.innerHTML = "";
     let total = 0;

     if (cart.length === 0) {
         container.innerHTML = "<p>Your cart is empty.</p>";
     } else {
         cart.forEach((item, index) => {
             total += item.price * item.quantity;
             container.innerHTML += `
                 <div class="cart-item-row">
                     <div class="item-details">
                         <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                         <div class="item-text">
                             <h4 class="item-name">${item.name}</h4>
                             <p class="item-price">${item.price}Ks</p>
                         </div>
                     </div>
                     <div class="item-actions">
                         <div class="quantity-controls">
                             <button onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-num">${item.quantity}</span>
                             <button onclick="updateQuantity(${index}, 1)">+</button>
                         </div>
                         <button class="remove-btn" onclick="removeItem(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                     </div>
                 </div>`;
        });
     }
     if(totalElement) totalElement.innerText = total.toFixed(2)+"Ks";
 }

//    4. Add to Cart (Used in Blueberrycake.html, etc.)
//      window.addToCart = function(name, price, image) {
//    const existingItem = cart.find(item => item.name === name);
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ name, price, image, quantity: 1 });
//     }
    
//     localStorage.setItem('bakery_cart', JSON.stringify(cart));
//     updateGlobalBadge(); // This ensures the badge updates immediately on the product page
//     alert(name + " added to cart!");
// };

 // 5. Change Quantity
window.updateQuantity = function(index, change) {
    cart[index].quantity += change;
         if (cart[index].quantity <= 0) {
         removeItem(index);
     } else {
         localStorage.setItem('bakery_cart', JSON.stringify(cart));
         displayCart();
     }
 }; 

 // 6. Remove Item
 window.removeItem = function(index) {
     cart.splice(index, 1);
     localStorage.setItem('bakery_cart', JSON.stringify(cart));
     displayCart();
 };

 // RUN ON LOAD
 document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateGlobalBadge();
});
 
// Cart.js ရဲ့ အပေါ်ဆုံးမှာ ဒါကို အရင်ဆုံး ကြေညာပါ
let cart = JSON.parse(localStorage.getItem('bakery_cart')) || [];

// Add to Cart Function
window.addToCart = function(event, name, price, image) {
    // ဖုန်း browser တွေမှာ link ဒါမှမဟုတ် refresh မဖြစ်အောင် တားတာပါ
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    console.log("Adding:", name);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    // LocalStorage ထဲ သိမ်းမယ်
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
    
    // Badge ကို update လုပ်မယ်
    if (typeof updateGlobalBadge === 'function') {
        updateGlobalBadge();
    }

    // အလုပ်လုပ်ကြောင်း သိရအောင် alert ပြပါ
    alert(name + " added to cart!");
};

// Badge Update Function
window.updateGlobalBadge = function() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
    }
};

// Page load ဖြစ်တဲ့အခါ badge ကို ပြမယ်
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalBadge();
}); */

// ၁။ Cart Data ကို LocalStorage ကနေ ဆွဲယူမယ်
let cart = JSON.parse(localStorage.getItem('bakery_cart')) || [];

// ၂။ Badge အရေအတွက်ပြတဲ့ Function (စာမျက်နှာတိုင်းမှာ အလုပ်လုပ်စေချင်လို့ window ထဲ ထည့်ထားပါတယ်)
window.updateGlobalBadge = function() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
    }
};

// ၃။ Cart စာမျက်နှာမှာ Item တွေ ထုတ်ပြမယ့် Function
window.displayCart = function() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    
    // စာမျက်နှာ load ဖြစ်တာနဲ့ badge ကို အရင် update လုပ်မယ်
    updateGlobalBadge();

    // အကယ်၍ Cart စာမျက်နှာမဟုတ်ရင် ဒီနေရာတင် ရပ်မယ်
    if (!container) return; 

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding: 20px;'>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            container.innerHTML += `
                <div class="cart-item-row">
                    <div class="item-details">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="item-text">
                            <h4 class="item-name">${item.name}</h4>
                            <p class="item-price">${item.price}Ks</p>
                        </div>
                    </div>
                    <div class="item-actions">
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-num">${item.quantity}</span>
                            <button onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeItem(${index})">
                           <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>`;
        });
    }
    if (totalElement) totalElement.innerText = total.toFixed(2) + "Ks";
};

// ၄။ Add to Cart နှိပ်ရင် အလုပ်လုပ်မယ့် Function
window.addToCart = function(event, name, price, image) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    console.log("Adding Product:", name);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    // LocalStorage ထဲ သိမ်းဆည်းမယ်
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
    
    // Badge ကို ချက်ချင်း Update လုပ်မယ်
    updateGlobalBadge();

    // အောင်မြင်ကြောင်း Alert ပြမယ်
    alert(name + " added to cart!");
};

// ၅။ အရေအတွက် တိုး/လျော့ လုပ်တဲ့ Function
window.updateQuantity = function(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeItem(index);
    } else {
        localStorage.setItem('bakery_cart', JSON.stringify(cart));
        displayCart();
    }
};

// ၆။ ပစ္စည်းပယ်ဖျက်တဲ့ Function
window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
    displayCart();
};

// စာမျက်နှာစဖွင့်တာနဲ့ အလုပ်လုပ်ခိုင်းမယ့်အပိုင်း
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});