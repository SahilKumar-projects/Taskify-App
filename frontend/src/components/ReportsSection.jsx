const reports = [
  { name: "Weekly Progress", status: "Completed" },
  { name: "Monthly Tasks", status: "Generated" },
  { name: "Team Performance", status: "Pending" },
];

const ReportsSection = ({ onBack }) => {
  return (
    <div className="max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>

      <table className="w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="text-left py-2">Report</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{r.name}</td>
              <td className="font-medium">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onBack}
        className="mt-6 px-6 py-2 rounded-lg bg-black text-white"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ReportsSection;
