import React from "react";

import "./App.css";

import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/loading/Loading";
import Game from "./components/Game";

import useAuth from "./hooks/useAuth";

const username = "demo";
const password = "123456";

function App() {
  const [token, loading, error] = useAuth(username, password);
  const room = localStorage.getItem("room") ?? "W12N1";

  if (loading) {
    return <Loading />;
  }

  if (error != null || token == null) {
    console.error(error, token);
    return <h2>Something went wrong.</h2>;
  }

  return (
    <ErrorBoundary fallback={<h2>Something went wrong.</h2>}>
      <Game room={room} />
    </ErrorBoundary>
  );
}

export default App;
