import useCart from "@/common/hook/useCart";
import { useLocalStorage } from "@/common/hook/useStoratge";
import { IProduct } from "@/common/types/product";

const CartPage = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user.user._id;
  const { mutate, ...form } = useCart();
  // const update1 = async (action: any) => {

  if (form.isLoading) return <div>Loading...</div>;
  if (form.isError) return <div>Error...</div>;
  async (userId: string) => {
    return await form.FetchCart(userId);
  };

  return (
    <div>
      <div>
        <div className="w-full lg:py-7 mb:py-[18px] bg-[#F4F4F4] grid place-items-center -mt-[1px]">
          <div className="flex -translate-x-[1px] items-center gap-x-4 text-sm">
            <div className="flex items-center gap-x-2">
              <img
                className="w-[30px] h-[30px] p-2 text-white bg-[#05422C] rounded-[50%]"
                src="../Images/cart_icon.png"
                alt=""
              />
              <span>Shopping Cart</span>
            </div>
            <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#C3D2CC]" />
            <div className="flex items-center gap-x-2">
              <img
                className="w-[30px] h-[30px] p-2 text-white bg-white rounded-[50%]"
                src="../Images/checkout.png"
                alt=""
              />
              <span className="hidden lg:block">Checkout</span>
            </div>
            <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#C3D2CC]" />
            <div className="flex items-center gap-x-2">
              <img
                className="w-[30px] h-[30px] p-2 text-white bg-white rounded-[50%]"
                src="../Images/order.png"
                alt=""
              />
              <span className="hidden lg:block">Order Complete</span>
            </div>
          </div>
        </div>
        {/* main cart */}
        <main className="lg:w-[1170px] mb:w-[342px] lg:mt-8 mb:mt-6 mx-auto grid lg:grid-cols-[686px_420px] mb:grid-cols-[100%] justify-between *:w-full pb-10">
          {/* left */}
          <div>
            <span className="text-xl flex mb-[1px] items-center justify-between pb-6 border-b font-semibold">
              Your Cart
              <p className="text-[#9D9EA2] lg:text-base  mb:text-sm">(3)</p>
            </span>
            {/* list items */}

            <div className="flex flex-col border-b lg:pb-[22px] mb:pb-3">
              {" "}
              {form.cart &&
                form.cart.products.map(
                  (product: IProduct & { quantity: number }, i: number) => (
                    <section
                      className="flex items-center   lg:mt-[23px] mb:mt-[15px] gap-x-4"
                      key={i}
                    >
                      <img
                        className="border rounded w-12 h-12 p-1"
                        src={product.feature_image}
                        alt=""
                      />
                      {/* change quantity, name , price */}
                      <div className="relative w-full flex flex-col *:justify-between gap-y-2.5 lg:gap-y-3">
                        <div className="lg:py-2 mb-0.5 lg:mb-0 flex lg:flex-row mb:flex-col lg:items-center gap-x-4">
                          <span className="text-[#9D9EA2] text-sm w-60 truncate">
                            {product.name}
                          </span>
                          <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-[20.5%]">
                            <div className="lg:mt-0 mb:mt-[12.5px] flex items-center *:grid *:place-items-center *:lg:w-9 *:lg:h-9 *:mb:w-8 *:mb:h-8">
                              <button
                                onClick={() =>
                                  mutate({ action: "descrease", product })
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={12}
                                  height={12}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-minus text-xs"
                                >
                                  <path d="M5 12h14" />
                                </svg>
                              </button>

                              <div className="bg-[#F4F4F4] text-xs rounded">
                                {product.quantity}
                              </div>
                              <button
                                onClick={() =>
                                  mutate({ action: "inscrease", product })
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={12}
                                  height={12}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-plus text-xs"
                                >
                                  <path d="M5 12h14" />
                                  <path d="M12 5v14" />
                                </svg>
                              </button>
                              <span className="ml-3 text-sm">
                                ${product.regular_price.toLocaleString("en-US")}
                              </span>
                            </div>
                          </div>
                          {/* price */}
                          <span className="hidden lg:block text-[#9D9EA2] text-sm">
                            $
                            {(
                              product.regular_price * product.quantity
                            ).toLocaleString("en-US")}
                          </span>
                        </div>
                      </div>
                    </section>
                  )
                )}
              <div className="w-full flex justify-between text-sm pt-4 lg:pt-4 border-t">
                <span className="text-[#9D9EA2] mx-3">Subtotal</span>
                <span>$245.00</span>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="hidden lg:block">
            <div className="w-full lg:p-6 mb:p-5 border rounded-2xl flex flex-col gap-y-[3px]">
              <div className="flex flex-col gap-y-4">
                <section className="flex justify-between text-sm">
                  <span className="text-[#9D9EA2]">Subtotal </span>
                  <p>$497.00</p>
                </section>
                <section className="flex justify-between text-sm">
                  <span className="text-[#9D9EA2]">Discount </span>
                  <p>$0.0</p>
                </section>
                <section className="flex justify-between text-sm">
                  <span className="text-[#9D9EA2]">Shipping Costs </span>
                  <p>$50.00</p>
                </section>
              </div>
              {/* voucher */}
              <div className="flex items-center justify-between gap-x-3 *:h-12 *:border border-b py-[19px]">
                <input
                  type="text "
                  placeholder="Coupon code"
                  className="px-3 py-2 rounded-lg"
                />
                <button className="text-[#17AF26] font-medium bg-[#F3FBF4] whitespace-nowrap text-sm rounded-[100px] px-5 py-2">
                  Apply Coupon
                </button>
              </div>
              {/* *** */}
              <div className="my-3">
                <span
                  role="progressbar"
                  aria-labelledby="ProgressLabel"
                  aria-valuenow={60}
                  className="block rounded-full bg-[#F4F4F4]"
                >
                  <span
                    className="block h-[7px] rounded-full bg-[#17AF26]"
                    style={{ width: "58%" }}
                  />
                </span>
              </div>
              {/* *** */}
              <span className="flex mt-0.5 gap-x-[3px] items-center font-medium text-sm text-[#717378]">
                Get Free <p className="text-[#1A1E26]">Shipping</p> for orders
                over <p className="text-[#EB2606]">$100.00</p>
              </span>
              <a
                href=""
                className="font-semibold text-sm underline cursor-pointer my-1 tracking-[-0.1px]"
              >
                Continue Shopping
              </a>
              <button className="bg-[#C8C9CB] px-10 h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center">
                <span>Checkout</span>|<span>$547.00</span>
              </button>
              {/* payment */}
              <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
                <span className="tracking-[0.8px] text-[#717378] text-xs">
                  SECURE PAYMENTS PROVIDED BY
                </span>
                <div className="flex items-center gap-x-3 *:cursor-pointer">
                  <img src="../Images/mastercard_v1.png" alt="" />
                  <img src="../Images/mastercard_v2.png" alt="" />
                  <img src="../Images/mastercard_v3.png" alt="" />
                  <img src="../Images/mastercard_v4.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* delivery */}
          <div className="w-full flex flex-col gap-y-3.5 lg:-mt-6 mb:mt-12">
            <div className="flex justify-between lg:gap-x-6 *:w-full">
              <span className="text-[#17AF26]">Delivery</span>
              <span />
              <span className="text-[#17AF26] hidden lg:block">
                Free Returns
              </span>
            </div>
            <section className="w-full flex lg:flex-row mb:flex-col lg:justify-between lg:items-start lg:gap-x-6 mb:gap-y-[22px] *:w-full lg:mt-0 mb:mt-0.5">
              <div className="p-4 flex flex-col gap-y-3.5 border rounded-xl">
                <img
                  className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]"
                  src="../Images/transaction-minus.png"
                  alt=""
                />
                <span className="lg:text-lg mb:text-base mt-0.5 text-[#1A1E26]">
                  Order by 10pm for free next day delivery on Orders overs $100
                </span>
                <p className="text-[#717378] lg:text-base mb:text-sm">
                  We deliver Monday to Saturday - excluding Holidays
                </p>
              </div>
              <div className="p-4 flex flex-col lg:gap-y-3.5 mb:gap-y-4 border rounded-xl">
                <img
                  className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]"
                  src="../Images/box-time.png"
                  alt=""
                />
                <span className="lg:text-lg mb:text-base lg:mt-0.5 text-[#1A1E26] lg:tracking-[0] mb:tracking-[0.1px]">
                  Free next day delivery to stores.
                </span>
                <p className="text-[#717378] lg:text-base mb:text-sm">
                  Home delivery is $4.99 for orders under $100 and is FREE for
                  all orders over $100
                </p>
              </div>
              <span className="text-[#17AF26] lg:hidden  -mb-2">
                Free Returns
              </span>
              <div className="p-4 flex flex-col gap-y-3.5 border rounded-xl">
                <img
                  className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]"
                  src="../Images/truck-time.png"
                  alt=""
                />
                <p className="text-[#717378] lg:text-base mt-0.5 mb:text-sm leading-[29px]">
                  30 days to return it to us for a refund. We have made returns
                  SO EASY - you can now return your order to a store or send it
                  with FedEx FOR FREE
                </p>
              </div>
            </section>
          </div>
          <div className="block lg:hidden mt-[35px]">
            <div className="w-full lg:p-6 mb:p-5 border rounded-2xl flex flex-col gap-y-[3px]">
              <div className="flex flex-col gap-y-4">
                <section className="flex justify-between text-sm">
                  <span className="text-[#9D9EA2]">Subtotal </span>
                  <p>$497.00</p>
                </section>
                <section className="flex justify-between text-sm">
                  <span className="text-[#9D9EA2]">Discount </span>
                  <p>$0.0</p>
                </section>
                <section className="flex justify-between text-sm">
                  <span className="text-[#9D9EA2]">Shipping Costs </span>
                  <p>$50.00</p>
                </section>
              </div>
              {/* voucher */}
              <div className="flex items-center justify-between gap-x-3 *:h-12 *:border border-b py-[19px]">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="lg:px-3 mb:pl-[22px] mb:w-[150px] lg:w-auto rounded-lg text-sm lg:text-base"
                />
                <button className="text-[#17AF26] font-medium bg-[#F3FBF4] whitespace-nowrap text-sm rounded-[100px] px-5 py-2">
                  Apply Coupon
                </button>
              </div>
              {/* *** */}
              <div className="my-3">
                <span
                  role="progressbar"
                  aria-labelledby="ProgressLabel"
                  aria-valuenow={60}
                  className="block rounded-full bg-[#F4F4F4]"
                >
                  <span
                    className="block h-[7px] rounded-full bg-[#17AF26]"
                    style={{ width: "58%" }}
                  />
                </span>
              </div>
              {/* *** */}
              <span className="flex mt-0.5 gap-x-[3px] items-center font-medium text-sm text-[#717378]">
                Get Free <p className="text-[#1A1E26]">Shipping</p> for orders
                over <p className="text-[#EB2606]">$100.00</p>
              </span>
              <a
                href=""
                className="font-semibold text-sm underline cursor-pointer my-1 tracking-[-0.1px]"
              >
                Continue Shopping
              </a>
              <button className="bg-[#C8C9CB] px-10 h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center">
                <span>Checkout</span>|<span>$547.00</span>
              </button>
              {/* check out */}
              <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
                <span className="tracking-[0.8px] text-[#717378] text-xs">
                  SECURE PAYMENTS PROVIDED BY
                </span>
                <div className="flex items-center gap-x-3 *:cursor-pointer">
                  <img src="../Images/mastercard_v1.png" alt="" />
                  <img src="../Images/mastercard_v2.png" alt="" />
                  <img src="../Images/mastercard_v3.png" alt="" />
                  <img src="../Images/mastercard_v4.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CartPage;
