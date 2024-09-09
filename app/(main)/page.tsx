import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-svh">
      <div>
        <h1 className="text-2xl text-center font-bold mb-4">
          画像生成コンポーネント選択
        </h1>
        <div className="flex space-x-4 mb-8">
          <Link href="/one">
            <Button variant="outline">モデル固定</Button>
          </Link>
          <Link href="/select">
            <Button variant="outline">モデル選択</Button>
          </Link>
          <Link href="/compare">
            <Button variant="outline">モデル比較</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
