import { valid } from "joi";
import { z } from "zod";

const SignupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Vui lòng nhập tên của bạn lớn hơn 3 ký tự " }), // Provide an initializer for the 'username' property
    email: z.string().email({ message: "Vui lòng nhập email đúng định dạng" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .regex(/[a-z]/, { message: "Mật khẩu không hợp lệ" })
      .regex(/[A-Z]/, {
        message: "Mật khẩu phải chứa ít nhất một ký tự in hoa",
      })
      .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" }),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"],
    }
  );

export const valisignup = SignupSchema;

const SigninChema = z.object({
  email: z.string().email({ message: "Vui lòng nhập email đúng định dạng" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});
export const valisignin = SigninChema;
