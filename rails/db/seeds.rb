ActiveRecord::Base.transaction do
  user1 = User.create!(name: "uchida", email: "test1@example.com", password: "password", confirmed_at: Time.current)

  user2 = User.create!(name: "satoshi", email: "test2@example.com", password: "password", confirmed_at: Time.current)

  15.times do |i|
    ActiveRecall.create!(title: "テストタイトル1-#{i}", content: "テスト本文1-#{i}", status: :published, user: user1)
    ActiveRecall.create!(title: "テストタイトル2-#{i}", content: "テスト本文2-#{i}", status: :published, user: user2)
  end
end
