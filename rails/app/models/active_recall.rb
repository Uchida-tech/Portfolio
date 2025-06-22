class ActiveRecall < ApplicationRecord
  belongs_to :user
  has_many :recalls, dependent: :destroy
  enum :status, { unsaved: 10, studying: 20, published: 30 }
  validates :title, :content, presence: true, if: :published?
  validate :verify_only_one_unsaved_status_is_allowed

  private

    def verify_only_one_unsaved_status_is_allowed
      if unsaved? && user.active_recalls.unsaved.present?
        raise StandardError, "未保存の記事は複数保有できません"
      end
    end
end
