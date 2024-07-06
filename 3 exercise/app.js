// Event listener for fetching posts when the button is clicked
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});
// Function to fetch posts from JSONPlaceholder API
const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
                        // Check if response is not ok, throw an error
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
                        // Parse response body as JSON
            return response.json();
        })
        .then(posts => {
                        // Call displayPosts function to render posts
            displayPosts(posts);
        })
        .catch(error => {
                        // Call displayError function to show error message
            displayError(error);
        });
};

// Function to display posts in the UI
const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = ''; // Clear existing list
        // Iterate through posts and create list items
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${post.title}`;
        postList.appendChild(listItem);
    });
};
// Function to display error message in case of fetch error
const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};