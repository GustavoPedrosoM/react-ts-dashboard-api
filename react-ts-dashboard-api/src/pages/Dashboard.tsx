import { useCountries } from "../hooks/useCountries";
import SummaryCards from "../components/SummaryCards";
import { TopCountriesChart } from "../components/TopCountriesChart";

export const Dashboard = () => {
  const { countries, loading, error } = useCountries();

  if (loading) return <p className="text-center mt-10 text-gray-600">Carregando dados...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="w-screen h-screen bg-blue-900 p-10">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Top 10 países mais populosos 🌎
      </h1>

      <SummaryCards countries={countries} />
      <TopCountriesChart countries={countries} />
    </div>
  );
};
