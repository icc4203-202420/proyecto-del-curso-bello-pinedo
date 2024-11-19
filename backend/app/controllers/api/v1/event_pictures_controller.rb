class API::V1::EventPicturesController < ApplicationController
  before_action :set_event, only: [:create, :show_images, :tag_user, :show, :images_by_event]
  before_action :set_event_picture, only: [:show, :tag_user]

  def index
    pictures = EventPicture.all.map do |picture|
      {
        id: picture.id,
        url: url_for(picture.picture),
        user_id: picture.user.id,
        event_id: picture.event.id,
        description: picture.description,
        tags: picture.tagged_users.pluck(:id),
        thumbnail_url: url_for(picture.picture.variant(resize: "100x100"))
      }
    end

    render json: { images: pictures }, status: :ok
  end

  def images_by_event
    if @event
      pictures = @event.event_pictures.map do |picture|
        {
          id: picture.id,
          url: url_for(picture.picture),
          user_id: picture.user.id,
          event_id: picture.event.id,
          description: picture.description,
          tags: picture.tagged_users.pluck(:id),
          thumbnail_url: url_for(picture.picture.variant(resize: "100x100"))
        }
      end
  
      render json: { images: pictures }, status: :ok
    else
      render json: { error: "Event not found." }, status: :not_found
    end
  end  

  def by_user
    user_id = params[:user_id]
    pictures = EventPicture.where(user_id: user_id).map do |picture|
      {
        id: picture.id,
        event_id: picture.event.id,
        bar_id: picture.event.bar_id,
        barName: picture.event.bar.name,
        name: picture.event.name,
        description: picture.event.description,
        user_id: picture.user.id,
        userName: picture.user.handle,
        tags: picture.tagged_users.pluck(:id),
        url: url_for(picture.picture),
        thumbnail_url: url_for(picture.picture.variant(resize: "100x100")),
        created_at: picture.created_at,
        country_id: picture.event.bar.address.country.id,
        countryName: picture.event.bar.address.country.name,
        type: 'event'
      }
    end

    render json: { images: pictures }, status: :ok
  end

  def show_images
    pictures = @event.event_pictures.map do |picture|
      {
        id: picture.id,
        url: url_for(picture.picture),
        thumbnail_url: url_for(picture.picture.variant(resize: "100x100"))
      }
    end

    render json: { images: pictures }, status: :ok
  end

  def create
    # Validar si el user_id está presente en los parámetros
    unless params[:user_id]
      return render json: { error: "User ID is required." }, status: :unprocessable_entity
    end

    user = User.find_by(id: params[:user_id])
    unless user
      return render json: { error: "Invalid user ID." }, status: :not_found
    end

    # Crear la imagen asociada al evento
    event_picture = @event.event_pictures.new(
      picture: event_picture_params[:image],
      description: event_picture_params[:description],
      user: user
    )

    if event_picture.save
      # Asociar usuarios etiquetados opcionalmente
      if params[:tag_user_id].present?
        tagged_users = User.where(id: params[:tag_user_id]) # Busca solo los usuarios existentes
        event_picture.tagged_users << tagged_users
      end

      render json: {
        message: "Image uploaded successfully",
        picture_id: event_picture.id,
        tags: event_picture.tagged_users.pluck(:id, :handle)
      }, status: :created
    else
      render json: { errors: event_picture.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: {
      id: @event_picture.id,
      url: url_for(@event_picture.picture),
      user: { id: @event_picture.user.id, name: @event_picture.user.name },
      description: @event_picture.description,
      tags: @event_picture.tagged_users.pluck(:id, :handle)
    }
  end

  def tag_user
    user = User.find(params[:user_id])
    if @event_picture.tagged_users.include?(user)
      render json: { message: "User already tagged" }, status: :unprocessable_entity
    else
      @event_picture.tagged_users << user
      render json: { message: "User tagged successfully" }, status: :ok
    end
  end

  private

  def set_event
    Rails.logger.info("Looking for event with event_id=#{params[:event_id]} and bar_id=#{params[:bar_id]}")
    @event = Event.find_by(id: params[:event_id], bar_id: params[:bar_id])
    if @event.nil?
      Rails.logger.error("No event found for event_id=#{params[:event_id]} and bar_id=#{params[:bar_id]}")
      render json: { error: "Event not found." }, status: :not_found
    end
  end
  

  def event_picture_params
    # No incluye `tag_user_id` porque no es parte directa del modelo
    params.permit(:image, :description, :user_id)
  end

  def set_event_picture
    @event_picture = @event.event_pictures.find_by(id: params[:id])
    render json: { error: "Event picture not found." }, status: :not_found unless @event_picture
  end
end
