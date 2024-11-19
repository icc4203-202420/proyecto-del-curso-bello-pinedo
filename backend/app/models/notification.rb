class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :sender, class_name: 'User', foreign_key: :sender_id

  validates :notification_type, presence: true
  validates :message, presence: true
end
