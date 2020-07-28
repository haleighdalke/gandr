class ArtworkSerializer
    include FastJsonapi::ObjectSerializer
    
    attributes :artwork_met_id, :artwork_title, :artwork_image, :artist_name, :artist_nationality, :artist_gender, :artwork_date, :artwork_classification

end