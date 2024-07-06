let API_URL = 'https://api.escuelajs.co/api/v1/products/';
// Function to fetch products from an API based on optional price parameter


async function fetchProducts(price) {
        // If price is provided, update API_URL to include price filter
    if(price !== undefined) {
        API_URL=  `https://api.escuelajs.co/api/v1/products/?price=${price} `
    }
    try {
                // Fetch data from API
        const response = await fetch(API_URL);
                // Check if response is successful
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos');
        }
                // Parse response data as JSON
        const data = await response.json();
                // Alert if no products are found with the given price
        if(data.length === 0) {
            alert('There are not products with the value' + price)
        }
        displayProducts(data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// Function to display products in an HTML table
function displayProducts(products) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    // Iterate through products and create rows in the table
    products.forEach(product => {
                // Populate table row with product information
        const row = document.createElement('tr');
        row.innerHTML = `
        <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.id}</td>
            <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.title}</td>
            <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.description}</td>
            <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.price}</td>
        `;
        tbody.appendChild(row); // Append row to the table body
    });
}
// Event listener for fetching products on button click
document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-products');
    fetchButton.addEventListener('click', ()=>{
        const $price = document.getElementById('price').value 
        fetchProducts($price)// Call fetchProducts function with price input
    });

})
