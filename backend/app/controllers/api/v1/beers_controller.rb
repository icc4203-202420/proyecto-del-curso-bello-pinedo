class API::V1::BeersController < ApplicationController
  include ImageProcessing
  include Authenticable

  respond_to :json
  before_action :set_beer, only: [:show, :update, :destroy, :bars] # Agregamos :bars aquí
  before_action :verify_jwt_token, only: [:create, :update, :destroy]

  # GET /beers
  def index
    @beers = Beer.all
    render json: { beers: @beers }, status: :ok
  end

  # GET /beers/:id
  def show
    if @beer.image.attached?
      render json: @beer.as_json.merge({ 
        image_url: url_for(@beer.image), 
        thumbnail_url: url_for(@beer.thumbnail)}),
        status: :ok
    else
      render json: { beer: @beer.as_json }, status: :ok
    end 
  end

  # POST /beers
  def create
    @beer = Beer.new(beer_params.except(:image_base64))
    handle_image_attachment if beer_params[:image_base64]

    if @beer.save
      render json: { beer: @beer, message: 'Beer created successfully.' }, status: :created
    else
      render json: @beer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /beers/:id
  def update
    handle_image_attachment if beer_params[:image_base64]

    if @beer.update(beer_params.except(:image_base64))
      render json: { beer: @beer, message: 'Beer updated successfully.' }, status: :ok
    else
      render json: @beer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /beers/:id
  def destroy
    @beer.destroy
    head :no_content
  end

  # GET /beers/:id/bars
  def bars
    @bars = @beer.bars # Asegúrate de que @beer se haya establecido correctamente
    if @bars.present?
      render json: { bars: @bars }, status: :ok
    else
      render json: { error: "No bars found serving this beer" }, status: :not_found
    end
  end
  
  private

  def set_beer
    @beer = Beer.find_by(id: params[:id])
    unless @beer
      render json: { error: 'Beer not found' }, status: :not_found
    end
  end 

  def beer_params
    params.require(:beer).permit(:name, :beer_type, 
      :style, :hop, :yeast, :malts, 
      :ibu, :alcohol, :blg, :brand_id, :avg_rating,
      :image_base64)
  end

  def handle_image_attachment
    decoded_image = decode_image(beer_params[:image_base64])
    @beer.image.attach(io: decoded_image[:io], 
      filename: decoded_image[:filename], 
      content_type: decoded_image[:content_type])
  end 
  
  def verify_jwt_token
    authenticate_user!
    head :unauthorized unless current_user
  end  
end
