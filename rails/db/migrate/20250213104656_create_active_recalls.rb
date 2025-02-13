class CreateActiveRecalls < ActiveRecord::Migration[7.0]
  def change
    create_table :active_recalls do |t|
      t.string :title, comment: "タイトル"
      t.text :content, comment: "本文"
      t.integer :status, comment: "ステータス（10:未保存, 20:勉強中, 30:公開中）"
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
