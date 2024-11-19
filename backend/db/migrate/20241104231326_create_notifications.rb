class CreateNotifications < ActiveRecord::Migration[7.1]
  def change
    create_table :notifications do |t|
      t.references :user, null: false, foreign_key: true
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.string :notification_type
      t.text :message
      t.boolean :read

      t.timestamps
    end
  end
end
