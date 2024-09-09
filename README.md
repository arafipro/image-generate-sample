# 画像生成サンプル

AIを使用して画像を生成するWebアプリケーション

## 技術スタック:
   - TypeScript
   - Next.js
   - Hono
   - Tailwind CSS
   - shadcn/ui
   - Cloudflare Pages
   - Cloudflare Workers AI

## 主要コンポーネント:
   - OneGenerateForm: 固定のAIモデルを使用して画像を生成
   - SelectGenerateForm: ユーザーがAIモデルを選択して画像を生成
   - CompareGenerateForm: 複数のAIモデルを比較して画像を生成

## 機能:
   - Cloudflare Workers AIを使用して画像生成APIを実装
   - テキストプロンプトを入力して画像を生成
   - 複数のAIモデルから選択可能
   - 生成された画像のダウンロード機能
   - 複数のモデルで同時に画像を生成し、比較可能
