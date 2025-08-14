import { executeUpdate } from "../modules/database.js";
import { findIdByName } from "../modules/utilities.js";
import { categoryDB } from "../product.js";

const unit = {
    'unidad': 1,
    'gramos': 2,
    'litros': 3,
}

let addCategory = document.getElementById("addCategory");
const categoryForm = document.getElementById("categoryForm");

//CATEGORIES

//ADD CATEGORY
addCategory.addEventListener("click", function() {
    const dialog = document.getElementById('addCategoryDialog');
    const closeButtonCategory = document.getElementById('closeCategory');
    const clearButton = document.getElementById('clear');

    dialog.showModal();

    // Function to close the dialog
    closeButtonCategory.addEventListener('click', function() {
        dialog.close();
    });

    // Clear form fields when clicking 'Clear'
    clearButton.addEventListener('click', function() {
        dialog.querySelectorAll('input, select').forEach(element => {
            element.value = ''; // Reset each field
        });
    });
});

categoryForm.addEventListener("submit", () => {
    const inputAddProduct = document.querySelectorAll(".categoryInput input, .categoryInput select");

    let unitIndex = inputAddProduct[1].value.toLowerCase();

    try {
        executeUpdate(`
        INSERT INTO category (name, type)
        VALUES ('${inputAddProduct[0].value.toLowerCase()}', ${unit[`${unitIndex}`]});`);
    }
    catch (err){ 
        console.error(err); 
    }
})

const removeCategory = document.getElementById("removeCategory");
const removeCategoryForm = document.getElementById("removeCategoryForm");

removeCategory.addEventListener("click", function() {
    const dialog = document.getElementById('removeCategoryDialog');
    const closeButtonCategory = document.getElementById('closeCategory');
    const clearButton = document.getElementById('clear');

    dialog.showModal();

    // Function to close the dialog
    closeButtonCategory.addEventListener('click', function() {
        dialog.close();
    });

    // Clear form fields when clicking 'Clear'
    clearButton.addEventListener('click', function() {
        dialog.querySelectorAll('input, select').forEach(element => {
            element.value = ''; // Reset each field
        });
    });
});

removeCategoryForm.addEventListener("submit", () => {
    const selectValue = document.getElementById("categoryInput").value;
    console.log(findIdByName(categoryDB, selectValue))
    try {
        executeUpdate(`
        UPDATE category
        SET active = 0
        WHERE id = ${findIdByName(categoryDB, selectValue)};
        `)
    }
    catch (err){ 
        console.error(err); 
    }
})