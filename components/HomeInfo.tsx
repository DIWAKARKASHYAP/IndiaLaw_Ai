const steps = [
  {
    title: "1) Ask your question",
    description:
      "Type your legal question in natural language, just like you would ask a person.",
  },
  {
    title: "2) Get structured response",
    description:
      "NyayaAI answers with legal context, sections when available, and beginner-friendly explanation.",
  },
  {
    title: "3) Decide your next step",
    description:
      "Use the response as guidance and consult a legal professional for case-specific advice.",
  },
];

const faqs = [
  {
    question: "Can this replace a lawyer?",
    answer:
      "No. NyayaAI provides general legal information and educational guidance only.",
  },
  {
    question: "Does it support Indian law specifically?",
    answer:
      "Yes. Responses are tailored for Indian legal context and commonly referenced Acts.",
  },
  {
    question: "Can I upload legal PDFs?",
    answer:
      "Yes. You can upload PDF documents and extract text to speed up legal review.",
  },
];

export default function HomeInfo() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:px-8 md:pb-20">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold tracking-tight">How it works</h3>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            A simple flow to help you understand legal topics faster.
          </p>
          <div className="mt-5 space-y-4">
            {steps.map((step) => (
              <div key={step.title} className="rounded-xl bg-slate-50 p-4">
                <h4 className="font-medium text-slate-900">{step.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold tracking-tight">Common questions</h3>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Quick answers before you start using NyayaAI.
          </p>
          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-slate-100 pb-4">
                <h4 className="font-medium text-slate-900">{faq.question}</h4>
                <p className="mt-1 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
