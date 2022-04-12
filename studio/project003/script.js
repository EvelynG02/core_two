// more advanced version of Airtable demo. Comments added below for the additions.
// See the demo video recording posted on the class website for walkthrough

fetch('https://api.airtable.com/v0/appFOm7DDpMYM90u9/albums', {
  headers: {
    Authorization: 'Bearer keyxq87yw8w7CglcJ',
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const albumsContainer = document.querySelector('.albums-container');

    data.records
      .filter(album => {
        // filter the data down to only albums marked true for "has_listened_fully" in my Airtable base
        return album.fields.has_listened_fully;
      })
      .sort((a, b) => {
        // sorting by earlier "release_year"
        return a.fields.release_year - b.fields.release_year;
      })
      .slice(0, 5) // only show up to five albums
      .forEach(album => {
        console.log(album);

        // same as basic example with the addition of the "top-band" div which adds a small data visualizaiton element. It makes the length of the top bar in the card related to the album rating I gave it in Airtable
        albumsContainer.innerHTML += `
          <div class="album">
            <div class="top-band" style="width: ${(album.fields.my_rating / 5) * 100}%"></div>
            <h5>${album.fields.release_year}</h5>  
            <h3>${album.fields.title}</h3>
            <h4>${album.fields.artist}</h4>
            <img src="${album.fields.album_cover[0].thumbnails.large.url}" width'200' />
          </div>
      `;
      });
  });