import { fetchQuery, executeUpdate } from './modules/database.js';
import { findIdByName, findNameByID, findObject, getCurrentDate } from './modules/utilities.js';
const productID = document.getElementById('productID');
const productName = document.getElementById('productName');
const productQuantity = document.getElementById('productQuantity');
const productPrice = document.getElementById('productPrice');

let productDB;

let total = 0;
let productToSale = [];

function addProduct(productID, productQuantity, productPrice){
    let object = {
        id: productID,
        quantity: productQuantity,
        price: productPrice
    }
    productToSale.push(object);
}

document.addEventListener("DOMContentLoaded", async () => {
  productDB = await fetchQuery(`SELECT * FROM products;`);
  console.log(productDB);
})

const addProductForm = document.getElementById('addProductForm');

addProductForm.addEventListener("submit", () => {
    event.preventDefault();
    if (!findNameByID(productDB, parseInt(productID.value, 10))) {
        alert(`El producto numero: "${productID.value}" no existe`);
    } 
    else {
        addProduct(parseInt(productID.value, 10), parseInt(productQuantity.value, 10), parseFloat(productPrice.value))

        const saleTable = document.getElementById('saleTable');

        let row = saleTable.insertRow();

        let quantityCell = row.insertCell();
        let nameCell = row.insertCell();
        let priceCell = row.insertCell();
        let totalCell = row.insertCell();

        quantityCell.textContent = `${productQuantity.value}`;
        nameCell.textContent = `${productName.value}`;
        priceCell.textContent = `${productPrice.value} $`;
        let subTotal = parseFloat(productQuantity.value) * parseFloat(productPrice.value); // parseInt(productQuantity.value, 10) * parseInt(productPrice.value, 10)
        totalCell.textContent = `${subTotal} $`;

        total += subTotal;

        let totalRow = document.getElementById('totalRow');

        totalRow.innerText = `${total} $`;
    }
        productID.value = '';
        productName.value = '';
        productPrice.value = '';
        productQuantity.value = '';
  }
)

const executeSale = document.getElementById('executeSale');

executeSale.addEventListener('click', async () => {
    let paymentMethod = ((document.getElementById('paymentMethod').value).toLowerCase()).replace(/ /g, "");

    if (productToSale.length == 0) {
        alert('Por favor, agregue al menos un producto')
        return
    }
    else if (paymentMethod == "metododepago") {
        alert('Por favor, selecione el metodo de pago')
        return
    }

    let json = JSON.stringify(productToSale);
    console.log(getCurrentDate())
    executeUpdate(`
        INSERT INTO sales (productsJson, customer_id, saleDate, paymentmethod) 
        VALUES ('${json}', 1, '${getCurrentDate()}', "${paymentMethod}");
    `)
    productToSale.forEach((p) => {
        let product = findObject(productDB, p.id);
        executeUpdate(`UPDATE products SET quantity = ${product.quantity - p.quantity} WHERE id = ${p.id}`);
    })
    location.reload();
    alert(`Venta ejecutada con exito`);
})

productID.addEventListener("input", () => {
    let productFound = productDB.find(product => product.id == parseInt(productID.value, 10));
    if (productFound){
        productName.value = productFound.name;
        productPrice.value = productFound.price.toString();
    }
    else {
        productName.value = `ID: ${productID.value} no existe`;
        productPrice.value = '';
    }
})