"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { IProduct } from "@/common/types/product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import useMutate from "@/common/hook/useMutate";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "feature_image",
    header: "Ảnh sản phẩm",
    cell: ({ row }) => (
      <img
        src={row.original.feature_image}
        alt=""
        className="w-20 h-20 p-2 bg-gray-100 rounded-xl"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className=" h-4 w-4 ml-10" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-5 font-semibold">{row.getValue("name")}</div>
    ),
  },

  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div className="ml-5">
        {row.original.category
          ? row.original?.category?.name
          : " không có danh muc"}
      </div>
    ),
  },
  {
    accessorKey: "Price",
    header: "Price",
    cell: ({ row }) => (
      <div className="capitalize truncate ">
        $ {row.original.regular_price.toLocaleString("eu-EU")}
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: "discount",
    cell: ({ row }) => (
      <div className="capitalize truncate ml-3">
        $ {row.original.discount?.toLocaleString("eu-EU")}
      </div>
    ),
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize truncate w-40">{row.original.description}</div>
    ),
  },

  {
    accessorKey: "countInStock",
    header: "countInStock",
    cell: ({ row }) => {
      const amount = row.original.countIn_stock;
      // console.log(amount);
      return <div className=" font-medium">{amount} sp</div>;
    },
  },
  {
    accessorKey: "featured",
    header: "featured",
    cell: ({ row }) => {
      const { mutate } = useMutate({
        action: "products",
        id: row.original._id,
      });
      return (
        <div>
          <Checkbox
            checked={row.original.featured}
            onClick={() =>
              mutate({
                ...row.original,
                featured: !row.original.featured,
              } as any)
            }
          >
            Checkbox
          </Checkbox>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original._id;
      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: async (id: string) => {
          const res = await instance.delete("/products/" + id);
          return res.data;
          // console.log(id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["Products_Key"],
          });
          message.open({
            type: "success",
            content: "Xóa sản phẩm  thành công",
          });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex cursor-default select-none items-center bg-white hover:text-white hover:bg-slate-600 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  Remove
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="hover:bg-white bg-black hover:text-black text-white rounded-md shadow-sm shadow-black">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => mutate(id!)}
                    className="hover:bg-white bg-black hover:text-black text-white rounded-md shadow-sm shadow-black"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <DropdownMenuItem>
              <Link to={`edit/${id}`}>Update</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
