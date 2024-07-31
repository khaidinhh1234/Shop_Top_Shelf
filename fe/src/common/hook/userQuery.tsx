import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";

const useUserQuery = ({ action, id }: { action?: string; id?: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      action == "products"
        ? "Products_Key"
        : action == "category"
          ? "Categories_Key"
          : "Products_KeyID",
      id ? id : "",
    ],
    queryFn: async () => {
      const res = await instance.get(`/${action}`);

      return res.data;
    },
  });

  return { data, isLoading, isError, error };
};
export default useUserQuery;
