class ApiLink

    def self.get_data(artwork)
        url = "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=#{artwork}"
        res = RestClient.get(url)
        data = res.body
        json_converted = JSON.parse(data)
        json_converted["objectIDs"].map do |object_id|
            url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/#{object_id}"
            res = RestClient.get(url)
            data = res.body
            json_converted = JSON.parse(data)
            # byebug
            artwork = Artwork.create(artwork_met_id: json_converted["objectID"], artwork_title: json_converted["title"], artwork_image: json_converted["primaryImage"], artist_name: json_converted["artistDisplayName"], artist_nationality: json_converted["artistNationality"], artist_gender: json_converted["artistGender"], artwork_date: json_converted["objectDate"], artwork_classification: json_converted["classification"])
            # byebug
            if artwork.artist_gender == ""
                artwork.artist_gender = "Male"
            end
            artwork.save
            # byebug
        end
    end

    def self.create_individual_artworks(data)
        json_converted = JSON.parse(data)
        artwork = Artwork.create(artwork_met_id: json_converted["objectID"], artwork_title: json_converted["title"], artwork_image: json_converted["primaryImage"], artist_name: json_converted["artistDisplayName"], artist_nationality: json_converted["artistNationality"], artist_gender: json_converted["artistGender"], artwork_date: json_converted["objectDate"], artwork_classification: json_converted["classification"])
        if artwork.artist_gender == ""
            artwork.artist_gender = "Male"
        end
        artwork.save
    end
end