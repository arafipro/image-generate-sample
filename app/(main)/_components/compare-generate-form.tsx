"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { models } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  prompt: z.string().trim().min(1, {
    message: "プロンプトを入力してください。",
  }),
});

export default function CompareGenerateForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<{
    [key: string]: string;
  }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setGeneratedImages({});

    try {
      for (const model of models) {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: values.prompt, model }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setGeneratedImages((prev) => ({ ...prev, [model]: url }));
        } else {
          console.error(`画像生成に失敗しました (${model})`);
        }
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (model: string) => {
    const url = generatedImages[model];
    if (url) {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // Blobから新しいURLを作成
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${model}.png`;

          // クリックイベントをシミュレート
          link.dispatchEvent(new MouseEvent("click"));

          // URLを解放
          window.URL.revokeObjectURL(url);
        });
    }
  };

  // const handleDownload = () => {
  //   if (imageUrl) {
  //     // Blobを取得
  //     fetch(imageUrl)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         // Blobから新しいURLを作成
  //         const url = window.URL.createObjectURL(blob);
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.download = "generated-image.png";

  //         // クリックイベントをシミュレート
  //         link.dispatchEvent(new MouseEvent("click"));

  //         // URLを解放
  //         window.URL.revokeObjectURL(url);
  //       });
  //   }
  // };
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-2">モデル比較</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="画像を生成するためのテキストを入力してください"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "生成中..." : "全モデルで生成"}
          </Button>
        </form>
      </Form>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model) => (
          <div key={model} className="border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">{model}</h3>
            {generatedImages[model] && (
              <div className="relative">
                <Image
                  src={generatedImages[model]}
                  alt={`${model}で生成された画像`}
                  width={512}
                  height={512}
                />
                <Button
                  onClick={() => handleDownload(model)}
                  className="absolute bottom-2 right-2 p-2"
                  variant="secondary"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
