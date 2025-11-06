import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface TopCountriesChartProps {
  countries: { name: { common: string }; population: number }[];
}

export const TopCountriesChart = ({ countries }: TopCountriesChartProps) => {
  const topCountries = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map((c) => ({
      name: c.name.common,
      population: c.population,
    }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mt-8">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topCountries}>
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => {
              if (value >= 1_000_000_000)
                return `${(value / 1_000_000_000).toFixed(1)}B`;
              if (value >= 1_000_000)
                return `${(value / 1_000_000).toFixed(1)}M`;
              if (value >= 1_000)
                return `${(value / 1_000).toFixed(1)}K`;
              return value;
            }}
          />
          <Tooltip
            formatter={(value: number) => value.toLocaleString("pt-BR")}
            labelStyle={{ fontWeight: "bold", color: "#333" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />
          <Bar dataKey="population" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
