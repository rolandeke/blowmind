// src/pages/index.tsx

import React from "react";
import Landing from "../pages/landing/Landing";
import { AuthContextProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

const Home: React.FC = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Landing />
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default Home;
