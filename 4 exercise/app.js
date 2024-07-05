let API_URL = 'https://api.escuelajs.co/api/v1/products/';


async function fetchProducts(price) {
    if(price !== undefined) {
        API_URL=  `https://api.escuelajs.co/api/v1/products/?price=${price} `
    }
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos');
        }
        const data = await response.json();
        if(data.length === 0) {
            alert('There are not prodcuts with the value' + price)
        }
        displayProducts(data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}


function displayProducts(products) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.id}</td>
            <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.title}</td>
            <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.description}</td>
            <td style="border: 1px solid #ccc; background-color: #f2f2f2; padding: 10px;">${product.price}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-products');
    fetchButton.addEventListener('click', ()=>{
        const $price = document.getElementById('price').value 
        fetchProducts($price)
    });

})
