

// ** Nav item highlighted **
// <li class="nav-item active">
// <a class="nav-link" href="#">Home
//   <span class="sr-only">(current)</span>
// </a>
// </li>

document.addEventListener('DOMContentLoaded', (e) => {

    const getAllArtwork = () => {

        fetch('http://localhost:3000/artworks')
        .then(res => res.json())
        .then(json => json.data.forEach(artwork => renderArtCard(artwork)))
    }

    getAllArtwork()


    const renderArtCard = (artwork) => {
        let div = document.getElementById("features")
        debugger
        let artCard = document.createElement('div')
        artCard.className = "col-lg-3 col-md-6 mb-4"
        artCard.id = artwork.attributes.artwork_met_id
        artCard.innerHTML = `

            <div class="card h-100">
            <img class="card-img-top" src="${artwork.attributes.artwork_image}" alt="">
            <div class="card-body">
                <h4 class="card-title">${artwork.attributes.artwork_title}</h4>
                <p class="card-text">Created by ${artwork.attributes.artist_name} from ${artwork.attributes.artist_nationality} in ${artwork.attributes.artwork_date}</p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-danger">♥</a>
                <a href="#" class="btn btn-primary">Comment</a>
            </div>
            </div>

        `
        div.prepend(artCard)
    }
})
