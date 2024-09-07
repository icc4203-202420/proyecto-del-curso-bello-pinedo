class Beer < ApplicationRecord
  belongs_to :brand
  has_many :countries, through: :brand
  has_many :breweries, through: :brand
  has_many :reviews, dependent: :destroy
  has_many :users, through: :reviews
  has_many :user_reviews, dependent: :destroy
  has_one_attached :image

  has_many :bars_beers
  has_many :bars, through: :bars_beers  
  
  validates :name, presence: true
  validates :image, content_type: { in: ['image/png', 'image/jpg', 'image/jpeg'],
                                    message: 'must be a valid image format' },
                    size: { less_than: 5.megabytes }       
  def thumbnail
    image.variant(resize_to_limit: [200, 200]).processed
  end

  def update_avg_rating
    if reviews.any?
      update(avg_rating: reviews.average(:rating).to_f)
    else
      update(avg_rating: 0.0)
    end
  end  
end
