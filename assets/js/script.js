/* jshint esversion: 8 */

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





