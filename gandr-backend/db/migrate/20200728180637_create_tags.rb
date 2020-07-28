class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.integer :artworks_tag_id

      t.timestamps
    end
  end
end
