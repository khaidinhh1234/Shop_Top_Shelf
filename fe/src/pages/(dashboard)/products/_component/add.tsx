import useUserQuery from "@/common/hook/userQuery";
import { ICategory } from "@/common/types/category";
import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";

import TextArea from "antd/es/input/TextArea";
import { set } from "lodash";
import { Link, useNavigate } from "react-router-dom";

const ProductsAdd = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { data: category, isLoading } = useUserQuery({ action: "category" });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await instance.post(`/products`, data);

        return res.data;
      } catch (error) {
        return error;
      }
      // console.log(data);
    },
    onSuccess: () => {
      message.open({
        type: "success",
        content: "Thêm sản phẩm thành công",
      });
      form.resetFields();
      setTimeout(() => {
        nav("/admin/products");
      }, 1000);
    },
    onError: (error: any) => {
      message.open({
        type: "error",
        content: error?.response?.data?.message || "Có lỗi xảy ra",
      });
    },
  });
  const onFinish: FormProps<IProduct>["onFinish"] = (values: any) => {
    mutate(values);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>ProductsPage / Add New Product</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          <div className="flex justify-between">
            <h1 className="text-4xl font-semibold">Add New Product</h1>
            <button>
              <Link
                to={"/admin/products"}
                className="mr-5 hover:bg-black shadow-2xl  border border-black/40 px-3 py-2 font-medium text-[16px] rounded-[5px] hover:text-white"
              >
                Quay Lại
              </Link>
            </button>
          </div>
          <div className="bg-white  px-4 mt-5 rounded-xl py-5 shadow-lg max-w-6xl  mx-10">
            <Form
              form={form}
              name="basic"
              layout={"vertical"}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              style={{ maxWidth: 1000 }}
              className="mx-10 my-5"
              // initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="Tên sản phẩm"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Tên sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item label="Danh mục sản phẩm" name="category">
                  <Select
                    defaultValue="Vui long chon danh muc"
                    className="w-[490px]"
                    // onChange={handleChange}
                    options={
                      category?.map((item: ICategory) => ({
                        value: item._id,
                        label: item.name,
                      })) || []
                    }
                  />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="Giá gốc sản phẩm"
                  name="regular_price"
                  rules={[
                    {
                      required: true,

                      message: "Giá gốc sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá gốc sản phẩm"
                    className="w-[490px]"
                    min={0}
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="giá khuyến mãi"
                  name="discount"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || value < getFieldValue("regular_price")) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Giá khuyến mãi phải nhỏ hơn giá sản phẩm!")
                        );
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá khuyến mãi sản phẩm"
                    className="w-[490px]"
                  />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="Mô tả sản phẩm"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Tên sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <TextArea rows={5} placeholder="Nhập mô tả sản phẩm" />
                </Form.Item>
                <div>
                  <Form.Item
                    className=""
                    label="Ảnh nổi bật "
                    name="feature_image"
                    rules={[
                      {
                        required: true,
                        message: "Tên sản phẩm bắt buộc phải nhập!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập tên sản phẩm" />
                  </Form.Item>{" "}
                  <Form.Item
                    label="Sản phẩm nổi bật"
                    name="featured"
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  className=""
                  label="số lượng sản phẩm"
                  name="countIn_stock"
                  rules={[
                    {
                      required: true,
                      message: "Số lượng sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số lượng sản phẩm" />
                </Form.Item>{" "}
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="px-5 py-5 ">
                  {isPending ? (
                    <>
                      <Loading3QuartersOutlined className="animate-spin" />{" "}
                      Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsAdd;
