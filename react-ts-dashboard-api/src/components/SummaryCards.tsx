import React from "react";

interface Country {
  name: { common: string };
  population: number;
  area: number;
}

interface SummaryCardsProps {
  countries: Country[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ countries }) => {
  if (!countries || countries.length === 0) return null;

  const totalCountries = countries.length;
  const totalPopulation = countries.reduce((acc, c) => acc + c.population, 0);
  const largestCountry = countries.reduce((max, c) =>
    c.area > max.area ? c : max
  );
  const smallestCountry = countries.reduce((min, c) =>
    c.area < min.area && c.area > 0 ? c : min
  );

  const formatNumber = (num: number) =>
    num.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const cards = [
    { title: "Total de Países", value: totalCountries },
    { title: "População Mundial", value: formatNumber(totalPopulation) },
    { title: `Maior País`, value: largestCountry.name.common },
    { title: `Menor País`, value: smallestCountry.name.common },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md text-center border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {card.title}
          </h3>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
