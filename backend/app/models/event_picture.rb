class EventPicture < ApplicationRecord
  belongs_to :event
  belongs_to :user
  has_one_attached :picture

  validates :picture, presence: true

  def thumbnail
    picture.variant(resize_to_limit: [100, 100]).processed
  end
end
