class API::V1::EventsController < ApplicationController

    include ImageProcessing
    include Authenticable

    respond_to :json
    before_action :set_event, only: [:show, :update, :destroy]
    before_action :verify_jwt_token, only: [:create, :update, :destroy]

    def index
      @events = Event.all
      render json: @events , status: :ok
    end

  def show
    if @event.flyer.attached?
      render json: @event.as_json.merge({ 
        image_url: url_for(@event.flyer), 
        thumbnail_url: url_for(@event.thumbnail) }),
        status: :ok
    else
      render json: { event: @event.as_json }, status: :ok
    end
  end

  def create
    @event = @bar.events.build(event_params)
    handle_image_attachment if params[:event][:flyer]
    
    if @event.save
      render json: @event.id, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    handle_image_attachment if params[:event][:flyer]

    if @event.update(event_params)
      render json: @event.id, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event.destroy
    head :no_content
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def set_bar
    @bar = Bar.find(params[:bar_id]) if params[:bar_id]
  end

  def event_params
    params.require(:event).permit(:name, :description, :date, :bar_id, :start_date, :end_date, :flyer)
  end

  def handle_image_attachment
    if params[:event][:flyer].present?
      @event.flyer.attach(params[:event][:flyer])
    end
  end

  def verify_jwt_token
    authenticate_user!
    head :unauthorized unless current_user
  end  
end
