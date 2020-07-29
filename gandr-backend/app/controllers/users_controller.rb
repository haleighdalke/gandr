class UsersController < ApplicationController

    require_relative '../services/user_serializer.rb'

    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user).to_serialized_json
    end
    
    def index
        users = User.all
        render json: UserSerializer.new(users).to_serialized_json
    end

end
