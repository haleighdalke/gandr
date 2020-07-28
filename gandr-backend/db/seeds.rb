require './app/adapter/api_link.rb'

# Artwork Seed Data
# ApiLink.get_data("sunflowers")

# User Seed Data
User.create(username: "haleigh_d")
User.create(username: "iona_b")

# Like Seed Data
Like.create(user_id: User.sample.id, artwork_id: Artwork.sample.id)

# Comment Seed Data

puts "Seeds done!"

