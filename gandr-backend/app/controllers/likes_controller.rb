class LikesController < ApplicationController

    require_relative '../services/like_serializer.rb'

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
        @like = Like.new(user_id: params["user_id"], artwork_id: params["artwork_id"])
        if @like.save
            ## what do we want to show?
            render json: LikeSerializer.new(like).to_serialized_json
        else 
            flash[:message] = @like.errors.full_messages
            ## what do we want to show?
            render json: LikeSerializer.new(like).to_serialized_json
        end
    end

    def destroy
        like = Like.find_by(id: params[:id])
        like.delete
        render json: LikeSerializer.new(like).to_serialized_json
    end

end
