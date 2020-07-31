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
    let allArtCardsDiv = document.getElementById("features")

    allArtCardsDiv.innerHTML = ""
    
    if (command === "My Favorited"){
        switchActiveNavLink(e.target.parentElement, navUl)
       
        fetch(`http://localhost:3000/likes`)
        .then(res => res.json())
        .then(json => {
            let rendered = false
            json.forEach(like => { 
                if (like.user_id == user.id){
                    fetch(`http://localhost:3000/artworks/${like.artwork_id}`)
                    .then(res => res.json())
                    .then(json => {
                        renderArtCard(json, user)
                    })
                    rendered = true
                }
            })
            if (!rendered) {
                updateJumbotron("Oops!", "Sorry, you don't have any favorites!")
            }
            else {
                updateJumbotron("Your Favorites Collection", "Curated for you, by you!")
            }
        })

    }
    else if (command === "My Commented"){
        switchActiveNavLink(e.target.parentElement, navUl)

        fetch(`http://localhost:3000/comments`)
        .then(res => res.json())
        .then(json => {
            let rendered = false
            json.forEach(comment => { 
                if (comment.user_id == user.id){
                    fetch(`http://localhost:3000/artworks/${comment.artwork_id}`)
                    .then(res => res.json())
                    .then(json => {
                        renderArtCard(json, user)
                    })
                    rendered = true
                }
            })
            if (!rendered) {
                updateJumbotron("Oops!", "Sorry, you haven't made any comments yet!")
            }
            else {
                updateJumbotron("Your Comments Collection", "Stay up to date with the art you're talking about!")
            }
        })
    }
    else {
        updateJumbotron("Viewing All Artwork", "Like, view, and comment on your favorites!")
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

const updateJumbotron = (header, subheader="") => {
    let h1 = document.querySelector('header h1')
    let p = document.querySelector('header p')
    h1.innerText = header
    p.innerText = subheader
}

const renderArtCard = (artwork, user) => {
    let div = document.getElementById("features")
    let artCard = document.createElement('div')
    artCard.className = "col-lg-3 col-md-6 mb-4"
    artCard.id = artwork.artwork_met_id
    artCard.innerHTML = `

        <div class="card h-100">
        <img class="card-img-top" id="full-image" src="${artwork.artwork_image}" alt="">
        <div class="card-body">
            <h5 class="card-title">${artwork.artwork_title}</h5>
            <p class="card-text">Created${artwork.artist_name == "" ? "" : ` by ${artwork.artist_name}`}${artwork.artist_nationality == "" ? "" : `, ${artwork.artist_nationality},`} in ${artwork.artwork_date}</p>
        </div>
        <div class="card-footer">
            <a href="#" class="btn btn-danger" id="like-button">♥ ${artwork.likes.length}</a>
            <a href="#" class="btn btn-primary" id="view-comments-button">View Comments</a>
        </div>
        </div>

    `
    div.appendChild(artCard)

    let image = artCard.querySelector("#full-image")
    image.addEventListener('click', (e) => {
        e.preventDefault()
        viewImage(e, artwork, user)
    }) 
    
    let likeButton = artCard.querySelector("#like-button")
    likeButton.addEventListener('click', (e) => {
        e.preventDefault()
        likeArtwork(e, artwork, user)
    }) 

    let viewCommentsButton = artCard.querySelector("#view-comments-button")
    viewCommentsButton.addEventListener('click', (e) => {  
        e.preventDefault()
        viewComments(e, artwork, user)
    })
}

const likeArtwork = (e, artwork, user) => {
    let data = {
        artwork_id: artwork.id,
        user_id: user.id
    }

    // If like exists, delete. Otherwise, add.
    fetch(`http://localhost:3000/likes`)
    .then(res => res.json())
    .then(json => {
        let match = json.find(like => {
            return like.user_id == user.id && like.artwork_id == artwork.id
        })
        if (match) {
            destroyLike(match, artwork, user)
        }
        else {
            postLike(data, artwork, user)
        }
    })
    
}

const postLike = (data, artwork, user) => {
    fetch(`http://localhost:3000/likes`,{
        method: 'POST',
        headers: {
        'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            let updatedLikes = artwork.likes.length +=1
            let artCard = document.getElementById(`${artwork.artwork_met_id}`)
            let likeButton = artCard.querySelector("#like-button")
            likeButton.innerHTML = `♥ ${updatedLikes}`
        })      
}

const destroyLike = (like, artwork, user) => {
    fetch(`http://localhost:3000/likes/${like.id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(json => {
        // debugger
        let updatedLikes = artwork.likes.length -=1
        let artCard = document.getElementById(`${artwork.artwork_met_id}`)
        let likeButton = artCard.querySelector("#like-button")
        likeButton.innerHTML = `♥ ${updatedLikes}`
        // renderLike(json, artwork, user, 'delete')
    })
}

// const renderLike = (like, artwork, user, method) => {
//     let updatedLikes = artwork.likes.length
//     if (method === 'delete'){
//         updatedLikes -= 1
//     }
//     else {
//         updatedLikes += 1
//     }
//     let artCard = document.getElementById(`${artwork.artwork_met_id}`)
//     let likeButton = artCard.querySelector("#like-button")
//     likeButton.innerHTML = `♥ ${updatedLikes}`
// }

const viewComments = (e, artwork, user) => {
        let popUpCard = document.createElement("dialog");
        popUpCard.className = "pop-up-card"
        document.body.appendChild(popUpCard)
        popUpCard.showModal();

        let artCard = document.createElement("card")
        artCard.id = "add-comment-art-card"
        artCard.innerHTML = `
        <a href="#" class="btn-default" id="close-button">☒</a>
        <div class="pop-up-card">
            <div class="pop-up-img">
                <img class="pop-up-img" src="${artwork.artwork_image}" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${artwork.artwork_title}</h5>
            </div>
        </div>
        `

        // This was in artCard.innerHTML: <a href="#" class="btn-default" id="close-button">☒</a>

        let commentDiv = document.createElement('div')
        commentDiv.id = "comment-div"
        artwork.comments.map (function(comment){
            let thisComment = document.createElement('ul')
            thisComment.className = "comment-list"
            thisComment.innerText = `♥ ${comment.content}`
            commentDiv.appendChild(thisComment)
        })
        artCard.appendChild(commentDiv)

        let addCommentButton = document.createElement('button')
        addCommentButton.innerHTML = "My Comments"
        addCommentButton.className="btn btn-danger"
        addCommentButton.id="add-comment-button"
        artCard.appendChild(addCommentButton)
        addCommentButton.addEventListener('click', (e) => showAddComment(e, artwork, user))

        popUpCard.appendChild(artCard)

        let closeButton = artCard.querySelector("#close-button")
        closeButton.addEventListener('click', (e) => {
            e.preventDefault()
            popUpCard.remove()
            renderFilteredArt(e, user)
        })

        // popUpCard.addEventListener('click', (e) => {
        //     if (e.target == popUpCard) {
        //         e.preventDefault()
        //         popUpCard.remove()
        //         // debugger
        //         renderFilteredArt(e, user)
        //     } 
        // })
}

const showAddComment = (e, artwork, user) => {
    let commentDiv = document.querySelector('#comment-div')
    commentDiv.remove()
    let addCommentButton = document.querySelector('#add-comment-button')
    addCommentButton.remove()

    let artCard = document.querySelector('#add-comment-art-card')

    let myCommentsDiv = document.createElement('div')
    let myCommentsHeader = document.createElement('h6')
    myCommentsHeader.innerHTML = "My Comments"
    artCard.appendChild(myCommentsHeader)

    myCommentsDiv.id = "my-comments-div"
    artwork.comments.map (function(comment) {
        if (comment.user_id == user.id) {
            let thisComment = document.createElement('ul')
            thisComment.id = `${comment.id}`
            thisComment.innerText = `♥ ${comment.content}`

            editCommentButton = document.createElement('button')
            editCommentButton.className="edit-comment-button"
            editCommentButton.id = `${comment.id}`
            editCommentButton.innerHTML = "Edit"
            editCommentButton.addEventListener('click', (e) => renderEditCommentForm(e, artwork, user)) 

            deleteCommentButton = document.createElement('button')
            deleteCommentButton.className="delete-comment-button"
            deleteCommentButton.id = `${comment.id}`
            deleteCommentButton.innerHTML = "Delete"
            deleteCommentButton.addEventListener('click', (e) => deleteComment(e, artwork, user)) 

            thisComment.appendChild(deleteCommentButton)
            thisComment.appendChild(editCommentButton)
            myCommentsDiv.appendChild(thisComment)
        }
    })
    artCard.appendChild(myCommentsDiv)


    let commentForm = document.createElement('div')
    commentForm.id = "comment-form"
    commentForm.innerHTML = `
        <form id='comment-form'>
        <input id="inputlg" type="text" placeholder="What would you like to say?">
        <input type='submit' class="btn btn-danger" id: "post-comment-button" style="float: right" value='Post Comment'>
        </form>
    `

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
    .then(res => res.json())
    .then (res => {
        let myCommentsDiv = document.getElementById("my-comments-div")
        let thisComment = document.createElement('ul')
        thisComment.innerText = `♥ ${e.target[0].value}`
        thisComment.id = `${res.id}`
        myCommentsDiv.appendChild(thisComment)

        editCommentButton = document.createElement('button')
        editCommentButton.className="edit-comment-button"
        editCommentButton.id = `${res.id}`
        editCommentButton.innerHTML = "Edit"
        editCommentButton.addEventListener('click', (e) => renderEditCommentForm(e, artwork, user)) 

        deleteCommentButton = document.createElement('button')
        deleteCommentButton.className="delete-comment-button"
        deleteCommentButton.id = `${res.id}`
        deleteCommentButton.innerHTML = "Delete"
        deleteCommentButton.addEventListener('click', (e) => deleteComment(e, artwork, user)) 

        thisComment.appendChild(deleteCommentButton)
        thisComment.appendChild(editCommentButton)
        myCommentsDiv.appendChild(thisComment)

        let inputBox = document.getElementById('inputlg')
        inputBox.value = ""
        inputBox.placeholder = "What would you like to say?"
    })
}

const renderEditCommentForm = (e, artwork, user) => {
    let editCommentForm = document.querySelector("#comment-form")
    let artCard = document.querySelector('#add-comment-art-card')
    let comment_id = e.target.id
	fetch(`http://localhost:3000/comments/${comment_id}`, {
	    method: 'GET'
    })
    .then(res => res.json())
    .then (res => {
        editCommentForm.remove()
        let commentForm = document.createElement('div')
        commentForm.id = "comment-form"
        commentForm.innerHTML = `
            <form id='comment-form'>
            <input id="inputlg" type="text">
            <input type='submit' class="btn btn-danger" id: "edit-comment-button" style="float: right" value='Edit Comment'>
            </form>
        `
    
        artCard.appendChild(commentForm)
        let inputBox = document.getElementById('inputlg')
        inputBox.value = `${res.content}`
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault()
            editComment(e, artwork, user, comment_id) 
        })
    })
}

