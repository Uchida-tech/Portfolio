class CreateRecalls < ActiveRecord::Migration[7.2]
  def change
    create_table :recalls do |t|
      t.text :content, comment: "本文"
      # userテーブルとの関連付け
      t.references :user, null: false, foreign_key: true
      # active_recallsテーブルとの紐づけ(単数形に気をつける)
      t.references :active_recall, null: false, foreign_key: true
      t.timestamps
    end
  end
end
