import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { IProduct } from "../types/product";
import { useLocalStorage } from "./useStoratge";
import { toast } from "react-toastify";

export const useCart = ({ userId }: any) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ProductsCart_key"],
    queryFn: async () => {
      const res = await instance.get(`/carts/${userId}`);
      return res.data;
    },
  });
  useMutation({
    mutationFn: async (data) => {
      console.log(data);
    },
  });
  return { data, isLoading, isError, error };
};

export const useCartMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      action: string;
      product: IProduct;
      userId: any;
      quantity?: number;
    }) => {
      const action = data.action;
      const userId = data.userId;
      const quantity = data.quantity;

      const productId = data.product._id || data.product.productId;
      console.log(productId);
      if (action == "delete-product") {
        const res = await instance.delete(`/carts/delete-product`, userId);
        toast.success(`Bạn đã sản phẩm khỏi cart`);
        return res.data;
      } else {
        const res = await instance.post(
          `/carts/${action}`,
          quantity
            ? { productId, userId, quantity }
            : {
                productId,
                userId,
              }
        );

        return res.data, quantity;
      }
    },

    onSuccess: (quantity) => {
      !quantity
        ? ""
        : quantity < 10
          ? toast.success(`Bạn đã Thêm  ${quantity} sản phẩm vào cart`)
          : toast.error(`Bạn chỉ được nhập tối đa 10 sản phẩm vào cart `);

      queryClient.invalidateQueries({
        queryKey: ["ProductsCart_key"],
      });
    },
  });
};