const editComment = (e, artwork, user, comment_id) => {
	let data = {
        id: comment_id,
        user_id: user.id,
        artwork_id: artwork.id,
        content: e.target[0].value
    }
    
	fetch(`http://localhost:3000/comments/${comment_id}`, {
	method: 'PATCH',
	headers: {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
	},
	body: JSON.stringify(data)
	})
    .then (res => {
        let commentDiv = document.querySelector("#my-comments-div")
        let thisComment = document.getElementById(`${comment_id}`)
        thisComment.innerText = `♥ ${e.target[0].value}`

        editCommentButton = document.createElement('button')
        editCommentButton.className="edit-comment-button"
        editCommentButton.id = `${comment_id}`
        editCommentButton.innerHTML = "Edit"
        editCommentButton.addEventListener('click', (e) => renderEditCommentForm(e, artwork, user)) 

        deleteCommentButton = document.createElement('button')
        deleteCommentButton.className="delete-comment-button"
        deleteCommentButton.id = `${comment_id}`
        deleteCommentButton.innerHTML = "Delete"
        deleteCommentButton.addEventListener('click', (e) => deleteComment(e, artwork, user)) 

        thisComment.appendChild(deleteCommentButton)
        thisComment.appendChild(editCommentButton)
        commentDiv.appendChild(thisComment)

        let editCommentForm = document.querySelector("#comment-form")
        editCommentForm.remove()
        let commentForm = document.createElement('div')
        commentForm.id = "comment-form"
        commentForm.innerHTML = `
        <form id='comment-form'>
        <input id="inputlg" type="text" placeholder="What would you like to say?">
        <input type='submit' class="btn btn-danger" id: "post-comment-button" style="float: right" value='Post Comment'>
        </form>
    `
        let artCard = document.querySelector('#add-comment-art-card')
        artCard.appendChild(commentForm)
        .addEventListener('submit', (e) => {
            e.preventDefault()
            postComment(e, artwork, user) 
        })
    })
}

const deleteComment = (e, artwork, user) => {
    let comment_id = e.currentTarget.id
	fetch(`http://localhost:3000/comments/${comment_id}`, {
	    method: 'DELETE'
	})
    .then (res => {
        let thisComment = document.getElementById(`${comment_id}`)
        thisComment.remove()
    })
}

const viewImage = (e, artwork, user) => {
    let viewImageCard = document.createElement("dialog");
    viewImageCard.id = "view-image-card"
    document.body.appendChild(viewImageCard)
    viewImageCard.showModal();

    viewImageCard.innerHTML = `
    
    <img class="view-image-card" id="view-image" src="${artwork.artwork_image}" alt=""></img>`

    // This was in viewImageCard.innerHTML: <a href="#" class="btn-default" id="view-close-button">☒</a>

    // let viewCloseButton = document.querySelector("#view-close-button")
    // viewCloseButton.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     viewImageCard.remove()
    // }) 

    viewImageCard.addEventListener('click', (e) => {
        if (e.target == viewImageCard) {
            e.preventDefault()
            viewImageCard.remove()
        } 
    })
}