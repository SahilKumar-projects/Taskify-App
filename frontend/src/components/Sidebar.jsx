import {
  LayoutDashboard,
  Calendar,
  Bell,
  BarChart2,
  LogOut,
  User,
  Key,
  Menu,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ onViewChange }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black text-white md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 h-screen fixed left-0 top-0 p-5 bg-white/70 backdrop-blur-xl 
        border-r border-white shadow-xl z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-xl font-bold">
            T
          </div>
          <span className="text-lg font-semibold">Taskify</span>
        </div>

        {/* Welcome Section */}
        <div className="mb-6 px-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-9 h-9 rounded-full"
            />

            <div className="leading-tight">
              <p className="text-sm font-medium text-gray-800">
                Welcome back...
              </p>
              <p className="text-xs text-gray-500">
                Let’s be productive today
              </p>
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-500 italic">
            “Small steps every day lead to big results.”
          </p>
        </div>

        <nav className="space-y-2 text-sm">
          <MenuItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            onClick={() => {
              onViewChange("dashboard");
              setOpen(false);
            }}
          />
          <MenuItem
            icon={<User size={18} />}
            label="Profile"
            onClick={() => {
              onViewChange("profile");
              setOpen(false);
            }}
          />
          <MenuItem
            icon={<Bell size={18} />}
            label="Notifications"
            onClick={() => {
              onViewChange("notifications");
              setOpen(false);
            }}
          />
          <MenuItem
            icon={<Calendar size={18} />}
            label="Calendar"
            onClick={() => {
              onViewChange("calendar");
              setOpen(false);
            }}
          />
          <MenuItem
            icon={<BarChart2 size={18} />}
            label="Reports"
            onClick={() => {
              onViewChange("reports");
              setOpen(false);
            }}
          />
          <MenuItem
            icon={<Key size={18} />}
            label="Change Password"
            onClick={() => {
              onViewChange("change-password");
              setOpen(false);
            }}
          />
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-5 right-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white/60"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white/60 cursor-pointer"
  >
    {icon}
    {label}
  </div>
);

export default Sidebar;
