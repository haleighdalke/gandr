class CommentSerializer
    
    def initialize(comment_object)
        @comment = comment_object
    end
     
    def to_serialized_json
        @comment.to_json(:except => [:updated_at, :created_at])
    end

end