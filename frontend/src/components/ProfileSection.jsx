import { useEffect, useState } from "react";
import API from "../services/api";

/*  Toast Component */
const Toast = ({ message, type }) => (
  <div
    className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg ${
      type === "error" ? "bg-red-500" : "bg-green-600"
    }`}
  >
    {message}
  </div>
);

const ProfileSection = ({ onBack }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    bio: "",
  });

  const [toast, setToast] = useState(null);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/auth/me");
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        location: res.data.location || "",
        company: res.data.company || "",
        bio: res.data.bio || "",
      });
    };
    fetchProfile();
  }, []);

  /* ================= PROFILE COMPLETENESS ================= */
  const filledFields = Object.values(form).filter(v => v.trim()).length;
  const totalFields = Object.keys(form).length;
  const completion = Math.round((filledFields / totalFields) * 100);

  /* ================= UPDATE PROFILE ================= */
  const handleProfileSave = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return setToast({ type: "error", message: "Name is required" });
    }

    await API.put("/users/profile", form);
    setToast({ type: "success", message: "Profile updated successfully" });
  };

  /* Auto hide toast */
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="max-w-3xl bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-6">
      {toast && <Toast {...toast} />}

      <h2 className="text-2xl font-semibold mb-2">My Profile</h2>

      {/* COMPLETENESS */}
      <div className="mb-5">
        <p className="text-sm text-gray-600 mb-1">
          Profile completeness: {completion}%
        </p>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-black rounded"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* PROFILE FORM */}
      <form
        onSubmit={handleProfileSave}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          label="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        {/* READ ONLY EMAIL */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            value={form.email}
            readOnly
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        <Input
          label="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          label="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <Input
          label="Company"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
        />

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Bio</label>
          <textarea
            rows="3"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-black outline-none"
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Save Profile
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

/* INPUT COMPONENT */
const Input = ({ label, type = "text", value, onChange }) => (
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

export default ProfileSection;
