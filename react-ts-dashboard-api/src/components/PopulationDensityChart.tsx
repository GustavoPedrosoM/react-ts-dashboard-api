import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Country {
  name: { common: string };
  population: number;
  area: number;
}

interface Props {
  countries: Country[];
}

const PopulationDensityChart: React.FC<Props> = ({ countries }) => {
  // Seleciona os 25 países mais populosos
  const top25 = [...countries]
    .filter((c) => c.population && c.area)
    .sort((a, b) => b.population - a.population)
    .slice(0, 25)
    .map((c) => ({
      name: c.name.common,
      density: c.area > 0 ? c.population / c.area : 0,
    }))
    .sort((a, b) => b.density - a.density); // ordena por densidade decrescente

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Densidade Populacional (População / Área) 
      </h2>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={top25}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickFormatter={(v) => v.toLocaleString("pt-BR")}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 14 }}
            interval={0} // mostra todos os nomes!
          />
          <Tooltip
            formatter={(value: number) =>
              `${value.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
              })} hab/km²`
            }
          />
          <Bar dataKey="density" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationDensityChart;
