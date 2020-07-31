class Like < ApplicationRecord

    belongs_to :artwork
    belongs_to :user

    def self.dedupe
        grouped = all.group_by{|like| [like.artwork_id, like.user_id] }
        grouped.values.each do |duplicates|
          first_one = duplicates.shift
          duplicates.each{|double| double.destroy}
        end
    end
    
end
