import { notFound } from "next/navigation"
import { emojiCoins } from "@/app/components/effects/MovingBackground/geometries/emojis"
import EmojiScene from "./EmojiScene"

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(emojiCoins).map(name => ({ name }))
}

export default function Emoji({ params }: { params: { name: string } }) {
  if (!(params.name in emojiCoins)) {
    notFound()
  }

  return (
    <main>
      <EmojiScene name={params.name} />
    </main>
  );
}
