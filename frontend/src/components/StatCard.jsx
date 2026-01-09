const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
    </div>
  );
};

export default StatCard;
