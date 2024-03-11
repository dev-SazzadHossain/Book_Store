import React, { createContext, useState } from "react";

export const AuthContext = createContext();
export const Context = ({ children }) => {
  const [search, setSearch] = useState("");

  const authInfo = { search, setSearch };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
