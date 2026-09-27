"use client";

import React, { useContext, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { FitlogExersiceContext } from "@/app/Context/FitlogContex";

const TodaysPlan = () => {
  const {
    plan,
    save,
    Setplan,
    Setsave,
  } = useContext(FitlogExersiceContext);

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // Today's Plan অথবা Saved data
  const currentData = activeTab === "plan" ? plan : save;

  // Sorting
  const sortedData = useMemo(() => {
    const data = [...currentData];

    if (sortBy === "duration") {
      return data.sort(
        (a, b) =>
          Number(a.duration || 0) -
          Number(b.duration || 0)
      );
    }

    if (sortBy === "calories") {
      return data.sort(
        (a, b) =>
          Number(a.caloriesBurned || 0) -
          Number(b.caloriesBurned || 0)
      );
    }

    if (sortBy === "rating") {
      return data.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    if (sortBy === "name") {
      return data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return data;
  }, [currentData, sortBy]);

  // Total minutes
  const totalMinutes = plan.reduce(
    (total, exercise) =>
      total + Number(exercise.duration || 0),
    0
  );

  // Total calories
  const totalCalories = plan.reduce(
    (total, exercise) =>
      total + Number(exercise.caloriesBurned || 0),
    0
  );

  // Remove from Today's Plan
  const handleRemovePlan = (id, name) => {
    Setplan(
      plan.filter((exercise) => exercise.id !== id)
    );

    toast.success(`${name} removed from today's plan`);
  };

  // Remove from Saved
  const handleRemoveSaved = (id, name) => {
    Setsave(
      save.filter((exercise) => exercise.id !== id)
    );

    toast.success(`${name} removed from saved`);
  };

  // Mark as done
  const handleDone = (name) => {
    toast.success(`${name} marked as done!`);
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold">
            MY PLAN
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-xl border border-[#292c31] bg-[#14171c] sm:grid-cols-3">

          <div className="border-b border-[#292c31] p-5 sm:border-b-0 sm:border-r">
            <p className="text-[10px] text-gray-500">
              Exercises
            </p>

            <p className="mt-1 text-2xl font-extrabold text-lime-400">
              {plan.length}
            </p>
          </div>

          <div className="border-b border-[#292c31] p-5 sm:border-b-0 sm:border-r">
            <p className="text-[10px] text-gray-500">
              Minutes
            </p>

            <p className="mt-1 text-2xl font-extrabold">
              {totalMinutes}
            </p>
          </div>

          <div className="p-5">
            <p className="text-[10px] text-gray-500">
              Calories
            </p>

            <p className="mt-1 text-2xl font-extrabold">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs + Sort */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Tabs */}
          <div className="flex w-fit rounded-lg border border-[#292c31] bg-[#14171c] p-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-4 py-2 text-[10px] font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#242830] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Todays Plan
              <span className="ml-2">
                {plan.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-5 py-2 text-[10px] font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#242830] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
              <span className="ml-2">
                {save.length}
              </span>
            </button>

          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">

            <span className="text-[10px] text-gray-500">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-md border border-[#292c31] bg-[#14171c] px-3 py-2 text-[10px] text-gray-300 outline-none"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>

              <option value="name">
                Name
              </option>
            </select>

          </div>
        </div>

        {/* Exercise List */}
        <div className="mt-4 space-y-3">

          {sortedData.length === 0 ? (

            /* Empty State */
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292c31] bg-[#101216] text-center">

              <h2 className="text-sm font-bold">
                {activeTab === "plan"
                  ? "NOTHING HERE YET"
                  : "NO SAVED EXERCISES"}
              </h2>

              <p className="mt-2 text-[10px] text-gray-500">
                {activeTab === "plan"
                  ? "Browse the library and add a lift to get moving."
                  : "Save an exercise to see it here."}
              </p>

              <Link
                href="/Card"
                className="mt-4 rounded-full bg-lime-400 px-5 py-2 text-[10px] font-bold text-black transition hover:scale-105 hover:bg-lime-300"
              >
                Go to workouts
              </Link>

            </div>

          ) : (

            /* Exercise Cards */
            sortedData.map((exercise) => (

              <div
                key={exercise.id}
                className="flex flex-col gap-4 rounded-xl border border-[#292c31] bg-[#14171c] p-3 md:flex-row md:items-center"
              >

                {/* Image */}
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg md:h-20 md:w-28">

                  <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    className="object-cover"
                  />

                </div>

                {/* Information */}
                <div className="min-w-0 flex-1">

                  <h2 className="truncate text-sm font-extrabold uppercase">
                    {exercise.name}
                  </h2>

                  <p className="mt-1 text-[9px] text-gray-500">
                    {exercise.equipment}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[9px] text-gray-400">

                    <span>
                      ◷ {exercise.duration} min
                    </span>

                    <span>
                      🔥 {exercise.caloriesBurned} kcal
                    </span>

                    <span className="text-lime-400">
                      ★ {exercise.rating}
                    </span>

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-2">

                  {/* Details */}
                  <Link
                    href={`/Card/${exercise.id}`}
                    className="rounded-full border border-[#30343c] px-4 py-2 text-[9px] text-gray-300 transition hover:bg-[#242830]"
                  >
                    View Details
                  </Link>

                  {/* Done */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() =>
                        handleDone(exercise.name)
                      }
                      className="rounded-full bg-lime-400 px-4 py-2 text-[9px] font-bold text-black transition hover:bg-lime-300"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() => {
                      if (activeTab === "plan") {
                        handleRemovePlan(
                          exercise.id,
                          exercise.name
                        );
                      } else {
                        handleRemoveSaved(
                          exercise.id,
                          exercise.name
                        );
                      }
                    }}
                    className="px-2 text-lg text-gray-500 transition hover:text-red-400"
                  >
                    ×
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default TodaysPlan;