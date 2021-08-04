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
  <img src="https://user-images.githubusercontent.com/15273128/118421000-1d53a680-b6fb-11eb-878f-28d02d143410.png" alt="Search page" width="400" />
  <img src="https://user-images.githubusercontent.com/15273128/118421009-217fc400-b6fb-11eb-9b79-c59be706b7eb.png" alt="Settings page" width="400" />
</p>

---

twilens is a self-hosted web app to perform a full-text searches for your tweets. Its morphological and n-gram index allows you to detect tweets written in Japanese language, which are difficult to find on twitter.com search.

Twitter 投稿を全文検索できるツールです。形態素解析と n-gram を併用したインデックスにより、従来の Twitter 検索では見つかりづらかった日本語ツイートも高精度で発見できます。

## Usage

Currently not available.

## Architecture

Monorepo with Yarn (berry).

### [Front-end](packages/web)

Single page application built with Nuxt.js and TypeScript.

### [REST API server](packages/api)

REST API server built with Node.js and TypeScript. Uses Fastify and Prisma under the hood.

### Search back-end

PostgreSQL server with PGroonga extension.
