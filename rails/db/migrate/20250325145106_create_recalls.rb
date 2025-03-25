class CreateRecalls < ActiveRecord::Migration[7.2]
  def change
    create_table :recalls do |t|
      t.text :content, comment: "本文"
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
