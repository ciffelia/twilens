<h1 align="center">
  twilens
</h1>

<p align="center">
  Full-text search for your tweets.
</p>

<p align="center">
  <a href="https://github.com/ciffelia/twilens/actions?query=workflow%3ACI+branch%3Amaster"><img src="https://github.com/ciffelia/twilens/workflows/CI/badge.svg?branch=master" alt="CI Status"></a>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/15273128/118421000-1d53a680-b6fb-11eb-878f-28d02d143410.png" alt="検索画面" width="400" />
  <img src="https://user-images.githubusercontent.com/15273128/118421009-217fc400-b6fb-11eb-9b79-c59be706b7eb.png" alt="設定画面" width="400" />
</p>

---

Twitter 投稿を全文検索できるツールです。形態素解析と n-gram を併用したインデックスにより、従来の Twitter 検索では見つかりづらかった日本語ツイートも高精度で検出できます。

## 構成

Yarn v2 を使った monorepo です。運用は docker-compose で管理しています。

### [フロントエンド](packages/web)

Nuxt.js with TypeScript の SPA です。

### [API サーバー](packages/api)

Node.js with TypeScript の REST API サーバーです。フレームワークには Fastify、ORM には Prisma を採用しています。

### 検索サーバー

PostgreSQL + PGroonga を採用しています。  
以前は Elasticsearch + Sudachi を使用していましたが、負荷が大きく限られたリソースでの運用が困難だったため、現在の構成に移行しました。
