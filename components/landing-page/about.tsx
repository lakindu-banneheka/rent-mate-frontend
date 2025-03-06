import Image from "next/image"
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import img4 from '../../images/img4.jpg';
import img5 from '../../images/img5.jpg';
import img6 from '../../images/img10.jpg';


export function About() {

  const images = [
    img1,img2,img3,img4,img5,img6
  ]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={img}
                  alt="Lifestyle image"
                  fill
                  className="object-cover"
                  // width={150}
                  // height=
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">About Rent Mate</h2>
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

