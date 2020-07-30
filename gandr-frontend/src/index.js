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
        e.preventDefault()

        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(json => {
            let foundUser
            json.forEach(user => {
                if (user.username === e.target[0].value){
                    // remember user and update return value to true
                    foundUser = user
                    return_value = true
                }
            })        
            if (!foundUser){
                // display error tag
                let error = document.getElementById("login-error")
                error.innerText = ""
                error.innerText = "Sorry, invalid username or login. Please try again."
                loginForm.reset()
            }
            else{
                let landingDiv = document.getElementById("landing")
                landingDiv.style.display = "none"
                renderHomePage(foundUser)
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

    // update page
    let homeDiv = document.getElementById("home")
    homeDiv.style.display = "block"

    let header = document.querySelector("header")
    h1 = header.querySelector("h1")
    h1.innerText = `Welcome to Gandr, ${user.username}!`

    fetchAllArtworks(user)
    
    // once page has loaded completely, add navbar event listeners
    navBarEventListeners(user)
    
}

const fetchAllArtworks = (user) => {
    // add artwork cards from DB
    fetch('http://localhost:3000/artworks')
    .then(res => res.json())
    .then(json => {
        let counter = 0
        json.forEach(artwork => {
            if (counter < 30){
                renderArtCard(artwork, user)
                counter++
            }
            else{
                return true
            }
        })
    })
}

const navBarEventListeners = (user) => {
    let viewAll = document.getElementById("nav-item-view-all")
    let myFavorited = document.getElementById("nav-item-my-favorited")
    let myCommented = document.getElementById("nav-item-my-commented")
    
    viewAll.addEventListener('click', (e) => renderFilteredArt(e, user))
    myFavorited.addEventListener('click', (e) => renderFilteredArt(e, user))
    myCommented.addEventListener('click', (e) => renderFilteredArt(e, user))
}

const renderFilteredArt = (e, user) => {
    e.preventDefault()
    let command = e.target.innerText

    let navUl = e.target.parentElement.parentElement
    
    if (command === "My Favorited"){
        //fetch by user likes
        switchActiveNavLink(e.target.parentElement, navUl)
        fetch(`http://localhost:3000/comments`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            debugger
        })
    }
    else if (command === "My Commented"){
        //fetch by user comments
        switchActiveNavLink(e.target.parentElement, navUl)
    }
    else {
        fetchAllArtworks(user)
        switchActiveNavLink(e.target.parentElement, navUl)
    }
}

const switchActiveNavLink = (myLi, navUl) => {
    let allLi = navUl.querySelectorAll('li')
    allLi.forEach(li => {
        li.className = "nav-item"
    })
    myLi.className = "nav-item active"
}

const renderArtCard = (artwork, user) => {
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
            <a href="#" class="btn btn-primary" id="view-comments-button">View</a>
        </div>
        </div>

    `
    // debugger
    div.appendChild(artCard)
    
    let likeButton = artCard.querySelector("#like-button")
    likeButton.addEventListener('click', (e) => likeArtwork(e, artwork, user)) 

    let viewCommentsButton = artCard.querySelector("#view-comments-button")
    viewCommentsButton.addEventListener('click', (e) => viewComments(e, artwork, user)) 
}

const likeArtwork = (e, artwork, user) => {
    let data = {
        artwork_id: artwork.id,
        // Need to identify user
        user_id: user.id
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

const viewComments = (e, artwork, user) => {
        let popUpCard = document.createElement("dialog");
        popUpCard.className = "pop-up-card"
        document.body.appendChild(popUpCard)
        popUpCard.showModal();

        let artCard = document.createElement("card")
        artCard.id = "add-comment-art-card"
        artCard.innerHTML = `
        
        <div class="pop-up-card">
            <a href="#" class="btn-default" id="close-button">☒ Close</a>
            <div class="pop-up-img">
                <img class="pop-up-img" src="${artwork.artwork_image}" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${artwork.artwork_title}</h5>
            </div>
        </div>
        `

        let commentDiv = document.createElement('div')
        commentDiv.id = "comment-div"
        artwork.comments.map (function(comment){
            let thisComment = document.createElement('ul')
            thisComment.className = "comment-list"
            // debugger
            thisComment.innerText = `♥ ${comment.content}`
            commentDiv.appendChild(thisComment)
        })
        artCard.appendChild(commentDiv)

        let addCommentButton = document.createElement('button')
        addCommentButton.innerHTML = "Add Comment"
        addCommentButton.className="btn btn-danger"
        addCommentButton.id="add-comment-button"
        artCard.appendChild(addCommentButton)
        addCommentButton.addEventListener('click', (e) => showAddComment(e, artwork, user))

        popUpCard.appendChild(artCard)

        let closeButton = artCard.querySelector("#close-button")
        closeButton.addEventListener('click', (e) => popUpCard.remove()) 
}

const showAddComment= (e, artwork, user) => {
    let commentDiv = document.querySelector('#comment-div')
    commentDiv.remove()
    let addCommentButton = document.querySelector('#add-comment-button')
    addCommentButton.remove()
    let commentForm = document.createElement('div')
    commentForm.innerHTML = `
        <form id='comment-form'>
        <input class="form-control input-lg" id="inputlg" type="text">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <input type='submit' class="btn btn-danger" value='Post Comment'>
        </form>
    `
    let artCard = document.querySelector('#add-comment-art-card')
    artCard.appendChild(commentForm)
    .addEventListener('submit', (e) => {
        e.preventDefault()
        postComment(e, artwork, user) 
    })
}

const postComment = (e, artwork, user) => {
	let data = {
        user_id: user.id,
        artwork_id: artwork.id,
        content: e.target[0].value
	}
	fetch(`http://localhost:3000/comments`, {
	method: 'POST',
	headers: {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
	},
	body: JSON.stringify(data)
	})
    .then (res => {
        let popUpCard = document.querySelector(".pop-up-card")
        popUpCard.remove()
        viewComments(e, artwork, user)
        let commentDiv = document.querySelector("#comment-div")
        let thisComment = document.createElement('ul')
        // debugger
        thisComment.innerText = `♥ ${e.target[0].value}`
        commentDiv.appendChild(thisComment)
    })
}