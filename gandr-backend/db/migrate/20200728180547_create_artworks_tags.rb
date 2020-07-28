class CreateArtworksTags < ActiveRecord::Migration[6.0]
  def change
    create_table :artworks_tags do |t|
      t.integer :tag_id
      t.integer :artwork_id

      t.timestamps
    end
  end
end
