"use client";

import React, { createContext, useState } from "react";

export const FitlogExersiceContext = createContext({});

const FitlogExersice = ({ children }) => {
  const [plan, Setplan] = useState([]);
  const [save, Setsave] = useState([]);

  const ShareData = {
    plan,
    Setplan,
    save,
    Setsave,
  };

  return (
    <FitlogExersiceContext.Provider value={ShareData}>
      {children}
    </FitlogExersiceContext.Provider>
  );
};

export default FitlogExersice;