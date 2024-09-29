class API::V1::AttendancesController < ApplicationController
  respond_to :json
  before_action :set_attendance, only: [:show, :update]
  
  def index
    @attendances = Attendance.all
    render json: @attendances, status: :ok
  end

  def indexAttendances
    @attendances = Attendance.where(user_id: params[:user_id], event_id: params[:event_id])
    render json: @attendances, status: :ok
  end

  def show
    @attendance = Attendance.find(params[:id])
    render json: @attendance, status: :ok
  end

  def create
    @attendance = Attendance.new(attendance_params)
    if @attendance.save
      render json: @attendance.id, status: :ok
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  def update
    if @attendance.update(attendance_params)
      render json: @attendance.id, status: :ok
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @attendance = Attendance.find(params[:id])
    @attendance.destroy
    head :no_content
  end
  private

  def set_attendance
    @attendance = Attendance.find(params[:id])
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def attendance_params
    params.require(:attendance).permit(:user_id, :event_id, :checked_in)
  end
end
