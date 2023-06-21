import React, { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const { data: currentUserStatus, refetch = [] } = useQuery(
    ["users", user?.email],
    async () => {
      const res = await fetch(
        `https://dashboard-server-livid.vercel.app/users/?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    }
  );
  return [currentUserStatus, refetch];
};

export default useUser;
