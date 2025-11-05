import { useCountries } from "../hooks/useCountries";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export const Dashboard = () => {
  const { countries, loading, error } = useCountries();

  if (loading) return <p className="text-center mt-10 text-gray-600">Carregando dados...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // Pegando os 10 países mais populosos
  const topCountries = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map(c => ({
      name: c.name.common,
      population: c.population,
    }));

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Top 10 países mais populosos 🌎</h1>

      <div className="bg-white rounded-2xl shadow p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topCountries}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="population" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
