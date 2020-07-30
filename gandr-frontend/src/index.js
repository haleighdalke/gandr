

// ** Nav item highlighted **
// <li class="nav-item active">
// <a class="nav-link" href="#">Home
//   <span class="sr-only">(current)</span>
// </a>
// </li>

document.addEventListener('DOMContentLoaded', (e) => {    
    
    let success = false
    while (!success) {
        success = login()
        return success
    }
    
})

const login = () => {
    // login functionality
    let return_value = false
    let loginForm = document.getElementById("login-form")
    loginForm.addEventListener('submit', (e) => {
        // validate username and transition
        e.preventDefault()

        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(json => {
            json.forEach(user => {
                if (user.username === e.target[0].value){
                    let landingDiv = document.getElementById("landing")
                    landingDiv.style.display = "none"
                    renderHomePage(user)
                    // stop the loop and set return value to true
                    return return_value = true
                }
            })        
            if (!return_value){
                // display error tag
                let error = document.getElementById("login-error")
                error.innerText = ""
                error.innerText = "Sorry, invalid username or login. Please try again."
                loginForm.reset()
            }
        })
    })

    //sign up functionality
    let signupForm = document.getElementById("signup-form")
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        if (e.target[0].value === e.target[1].value){
            let data = {
                username: e.target[1].value
            }
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                let landingDiv = document.getElementById("landing")
                landingDiv.style.display = "none"
                renderHomePage(json)
                return_value = true
            })
        }
        else {
            let error = document.getElementById("login-error")
            error.innerText = ""
            error.innerText = "Sorry, usernames do not match. Please try again."
            loginForm.reset()
        }
    })
    return return_value
}

const renderHomePage = (user) => {
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