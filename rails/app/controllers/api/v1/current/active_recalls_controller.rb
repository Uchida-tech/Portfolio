class Api::V1::Current::ActiveRecallsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    active_recalls = current_user.active_recalls.not_unsaved.order(created_at: :desc)
    render json: active_recalls
  end

  def show
    active_recall = current_user.active_recalls.find(params[:id])
    render json: active_recall
  end

  def create
    unsaved_active_recall = current_user.active_recalls.unsaved.first || current_user.active_recalls.create!(status: :unsaved)
    render json: unsaved_active_recall
  end

  def update
    active_recall = current_user.active_recalls.find(params[:id])
    active_recall.update!(active_recall_params)
    render json: active_recall
  end

  private

    def active_recall_params
      params.require(:active_recall).permit(:title, :content, :status)
    end
end
