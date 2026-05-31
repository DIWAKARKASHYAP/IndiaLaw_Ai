export default function Features() {
  const features = [
    "Ask Legal Questions",
    "Upload Documents",
    "AI Analysis",
    "Source-Based Answers",
  ];

  return (
    <section className="py-20 px-8">

      <h2 className="text-4xl font-bold text-center mb-10">
        Features
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {features.map((feature) => (
          <div
            key={feature}
            className="border rounded-xl p-6"
          >
            <h3 className="font-semibold text-xl">
              {feature}
            </h3>
          </div>
        ))}

      </div>
    </section>
  );
}