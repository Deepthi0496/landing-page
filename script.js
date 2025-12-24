const products = [
    { name: "Noise ColorFit Pro 4", type: "watch", description: "AMOLED Smart Watch", price: 3499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
    { name: "Noise Pulse Go Buzz", type: "watch", description: "Bluetooth Calling Watch", price: 1999, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1" },
    { name: "Noise Evolve 3", type: "watch", description: "Premium Metal Design", price: 2999, image: "https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/1/o/z/37-084-wrb-sw-evolve4-std-blk-nblk-android-ios-noise-yes-original-imahg5uuh4mzg9rh.jpeg?q=90" },
    { name: "Noise Watch Strap", type: "accessory", description: "Silicone Strap", price: 499, image: "https://valentestore.in/cdn/shop/products/H7d07616e66bd4c63a409f065870ccd66M.jpg_960x960_58ee3993-b210-4ef2-abb0-381dd73387a9.jpg?v=1665580490&width=416" },
    { name: "Noise Charging Cable", type: "accessory", description: "Magnetic Charger", price: 699, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0" }
];

let cart = [];

const container = document.getElementById("productContainer");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const totalPriceElem = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");

function displayProducts(items) {
    container.innerHTML = "";
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">₹${item.price}</p>
            <button class="buy-btn" onclick="addToCart(${products.indexOf(item)})">Buy Now</button>
        `;
        container.appendChild(card);
    });
}

function filterProducts(category) {
    if(category === "all") displayProducts(products);
    else displayProducts(products.filter(p => p.type === category));
}

function addToCart(index) {
    cart.push(products[index]);
    cartCount.innerText = cart.length;
    alert(`${products[index].name} added to cart`);
}

function openCart() {
    cartModal.style.display = "flex";
    renderCart();
}

function closeCart() { cartModal.style.display = "none"; }

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
        const div = document.createElement("div");
        div.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${i})">Remove</button>`;
        cartItems.appendChild(div);
        total += item.price;
    });
    totalPriceElem.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    cartCount.innerText = cart.length;
    renderCart();
}

function checkout() {
    if(cart.length === 0) { alert("Cart is empty!"); return; }
    alert(`Total ₹${cart.reduce((sum, item) => sum + item.price,0)}\nThank you for shopping!`);
    cart = [];
    cartCount.innerText = 0;
    renderCart();
}

// Event listeners
document.getElementById("cartBtn").addEventListener("click", openCart);

// Load all products initially
displayProducts(products);
