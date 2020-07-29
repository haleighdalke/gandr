require './app/adapter/api_link.rb'

Artwork.destroy_all
# User.destroy_all
# Comment.destroy_all
# Like.destroy_all

require 'faker'
include Faker

# Artwork Seed Data
ApiLink.get_data("sunflowers")

# User Seed Data
# User.create(username: "haleigh_d" y7)
# User.create(username: "iona_b")
# 50.times do
#     User.create(username: Faker::Name.first_name.downcase)
# end

# Like Seed Data
# 100.times do
#     Like.create(user_id: User.all.sample.id, artwork_id: Artwork.all.sample.id)
# end

# Comment Seed Data
# comments = ["Wow, nice artwork!", "Cool!!", "<3 Looove! <3", "I love the artist's use of colour here.", "10/10", "This is really not to my taste...", "AMAZING!!", "Terrible :(", "A must-see!", "This is terrible art.", "Lovely", "Niiiice!!!", "Great", "I can't wait to see this in real life!"]

# 100.times do
#     Comment.create(user_id: User.all.sample.id, artwork_id: Artwork.all.sample.id, content: comments.sample)
# end

puts "Seeds done!"