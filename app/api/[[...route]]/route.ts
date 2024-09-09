import { getRequestContext } from "@cloudflare/next-on-pages";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono<{ Bindings: CloudflareEnv }>().basePath("/api");

app.post("/", async (c) => {
  const { env } = getRequestContext();
  const { model, prompt } = await c.req.json<Input>();
  const inputs = {
    prompt: prompt,
  };

  const response = await env.AI.run(
    model ?? "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs
  );

  return new Response(response, {
    headers: {
      "content-type": "image/png",
      "Content-Disposition": 'attachment; filename="generated-image.png"',
    },
  });
});

export const POST = handle(app);
