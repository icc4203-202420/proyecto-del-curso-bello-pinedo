FactoryBot.define do
  factory :notification do
    user { nil }
    sender { nil }
    notification_type { "MyString" }
    message { "MyText" }
    read { false }
  end
end
