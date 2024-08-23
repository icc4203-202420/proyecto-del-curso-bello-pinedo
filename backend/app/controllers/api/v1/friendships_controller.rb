class API::V1::FriendshipsController < ApplicationController
  before_action :set_user

  def index
    @friends = @user.friends
    render json: @friends, status: :ok
  end

  def create
    @friend = User.find_by(id: friendship_params[:friend_id])

    if @friend && @user != @friend
      @user.friends << @friend unless @user.friends.include?(@friend)
      render json: { message: "Friend added successfully" }, status: :ok
    else
      render json: { error: "Invalid friend or self-friendship not allowed" }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def friendship_params
    params.require(:friendship).permit(:friend_id)
  end
end