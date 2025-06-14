import Head from 'next/head';
import Link from 'next/link';
import ImagePreview from '@/components/ImagePreview';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Head>
        <title>ImageRenamer Pro</title>
        <meta name="description" content="一括画像リネーム＆圧縮変換ツール" />
      </Head>

      <header className="p-6 text-center text-2xl font-bold">
        ImageRenamer Pro
      </header>

      <main className="flex flex-col items-center gap-6 px-4">
        <h1 className="text-4xl font-bold">画像リネームを、もっとシンプルに。</h1>
        <p className="text-lg max-w-xl text-center">
          画像をドラッグ＆ドロップするだけで、連番リネーム・形式変換・圧縮が一括でできます。
        </p>
        <ImagePreview />
        <div className="mt-4 flex gap-4">
          <Link href="/terms" className="underline">利用規約</Link>
          <Link href="/privacy" className="underline">プライバシーポリシー</Link>
        </div>
      </main>
    </div>
  );
}
