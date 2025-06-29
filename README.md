# Portfolio 学習アプリ「ActiveRecall」


## アプリURL（2025/06/29 デプロイに成功しました！）
https://my-portfolio-five-lovat-o9u46t7cag.vercel.app/

## 概要

このアプリは「アクティブリコール（Active Recall）」という学習法を取り入れた、記憶定着を目的とした学習用Webアプリです。

ユーザーは「覚えたいこと」とその内容を投稿し、一定時間後に内容を思い出して再投稿することで記憶を強化できます。

## ポートフォリオの作成にあたって

以下のように学習を続けてきました。

### プログラミング基礎学習（2024年9月～12月）
- HTML基礎（Progate）
- CSS基礎（Progate）
- JavaScript基礎（Progate）
- Ruby基礎（Progate）
- Ruby on Rails基礎（Progate、Ruby on Railsチュートリアル）
- Rspec基礎（Qiita）
- Tailwind CSS基礎（Udemy）
- web知識基礎（Qiita）
- Git（Qiita）
- React基礎（書籍：React実践の教科書）

### AWS、Docker基礎学習（2025年1月）
- AWS基礎（Udemy）
- Docker基礎（Udemy）

### ポートフォリオ作成（2025年2月～3月）



## 使用技術

### フロントエンド
- HTML/CSS
- React
- Next.js
- TypeScript
- Tailwind CSS + DaisyUI

### バックエンド
- Ruby
- Ruby on Rails（APIモード）

### データベース
- PostgreSQL

### テスト・開発補助
- RSpec（テスト）
- Rubocop（静的解析）
- ESLint（TypeScriptの静的解析）

### 認証
- devise_token_auth

### インフラ・その他
- Docker / Docker Compose
- GitHub / GitHub Actions

## 機能一覧

- ユーザー登録機能
- ログイン機能
- 記事一覧表示（ページネーション付き）
- 記事詳細表示
- 新規記事投稿機能（記事を下書きで保存するか公開するかを選択できる）
- My記事表示
- My記事編集機能
- ActiveRecall機能
- フォームバリデーション（サインイン時にメールアドレス、パスワードの記入が不適切だとエラーメッセージを表示）
- 通知バー表示（サインイン時、記事の作成時、ActiveRecall時に通知バーを表示）

## 工夫した点・技術的チャレンジ

- **ActiveRecall機能：** 一画面でActiveRecallの実施とユーザーが記憶したいことの内容、過去のActiveRecallを確認できるようにしました。
- **UI/UX：** ユーザーが利用したいと思えるような見た目を意識した。勉強アプリなのでアプリのデザインはシンプルにしました。
- **Issue駆動開発：** 機能ごとにIssueを作成し、スムーズな開発とコード管理を実現しました。
- **Docker化：** チーム開発を意識してDockerでの環境構築方法を学習しました。



## 技術選定理由

- **Ruby / Ruby on Rails：** 日本語ドキュメントが豊富なため学習コストが低く、未経験でもMVC設計やREST APIの理解がしやすいため選定しました。
- **Next.js：** モダンな技術を学びたい思いがあったため使用しました。
- **DaisyUI：** Tailwind CSSと組み合わせることで、素早く一貫性のあるUIを構築可能なため採用しました。



## このポートフォリオの目的

未経験からWebエンジニアへの転職を目指しており、本アプリの作成を通じて以下の力を身につけました。

- フルスタック開発（環境構築〜実装）
- フレームワークの習熟（Next.js / Rails）
- Git・GitHubを用いた開発管理
- 技術習得への意欲と継続力

## スクリーンショット
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a44313c4-fc8d-4e72-af89-03449c0d0688" width="500"/></td>
    <td><img src="https://github.com/user-attachments/assets/1751458f-7f8c-4d51-8541-6e03bb639456" width="500"/></td>
  </tr>
  <tr>
    <td align="center">ホーム画面</td>
    <td align="center">サインイン画面</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4c046f25-e668-4b85-b93b-fbb8f17235c3" width="500"/></td>
    <td><img src="https://github.com/user-attachments/assets/803c0246-592b-45d8-9169-3fd5a67cfa92" width="500"/></td>
  </tr>
  <tr>
    <td align="center">サインアップ画面</td>
    <td align="center">letter_openwe_webを用いたメール送受信のテスト</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d0c341b8-605f-44e0-b309-b6337312c683" width="500"/></td>
    <td><img src="https://github.com/user-attachments/assets/366a27c2-f178-474a-92bb-d9e18402e522" width="500"/></td>
  </tr>
  <tr>
    <td align="center">通知バーの実装</td>
    <td align="center">バリデーション機能</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e004ba09-829a-4a84-844a-f68a414c5285" width="500"/></td>
    <td><img src="https://github.com/user-attachments/assets/26597b1d-bea8-422c-95a9-7797823e19bb" width="500"/></td>
  </tr>
  <tr>
    <td align="center">ページネーション機能</td>
    <td align="center">記事詳細画面</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/7ad56ba4-eeec-4798-bd1b-6767f8b720c4" width="500"/></td>
    <td><img src="https://github.com/user-attachments/assets/50c3738d-ca78-4abf-98fc-44a18cfa796e" width="500"/></td>
  </tr>
  <tr>
    <td align="center">新規記事投稿画面</td>
    <td align="center">My記事一覧画面</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/99a3ae39-0dde-4d88-b779-43862497f5d1" width="500"/></td>
    <td><img src="https://github.com/user-attachments/assets/66daff39-d805-475c-af37-f0e009ca3340" width="500"/></td>
  </tr>
  <tr>
    <td align="center">ActiveRecall画面</td>
    <td align="center">ActiveRecall後</td>
  </tr>
</table>

## 今後の実装予定
- Googleログイン機能
- ユーザーフォロー機能
- いいね機能
