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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const country = payload[0].payload;
    const density = (country.population / country.area).toFixed(2);
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg text-sm">
        <p className="font-semibold text-blue-400">{country.name}</p>
        <p>População: {country.population.toLocaleString()}</p>
        <p>Área: {country.area.toLocaleString()} km²</p>
        <p>Densidade: {density} hab/km²</p>
      </div>
    );
  }
  return null;
};

const PopulationAreaChart: React.FC<Props> = ({ countries }) => {
  const data = countries
    .filter((c) => c.population && c.area)
    .sort((a, b) => b.population - a.population)
    .slice(0, 25)
    .map((c) => ({
      name: c.name.common,
      population: c.population,
      area: c.area,
      density: c.population / c.area,
    }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Relação entre População e Área (Top 25 Países) 🌎
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />

          <XAxis
            type="number"
            dataKey="area"
            name="Área (km²)"
            tickFormatter={(v) => {
              if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
              return v.toLocaleString();
            }}
            domain={['auto', 'auto']}
          />

          <YAxis
            type="number"
            dataKey="population"
            name="População"
            tickFormatter={(v) => {
              if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)}B`;
              if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
              return v.toLocaleString();
            }}
            domain={['auto', 'auto']}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#3b82f6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationAreaChart;
