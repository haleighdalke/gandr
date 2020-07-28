class ArtworkSerializer

    def initialize(artwork_object)
        @artwork = artwork_object
    end
     
    def to_serialized_json
        # What do we need to include?
        options = {
            include: [:artworks]
        }
        @artwork.to_json(options)
    end

end