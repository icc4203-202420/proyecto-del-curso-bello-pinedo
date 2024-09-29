class API::V1::EventPicturesController < ApplicationController
  before_action :set_event

  def index
    pictures = @event.event_pictures.map do |picture|
      {
        id: picture.id,
        url: url_for(picture.picture),
        thumbnail_url: url_for(picture.picture.variant(resize: "100x100"))  # Corregido el acceso a 'picture.picture'
      }
    end

    render json: { images: pictures }, status: :ok
  end
  
  def show_images
    if @event.event_pictures.attached?
      pictures = @event.event_pictures.map do |picture|
        {
          id: picture.id,
          url: url_for(picture.picture),
          thumbnail_url: url_for(picture.picture.variant(resize: "100x100"))
        }
      end
      render json: { images: pictures }, status: :ok
    else
      render json: { images: [] }, status: :ok
    end
  end

  def create
    # Suponiendo que el 'current_user' está configurado correctamente.
    user = current_user || User.first  # Esto debe ser ajustado según la lógica de autenticación.
    event_picture = @event.event_pictures.new(picture: event_picture_params[:image], user: user)

    if event_picture.save
      render json: { message: 'Image uploaded successfully' }, status: :created
    else
      Rails.logger.error("Failed to save event picture: #{event_picture.errors.full_messages}")
      render json: { errors: event_picture.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end

  def event_picture_params
    params.permit(:image)
  end
end
