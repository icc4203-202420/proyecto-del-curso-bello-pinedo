class EventPicture < ApplicationRecord
  belongs_to :event
  belongs_to :user
  has_one_attached :picture
  has_many :tags
  has_many :tagged_users, through: :tags, source: :user

  validates :picture, presence: true
  validates :user, presence: true

  def thumbnail
    picture.variant(resize_to_limit: [100, 100]).processed
  end

  after_create_commit { broadcast_new_event_picture }

  private

  def broadcast_new_event_picture
    ActionCable.server.broadcast "feed_channel", {
      id: id,
      event_id: event_id,
      bar_id: event.bar_id,
      barName: event.bar.name,
      name: event.name,
      description: event.description,
      user_id: user_id,
      userName: user.handle,
      url: Rails.application.routes.url_helpers.rails_blob_url(picture, only_path: true),
      thumbnail_url: Rails.application.routes.url_helpers.rails_representation_url(thumbnail, only_path: true),
      created_at: created_at,
      country_id: event.bar.address.country.id,
      countryName: event.bar.address.country.name,
      type: 'event'
    }
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
