import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ProfileSection from "../components/ProfileSection";
import NotificationsSection from "../components/NotificationsSection";
import CalendarSection from "../components/CalendarSection";
import TasksSection from "../components/TasksSection";
import ReportsSection from "../components/ReportsSection";
import ChangePasswordSection from "../components/ChangePasswordSection";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 70 },
  { month: "May", value: 65 },
  { month: "Jun", value: 80 },
];

const glassCard =
  "bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-5";

const Dashboard = () => {
  const [view, setView] = useState("dashboard");

  return (
    <div className="h-screen flex bg-gradient-to-b from-sky-300 via-sky-200 to-white relative overflow-hidden">
      {/* Cloud glow */}
      <div className="absolute w-[700px] h-[700px] bg-white/40 rounded-full blur-3xl top-[-250px] left-[-250px]" />
      <div className="absolute w-[600px] h-[600px] bg-white/30 rounded-full blur-3xl bottom-[-250px] right-[-250px]" />

      <Sidebar onViewChange={setView} />

      {/* ONLY scrollable area */}
      <main className="ml-0 md:ml-64 flex-1 h-full overflow-y-auto pt-16 p-4 sm:pt-5 sm:p-5 md:pt-6 md:p-6 relative z-10">

        <Header />

        {view === "dashboard" && (
          <>
            <TasksSection />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard title="Active Projects" value="7" />
              <StatCard title="Total Tasks" value="49" />
              <StatCard title="My Assigned Tasks" value="12" />
              <StatCard title="Completed Tasks" value="6" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`${glassCard} lg:col-span-2`}>
                <h3 className="font-semibold mb-3">Weekly Revenue</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#000"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className={glassCard}>
                <h3 className="font-semibold mb-3">Schedule</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium">Team Standup</p>
                    <p className="text-gray-600">09:00 – 09:30</p>
                  </div>
                  <div>
                    <p className="font-medium">Design Review</p>
                    <p className="text-gray-600">11:30 – 12:15</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${glassCard} mt-6`}>
              <h3 className="font-semibold mb-4">
                Project Progress Summary
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2">Orion</td>
                    <td>$32,580</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td className="py-2">Zenith</td>
                    <td>$28,640</td>
                    <td>Ongoing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {view === "profile" && <ProfileSection onBack={() => setView("dashboard")} />}
        {view === "notifications" && <NotificationsSection onBack={() => setView("dashboard")} />}
        {view === "calendar" && <CalendarSection onBack={() => setView("dashboard")} />}
        {view === "reports" && <ReportsSection onBack={() => setView("dashboard")} />}
        {view === "change-password" && (
          <ChangePasswordSection onBack={() => setView("dashboard")} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
