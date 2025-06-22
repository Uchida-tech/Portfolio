class Api::V1::ActiveRecallsController < Api::V1::BaseController
  include Pagination

  def index
    active_recalls = ActiveRecall.published.order(created_at: :desc).page(params[:page] || 1).per(10).includes(:user)
    render json: active_recalls, meta: pagination(active_recalls), adapter: :json
  end

  def show
    active_recall = ActiveRecall.published.find(params[:id])
    render json: active_recall
  end
end
