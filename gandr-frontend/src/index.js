

// ** Nav item highlighted **
// <li class="nav-item active">
// <a class="nav-link" href="#">Home
//   <span class="sr-only">(current)</span>
// </a>
// </li>

<<<<<<< HEAD
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
=======
document.addEventListener('DOMContentLoaded', (e) => {    
    let loginBtn = document.getElementById("login")
    
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()

        let landingDiv = document.getElementById("landing")
        landingDiv.remove()

        renderHomePage()
        
    })
    

>>>>>>> 8d317801436f6ed6573b960b6b40135895500266
})

const renderHomePage = () => {
    let homeDiv = document.getElementById("home")
    homeDiv.style.display = "block"
    // get all artwork and render home page once loaded from database
    fetch('http://localhost:3000/artworks')
    .then(res => res.json())
    .then(json => {
        json.forEach(artwork => renderArtCard(artwork))
    })
}


const renderArtCard = (artwork) => {
    let div = document.getElementById("features")
    let artCard = document.createElement('div')
    artCard.className = "col-lg-3 col-md-6 mb-4"
    artCard.id = artwork.artwork_met_id
    artCard.innerHTML = `

        <div class="card h-100">
        <img class="card-img-top" src="${artwork.artwork_image}" alt="">
        <div class="card-body">
            <h4 class="card-title">${artwork.artwork_title}</h4>
            <p class="card-text">Created by ${artwork.artist_name}, ${artwork.artist_nationality}, in ${artwork.artwork_date}</p>
        </div>
        <div class="card-footer">
            <a href="#" class="btn btn-danger">♥</a>
            <a href="#" class="btn btn-primary">Comment</a>
        </div>
        </div>

    `
    div.prepend(artCard)
}