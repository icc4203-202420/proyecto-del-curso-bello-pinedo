Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # Or specify your frontend's origin, e.g. 'https://rqusxdc-anonymous-8081.exp.direct'
    
    resource '*',
    headers: :any,
    methods: %i[get post put patch delete options head],
    expose: [:Authorization]

  end
end
