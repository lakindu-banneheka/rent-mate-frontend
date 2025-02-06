import Image from "next/image"
import SearchBar from "../Header/search-bar"

export function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <Image
        src=""
        alt="Mountain landscape with overlaid polaroid images"
        fill
        className="object-cover brightness-95"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-32">
        <h1 className="mb-4 text-5xl font-bold text-white">
          Rent Anything
          <br />
          From Anyone
        </h1>
        <p className="mb-8 max-w-lg text-lg text-white/90">
          Access thousands of items locally and for sustainable living
        </p>
        <SearchBar />
      </div>
    </section>
  )
}

