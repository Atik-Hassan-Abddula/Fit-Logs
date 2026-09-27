"use client";

import React, { useContext } from "react";
import { FitlogExersiceContext } from "@/app/Context/FitlogContex";
import { toast } from "react-toastify";

const SaveButton = ({ exercise }) => {
  const { save, Setsave } = useContext(FitlogExersiceContext);

  const handleSave = () => {
    const alreadySaved = save.some(
      (item) => item.id === exercise.id
    );

    if (alreadySaved) {
      toast.error(`❌ ${exercise.name} is already saved!`);
      return;
    }

    Setsave([...save, exercise]);

    toast.success(`✅ ${exercise.name} saved successfully!`);
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      className="rounded-xl border border-[#3a3e46] px-5 py-3 text-xs font-medium text-gray-300 transition hover:bg-[#191c21]"
    >
      ♡ Save for later
    </button>
  );
};

export default SaveButton;