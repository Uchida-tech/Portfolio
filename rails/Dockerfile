#Render用

FROM ruby:3.3.7

# 必要なパッケージをインストール
RUN apt-get update -qq && apt-get install -y build-essential \
  libpq-dev \
  nodejs \
  yarn \
  vim

# 作業ディレクトリ作成
WORKDIR /myapp

# Gemfileだけ先にコピー（キャッシュ活用）
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# Bundler周りの整備
RUN gem update --system
RUN gem install bundler
RUN bundle install

# アプリケーション全体をコピー
COPY . /myapp

# entrypointスクリプトの設定
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# サーバー起動（RenderではCMD必須）
CMD ["bash", "-c", "rm -f tmp/pids/server.pid && bin/rails server -b 0.0.0.0 -p 3000"]
