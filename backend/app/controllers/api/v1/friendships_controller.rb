class API::V1::FriendshipsController < ApplicationController
  respond_to :json
  before_action :set_user, only: [:index, :create]

  def index
    @friends = Friendship.where(user_id: params[:user_id]).includes(:friend)
    friends_with_handles = @friends.map do |friendship|
      {
        id: friendship.id,
        friend_id: friendship.friend_id,
        user_id: friendship.user_id,
        bar_id: friendship.bar_id,
        event_id: friendship.event_id,
        created_at: friendship.created_at,
        updated_at: friendship.updated_at,
        friend_handle: friendship.friend.handle
      }
    end
    render json: { friendships: friends_with_handles }, status: :ok
  end

  def create
    @friendship = @user.friendships.build(friendship_params)
    if @friendship.save
      render json: @friendship, status: :ok
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  def show
    @friendship = Friendship.find(params[:id])
    render json: @friendship, status: :ok
  end

  def destroy
    @friendship = Friendship.find(params[:id])
    if @friendship
      @friendship.destroy
      render json: { message: 'Friendship deleted successfully' }, status: :ok
    else
      render json: { error: 'Friendship not found' }, status: :not_found
    end
  end
  

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def friendship_params
    params.require(:friendship).permit(:friend_id, :event_id)
  end
end