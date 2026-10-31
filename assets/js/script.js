/* jshint esversion: 8 */

// Fixes issue where pages without API would cause the code to hang here 
if (document.getElementById('category-dropdown')) {
    // target check boxes
    const checkbox1 = document.getElementById('quote');
    const checkbox2 = document.getElementById('hobby');

    // target drop down
    const dropdown = document.getElementById("category-dropdown");
    // Default empty dropdown (page first load)
    dropdown.innerHTML = '<option value="">Select a category</option>';

    // categories
    const quoteCategories = ["wisdom", "philosophy", "life", "truth", "inspirational", "relationships", "love", "faith", "humor", "success", "courage", "happiness", "art", "writing", "fear", "nature", "time", "freedom", "death", "leadership"];
    const hobbyCategories = ["general", "sports_and_outdoors", "education", "collection", "competition", "observation"];

    // default to no api selected (page first load)
    let selectedValue = "no api";

    // populate categories per api selected
    checkbox1.addEventListener('change', () => {
        if (checkbox1.checked) {
        // toggle other checkbox
        checkbox2.checked = false;
        // clear dropdown list if click other checkbox, otherwise it adds to existing list
        dropdown.innerHTML = '<option value="">Select a category</option>';    
        quoteCategories.forEach(category => {
            let categoryOption = document.createElement("option");
            categoryOption.text = category;
            categoryOption.value = category;
            dropdown.add(categoryOption);
        // clear previous selected value if click other checkbox       
        selectedValue = undefined;    
        });
        }
        else {
            // reset dropdown, selected value if uncheck same checkbox      
            selectedValue = "no api";
            dropdown.innerHTML = '<option value="">Select a category</option>';
        }
});

checkbox2.addEventListener('change', () => {
    if (checkbox2.checked) {
    // toggle other checkbox
    checkbox1.checked = false;
    // clear dropdown list if click other checkbox, otherwise it adds to existing list
    dropdown.innerHTML = '<option value="">Select a category</option>';     
    hobbyCategories.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.text = category;
        categoryOption.value = category;
        dropdown.add(categoryOption);
    // clear previous selected value if click other checkbox  
    selectedValue = undefined;
    });
    }
    else {
        // reset dropdown, selected value if uncheck same checkbox
        selectedValue = "no api";
        dropdown.innerHTML = '<option value="">Select a category</option>';
    }
});


// Get category
dropdown.addEventListener('change', (event) => {
    selectedValue = event.target.value;
});



// API call
// Hobbies
async function getHobby(category) {
    let result = document.getElementById("api-result");
    result.textContent = 'Loading...';
    const response = await fetch(`https://api.api-ninjas.com/v1/hobbies?category=${category}`, {
    headers: { 'X-Api-Key': 'vFZfGUnl0SxsGgUctUUbif7hJHZUHJ7Udo9y29z3' }
    });
    const jsonHobbyData = await response.json();
    try {

        if (selectedValue === undefined){
            result.textContent = 'Please select a category.';
        }
        else if (selectedValue === 'no api'){
            result.textContent = 'Please select an API.';
        }
        else if (jsonHobbyData.hobby){
            result.textContent = jsonHobbyData.hobby;
        }
        }catch(error) {
            console.error('Error fetching hobby:', error);
            result.textContent = 'Failed to fetch hobby.';
            }
}

// Quotes
async function getQuote(category) {
    let result = document.getElementById("api-result");
    result.textContent = 'Loading...';
    const response = await fetch(`https://api.api-ninjas.com/v2/quotes?categories=${category}`, {
    headers: { 'X-Api-Key': 'vFZfGUnl0SxsGgUctUUbif7hJHZUHJ7Udo9y29z3' }
    });
    const jsonQuoteData = await response.json();
    try {
        if (selectedValue === undefined){
            result.textContent = 'Please select a category';
            }
        else if (selectedValue === 'no api'){
                result.textContent = 'Please select an API.';
        }    
        else if (jsonQuoteData.length > 0){
                result.textContent = jsonQuoteData[0].quote;
        }
        }catch(error) {
            console.error('Error fetching hobby:', error);
            result.textContent = 'Failed to fetch hobby.';
            }
}


// button
const button = document.getElementById("getResponse");

button.addEventListener('click', () => {
    if (quoteCategories.includes(selectedValue)){
        getQuote(selectedValue); 
    }
    else {
        getHobby(selectedValue);
    }
    
});
}

// Mobile hamburger menu
const btn = document.getElementById('hamburger-button');
const menu = document.getElementById('mobile-menu');
const lines = btn.querySelectorAll('span');

btn.addEventListener('click', () => {

    // Toggle menu
    menu.classList.toggle('right-0');
    menu.classList.toggle('right-[-150px]');

    // Top line
    lines[0].classList.toggle('translate-y-2');
    lines[0].classList.toggle('rotate-45');

    // Middle line
    lines[1].classList.toggle('opacity-0');

    // Bottom line
    lines[2].classList.toggle('-translate-y-2');
    lines[2].classList.toggle('-rotate-45');
});

// Fixes issue where pages without contact form would cause the code to hang here 
if (document.getElementById('contact-form')) {
    // Contact form validation
    let myForm = document.getElementById('contact-form');
    let username = document.getElementById('name');
    let email = document.getElementById('email');
    let message = document.getElementById('message');
    let nameError = document.getElementById('name-error');
    let emailError = document.getElementById('email-error');
    let messageError = document.getElementById('message-error');

    myForm.addEventListener('submit', e =>{
        if (!validateInputs()) {
                e.preventDefault();
            }
    });

    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const messageValue = message.value.trim();
        let isValid = true;

        if(usernameValue === ''){
                nameError.classList.remove('hidden');
                isValid = false; 
            } else{
                nameError.classList.add('hidden');    
            }
            
            if(emailValue === '') {
                emailError.classList.remove('hidden');
                isValid = false; 
            } else{
                emailError.classList.add('hidden');    
            }
            
            if(messageValue === ''){
                messageError.classList.remove('hidden'); 
                isValid = false;
            } else{
                messageError.classList.add('hidden');    
            }
        return isValid;
    }
}



