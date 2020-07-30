class CommentSerializer
    
    def initialize(comment_object)
        @comment = comment_object
    end
     
    def to_serialized_json
        options = {
            include: {
                user: {},
                artwork: {}
            },
            except: [:user_id, :artwork_id, :updated_at, :created_at]
        }
        @comment.to_json(options)
    end

end