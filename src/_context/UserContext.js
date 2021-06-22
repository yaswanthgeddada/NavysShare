import React, { useContext, useState, useEffect } from "react";
import { firestore } from "../_firebase/firebase";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  async function login(username, password) {
    const ref = await firestore
      .collection("auth")
      .doc("EMhiAcFUE7YBmRpMAQHa")
      .get();

    const result = await ref.data();

    return result;
  }

  function signOut() {
    // return auth.signOut();
  }

  useEffect(() => {
    const getUser = () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const value = {
    currentUser,
    login,
    setCurrentUser,
    signOut,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
