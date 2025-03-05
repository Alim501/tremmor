import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
