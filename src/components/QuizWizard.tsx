"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  RotateCcw,
  Check,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { QuizQuestion, QuizRecommendationItem } from "@/models/quiz";
import type { Book } from "@/models/book";
import { submitQuizRecommendation } from "@/lib/api";
import { playOptionTap, playPageFlip, playSuccessChime } from "@/lib/sound";
import RecommendationDeck from "./RecommendationDeck";

interface QuizWizardProps {
  questions: QuizQuestion[];
}

function getProgressCue(index: number, total: number): string {
  if (total <= 1 || index === total - 1) return "Final question";
  if (index === 0) return "Let's begin";
  const ratio = (index + 1) / total;
  if (ratio >= 0.7) return "Almost there";
  if (ratio >= 0.45) return "Halfway there";
  return "Building your taste profile";
}

export default function QuizWizard({ questions }: QuizWizardProps) {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<QuizRecommendationItem[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  if (safeQuestions.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500">
          <BookOpen className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900">Quiz Unavailable</h1>
        <p className="mt-2 text-sm text-zinc-500">
          The recommendation quiz is currently being updated. Please browse our curated catalog in the meantime.
        </p>
        <Link
          href="/#catalog"
          className="mt-6 inline-flex rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  const currentQuestion = safeQuestions[currentIndex];
  if (!currentQuestion) {
    return null;
  }

  const totalQuestions = safeQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const currentAnswer = answers[currentQuestion.id];
  const currentOptions = Array.isArray(currentQuestion.options) ? currentQuestion.options : [];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const progressCue = getProgressCue(currentIndex, totalQuestions);

  const clearPendingAutoAdvance = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  const handleSelectOption = (optionId: number) => {
    clearPendingAutoAdvance();
    playOptionTap(soundEnabled);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));

    // Auto-advance on non-final questions for a smooth, low-friction flow
    if (!isLastQuestion) {
      autoAdvanceTimerRef.current = setTimeout(() => {
        playPageFlip(soundEnabled);
        setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
      }, 240);
    }
  };

  const handleNext = () => {
    clearPendingAutoAdvance();
    if (currentIndex < totalQuestions - 1) {
      playPageFlip(soundEnabled);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    clearPendingAutoAdvance();
    if (currentIndex > 0) {
      playPageFlip(soundEnabled);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    clearPendingAutoAdvance();
    playOptionTap(soundEnabled);
    setIsSubmitting(true);
    setErrorMessage(null);

    const payloadAnswers = Object.entries(answers).map(([qId, oId]) => ({
      question_id: Number(qId),
      option_id: oId,
    }));

    try {
      const results = await submitQuizRecommendation({ answers: payloadAnswers });
      playSuccessChime(soundEnabled);
      setRecommendations(results);
    } catch (err: unknown) {
      console.error("Error submitting quiz:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to generate recommendations. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    clearPendingAutoAdvance();
    playPageFlip(soundEnabled);
    setAnswers({});
    setCurrentIndex(0);
    setRecommendations(null);
    setErrorMessage(null);
  };

  if (recommendations !== null) {
    return (
      <section className="w-full" aria-live="polite">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink px-4 py-1.5 text-xs font-semibold text-brand-pink-dark ring-1 ring-inset ring-brand-pink-dark/20">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Quiz Completed</span>
            </span>

            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              aria-label={soundEnabled ? "Mute quiz sounds" : "Enable quiz sounds"}
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface-card text-ink-secondary transition hover:bg-surface-muted"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 font-sans!">
            Your Personalized Reading Matches
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Based on your answers, our recommendation algorithm selected these books for your reading list:
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retake Quiz</span>
            </button>
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-zinc-800 transition"
            >
              Browse Full Catalog
            </Link>
          </div>
        </div>

        {recommendations.length > 0 ? (
          <RecommendationDeck
            books={recommendations.map((item) => item?.book ?? (item as unknown as Book))}
            soundEnabled={soundEnabled}
          />
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-xs">
            <p className="text-sm text-zinc-600">
              No direct matches found for your exact combination. Check out our general catalog for all bestseller titles.
            </p>
            <Link
              href="/#catalog"
              className="mt-4 inline-block rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
            >
              Go to Catalog
            </Link>
          </div>
        )}
      </section>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink px-3.5 py-1 text-xs font-semibold text-brand-pink-dark ring-1 ring-inset ring-brand-pink-dark/20">
          Personalized Discovery
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 font-sans!">
          Find Your Next Great Read
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-lg mx-auto">
          Tell us your favorite mood, themes, and pacing. We’ll match you with books from our Jos catalog.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {/* Progress Card */}
        <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-900">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-zinc-300" aria-hidden="true">•</span>
              <span className="text-brand-pink-dark font-medium">{progressCue}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>{progressPercent}%</span>
              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                aria-label={soundEnabled ? "Mute quiz sounds" : "Enable quiz sounds"}
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface text-ink-secondary transition hover:bg-surface-muted"
              >
                {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Quiz completion progress"
            className="h-2 w-full overflow-hidden rounded-full bg-zinc-100"
          >
            <div
              className="h-full bg-brand-pink-dark transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Active Question Card */}
        <fieldset
          key={currentQuestion.id}
          className="animate-question-enter rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-xs"
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-brand-pink-dark mb-2">
            Step {currentIndex + 1}
          </span>

          <legend className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-sans!">
            {currentQuestion.prompt}
          </legend>

          <div role="radiogroup" className="mt-8 space-y-3">
            {currentOptions.map((option) => {
              const isSelected = currentAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full flex items-center justify-between rounded-2xl p-4 text-left text-sm font-medium transition-all active:scale-[0.99] ${
                    isSelected
                      ? "border-2 border-brand-pink-dark bg-brand-pink/30 text-zinc-900 shadow-xs"
                      : "border border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                        isSelected
                          ? "border-brand-pink-dark bg-brand-pink-dark text-white"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span>{option.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {errorMessage && (
            <div role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
              {errorMessage}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-40"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Previous</span>
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!currentAnswer || isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-zinc-800 disabled:opacity-40 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    <span>Finding Your Books...</span>
                  </>
                ) : (
                  <>
                    <span>Get Recommendations</span>
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-zinc-800 disabled:opacity-40"
              >
                <span>Next</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </fieldset>
      </div>
    </>
  );
}
