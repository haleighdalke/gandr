

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
        .then(json => json.forEach(artwork => renderArtCard(artwork)))
    }

    getAllArtwork()


    const renderArtCard = (artwork) => {
        let div = document.getElementById("features")
        let artCard = document.createElement('div')
        artCard.className = "col-lg-3 col-md-6 mb-4"
        artCard.id = artwork.artwork_met_id
        artCard.innerHTML = `

            <div class="card h-100">
            <img class="card-img-top" src="${artwork.artwork_image}" alt="">
            <div class="card-body">
                <h5 class="card-title">${artwork.artwork_title}</h5>
                <p class="card-text">Created by ${artwork.artist_name}, ${artwork.artist_nationality}, in ${artwork.artwork_date}</p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-danger" id="like-button">♥</a>
                <a href="#" class="btn btn-primary">Comment</a>
            </div>
            </div>

        `
        div.prepend(artCard)
        
        let likeButton = artCard.querySelector("#like-button")
        likeButton.addEventListener('click', (e) => likeArtwork(e, artwork))
        // debugger
    }
})
