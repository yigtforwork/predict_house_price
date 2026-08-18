export default function PredictionTable({ predictions }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-xl font-bold">
        Prediction Results
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Sq. Ft.</th>
              <th className="px-4 py-3">Bedrooms</th>
              <th className="px-4 py-3">Bathrooms</th>
              <th className="px-4 py-3">Year Built</th>
              <th className="px-4 py-3">Lot Size</th>
              <th className="px-4 py-3">Distance to city center</th>
              <th className="px-4 py-3">School Rating</th>
              <th className="px-4 py-3">Predicted Price</th>
            </tr>
          </thead>

          <tbody>
            {predictions.map((house) => (
              <tr key={house.id} className="border-b">
                <td className="px-4 py-3">{house.id}</td>
                <td className="px-4 py-3">
                  {house.square_footage}
                </td>
                <td className="px-4 py-3">{house.bedrooms}</td>
                <td className="px-4 py-3">{house.bathrooms}</td>
                <td className="px-4 py-3">{house.year_built}</td>
                <td className="px-4 py-3">{house.lot_size}</td>
                <td className="px-4 py-3">{house.distance_to_city_center}</td>
                <td className="px-4 py-3">{house.school_rating}</td>
                <td className="px-4 py-3 font-semibold text-blue-700">
                  ${Number(house.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}