export function Benefits() {
    const benefits = [
      {
        icon: "🏷️",
        title: "Access More",
        description: "Find everything you might need",
      },
      {
        icon: "💰",
        title: "Make The Money",
        description: "List things that you want",
      },
      {
        icon: "🤝",
        title: "Great Service",
        description: "Be part of our team of trust",
      },
    ]
  
    return (
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center">
                <span className="mb-4 text-4xl">{benefit.icon}</span>
                <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  