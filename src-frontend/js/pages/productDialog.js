let addProduct = document.getElementById("add");

// PRODUCTS

//ADD PRODUCT
addProduct.addEventListener("click", function() {
    const dialog = document.getElementById('addItemDialog');
    const closeButton = document.querySelectorAll('.dialog-btn[value="cancel"]')[0];
    const clearButton = document.getElementById('clear');

    dialog.showModal();

    // Function to close the dialog
    closeButton.addEventListener('click', function() {
        dialog.close();
    });

    // Clear form fields when clicking 'Clear'
    clearButton.addEventListener('click', function() {
        dialog.querySelectorAll('input, select').forEach(element => {
            element.value = ''; // Reset each field
        });
    });
});


