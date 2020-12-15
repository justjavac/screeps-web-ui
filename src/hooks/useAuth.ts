import { useEffect, useState } from "react";

import api from "../api";

/** Authentication */
function useAuth(
  username: string,
  password: string,
): [string | null, boolean, Error | null] {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.resolve()
      .then(() => api.auth(username, password))
      .then((res) => {
        setToken(res.token);
        setLoading(false);
      })
      .then(() => api.socket.connect())
      .catch((ex) => {
        setError(ex);
        setLoading(false);
      });
  }, [username, password]);

  return [token, loading, error];
}

export default useAuth;
