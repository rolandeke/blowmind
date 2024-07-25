import React, { useEffect, useState } from "react";
import Landing from "./landing/landing";
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
