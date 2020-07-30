

// ** Nav item highlighted **
// <li class="nav-item active">
// <a class="nav-link" href="#">Home
//   <span class="sr-only">(current)</span>
// </a>
// </li>

document.addEventListener('DOMContentLoaded', (e) => {    
    
    let success = login()
    while (!success) {
        success = login()
        return success
    }
    
})

const login = () => {
    // login functionality
    let loginForm = document.getElementById("login-form")
    loginForm.addEventListener('submit', (e) => {
        // validate username and transition
        fetch('')
        .then(res => res.json())
        .then(json => {
            json.forEach(user => {
                if (user.username === e.target[0].value){
                    let landingDiv = document.getElementById("landing")
                    landingDiv.remove()
                    renderHomePage(username)
                    return true
                }
                else {
                    // display error tag
                    let loginButtons = document.getElementById("login-buttons")
                    let error = document.createElement('p')
                    p.innerText = "Sorry, invalid username or login. Please try again."
                    loginForm.reset()
                    return false
                }
            })        
        })
    })
}

const renderHomePage = (username) => {
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
            <h5 class="card-title">${artwork.artwork_title}</h5>
            <p class="card-text">Created by ${artwork.artist_name}, ${artwork.artist_nationality}, in ${artwork.artwork_date}</p>
        </div>
        <div class="card-footer">
            <a href="#" class="btn btn-danger" id="like-button">♥ ${artwork.likes.length}</a>
            <a href="#" class="btn btn-primary" id="post-comment-button">Comment</a>
        </div>
        </div>

    `
    // debugger
    div.prepend(artCard)
    
    let likeButton = artCard.querySelector("#like-button")
    likeButton.addEventListener('click', (e) => likeArtwork(e, artwork)) 

    let postCommentButton = artCard.querySelector("#post-comment-button")
    postCommentButton.addEventListener('click', (e) => postComment(e, artwork)) 
}

const likeArtwork = (e, artwork) => {
    let data = {
        artwork_id: artwork.id,
        // Need to identify user
        user_id: 56
    }
    updatedLikes = artwork.likes.length +=1
    fetch(`http://localhost:3000/likes`,{
        method: 'POST',
        headers: {
        'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(res => {
            let artCard = document.getElementById(`${artwork.artwork_met_id}`)
            let likeButton = artCard.querySelector("#like-button")
            likeButton.innerHTML = `♥ ${updatedLikes}`
        })      
}

// const postComment = (e, artwork) => {
//     let data = {
//         artwork_id: artwork.id,
//         // Need to identify user
//         user_id: user.id
//         // Add content
//     }
//     fetch(`http://localhost:3000/comments`,{
//         method: 'POST',
//         headers: {
//         'Content-Type':'application/json',
//         },
//         body: JSON.stringify(data)
//         })
//         .then(res => res.json()) 
// }