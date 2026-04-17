// layouts/AuthLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { LayoutDashboard, ShoppingBag } from "lucide-react";

const AdminAuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            {/* Swapped BookOpen for ShoppingBag or LayoutDashboard */}
            <ShoppingBag className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Shop<span className="text-emerald-600">Flux</span> Admin
            </span>
          </div>
        </div>

        <h2 className="mt-8 text-center text-3xl font-bold text-slate-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Manage your store, orders, and inventory
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* <div className="bg-white py-10 px-6 shadow-2xl shadow-slate-200/50 rounded-xl sm:px-12 border border-slate-100"> */}
        <div>
          <Outlet />
        </div>

        {/* Footer Section */}
        <div className="mt-8">
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} ShopFlux eCommerce Solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthLayout;
