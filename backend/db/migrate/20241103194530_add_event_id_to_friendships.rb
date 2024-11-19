class AddEventIdToFriendships < ActiveRecord::Migration[7.1]
  def change
    add_reference :friendships, :event, foreign_key: true
  end
end
