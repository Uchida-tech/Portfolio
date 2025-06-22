FactoryBot.define do
  factory :active_recall do
    user
    title { Faker::Lorem.sentence }
    content { Faker::Lorem.paragraph }
    status { :published }
  end
end
