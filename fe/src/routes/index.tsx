import CategoryAdd from "@/pages/(dashboard)/categories/_component.tsx/add";
import CategoryEdit from "@/pages/(dashboard)/categories/_component.tsx/edit";
import CategoryList from "@/pages/(dashboard)/categories/page";
import DashboardPage from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/page";
import ProductsAdd from "@/pages/(dashboard)/products/_component/add";
import ProductsEdit from "@/pages/(dashboard)/products/_component/edit";
import ProductsList from "@/pages/(dashboard)/products/page";
import Signin from "@/pages/(website)/login/signin/page";
import Signup from "@/pages/(website)/login/signup/page";
import Notfound from "@/pages/(website)/notfound/page";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
        </Route> */}
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<ProductsAdd />} />
          <Route path="products/edit/:id" element={<ProductsEdit />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="category/add" element={<CategoryAdd />} />
          <Route path="category/edit/:id" element={<CategoryEdit />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="*" element={<Notfound />} />
      </Routes>{" "}
      <ToastContainer />
    </>
  );
};

export default Router;
