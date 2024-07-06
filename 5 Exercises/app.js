let products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 10 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];


const showProducts = (category) => {
    const $body = document.getElementById('tbody');
    if(category !== 'Accessories' && category !== 'Clothing' && category !== 'Electronics' && category !== 'All'){
        let newProducts = products.filter(product => product.name === category)
        $body.innerHTML = ""
        newProducts.forEach(element => {
            $body.innerHTML += `
            <td>${element.name}</td>
            <td>${element.category}</td>
            <td>${element.price}</td>
            <td>${element.stock}</td>

        ` 
    });

    }
   else if(category !== 'All' ){
        let newProducts = products.filter(product => product.category === category)
        $body.innerHTML = ""
        newProducts.forEach(element => {
            $body.innerHTML += `
            <td>${element.name}</td>
            <td>${element.category}</td>
            <td>${element.price}</td>
            <td>${element.stock}</td>
        `       
    });
  
    }
    
    else{
        $body.innerHTML = ""
        products.forEach(element => {
            $body.innerHTML += `
            <td>${element.name}</td>
            <td>${element.category}</td>
            <td>${element.price}</td>
            <td>${element.stock}</td>
        `
            
    });

    }

    

}

const $category = document.getElementById('category');
$category.addEventListener('click', () =>{
    newProducts = showProducts($category.value)

})


const $total = document.getElementById('total');
$total.addEventListener('click', () =>{
        const $labelTotal = document.getElementById('totalLabel')
        const total = products.reduce((acumalator,valor )=> valor.price + acumalator,0)
        $labelTotal.textContent ='total price:'+ total
})

const $name = document.getElementById('name')
$name.addEventListener('click', ()=>{
    const $inputName = document.getElementById('inputName').value
    if(!$inputName){
        alert('Please write a valid product name')
    }
    else{
        const product = products.find(p => p.name === $inputName)
        if(product){
           showProducts(product.name)
        }
        else{
           
        }
    }

})

const $available = document.getElementById('available')
const $availableLabel = document.getElementById('availableLabel')
$available.addEventListener('click', ()=>{
    const areProductsAvailable = products.every(product => product.stock > 0)
    if(areProductsAvailable){
        $availableLabel.textContent = 'All products are  available'
    }
    else{
        $availableLabel.textContent = 'Sorry, all product are not available'
    }
})

const $tableName = document.getElementById('tableName') 
const $tbodyName = document.getElementById('tbodyName')
const $listProducts = document.getElementById('listProducts')

$listProducts.addEventListener('click', ()=>{
    $tableName.style.display = 'block'
    $tbodyName.innerHTML = ""
    products.map(product => product.name).forEach(product =>{
        $tbodyName.innerHTML += `
        <td>${product}</td>
        `
    })

   
})