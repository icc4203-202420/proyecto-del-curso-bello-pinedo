class API::V1::EventPicturesController < ApplicationController
  before_action :set_event
  before_action :verify_jwt_token, only: [:create]

  # POST /events/:event_id/event_pictures
  def create
    Rails.logger.info "Parameters received: #{params.inspect}"  # Añade esto para ver los parámetros recibidos
    event = Event.find(params[:event_id])
    event_picture = event.event_pictures.build
    event_picture.picture.attach(params[:image])
  
    if event_picture.save
      render json: { message: 'Image uploaded successfully' }, status: :created
    else
      render json: { error: event_picture.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end

  def event_picture_params
    params.require(:event_picture).permit(:image)
  end

  def verify_jwt_token
    authenticate_user!
    head :unauthorized unless current_user
  end
end
