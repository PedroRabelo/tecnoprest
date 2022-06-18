import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import useGet from "../hooks/useGet";
import { api } from "../lib/axios/apiClient";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  slug: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "tecnoprest.token");
  destroyCookie(undefined, "tecnoprest.refreshToken");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "tecnoprest.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email, role, slug } = response.data;

          setUser({ id, name, email, role, slug });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("login", { email, password });

      const { access_token, userData, slug } = response.data;

      setCookie(undefined, "tecnoprest.token", access_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });

      setUser({
        id: userData.id,
        name: userData.name,
        email,
        role: userData.role,
        slug,
      });

      if (userData.role === "ADMIN" || userData.role === "USER") {
        await Router.push("/admin");
      } else if (
        userData.role === "ADMIN_TENANT" ||
        userData.role === "USER_TENANT"
      ) {
        await Router.push(`/app`);
      } else {
        await Router.push("/");
      }
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
