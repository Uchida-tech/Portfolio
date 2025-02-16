require "rails_helper"

RSpec.describe "Api::V1::ActiveRecalls", type: :request do
  describe "GET api/v1/active_recalls" do
    subject { get(api_v1_active_recalls_path(params)) }

    before do
      create_list(:active_recall, 25, status: :published)
      create_list(:active_recall, 8, status: :studying)
    end

    context "page を params で送信しない時" do
      let(:params) { nil }

      it "1ページ目のレコード10件取得できる" do
        subject
        res = response.parsed_body
        expect(res.keys).to eq ["active_recalls", "meta"]
        expect(res["active_recalls"].length).to eq 10
        expect(res["active_recalls"][0].keys).to eq ["id", "title", "content", "created_at", "from_today", "user"]
        expect(res["active_recalls"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 1
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end

    context "page を params で送信した時" do
      let(:params) { { page: 2 } }

      it "該当ページ目のレコード10件取得できる" do
        subject
        res = response.parsed_body
        expect(res.keys).to eq ["active_recalls", "meta"]
        expect(res["active_recalls"].length).to eq 10
        expect(res["active_recalls"][0].keys).to eq ["id", "title", "content", "created_at", "from_today", "user"]
        expect(res["active_recalls"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 2
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/active_recalls/:id" do
    subject { get(api_v1_active_recall_path(active_recall_id)) }

    let(:active_recall) { create(:active_recall, status:) }

    context "active_recall_id に対応する active_recalls レコードが存在する時" do
      let(:active_recall_id) { active_recall.id }

      context "active_recalls レコードのステータスが公開中の時" do
        let(:status) { :published }

        it "正常にレコードを取得できる" do
          subject
          res = response.parsed_body
          expect(res.keys).to eq ["id", "title", "content", "created_at", "from_today", "user"]
          expect(res["user"].keys).to eq ["name"]
          expect(response).to have_http_status(:ok)
        end
      end

      context "active_recalls レコードのステータスが勉強中の時" do
        let(:status) { :studying }

        it "ActiveRecord::RecordNotFound エラーが返る" do
          expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end

    context "active_recall_id に対応する active_recalls レコードが存在しない時" do
      let(:active_recall_id) { 10_000_000_000 }

      it "ActiveRecord::RecordNotFound エラーが返る" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
