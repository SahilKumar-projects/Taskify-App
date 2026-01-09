const notifications = [
  { id: 1, title: "Task assigned", desc: "You were assigned a new task", time: "2 mins ago" },
  { id: 2, title: "Profile updated", desc: "Your profile was updated", time: "1 hour ago" },
  { id: 3, title: "Weekly report ready", desc: "Your weekly report is available", time: "Yesterday" },
];

const NotificationsSection = ({ onBack }) => {
  return (
    <div className="max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-4 rounded-xl bg-white shadow-sm border"
          >
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-gray-600">{n.desc}</p>
            <span className="text-xs text-gray-400">{n.time}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-6 px-6 py-2 rounded-lg bg-black text-white"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotificationsSection;
