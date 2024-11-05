class CreateTags < ActiveRecord::Migration[7.1]
  def change
    create_table :tags do |t|
      t.references :event_picture, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
