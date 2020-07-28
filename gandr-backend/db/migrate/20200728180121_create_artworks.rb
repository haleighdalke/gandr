class CreateArtworks < ActiveRecord::Migration[6.0]
  def change
    create_table :artworks do |t|
      t.string :artwork_title
      t.string :artwork_image
      t.string :artist_name
      t.string :artist_nationality
      t.string :artist_gender
      t.string :artwork_date
      t.string :artwork_classification

      t.timestamps
    end
  end
end
