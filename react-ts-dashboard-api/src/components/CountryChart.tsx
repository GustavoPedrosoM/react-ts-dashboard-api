import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Country {
  name: { common: string };
  population: number;
  area: number;
}

interface Props {
  countries: Country[];
}

const PopulationAreaChart: React.FC<Props> = ({ countries }) => {
  const data = countries
    .filter((c) => c.population && c.area)
    .map((c) => ({
      name: c.name.common,
      population: c.population,
      area: c.area,
    }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Relação entre População e Área 🌎
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="area"
            name="Área (km²)"
            tickFormatter={(v) => v.toLocaleString()}
          />
          <YAxis
            type="number"
            dataKey="population"
            name="População"
            tickFormatter={(v) => v.toLocaleString()}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#3b82f6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationAreaChart;
