class API::V1::FriendshipsController < ApplicationController

  include Authenticable
  before_action :set_user
  before_action :verify_jwt_token

  def index
    @friends = Friendship.where(user_id: @user.id)
    render json: @friends, status: :ok
  end

  def create
    @friendship = @user.friendships.build(friendship_params)
    render json: @friendship, status: :ok if @friendship.save
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def friendship_params
    params.require(:friendship).permit(:friend_id, :bar_id)
  end

  def verify_jwt_token
    authenticate_user!
    head :unauthorized unless current_user
  end  
  
end