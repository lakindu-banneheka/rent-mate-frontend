import Image from "next/image"

export function About() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Lifestyle image"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">About JustRent</h2>
            <p className="mb-6 text-muted-foreground">
              We connect people locally to rent anything and everything. Our platform makes it easy to list your items
              and find what you need, while building a sustainable sharing economy.
            </p>
            <p className="text-muted-foreground">
              Join thousands of users who are already part of our community and start earning or saving today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

