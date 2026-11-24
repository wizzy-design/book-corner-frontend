import { Suspense } from "react";
import type { Metadata } from "next";
import type { QuizQuestion } from "@/models/quiz";
import { getQuizQuestions } from "@/lib/api";
import QuizWizard from "@/components/QuizWizard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book Recommendation Quiz | Book Corner",
  description:
    "Answer a few quick questions to receive deterministic, personalized book recommendations tailored to your reading vibe.",
};

async function QuizContent() {
  let questions: QuizQuestion[] = [];
  try {
    const res = await getQuizQuestions();
    questions = Array.isArray(res?.data) ? res.data : [];
  } catch (error) {
    console.error("Failed to load quiz questions:", error);
  }

  return <QuizWizard questions={questions} />;
}

function QuizSkeleton() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse" aria-busy="true" aria-label="Loading quiz questions">
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex justify-between mb-3">
          <div className="h-3 w-24 rounded bg-zinc-200" />
          <div className="h-3 w-20 rounded bg-zinc-200" />
        </div>
        <div className="h-2 w-full rounded-full bg-zinc-100" />
      </div>
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10">
        <div className="h-3 w-16 rounded bg-zinc-200 mb-3" />
        <div className="h-7 w-3/4 rounded bg-zinc-200 mb-8" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 w-full rounded-2xl bg-zinc-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <Navbar showQuizLink={false} showBackToCatalog />

      <main className="flex-1 py-10 sm:py-16">
        <div className="site-container">
          <Suspense fallback={<QuizSkeleton />}>
            <QuizContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
