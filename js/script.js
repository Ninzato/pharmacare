const db_obat = [
    {
        image: "img/medicines/tolak-angin.png",
        nama: 'Tolak Angin',
        harga: 45000,
        jumlah: 90
    },
    {
        image: "img/medicines/tolak-angin.png",
        nama: 'Tolak Angin',
        harga: 45000,
        jumlah: 80
    },
    {
        image: "img/medicines/tolak-angin.png",
        nama: 'Tolak Angin',
        harga: 45000,
        jumlah: 90
    },
    {
        image: "img/medicines/tolak-angin.png",
        nama: 'Tolak Angin',
        harga: 45000,
        jumlah: 90
    },
    {
        image: "img/medicines/sangobion-forte.png",
        nama: 'Sangobion Forte',
        harga: 45000,
        jumlah: 90
    },
    {
        image: "img/medicines/blackmores-multivitamin-minerals.png",
        nama: 'Blackmores Multivitamin',
        harga: 45000,
        jumlah: 90
    },
    {
        image: "img/medicines/blackmores-multivitamin-body-shield.png",
        nama: 'Blackmores Multivitamin Body Shield',
        harga: 45000,
        jumlah: 90
    },
    {
        image: "img/medicines/blackmores-bio-c.png",
        nama: 'Blackmores Bio C',
        harga: 45000,
        jumlah: 90
    }
]
{/* 
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
</section> */}

//Main body selector
const main = document.querySelector("main");

for(let i = 0 ; i < db_obat.length ; i++){
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("card");
    //---IMAGE---
    let image = document.createElement("img");
    image.src = db_obat[i].image;
    image.classList.add("banner");
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
    let hargaBarang = document.createTextNode(db_obat[i].harga);
    hargaBarangParagraph.appendChild(hargaBarang);
    //Masukin p nama barang + p harga barang ke div
    namaHargaDiv.appendChild(namaBarangParagraph);
    namaHargaDiv.appendChild(hargaBarangParagraph);

    //---STOCK BARANG---
    let stockDiv = document.createElement("div");
    //Buat p untuk available stock
    let availableStockParagraph = document.createElement("p");
    let availableStock = document.createTextNode(`Available stock : `);
    let availableStockSpan = document.createElement("span");
    let availableStockNumber = document.createTextNode(db_obat[i].jumlah);
    availableStockParagraph.appendChild(availableStock);
    availableStockSpan.appendChild(availableStockNumber);
    availableStockParagraph.appendChild(availableStockSpan);
    availableStockParagraph.classList.add("available-stock");
    //NUMBER CONTROL
    let numberControlDiv = document.createElement("div");
    numberControlDiv.classList.add("number-control");
    let numberLeftDiv = document.createElement("div");
    let numberLeft = document.createTextNode("-");
    numberLeftDiv.appendChild(numberLeft);
    numberLeftDiv.classList.add("number-left");
    let inputNumberContainer = document.createElement("input");
    inputNumberContainer.placeholder = "1";
    inputNumberContainer.classList.add("number-quantity");
    let numberRightDiv = document.createElement("div");
    let numberRight = document.createTextNode("+");
    numberRightDiv.appendChild(numberRight);
    numberRightDiv.classList.add("number-right");
    //Gabung semua ke number control
    numberControlDiv.appendChild(numberLeftDiv);
    numberControlDiv.appendChild(inputNumberContainer);
    numberControlDiv.appendChild(numberRightDiv);

    //---BUTTON---
    let addToCartButton = document.createElement("button");
    addToCartButton.appendChild(document.createTextNode("ADD TO CART"));
    addToCartButton.classList.add("btn-cart");

    //Gabung semua isi yang ada di bagian stock
    stockDiv.appendChild(availableStockParagraph);
    stockDiv.appendChild(availableStockSpan);
    stockDiv.appendChild(numberControlDiv);

    //Gabung semua isi ke dalam outerDiv
    outerDiv.appendChild(image);
    outerDiv.appendChild(namaHargaDiv);
    outerDiv.appendChild(stockDiv);
    outerDiv.appendChild(addToCartButton);

    //Gabung outerDiv ke main
    main.appendChild(outerDiv);
}
