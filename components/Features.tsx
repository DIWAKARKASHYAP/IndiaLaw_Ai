export default function Features() {
  const features = [
    {
      title: "Ask Legal Questions",
      description:
        "Get easy-to-understand explanations for common legal issues in India.",
    },
    {
      title: "Upload Documents",
      description:
        "Upload legal PDFs and quickly extract text for AI-assisted review.",
    },
    {
      title: "Section-Aware Responses",
      description:
        "Answers prioritize relevant Acts and sections whenever reasonably available.",
    },
    {
      title: "Beginner-Friendly Guidance",
      description:
        "Clear explanations, practical next steps, and safety disclaimers by default.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
        Built for legal clarity
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
        Everything on NyayaAI is designed to make Indian law easier to navigate.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="text-xl font-semibold tracking-tight">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}