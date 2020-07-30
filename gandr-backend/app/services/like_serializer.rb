class LikeSerializer
    
    def initialize(like_object)
        @like = like_object
    end
     
    def to_serialized_json
        @like.to_json(:except => [:updated_at, :created_at])
    end

end