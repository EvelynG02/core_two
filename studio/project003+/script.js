

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