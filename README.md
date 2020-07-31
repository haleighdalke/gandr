![gandr logo](gandr-frontend/images/gandr_logo.png)

## About

gandr is a JavaScript Single Page Application, with a Rails backend which allows users to browse a range of beautiful artworks from the Metropolitan Museum of Art, and to add comments and likes to their favorites. gandr was created by Haleigh Dalke and Iona Brabender for their Mod 3 Project as part of Flatiron School's immersive Software Engineering Program.


## Installation

Please find our repository here: https://github.com/haleighdalke/gandr .

To run gandr, first ensure that you are in the gandr-backend directory.

You can then run the following commands in your terminal:

```
bundle install          # to track and install the exact versions of ruby gems needed for gandr
rails db:migrate        # to run table migrations
rails db:seed           # to seed your database
rails server            # to start up your rails server
```

You should now cd into the gandr-frontend directory and run the following command in your terminal:

```
open index.html         # to open the index page in your browser.
```

## Using gandr

### Sign Up or Log In
<ul>
<li> If this is your first time using gandr, you'll need to sign up. Currently, only a username is required to get started.
<li> If you've used gandr before, you can simply enter your username to access the site.
</ul>

### View All Artworks
<ul>
<li> You can begin your art journey by taking a look through all of our artworks.
<li> To see a larger scale version of any image, simply click on it.
</ul>

### Like an Artwork
<ul>
<li> To like an artwork, click on the like button.
<li> The like button also displays how many likes that piece already has.
<li> Remove your like by clicking on the button a second time.
<li> See all of your liked artworks by clicking on "My Favorited" in the navbar.
</ul>

### Artwork Comments
<ul>
<li> To view all users' comments for a particular artwork, click on that piece's "View Comments" button.
<li> You can then view only your comments by clicking "My Comments".
<li> From there, you are free to post a new comment, or to edit or delete an existing comment.
<li> You can view all of the artwork you've commented on by clicking on "My Commented" in the navbar.
</ul>


## Contributors

**Haleigh Dalke**<br>
https://github.com/haleighdalke<br>
https://www.linkedin.com/in/haleigh-dalke-3b437612a/


**Iona Brabender**<br>
https://github.com/iona-b<br>
https://www.linkedin.com/in/iona-brabender/

## License

Please see license file included in the gandr directory.