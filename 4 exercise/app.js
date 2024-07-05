const button = document.getElementById('fetch-posts');

button.addEventListener('click', async (e) => {
    async function get() {
        const url = 'https://api.escuelajs.co/api/v1/products';
        
        try {
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                const tbody = document.getElementById('tbody');
                let html = ''; 
                
                data.forEach(element => {
                    html += `
                        <div class="product">
                            ${element.id} - ${element.title} - ${element.price}
                        </div>
                    `;
                });
                
                // Set innerHTML of tbody after loop
                tbody.innerHTML = html;
            } else {
                console.log("Error loading data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    get();
});

