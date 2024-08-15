// List of variable declaration
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const subTotal = document.querySelector(".subTotal");
const finalTotal = document.querySelector(".finalTotal");
const btnCloseModal = document.querySelector(".close-modal");
const btnCheckout = document.querySelector(".btn-checkout");
const btnKeranjang = document.querySelector(".btn-keranjang");

// Medicine stock data
const db_obat = [
  {
    id: 1,
    image: "img/medicines/tolak-angin.png",
    name: "Tolak Angin",
    price: 16500,
    stock: 45,
  },
  {
    id: 2,
    image: "img/medicines/panadol-extra.webp",
    name: "Panadol Extra",
    price: 15000,
    stock: 90,
  },
  {
    id: 3,
    image: "img/medicines/promag.png",
    name: "Promag Liquid Sachet 7ml",
    price: 1925,
    stock: 150,
  },
  {
    id: 4,
    image: "img/medicines/bisolvon.webp",
    name: "Bisolvon 125ml",
    price: 85078,
    stock: 30,
  },
  {
    id: 5,
    image: "img/medicines/sangobion-forte.png",
    name: "Sangobion Forte",
    price: 42000,
    stock: 80,
  },
  {
    id: 6,
    image: "img/medicines/blackmores-multivitamin-minerals.png",
    name: "Blackmores Multivitamin",
    price: 143649,
    stock: 70,
  },
  {
    id: 7,
    image: "img/medicines/blackmores-multivitamin-body-shield.png",
    name: "Blackmores Multivitamin Body Shield",
    price: 368000,
    stock: 22,
  },
  {
    id: 8,
    image: "img/medicines/blackmores-bio-c.png",
    name: "Blackmores Bio C",
    price: 162169,
    stock: 46,
  },
];

// List of cart items
let cartItems = [];

// Function to render list of items from database
function renderItems() {
  // Format Indonesian Rupiah (IDR)
  function formatIDR(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "symbol",
    }).format(amount);
  }
  const section = document.querySelector("section");

  //Render items
  for (let i = 0; i < db_obat.length; i++) {
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("card");
    //---IMAGE---
    let image = document.createElement("img");
    image.src = db_obat[i].image;
    image.alt = db_obat[1].name;

    //---NAMA + HARGA BARANG---
    let namaHargaDiv = document.createElement("div");
    //Buat p isi nama barang
    let namaBarangParagraph = document.createElement("p");
    namaBarangParagraph.classList.add("item-name");
    let namaBarang = document.createTextNode(db_obat[i].name);
    namaBarangParagraph.appendChild(namaBarang);
    //Buat p isi harga barang
    let hargaBarangParagraph = document.createElement("p");
    hargaBarangParagraph.classList.add("item-price");
    let hargaBarang = document.createTextNode(formatIDR(db_obat[i].price));
    hargaBarangParagraph.appendChild(hargaBarang);
    //Masukin p nama barang + p harga barang ke div
    namaHargaDiv.appendChild(namaBarangParagraph);
    namaHargaDiv.appendChild(hargaBarangParagraph);
    namaHargaDiv.classList.add("item-name-price");

    //---STOCK BARANG---
    let stockDiv = document.createElement("div");
    //Buat p untuk available stock
    let availableStockParagraph = document.createElement("p");
    let availableStock = document.createTextNode(`Available stock : `);

    let availableStockSpan = document.createElement("span");
    let availableStockNumber = document.createTextNode(db_obat[i].stock);
    availableStockSpan.appendChild(availableStockNumber);
    availableStockParagraph.appendChild(availableStock);
    availableStockParagraph.appendChild(availableStockSpan);
    //NUMBER CONTROL
    let numberControlDiv = document.createElement("div");
    numberControlDiv.classList.add("number-control");
    let numberLeftDiv = document.createElement("div");
    let numberLeft = document.createTextNode("-");
    numberLeftDiv.appendChild(numberLeft);
    numberLeftDiv.classList.add("number-left");
    let inputNumberContainer = document.createElement("input");
    inputNumberContainer.type = "number";
    inputNumberContainer.placeholder = "1";
    inputNumberContainer.value = 1;
    inputNumberContainer.classList.add("number-quantity");
    let numberRightDiv = document.createElement("div");
    let numberRight = document.createTextNode("+");
    numberRightDiv.appendChild(numberRight);
    numberRightDiv.classList.add("number-right");
    //Gabung semua ke number control
    numberControlDiv.appendChild(numberLeftDiv);
    numberControlDiv.appendChild(inputNumberContainer);
    numberControlDiv.appendChild(numberRightDiv);
    //Gabung semua isi yang ada di bagian stock
    stockDiv.appendChild(availableStockParagraph);
    stockDiv.appendChild(numberControlDiv);
    stockDiv.classList.add("available-stock");

    //---BUTTON---
    let addToCartButton = document.createElement("button");
    addToCartButton.appendChild(document.createTextNode("ADD TO CART"));
    addToCartButton.classList.add("btn-cart");

    //Gabung semua isi ke dalam outerDiv
    outerDiv.appendChild(image);
    outerDiv.appendChild(namaHargaDiv);
    outerDiv.appendChild(stockDiv);
    outerDiv.appendChild(addToCartButton);

    //Gabung outerDiv ke section
    section.appendChild(outerDiv);
  }

  addQuantity();
  minusQuantity();
  preventInputBelowOne();
  addToCart();
}

