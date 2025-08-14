import { fetchQuery } from "./modules/database.js";
import { findNameByID, findObject, splitDateTime } from "./modules/utilities.js";

let salesDB;
let productsDB;

function addRowToTable(id, date, client, method, total) {
    let tableBody = document.getElementById("tablebody");
    let row = tableBody.insertRow(); // Append a new row at the end

    // Create and append data cells
    let cellDate = row.insertCell();
    let cellHour = row.insertCell();
    let cellQuantity = row.insertCell();
    let cellName = row.insertCell();
    let cellTotal = row.insertCell();
    row.id = id;

    let dateandtime = splitDateTime(date);

    // Assign data to cells
    cellDate.innerText = dateandtime[0];
    cellHour.innerText = dateandtime[1];
    cellQuantity.innerText = `${client}`;
    cellName.innerText = method;
    cellTotal.innerText = `TO FIX $`;

    row.addEventListener("click", () => {
        const showSale = document.getElementById('showSale');
        showSale.showModal()
        
        const saleInfoTable = document.getElementById('saleInfoTable');
        const modalTable = document.getElementById('modalTable'); 
        saleInfoTable.innerHTML = '';
        modalTable.innerHTML = '';  
        let sale = findObject(salesDB, row.id);

        let products = JSON.parse(sale.productsJson);
        let rowInfo = saleInfoTable.insertRow();

        let ceDate = rowInfo.insertCell();
        let ceHour = rowInfo.insertCell();
        let ceClient = rowInfo.insertCell();
        let ceMethod = rowInfo.insertCell();

        ceDate.innerText = dateandtime[0];
        ceHour.innerText = dateandtime[1];
        ceClient.innerText = `${client}`;
        ceMethod.innerText = method;

        products.forEach(product => {
            let rowModal = modalTable.insertRow();

            let quantity = rowModal.insertCell();
            let name = rowModal.insertCell();
            let price = rowModal.insertCell();
            let subtotal = rowModal.insertCell();

            let productObject = findObject(productsDB, product.id);

            quantity.innerText = `${product.quantity}`;
            name.innerText = `${findNameByID(productsDB, product.id)}`;
            price.innerText = `${productObject.price} $`
            subtotal.innerText = `${productObject.price * product.quantity} $` 
        })
    })
};

document.addEventListener('DOMContentLoaded', async () => {
    let sales = await fetchQuery(`SELECT * FROM sales`);
    let products = await fetchQuery(`SELECT * FROM products WHERE active = 1`);
    salesDB = sales; 
    productsDB = products;

    salesDB.forEach(s => {
        addRowToTable(s.id ,s.saleDate, s.customer_id, s.paymentmethod, 10)
    });
})