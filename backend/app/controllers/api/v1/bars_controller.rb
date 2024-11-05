class API::V1::BarsController < ApplicationController
  include ImageProcessing
  include Authenticable

  respond_to :json
  before_action :set_bar, only: [:show, :update, :destroy]
  before_action :verify_jwt_token, only: [:create, :update, :destroy]

  def index
    @bars = Bar.all
    render json: { bars: @bars }, status: :ok
  end

  def show
    if @bar.image.attached?
      render json: @bar.as_json.merge({ 
        image_url: url_for(@bar.image), 
        thumbnail_url: url_for(@bar.thumbnail) }),
        status: :ok
    else
      render json: { bar: @bar.as_json }, status: :ok
    end
  end

  def create
    @bar = Bar.new(bar_params.except(:image_base64))
    handle_image_attachment if bar_params[:image_base64]

    if @bar.save
      render json: { bar: @bar, message: 'Bar created successfully.' }, status: :ok
    else
      render json: @bar.errors, status: :unprocessable_entity
    end
  end
  
  def update
    handle_image_attachment if bar_params[:image_base64]

    if @bar.update(bar_params.except(:image_base64))
      render json: { bar: @bar, message: 'Bar updated successfully.' }, status: :ok
    else
      render json: @bar.errors, status: :unprocessable_entity
    end
  end

  # Método para eliminar un bar existente
  def destroy
    if @bar.destroy
      render json: { message: 'Bar successfully deleted.' }, status: :no_content
    else
      render json: @bar.errors, status: :unprocessable_entity
    end
  end  

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_bar
    @bar = Bar.find_by(id: params[:id])
    render json: { error: 'Bar not found' }, status: :not_found unless @bar
  end

  def bar_params
    params.require(:bar).permit(
      :name, :latitude, :longitude, :image_base64, :address_id,
      address_attributes: [:user_id, :line1, :line2, :city, country_attributes: [:name]]
    )
  end

  def handle_image_attachment
    decoded_image = decode_image(bar_params[:image_base64])
    @bar.image.attach(io: decoded_image[:io], filename: decoded_image[:filename], content_type: decoded_image[:content_type])
  end  
end