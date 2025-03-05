import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { userRegistration } from "~/features/user/userSlice";
import { Link } from "react-router";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userRegistration({ email, password }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Processing..." : "Register"}
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
