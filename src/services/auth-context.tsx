import React, {
  useContext,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { UserAuthentication } from "./UserAuthentication";
import { useStorageState } from "../utils/use-storage-state";
import { supabase } from "../utils/supabase";

// Updated context to include getUserUUID
const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  getUserUUID: () => string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  getUserUUID: () => null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session.access_token);
        setUser(data.session.user);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await UserAuthentication.signInWithEmail(
        email,
        password
      );

      if (response.session) {
        setSession(response.session.access_token);
        setUser(response.session.user);
      } else {
        console.error("No session found in response:", response);
      }
    } catch (err) {
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await UserAuthentication.signOut();
      setSession(null);
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getUserUUID = () => {
    return user?.id ?? null;
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        getUserUUID,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
