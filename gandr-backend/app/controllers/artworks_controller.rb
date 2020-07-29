require_relative '../services/artwork_serializer.rb'

class ArtworksController < ApplicationController

  # For use with FastJsonapi::ObjectSerializer
    # def index
    #     artworks = Artwork.all
    #     render json: ArtworkSerializer.new(artworks).serializable_hash
    # end
    
    def show
      artwork = Artwork.find_by(id: params[:id])
      render json: ArtworkSerializer.new(artwork).to_serialized_json
    end

    def index
      artworks = Artwork.all
      render json: ArtworkSerializer.new(artworks).to_serialized_json
    end

end
