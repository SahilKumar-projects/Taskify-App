const events = [
  { day: "Mon", event: "Team Standup" },
  { day: "Wed", event: "Design Review" },
  { day: "Fri", event: "Sprint Demo" },
];

const CalendarSection = ({ onBack }) => {
  return (
    <div className="max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>

      <div className="grid grid-cols-3 gap-4">
        {events.map((e, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border p-4 shadow-sm"
          >
            <p className="font-semibold">{e.day}</p>
            <p className="text-sm text-gray-600">{e.event}</p>
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

export default CalendarSection;
