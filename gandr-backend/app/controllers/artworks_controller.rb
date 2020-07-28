require_relative '../services/artwork_serializer.rb'

class ArtworksController < ApplicationController

    def index
        artworks = Artwork.all
        render json: ArtworkSerializer.new(artworks).serializable_hash
    end
    
    def show
      artwork = Artwork.find_by(id: params[:id])
      render json: ArtworkSerializer.new(artwork).serializable_hash
    end

end
