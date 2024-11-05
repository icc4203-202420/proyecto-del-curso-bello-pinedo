# app/services/video_generator_service.rb
require 'fileutils'

class VideoGeneratorService
  def initialize(event)
    @event = event
    @output_path = Rails.root.join("public", "events", @event.id.to_s, "summary_video.mp4")
    @image_paths = event.event_pictures.map { |pic| local_file_path(pic.picture) }
  end

  def generate_video
    output_dir = File.dirname(@output_path)
    FileUtils.mkdir_p(output_dir) unless Dir.exist?(output_dir)
  
    # Create input.txt file with duration for each image
    input_file = Rails.root.join("tmp", "input.txt")
    File.open(input_file, "w") do |file|
      @image_paths.each do |image_path|
        file.puts "file '#{image_path}'"
        file.puts "duration 3"
      end
      file.puts "file '#{@image_paths.last}'" if @image_paths.any?
    end
  
    # FFmpeg command with resolution scaling to nearest even dimensions
    command = "ffmpeg -f concat -safe 0 -i '#{input_file}' -vf 'scale=ceil(iw/2)*2:ceil(ih/2)*2' -c:v libx264 -pix_fmt yuv420p #{@output_path}"
    system(command)
  ensure
    FileUtils.rm(input_file) if File.exist?(input_file)
  end

  private

  # Método para obtener la ruta física del archivo almacenado localmente en Active Storage
  def local_file_path(attachment)
    ActiveStorage::Blob.service.path_for(attachment.key)
  rescue => e
    Rails.logger.error("Error retrieving file path for attachment #{attachment.id}: #{e.message}")
    nil
  end
end
