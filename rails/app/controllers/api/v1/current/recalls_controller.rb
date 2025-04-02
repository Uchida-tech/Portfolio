class Api::V1::Current::RecallsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :ensure_post_owner, only: [:create]

  def create
    comment = Comment.new(comment_params)
    comment.user = current_user
    comment.post = Post.find(params[:post_id])

    if comment.save
      render json: comment, status: :created
    else
      render json: { error: "コメントを投稿できません" }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:recalls).permit(:recalls)
  end

  def ensure_post_owner
    active_recalls = current_user.active_recalls.find(params[:post_id])
    unless active_recalls.user == current_user
      render json: { error: "この投稿にはコメントできません" }, status: :forbidden
    end
  end
end
