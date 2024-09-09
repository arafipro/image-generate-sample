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

export default function OneGenerateForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: values.prompt }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } else {
        console.error("画像生成に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      // Blobを取得
      fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          // Blobから新しいURLを作成
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "generated-image.png";

          // クリックイベントをシミュレート
          link.dispatchEvent(new MouseEvent("click"));

          // URLを解放
          window.URL.revokeObjectURL(url);
        });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-2">モデル固定</h2>
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
            {isLoading ? "生成中..." : "生成"}
          </Button>
        </form>
      </Form>
      {imageUrl && (
        <div className="mt-8 relative inline-block">
          <Image src={imageUrl} alt="生成された画像" width={512} height={512} />
          <Button
            onClick={handleDownload}
            className="absolute bottom-2 right-2 p-2"
            variant="secondary"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  );
}
