class API::V1::ReviewsController < ApplicationController
  respond_to :json
  before_action :set_user, only: [ :create]
  before_action :set_review, only: [:show, :update, :destroy]

  def index
    @reviews = Review.includes(:user).all
    reviews_with_handles = @reviews.map do |review|
      {
        id: review.id,
        text: review.text,
        rating: review.rating,
        created_at: review.created_at,
        updated_at: review.updated_at,
        user_id: review.user_id,
        beer_id: review.beer_id,
        user_handle: review.user.handle
      }
    end
    render json: { reviews: reviews_with_handles }, status: :ok
  end

  def show
    if @review
      render json: { review: @review }, status: :ok
    else
      render json: { error: "Review not found" }, status: :not_found
    end
  end

  def create
    @review = @user.reviews.build(review_params)
    if @review.save
      review_data = {
      id: @review.id,
      text: @review.text,
      rating: @review.rating,
      beer_id: @review.beer_id,
      user_id: @review.user_id,
      beerName: @review.beer.name,
      userName: @review.user.handle,
      created_at: @review.created_at,
      type: 'review'
    }
    
    ActionCable.server.broadcast('feed_channel', review_data)
    render json: @review, status: :created, location: api_v1_review_url(@review)
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def by_user
    user_id = params[:user_id]
    reviews = Review.where(user_id: user_id)
    reviews_with_handles = reviews.map do |review|
      {
        id: review.id,
        text: review.text,
        rating: review.rating,
        beerName: review.beer.name,
        beer_id: review.beer_id,
        user_id: review.user_id,
        userName: review.user.handle,
        created_at: review.created_at,
        type: 'review'
      }
    end
    render json: { reviews: reviews_with_handles }, status: :ok
  end

  def update
    if @review.update(review_params)
      render json: @review, status: :ok
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @review.destroy
    head :no_content
  end

  private

  def set_review
    @review = Review.find_by(id: params[:id])
    render json: { error: "Review not found" }, status: :not_found unless @review
  end

  def set_user
    @user = User.find(params[:user_id]) 
  end

  def review_params
    params.require(:review).permit(:id, :text, :rating, :beer_id)
  end
end
