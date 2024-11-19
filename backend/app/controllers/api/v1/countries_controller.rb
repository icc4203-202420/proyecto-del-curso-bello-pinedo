class API::V1::CountriesController < ApplicationController
  before_action :set_country, only: [:show, :update, :destroy]

  # GET /countries
  def index
    @countries = Country.all
    render json: @countries, status: :ok
  end

  # GET /countries/:id
  def show
    render json: @country, status: :ok
  end

  # POST /countries
  def create
    @country = Country.new(country_params)
    if @country.save
      render json: @country, status: :created
    else
      render json: @country.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /countries/:id
  def update
    if @country.update(country_params)
      render json: @country, status: :ok
    else
      render json: @country.errors, status: :unprocessable_entity
    end
  end

  # DELETE /countries/:id
  def destroy
    @country.destroy
    head :no_content
  end

  private

  def set_country
    @country = Country.find(params[:id])
    render json: { error: 'Country not found' }, status: :not_found unless @country
  end

  def country_params
    params.require(:country).permit(:name)
  end
end