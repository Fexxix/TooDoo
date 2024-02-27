import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";
import { default as axios, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  username: string;
  password: string;
  id: string;
};

export type SignupUserData = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  signup: (data: SignupUserData) => Promise<void>;
  login: (data: LoginUserData) => Promise<void>;
  logout: () => void;
  signUpError: { message: string };
  loginError: { message: string };
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [signUpError, setSignUpError] = useState<{ message: string }>({
    message: "",
  });
  const [loginError, setLoginError] = useState<{ message: string }>({
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const res = await axios.post(
          ` ${API_URL}/users/login`,
          {},
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.data.message) {
            setLoginError({ message: e.response.data.message });
          } else {
            e.cause?.message && setLoginError({ message: e.cause.message });
          }
        } else {
          setLoginError({ message: "An error occurred while logging in." });
        }
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  async function signup(data: SignupUserData) {
    try {
      console.log("data:", data);
      console.log(API_URL);
      await axios.post(`${API_URL}/users/signup`, data);
      setSignUpError({ message: "Email successfully sent check the inbox" });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message) {
          setSignUpError({ message: e.response.data.message });
        } else {
          e.cause?.message && setSignUpError({ message: e.cause.message });
        }
      }
    }
  }

  async function login(data: LoginUserData) {
    try {
      const res = await axios.post(`${API_URL}/users/login`, data, {
        withCredentials: true,
      });
      setLoginError({ message: "succesfully login" });
      setUser(res.data.user);
      navigate("/toodoos");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message) {
          setLoginError({ message: e.response.data.message });
        } else {
          e.cause?.message && setLoginError({ message: e.cause.message });
        }
      } else {
        setLoginError({ message: "An error occurred while logging in." });
      }
    }
  }

  async function logout() {
    // TODO: implement logout
  }

  const value = {
    user,
    signup,
    login,
    logout,
    signUpError,
    loginError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
