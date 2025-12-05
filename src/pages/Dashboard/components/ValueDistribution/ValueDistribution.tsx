import { DollarSign } from 'lucide-react';
import type { EstadisticasLotes } from '../../../../types';

interface ValueDistributionProps {
  stats: EstadisticasLotes | null;
}

const ValueDistribution = ({ stats }: ValueDistributionProps) => {
  if (!stats) return null;

  const precioPromedio = (stats.valorTotal || 0) / (stats.totalLotes || 1) / 1000000;
  const precioPorM2 = (stats.valorTotal || 0) / (stats.superficieTotal || 1);

  return (
    <div className="block w-full h-full">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 md:p-6 text-white shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col justify-between">
        <div className="flex items-center mb-3">
          <DollarSign className="w-6 h-6 mr-2.5 flex-shrink-0" />
          <h3 className="text-base md:text-lg font-semibold m-0 leading-tight">
            Valor Total del Inventario
          </h3>
        </div>

        <p className="text-4xl md:text-5xl lg:text-6xl font-bold my-2 md:my-3 leading-none">
          ${((stats.valorTotal || 0) / 1000000).toFixed(1)}M
        </p>

        <p className="text-sm md:text-base text-blue-200 mb-4 md:mb-5">
          Millones de pesos COP
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3.5 md:p-4 transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5">
            <p className="text-sm text-blue-200 m-0 mb-2">Precio Promedio</p>
            <p className="text-2xl md:text-3xl font-bold m-0 break-words">
              ${precioPromedio.toFixed(1)}M
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3.5 md:p-4 transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5">
            <p className="text-sm text-blue-200 m-0 mb-2">Por m²</p>
            <p className="text-2xl md:text-3xl font-bold m-0 break-words">
              ${precioPorM2.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueDistribution;
