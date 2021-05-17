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

Twitter投稿を全文検索できるツールです。形態素解析とn-gramを併用したインデックスにより、従来のTwitter検索では見つかりづらかった日本語ツイートも高精度で検出できます。

## 構成
Yarn v2を使ったmonorepoです。運用はdocker-composeで管理しています。

### [フロントエンド](packages/web)
Nuxt.js with TypeScriptのSPAです。

### [APIサーバー](packages/api)
Node.js with TypeScriptのREST APIサーバーです。フレームワークにはFastify、ORMにはPrismaを採用しています。

### 検索サーバー
PostgreSQL + PGroongaを採用しています。  
以前はElasticsearch + Sudachiを使用していましたが、負荷が大きく限られたリソースでの運用が困難だったため、現在の構成に移行しました。
