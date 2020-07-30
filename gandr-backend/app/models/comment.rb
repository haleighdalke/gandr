class Comment < ApplicationRecord

    belongs_to :artwork
    belongs_to :user

    def self.dedupe
        grouped = all.group_by{|comment| [comment.artwork_id, comment.content] }
        grouped.values.each do |duplicates|
          first_one = duplicates.shift
          duplicates.each{|double| double.destroy}
        end
    end

end
