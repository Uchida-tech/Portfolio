class Api::V1::Current::RecallsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_active_recall
  before_action :ensure_post_owner, only: [:create]

  def index
    recalls = @active_recall.recalls.order(created_at: :desc)
    render json: recalls
  end

  def create
    recall = @active_recall.recalls.new(recall_params)
    recall.user = current_user
    if recall.save
      render json: recall, status: :created
    else
      render json: { error: "コメントを投稿できません" }, status: :unprocessable_entity
    end
  end

  private

  # 特定の投稿を取得するための処理
  def set_active_recall
    @active_recall = ActiveRecall.find(params[:active_recall_id])
  end

  def recall_params
    params.require(:recall).permit(:content)
  end

  def ensure_post_owner
    unless @active_recall.user == current_user
      render json: { error: "投稿者のみコメント可能です" }, status: :forbidden
    end
  end
end
