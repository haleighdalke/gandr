class LikeSerializer
    
    def initialize(like_object)
        @like = like_object
    end
     
    def to_serialized_json
        options = {
            include: {
                user: {},
                artwork: {}
            },
            except: [:user_id, :artwork_id, :updated_at, :created_at]
        }
        @like.to_json(options)
    end

end