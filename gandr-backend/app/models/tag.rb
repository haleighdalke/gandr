class Tag < ApplicationRecord

    has_many :artworks_tags
    has_many artworks, through: :artworks_tags
    
end
