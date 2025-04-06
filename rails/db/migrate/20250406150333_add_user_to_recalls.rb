class AddUserToRecalls < ActiveRecord::Migration[7.2]
  def change
    add_reference :recalls, :user, null: false, foreign_key: true
  end
end
