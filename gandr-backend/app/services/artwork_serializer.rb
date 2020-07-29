class ArtworkSerializer
    # include FastJsonapi::ObjectSerializer
    
    # attributes :artwork_met_id, :artwork_title, :artwork_image, :artist_name, :artist_nationality, :artist_gender, :artwork_date, :artwork_classification

    def initialize(artwork_object)
        @artwork = artwork_object
    end
     
    def to_serialized_json
        @artwork.to_json(:except => [:updated_at, :created_at])
    end

end