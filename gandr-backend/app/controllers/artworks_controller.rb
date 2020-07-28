require_relative '../services/artwork_serializer.rb'

class ArtworksController < ApplicationController

    def index
        artworks = Artwork.all
        render json: ArtworkSerializer.new(artworks).to_serialized_json
      end
     
      def show
        artwork = Artwork.find_by(id: params[:id])
        render json: ArtworkSerializer.new(artwork).to_serialized_json
      end

end
