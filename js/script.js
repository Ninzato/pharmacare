const db_obat = [
  {
    image: "img/medicines/tolak-angin.png",
    nama: "Tolak Angin",
    harga: 16500,
    jumlah: 45,
  },
  {
    image: "img/medicines/panadol-extra.webp",
    nama: "Panadol Extra",
    harga: 15000,
    jumlah: 90,
  },
  {
    image: "img/medicines/promag.png",
    nama: "Promag Liquid Sachet 7ml",
    harga: 1925,
    jumlah: 150,
  },
  {
    image: "img/medicines/bisolvon.webp",
    nama: "Bisolvon 125ml",
    harga: 85078,
    jumlah: 30,
  },
  {
    image: "img/medicines/sangobion-forte.png",
    nama: "Sangobion Forte",
    harga: 42000,
    jumlah: 80,
  },
  {
    image: "img/medicines/blackmores-multivitamin-minerals.png",
    nama: "Blackmores Multivitamin",
    harga: 143649,
    jumlah: 70,
  },
  {
    image: "img/medicines/blackmores-multivitamin-body-shield.png",
    nama: "Blackmores Multivitamin Body Shield",
    harga: 368000,
    jumlah: 22,
  },
  {
    image: "img/medicines/blackmores-bio-c.png",
    nama: "Blackmores Bio C",
    harga: 162169,
    jumlah: 46,
  }
];
{
  /* 
<section>
<div>
  <img src="img/medicines/tolak-angin.png" alt="Tolak angin" />
  <div>
    <p>Tolak Angin</p>
    <p>Rp. 45.000,-</p>
  </div>
  <div>
    <p>Available stock: <span>90</span></p>
    <div class="number-control">
      <div class="number-left">-</div>
      <input type="number" name="number" class="number-quantity" />
      <div class="number-right">+</div>
    </div>
  </div>
  <button class="btn-cart">ADD TO CART</button>
</div>
</section> */
}

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
    image.alt = db_obat[1].nama;

    //---NAMA + HARGA BARANG---
    let namaHargaDiv = document.createElement("div");
    //Buat p isi nama barang
    let namaBarangParagraph = document.createElement("p");
    namaBarangParagraph.classList.add("item-name");
    let namaBarang = document.createTextNode(db_obat[i].nama);
    namaBarangParagraph.appendChild(namaBarang);
    //Buat p isi harga barang
    let hargaBarangParagraph = document.createElement("p");
    hargaBarangParagraph.classList.add("item-price");
    let hargaBarang = document.createTextNode(formatIDR(db_obat[i].harga));
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
    let availableStockNumber = document.createTextNode(db_obat[i].jumlah);
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
}

function addQuantity() {
  let addQuantityButtons = document.querySelectorAll(".number-right");
  let input = document.querySelectorAll("input");
  addQuantityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      //cari parent dari button
      let card = button.closest(".card");

      // dapetin input field
      let inputField = card.querySelector(".number-quantity");

      //Ngambil index object yg mana buat cek stock barang
      let itemIndex = Array.from(card.parentElement.children).indexOf(card);
      let maxAmount = db_obat[itemIndex].jumlah;

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

function preventInputBelowOne(){
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 1) {
                this.value = 1;
            }
        });
    })
}

renderItems();
