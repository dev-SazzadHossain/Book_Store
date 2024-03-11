import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Books from "./components/Books/Books";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import { AddBook } from "./components/AddBook/AddBook";
import { EditBook } from "./components/EditBook/EditBook";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Books />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/editBook/:id" element={<EditBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
