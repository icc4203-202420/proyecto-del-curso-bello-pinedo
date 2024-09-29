class AddBarToFriendships < ActiveRecord::Migration[7.1]
  def change
    add_reference :friendships, :bar, foreign_key: true
  end
end
