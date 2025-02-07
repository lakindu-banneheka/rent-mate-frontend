import Image from "next/image"
import { useRouter } from "next/navigation"
import img10 from '../../images/img10.jpeg';
import img3 from '../../images/img4.jpeg'

export function CTASection() {

  const router = useRouter();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={img3}
              alt="List your items"
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-8 text-center text-white">
              <h3 className="mb-4 text-3xl font-bold">List Your Assets</h3>
              <p className="mb-6">Make money from your items</p>
              {/* <Button variant="outline" className="bg-white text-black">
                Get Started
              </Button> */}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={img10}
              alt="Discover items"
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-8 text-center text-white">
              <h3 className="mb-4 text-3xl font-bold">Discover Items</h3>
              <p className="mb-6">Find what you need</p>
              {/* <Button onClick={()=>router.push('/browse')} variant="outline" className="bg-white text-black">
                Browse Now
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

