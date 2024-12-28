function updatePrice(inputElement) {
    const box = inputElement.closest('.box'); // Find the parent box
    const pricePerDay = parseInt(box.dataset.price, 10); // Get price from data attribute
    const days = parseInt(inputElement.value, 10) || 0;
    const totalPriceSpan = box.querySelector('.total-price'); // Find total price span within the box

    if (!totalPriceSpan) {
        console.error("Total price span not found.");
        return;
    }

    const totalPrice = days * pricePerDay;
    totalPriceSpan.textContent = totalPrice;
}

// Initialize prices on load
window.onload = () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        const input = box.querySelector('input[type="number"]');
        if (input) {
            updatePrice(input);
        }
    });
};

// Slideshow Functionality (if you are still using it)
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000);
}
const searchBox = document.getElementById('search-box');
const itemSections = document.querySelectorAll('.item-section'); // Get all item sections

searchBox.addEventListener('keyup', function() {
    const searchTerm = searchBox.value.toLowerCase(); // Get search term and convert to lowercase

    itemSections.forEach(section => { // Loop through each item section
        const items = section.querySelectorAll('.box'); // Get all items within the section
        items.forEach(item => {
            const itemName = item.querySelector('h2').textContent.toLowerCase(); // Get item name
            if (itemName.includes(searchTerm)) { // Check if item name includes search term
                item.style.display = 'block'; // Show the item
            } else {
                item.style.display = 'none'; // Hide the item
            }
        });
    });
});


const rentButtons = document.querySelectorAll('.rent-btn');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
let isLoggedIn = false; // Initialize login status (you'll need a way to persist this)

// Check if user is logged in (using localStorage as a simple example)
isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === "testuser" && password === "password") {
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true'); // Store login status
            loginMessage.textContent = "Login Successful!";
            loginMessage.style.color = "green";
            // Redirect back to the page they were on
            window.location.href = document.referrer || "index.html"; // Use referrer or default to home
        } else {
            loginMessage.textContent = "Invalid username or password.";
            loginMessage.style.color = "red";
        }
    });
}

rentButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const itemId = button.dataset.itemId;
        const termsCheckbox = document.getElementById(`terms-${itemId}`);

        if (!termsCheckbox.checked) {
            alert("Please agree to the Terms and Conditions to proceed.");
            return;
        }

        if (isLoggedIn) {
            // User is logged in, show pending message and store rental info (using localStorage for demo)
            localStorage.setItem(`rentalPending-${itemId}`, 'true');
            alert("Rental request sent. Pending approval.");
        } else {
            // Store the item ID in localStorage to redirect back after login
            localStorage.setItem('redirectToItem', itemId)
            window.location.href = "loginform.html";
        }
    });
});

// Check for pending rentals on page load (e.g., in index.html)
document.addEventListener('DOMContentLoaded', function() {
    rentButtons.forEach(button => {
        const itemId = button.dataset.itemId;
        if (localStorage.getItem(`rentalPending-${itemId}`) === 'true') {
            alert(`Your rental for item ${itemId} is still pending.`);
            localStorage.removeItem(`rentalPending-${itemId}`); // Clear the message after showing it once
        }
    });
    const redirectToItem = localStorage.getItem('redirectToItem')
    if(redirectToItem){
        localStorage.removeItem('redirectToItem')
        //redirect to item page
    }
});