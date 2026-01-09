import { useState, useEffect } from "react";
import API from "../services/api";

/* Toast */
const Toast = ({ message, type }) => (
  <div className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg ${
    type === "error" ? "bg-red-500" : "bg-green-600"
  }`}>
    {message}
  </div>
);

const ChangePasswordSection = ({ onBack }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword.length < 6) {
      return setToast({ type: "error", message: "Password must be at least 6 characters" });
    }

    try {
      await API.put("/users/change-password", form);
      setToast({ type: "success", message: "Password updated successfully" });
      setForm({ currentPassword: "", newPassword: "" });
    } catch {
      setToast({ type: "error", message: "Current password is incorrect" });
    }
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <div className="max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-6">
      {toast && <Toast {...toast} />}

      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Current Password"
          type="password"
          value={form.currentPassword}
          onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
        />
        <Input
          label="New Password"
          type="password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Update Password
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-gray-200"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, type, value, onChange }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-black outline-none"
    />
  </div>
);

export default ChangePasswordSection;
