class API::V1::EventsController < ApplicationController
  respond_to :json
  before_action :set_event, only: [:show, :update, :destroy, :generate_summary]
  before_action :set_bar, only: [:index, :show, :create]
  before_action :verify_jwt_token, only: [:create, :update, :destroy]

  def index
    @events = @bar ? @bar.events : Event.all
    render json: @events, status: :ok
  end

  def show
    if @event.flyer.attached?
      render json: @event.as_json.merge({ 
        image_url: url_for(@event.flyer), 
        thumbnail_url: url_for(@event.thumbnail) 
      }), status: :ok
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

  def generate_summary
    video_generator = VideoGeneratorService.new(@event)
    video_path = video_generator.generate_video
  
    if video_path
      video_url = "/events/#{@event.id}/summary_video.mp4"
      render json: { video_url: video_url }, status: :created
    else
      render json: { error: 'Error generating video summary' }, status: :internal_server_error
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Event not found' }, status: :not_found
  rescue => e
    Rails.logger.error("Error generating video: #{e.message}")
    render json: { error: 'Unexpected error occurred while generating video' }, status: :internal_server_error
  end
   

  private

  def set_event
    @event = Event.find_by(id: params[:id])
    render json: { error: 'Event not found' }, status: :not_found unless @event
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
