class User < ApplicationRecord

    has_many :likes
    has_many :comments
    has_many :artworks, through: :likes
    has_many :artworks, through: :comments

end
