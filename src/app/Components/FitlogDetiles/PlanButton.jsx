"use client";

import { FitlogExersiceContext } from "@/app/Context/FitlogContex";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const PlanButton = ({ exercise }) => {
  const { plan, Setplan } = useContext(FitlogExersiceContext);

  const handlePlanButton = () => {
    const alreadyAdded = plan.some(
      (item) => item.id === exercise.id
    );

    if (alreadyAdded) {
      toast.error(`❌ ${exercise.name} is already in today's plan!`);
      return;
    }

    Setplan([...plan, exercise]);

    toast.success(`✅ ${exercise.name} added to today's plan!`);
  };

  return (
    <button
      type="button"
      onClick={handlePlanButton}
      className="rounded-xl bg-lime-400 px-5 py-3 text-xs font-bold text-black transition hover:scale-105 hover:bg-lime-300"
    >
      ✓ Add to todays plan
    </button>
  );
};

export default PlanButton;