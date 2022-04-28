// first we set up our global variables to track initial state of our filter parameters
let sliderValue = 50;
let mushroomType = 'all';
let mushroomColor = 'all';

// update dropdowns
function handleDropdown() {
  mushroomType = event.target.value;
  generateContent();
}

function handleDropdown2() {
  mushroomColor = event.target.value;
  generateContent();
}

// update slider
const sliderDisplayValue = document.querySelector('.range-slider-container span'); // slider HTML display value
function handleSlider() {
  sliderValue = event.target.value;
  sliderDisplayValue.innerHTML = `$${numberWithCommas(sliderValue)}`; // update slider value. Sending new value through numberWithCommas function below to get commas  in display for 1,000+
  generateContent();
}

// these html elements represent our interactive elements
const reset = document.querySelector('.reset');
const dropdown = document.querySelector('.dropdown-container select');
const dropdown2 = document.querySelector('.dropdown-container2 select');
const slider = document.querySelector('.range-slider-container input');

// clicking "reset" button will set all variables back to initial state and then update our interactive html elements to display the new state
function resetFilters() {
  mushroomType = 'all';
  mushroomColor = 'all';
  sliderValue = 50;
  sliderDisplayValue.innerHTML = `$${numberWithCommas(sliderValue)}`;
  slider.value = sliderValue;
  dropdown.value = 'all';
  dropdown2.value = 'all';
  generateContent();
}

fetch('https://api.airtable.com/v0/app6gezkzOPuEsZfV/mushroom', {
  headers: {
    Authorization: 'Bearer keymaRHjmjRexNvgS', // this is your API key, starting with 'key...' found in your Airtable account
  },
})
  .then(res => res.json()) // tells JS to expect data in json format
  .then(data => {
    // all your code should go inside here

    console.log(data); // first, log out your data. Explore it in the browser console.

    const mushroomsContainer = document.querySelector('.mushroom-container'); // tell JS about the div we added to our html file so we can put content inside it

    function generateContent() {
      content.innerHTML = ''; // important! we want to delete all content on the screen each time we re-run to capture new filter and sorting parameters
      data
        .filter(item => {
          return item.height <= sliderValue; // this filter only returns items that are priced less than slider value
        })
        .filter(item => {
          return mushroomType === 'all' ? item : item.type === mushroomType; // if our dropdown is set to all, return evey item, otherwise only return items that match selected instrument type
        })
        .filter(item => {
          return mushroomColor === 'all' ? item : item.type === mushroomColor; // if our dropdown is set to all, return evey item, otherwise only return items that match selected instrument type
        })




    
    // loop over each record (row) of our Airtable data
    data.records.forEach(mushroom => {
      console.log(mushroom); // look in the console at each album to see what fields we can access (these are your own table headers from Airtable)

      // now we add html to our mushroomContainer div
      // this is where we take our data from Airtable and put it in our html
      // think of this chunk of HTML as a component template for each entry in our database
      // note the backticks `` below. This allows us to add html + js together using ${field} in a single block of code
      mushroomsContainer.innerHTML += `
        <div class="mushroom">
  
          
          <h3>${mushroom.fields.name}</h3>
          <img src="${mushroom.fields.image[0].thumbnails.large.url}" width='250'/>
          
         <h4>${mushroom.fields.health_benefits}</h4>
         <h7>${mushroom.fields.height}</h7>
         <h6>${mushroom.fields.season}</h6>
          <h5>${mushroom.fields.type}</h5> 
          <h8>${mushroom.fields.color}</h8>


        </div>
        `;

      // that's it!
      // Try adding or removing items in your Airtable base and see your website update on refresh
    });
  });