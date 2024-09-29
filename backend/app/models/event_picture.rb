class EventPicture < ApplicationRecord
  belongs_to :event
  belongs_to :user
  has_one_attached :picture
  has_many :tags
  has_many :tagged_users, through: :tags, source: :user

  validates :picture, presence: true

  def thumbnail
    picture.variant(resize_to_limit: [100, 100]).processed
  end
end

class Tag < ApplicationRecord
  belongs_to :event_picture
  belongs_to :user
end

class User < ApplicationRecord
  has_many :tags
  has_many :tagged_pictures, through: :tags, source: :event_picture
end
