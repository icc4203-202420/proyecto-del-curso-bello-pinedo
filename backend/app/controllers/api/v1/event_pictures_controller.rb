class API::V1::EventPicturesController < ApplicationController
  include Authenticable  # Incluir el módulo que gestiona la autenticación JWT
  before_action :set_user  # Configurar el current_user basado en el JWT
  before_action :verify_jwt_token  # Verificar la validez del token JWT
  before_action :set_event

  def index
    pictures = @event.event_pictures.map do |picture|
      {
        id: picture.id,
        url: url_for(picture.picture), # Asegúrate de usar el nombre correcto del campo de la imagen
        thumbnail_url: url_for(picture.picture.variant(resize: "100x100"))
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
    event_picture = @event.event_pictures.new(user: current_user) # Asocia la imagen al usuario actual
    
    # Intenta adjuntar la imagen
    if params[:image].present?
      event_picture.picture.attach(params[:image])
    else
      render json: { errors: ['No image file provided'] }, status: :unprocessable_entity and return
    end

    # Intenta guardar el modelo
    if event_picture.save
      render json: { message: 'Image uploaded successfully' }, status: :created
    else
      # Imprime los errores detallados en el registro del servidor y devuelve los errores en la respuesta
      logger.error("Failed to save event picture: #{event_picture.errors.full_messages}")
      render json: { errors: event_picture.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end
end
