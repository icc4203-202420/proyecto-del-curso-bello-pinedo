class API::V1::FriendshipsController < ApplicationController
  respond_to :json
  before_action :set_user, only: [:index, :create]

  def index
    @friends = Friendship.where(user_id: params[:user_id])
    render json: { friendships: @friends }, status: :ok
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
    params.require(:friendship).permit(:friend_id, :bar_id)
  end
end