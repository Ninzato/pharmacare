// List of variable declaration
const btnCloseModal = document.querySelector(".close-modal");

// List of items
const cartItems = [
  {
    id: 1,
    name: "Tolak Angin",
    price: 45000,
    quantity: 2,
    image: "img/medicines/tolak-angin.png",
  },
  {
    id: 2,
    name: "Blackmores Bio C",
    price: 30000,
    quantity: 1,
    image: "img/medicines/blackmores-bio-c.png",
  },
];

function updateQuantity(id, change) {
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    item.quantity = Math.max(0, item.quantity + change); // Ensure quantity is not negative
    renderCartItems(cartItems); // Re-render cart items to reflect changes
  }
}

function deleteItem(id) {
  const index = cartItems.findIndex((item) => item.id === id);
  if (index > -1) {
    cartItems.splice(index, 1); // Remove item from array
    renderCartItems(cartItems); // Re-render cart items to reflect changes
  }
}

function renderCartItems(items) {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = ""; // Clear existing items

  items.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const imgContainer = document.createElement("div");
    imgContainer.className = "cart-item__img-container";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    imgContainer.appendChild(img);

    const details = document.createElement("div");
    details.className = "cart-item__details";
    const name = document.createElement("p");
    name.textContent = item.name;
    const price = document.createElement("p");
    price.textContent = `${item.price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })}`;
    details.appendChild(name);
    details.appendChild(price);

    const quantity = document.createElement("div");
    quantity.className = "cart-item__quantity";
    const numberControl = document.createElement("div");
    numberControl.className = "number-control";
    const numberLeft = document.createElement("div");
    numberLeft.className = "number-left";
    numberLeft.textContent = "-";
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.name = "number";
    numberInput.className = "number-quantity";
    numberInput.value = item.quantity;
    const numberRight = document.createElement("div");
    numberRight.className = "number-right";
    numberRight.textContent = "+";
    numberControl.appendChild(numberLeft);
    numberControl.appendChild(numberInput);
    numberControl.appendChild(numberRight);
    quantity.appendChild(numberControl);

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "img/icons/icon-delete.svg";
    deleteIcon.alt = "Delete icon";
    quantity.appendChild(deleteIcon);

    const total = document.createElement("p");
    total.className = "cart-item__total";
    total.textContent = `${(item.price * item.quantity).toLocaleString(
      "id-ID",
      { style: "currency", currency: "IDR" }
    )}`;

    cartItem.appendChild(imgContainer);
    cartItem.appendChild(details);
    cartItem.appendChild(quantity);
    cartItem.appendChild(total);

    cartItemsContainer.appendChild(cartItem);

    // Add functionalities to buttons
    numberLeft.addEventListener("click", () => updateQuantity(item.id, -1));
    numberRight.addEventListener("click", () => updateQuantity(item.id, 1));
    deleteIcon.addEventListener("click", () => deleteItem(item.id));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartItems(cartItems);
});
