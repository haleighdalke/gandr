class CommentsController < ApplicationController

    def show
        comment = Comment.find_by(id: params[:id])
        render json: CommentSerializer.new(comment).to_serialized_json
      end
  
      def index
        comments = Comment.all
        render json: CommentSerializer.new(comments).to_serialized_json
      end
      
    def new 
        comment = Comment.new
    end

    def create
        @comment = Comment.new(user_id: params["user_id"], artwork_id: params["artwork_id"], content: params["content"])
        if @comment.save
            ## what do we want to show?
            render json: CommentSerializer.new(comment).to_serialized_json
        else 
            flash[:message] = @comment.errors.full_messages
            ## what do we want to show?
            render json: CommentSerializer.new(comment).to_serialized_json
        end
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.delete
        render json: CommentSerializer.new(comment).to_serialized_json
    end

end
