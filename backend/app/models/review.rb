class Review < ApplicationRecord
  belongs_to :user
  belongs_to :beer

  after_save :update_beer_rating
  after_destroy :update_beer_rating
  after_create_commit { broadcast_new_review }

  private

  def update_beer_rating
    beer.update_avg_rating
  end

  def broadcast_new_review
    ActionCable.server.broadcast "feed_channel", {
      id: id,
      text: text,
      rating: rating,
      user_id: user_id,
      beer_id: beer_id,
      created_at: created_at
    }
  end

end
