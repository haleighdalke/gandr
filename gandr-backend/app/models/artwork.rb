class Artwork < ApplicationRecord

    has_many :likes
    has_many :comments
    has_many :artworks_tags
    has_many :tags, through: :artworks_tags
    has_many :users, through: :likes
    has_many :users, through: :comments

end
