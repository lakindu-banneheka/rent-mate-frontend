import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="List your items"
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-8 text-center text-white">
              <h3 className="mb-4 text-3xl font-bold">List Your Assets</h3>
              <p className="mb-6">Make money from your items</p>
              <Button variant="outline" className="bg-white text-black">
                Get Started
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Discover items"
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-8 text-center text-white">
              <h3 className="mb-4 text-3xl font-bold">Discover Items</h3>
              <p className="mb-6">Find what you need</p>
              <Button variant="outline" className="bg-white text-black">
                Browse Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