function addToCart() {
  let addToCartButton = document.querySelectorAll(".btn-cart");
  addToCartButton.forEach((button) => {
    button.addEventListener("click", () => {
      // Cari card yg ada buttonnya
      let card = button.closest(".card");

      // Ambil detail item
      let itemId = Array.from(card.parentElement.children).indexOf(card);
      let item = db_obat[itemId];
      let quantity =
        parseInt(card.querySelector(".number-quantity").value) || 1;

      // Cek apakah item sudah ada di dalam array cartItems
      if (cartItems.length > 0) {
        let doesItemExist = false;
        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i].id === item.id) {
            // Buat cartItem object
            let cartItem = {
              id: item.id,
              name: item.name,
              quantity: cartItems[i].quantity + quantity,
              price: item.price,
              image: item.image,
            };

            cartItems[i] = cartItem;
            doesItemExist = true;
            break;
          }
        }

        if (!doesItemExist) {
          // Buat cartItem object
          let cartItem = {
            id: item.id,
            name: item.name,
            quantity: quantity,
            price: item.price,
            image: item.image,
          };

          // Push cart-item ke array cartItems diluar
          cartItems.push(cartItem);
        }
      } else {
        // Buat cartItem object
        let cartItem = {
          id: item.id,
          name: item.name,
          quantity: quantity,
          price: item.price,
          image: item.image,
        };

        // Push cart-item ke array cartItems diluar
        cartItems.push(cartItem);
      }

      renderCartItems(cartItems);
      // console.log(cartItems);
    });
  });
}

function addQuantity() {
  let addQuantityButtons = document.querySelectorAll(".number-right");
  addQuantityButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Cek apakah event sudah di handle dengan benar
      if (!e || !e.currentTarget) return;

      //cari parent dari button
      let card = event.currentTarget.closest(".card");

      if (!card) return;

      // dapetin input field
      let inputField = card.querySelector(".number-quantity");

      if (!inputField) return;

      //Ngambil index object yg mana buat cek stock barang
      let itemIndex = Array.from(card.parentElement.children).indexOf(card);
      let maxAmount = db_obat[itemIndex].stock;

      // Tambah 1
      let currentValue = parseInt(inputField.value) || 0;
      if (currentValue < maxAmount) {
        inputField.value = currentValue + 1;
      }
    });
  });
}

function minusQuantity() {
  let minusQuantityButtons = document.querySelectorAll(".number-left");
  let input = document.querySelectorAll("input");
  minusQuantityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      //cari parent dari button
      let card = button.closest(".card");

      // dapetin input field
      let inputField = card.querySelector(".number-quantity");

      // kurang 1
      let currentValue = parseInt(inputField.value) || 0;
      if (currentValue > 1) {
        inputField.value = currentValue - 1;
      }
    });
  });
}

function preventInputBelowOne() {
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value < 1) {
        this.value = 1;
      }
    });
  });
}

// Function to display modal
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

    updateTotals();

    // Add functionalities to buttons
    numberLeft.addEventListener("click", () => updateQuantity(item.id, -1));
    numberRight.addEventListener("click", () => updateQuantity(item.id, 1));
    deleteIcon.addEventListener("click", () => deleteItem(item.id));
  });
}

function updateTotals() {
  let subTotalAmount = 0;
  cartItems.forEach((item) => {
    subTotalAmount += item.price * item.quantity;
  });

  subTotal.textContent = `${subTotalAmount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  })}`;
  finalTotal.textContent = `${(subTotalAmount * 1.1).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  })}`;
}

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

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function showModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  renderCartItems(cartItems);
}

function showMessage() {
  closeModal();
  alert(`Total payment of ${finalTotal.textContent} should be paid during COD`);
  cartItems = [];
  subTotal.textContent = "Rp 0";
  finalTotal.textContent = "Rp 0";
}

btnCheckout.addEventListener("click", showMessage);

btnKeranjang.addEventListener("click", showModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

renderItems();

// document.addEventListener("DOMContentLoaded", () => {
//   renderCartItems(cartItems);
// });
