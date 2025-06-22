#!/bin/bash
set -e

# 初回起動時のDB準備（Renderは自動でDBを作らない）
bundle exec rails db:migrate

exec "$@"
