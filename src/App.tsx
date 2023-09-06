import React from "react";
import "./App.css";
import { Library } from "./page";
import { Route, Routes } from "react-router-dom";
import { ROUTES_PATH } from "./routes/contacts";
import { DetailBook } from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path={ROUTES_PATH.library} element={<Library />} />
        <Route path={ROUTES_PATH.detailBook}>
          <Route path=":id" element={<DetailBook />} />
        </Route>
        <Route path={ROUTES_PATH.notFound} element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;
