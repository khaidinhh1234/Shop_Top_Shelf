import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useStoratge";
i;
import Cart from "./../../pages/(website)/cart/page";
import { update } from "lodash";
import instance from "@/configs/axios";

type Cart = {
  userId: string;
  productId?: string;
  quantity?: number;
  CartId?: string;
};
const CART_QUERY_KEY = "cart";
const FetchCart = async (UserId: string) => {
  const res = await instance.get(`/carts/${UserId}`);
  return res.data;
};

// const modifyCart = async (action: string, params: Cart) => {
//   if (action === "delete") {
//     const uri = `/carts/${params.productId}`;
//     const { data } = await instance.delete(uri);
//     return data.cart;
//   }
//   if (action === "put") {
//     const uri = `/carts/${action}`;
//     const { data } = await instance.put(uri, params);
//     return data.cart;
//   }
//   const uri = `/carts/${action}`;
//   const { data } = await instance.post(uri, params);
//   return data.cart;
// };
const useCart = () => {
  const queryClient = useQueryClient();
  const [user] = useLocalStorage("user", {});
  const userId = user.user._id;
  const {
    data: cart,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => FetchCart(userId),

    enabled: !!userId,
  });
  const { mutate } = useMutation({
    mutationFn: async (action: any) => {
      const productId = action.product.productId;
      const quantity = action.product.quantity;
      console.log(userId, productId, quantity);
      const { data } = await instance.post(`/carts/${action.action}`, {
        userId,
        productId,
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CART_QUERY_KEY, userId],
      });
    },
  });
  // const mutationOptions = {
  //   onSucess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [CART_QUERY_KEY, userId],
  //     });
  //   },
  // };

  // const performMutation = (action: string) => {
  //   return useMutation({
  //     mutationFn: (params: Cart) => modifyCart(action, params),
  //     ...mutationOptions,
  //   });
  // };

  // const CartAction = (
  //   action: string,
  //   productId?: string,
  //   quantity?: number
  // ) => ({
  //   mutate: (productId: string, quantity?: number) =>
  //     performMutation(action).mutate({ userId, quantity, productId }),
  // });

  return {
    FetchCart,
    mutate,
    cart,
    isLoading,
    isError,
    error,
    // addItemCart: CartAction("add-to-cart"),
    // deleteCart: CartAction("delete"),
    // updateCart: CartAction("update"),
  };
};

export default useCart;
