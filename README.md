# 画像生成サンプル

## 技術選定

- TypeScript
- Next.js
- Hono
- Tailwind CSS
- shadcn/ui
- Cloudflare Pages
- Cloudflare Workers AI
  - @cf/lykon/dreamshaper-8-lcm
  - @cf/stabilityai/stable-diffusion-xl-base-1.0
  - @cf/bytedance/stable-diffusion-xl-lightning


## コンポーネント

### OneGenerateForm

AIモデルを固定

`app/(main)/_components/one-generate-form.tsx`

### SelectGenerateForm

AIモデルを選択

`app/(main)/_components/select-generate-form.tsx`

### CompareGenerateForm

AIモデルを比較

`app/(main)/_components/compare-generate-form.tsx `
