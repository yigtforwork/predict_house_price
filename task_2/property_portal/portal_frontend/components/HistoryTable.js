export default function HistoryTable({ history }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Previous Estimates
        </h2>

        <p className="text-sm text-slate-500">
          Prediction history stored in CSV.
        </p>
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-slate-500">
          No previous estimates.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Square Footage</th>
                <th className="px-4 py-3">Bedrooms</th>
                <th className="px-4 py-3">Bathrooms</th>
                <th className="px-4 py-3">Year Built</th>
                <th className="px-4 py-3">Lot Size</th>
                <th className="px-4 py-3">Distance to City Center</th>
                <th className="px-4 py-3">School Rating</th>
                <th className="px-4 py-3">Predicted Price</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, index) => (
                <tr key={`${item.id}-${index}`} className="border-b">
                  <td className="px-4 py-3">
                    {item.timestamp}
                  </td>
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.square_footage}</td>
                  <td className="px-4 py-3">{item.bedrooms}</td>
                  <td className="px-4 py-3">{item.bathrooms}</td>
                  <td className="px-4 py-3">{item.year_built}</td>
                  <td className="px-4 py-3">{item.lot_size}</td>
                  <td className="px-4 py-3">{item.distance_to_city_center}</td>
                  <td className="px-4 py-3">{item.school_rating}</td>
                  <td className="px-4 py-3 font-semibold">
                    ${Number(item.price).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}