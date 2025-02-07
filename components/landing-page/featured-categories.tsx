'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchCategories } from "@/lib/features/categorySlice";

export function FeaturedCategories() {

    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);
    // const isCategoryLoading = useSelector((state: RootState) => state.category.loading);
    const router = useRouter();

    useEffect(() => {
        const loadCategories = async () => {
            await dispatch(fetchCategories());
        };
        
            loadCategories();
    }, [dispatch]);


  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Featured Categories</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0,6).map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-lg">
              <Image
                src={category.imageUrl || "/placeholder.svg"}
                alt={category.name}
                width={400}
                height={300}
                className="aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">{category.name}</h3>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button onClick={()=>router.push('/categories')} variant="outline">View All Categories</Button>
        </div>
      </div>
    </section>
  )
}

