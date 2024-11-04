# app/services/video_generator_service.rb
require 'open3'
require 'fileutils'
require 'open-uri'

class VideoGeneratorService
  def initialize(event)
    @event = event
    @images_path = Rails.root.join("tmp", "events", event.id.to_s, "images")
    @output_path = Rails.root.join("public", "events", event.id.to_s, "summary_video.mp4")
    FileUtils.mkdir_p(@images_path) # Crea el directorio temporal si no existe
  end

  def generate_video
    download_images # Descargar imágenes a la carpeta temporal

    # Comando ffmpeg para crear un video a partir de las imágenes
    command = "ffmpeg -framerate 1/3 -pattern_type glob -i '#{@images_path}/*.jpg' -c:v libx264 #{@output_path}"

    # Ejecuta el comando ffmpeg y captura errores
    stdout, stderr, status = Open3.capture3(command)

    if status.success?
      @output_path.to_s
    else
      Rails.logger.error("FFmpeg error: #{stderr}")
      nil
    end
  ensure
    FileUtils.rm_rf(@images_path) # Elimina el directorio temporal después de usarlo
  end

  private

  def download_images
    @event.event_pictures.each_with_index do |picture, index|
      image_url = Rails.application.routes.url_helpers.rails_blob_url(picture.picture, only_path: true)
      download_path = File.join(@images_path, "image_#{index}.jpg")
      URI.open(image_url) do |image|
        File.open(download_path, "wb") do |file|
          file.write(image.read)
        end
      end
    rescue => e
      Rails.logger.error("Error downloading images: #{e.message}")
      raise "Error downloading images"
    end
  end
end
