import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuth2RedirectHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log(" OAuth2 Redirect URL:", window.location.href);
    console.log(" Token from query:", token);

    if (token) {
      // Save token to localStorage
      localStorage.setItem("token", token);

      // Show success toast
      toast.success("Successfully logged in!", {
        position: "top-right",
        autoClose: 2000,
      });

      // Delay redirect slightly to ensure storage is committed
      setTimeout(() => {
        navigate("/");
      }, 100);
    } else {
      toast.error("Login failed. Token missing.");
      navigate("/login");
    }
  }, [navigate]);

  return <div className="text-center mt-8 text-gray-600">Redirecting...</div>;
};

export default OAuth2RedirectHandler;
