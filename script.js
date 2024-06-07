// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clrCart = document.getElementById("clear-cart-btn");

let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	cartList.innerHtml = "";
	cartItems.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove From Cart</button>`;
    cartList.appendChild(li);
  });
}


// Add item to cart
function addToCart(productId) {
	let addPro = products.find(product =>{
		return productId===product.id;
	})
	if (addPro) {
		cartItems.push(addPro);
		sessionStorage.setItem("cart",JSON.stringify(cartItems));
		renderCart();
	}
}

// Remove item from cart
function removeFromCart(productId) {
	cartItems = cartItems.filter(product =>{
		return productId!==product.id;
	})
	sessionStorage.setItem("cart",JSON.stringify(cartItems));
	renderCart();
}

// Clear cart
function clearCart() {
	cartItems = [];
	sessionStorage.removeItem("cart");
	renderCart();
}

productList.addEventListener("click",(event)=>{
	// console.log(event);
	if(event.target.classList.contains("add-to-cart-btn")){
		let productId = event.target.getAttribute("data-id");
		addToCart(productId);
	}
});
cartList.addEventListener("click",(event)=>{
	// console.log(event);
	if(event.target.classList.contains("remove-from-cart-btn")){
		let productId = event.target.getAttribute("data-id");
		removeFromCart(productId);
	}
});
clrCart.addEventListener("click",clearCart());
// Initial render
renderProducts();
renderCart();
