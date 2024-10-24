import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home } from "./pages";

const ProtectedUserRoutes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setLoading(false);
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/users?id=${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }

      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  if (loading) return null;
  if (user) return <Home />;
  return <Navigate to="/" replace />;
};

export default ProtectedUserRoutes;
