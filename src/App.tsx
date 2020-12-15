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

  if (loading) {
    return <Loading />;
  }

  if (error != null || token == null) {
    console.error(error, token);
    return <h2>Something went wrong.</h2>;
  }

  return (
    <ErrorBoundary fallback={<h2>Something went wrong.</h2>}>
      {/* <Game room="W3N5" /> */}
      <Game room="W6N7" />
    </ErrorBoundary>
  );
}

export default App;
