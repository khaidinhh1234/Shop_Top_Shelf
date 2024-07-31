import { Logo } from "@/components/icons";

import { useForm } from "react-hook-form";

import { valisignup } from "@/common/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(valisignup),
  });
  const { mutate } = useMutation({
    mutationFn: async (user: {
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const data = await instance.post("/auth/signup", user);
        toast.success("Đăng ký thành công");
        nav("/signin");
        return data;
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <div>
      {" "}
      <div className="h-screen overflow-hidden bg-gray-100 md:bg-white">
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="hidden md:flex md:w-1/2 bg-gray-100 relative">
            <img
              src={Logo}
              alt="Krist Logo"
              className="absolute top-5 left-5 w-22 md:w-34"
            />
            <img
              src={"/src/assets/images/Rectangle 3463274.png"}
              alt="Fashion Model"
              className="object-cover w-1024 h-800"
            />
          </div>
          <section className="flex-1 flex items-center justify-center p-4 md:p-0">
            <div className="w-full max-w-md p-6 md:p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-3xl font-bold mb-2">Create New Account</h2>
              <p className="text-gray-600 mb-6">Please enter details</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    User Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Robert"
                  />
                  {errors.name && (
                    <p className="text-red-500  mt-1">
                      {String(errors?.name?.message)}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="robertfox@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500  mt-1">
                      {String(errors?.email?.message)}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="••••••••••••••••"
                  />{" "}
                  {errors.password && (
                    <p className="text-red-500  mt-1">
                      {String(errors?.password?.message)}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="••••••••••••••••"
                  />{" "}
                  {errors.confirmPassword && (
                    <p className="text-red-500  mt-1">
                      {String(errors?.confirmPassword?.message)}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 text-sm font-bold"
                >
                  Signup
                </button>
                <p className="mt-3 mx-20">
                  tôi đã có tài khoản{" "}
                  <a href="/signin" className="text-blue-600">
                    đăng nhập
                  </a>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signup;
