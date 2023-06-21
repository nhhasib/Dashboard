import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useSelectedItems = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const { data: selectedItems, refetch = [] } = useQuery(
    ["selectedClass", user?.email],
    async () => {
      const res = await fetch(
        `https://dashboard-server-livid.vercel.app/selectedItems/?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    }
  );

  return [selectedItems, refetch];
};

export default useSelectedItems;
