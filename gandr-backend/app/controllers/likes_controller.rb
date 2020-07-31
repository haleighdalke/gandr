class LikesController < ApplicationController

    require_relative '../services/like_serializer.rb'
    require_relative '../services/artwork_serializer.rb'

    def show
        like = Like.find_by(id: params[:id])
        render json: LikeSerializer.new(like).to_serialized_json
    end
    
    def index
        likes = Like.all
        render json: LikeSerializer.new(likes).to_serialized_json
    end

    def new 
        like = Like.new
    end

    def create
        like = Like.create(user_id: params["user_id"], artwork_id: params["artwork_id"])
        # byebug
        Like.dedupe
        # artworks = Artwork.all
        # changed return value to the json like instance
        render json: LikeSerializer.new(like).to_serialized_json
    end

    def destroy
        like = Like.find_by(id: params[:id])
        like.delete
        render json: LikeSerializer.new(like).to_serialized_json
    end

end
