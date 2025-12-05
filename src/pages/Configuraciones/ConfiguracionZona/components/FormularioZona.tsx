import type { ConfiguracionZona } from '../../shared/types';

interface FormularioZonaProps {
  zona: ConfiguracionZona;
  setZona: (zona: ConfiguracionZona) => void;
}

const FormularioZona = ({ zona, setZona }: FormularioZonaProps) => {
  return (
    <div className="mb-8">
      {/* Nombre de la Zona */}
      <div className="mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Nombre de la Zona
          </label>
          <input
            type="text"
            value={zona.nombre}
            onChange={(e) => setZona({ ...zona, nombre: e.target.value })}
            placeholder="Ej: Urbanización Los Pinos"
            className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Coordenadas del Centro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Latitud (Centro)
          </label>
          <input
            type="number"
            step="0.000001"
            value={zona.centro.latitud}
            onChange={(e) => setZona({
              ...zona,
              centro: { ...zona.centro, latitud: parseFloat(e.target.value) }
            })}
            className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Longitud (Centro)
          </label>
          <input
            type="number"
            step="0.000001"
            value={zona.centro.longitud}
            onChange={(e) => setZona({
              ...zona,
              centro: { ...zona.centro, longitud: parseFloat(e.target.value) }
            })}
            className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Nivel de Zoom */}
      <div className="mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Nivel de Zoom
          </label>
          <input
            type="range"
            min="10"
            max="22"
            value={zona.zoom}
            onChange={(e) => setZona({ ...zona, zoom: parseInt(e.target.value) })}
            className="w-full h-2 bg-gradient-to-r from-slate-200 to-purple-600 dark:from-slate-600 dark:to-purple-500 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 dark:[&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 dark:[&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg"
          />
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              Zoom: {zona.zoom}
            </span>
            <span className="font-medium text-slate-600 dark:text-slate-400">
              {zona.zoom < 13 ? '🌍 Ciudad' : zona.zoom < 16 ? '🏘️ Barrio' : zona.zoom < 18 ? '🏠 Calle' : '📍 Detalle'}
            </span>
          </div>
        </div>
      </div>

      {/* Sección de Límites */}
      <div className="mt-8 pt-8 border-t-2 border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Límites del Área (Opcional)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Define los límites para restringir el área visible del mapa
        </p>

        {/* Límites Norte y Sur */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Límite Norte
            </label>
            <input
              type="number"
              step="0.000001"
              value={zona.limites?.norte || ''}
              onChange={(e) => setZona({
                ...zona,
                limites: { ...zona.limites!, norte: parseFloat(e.target.value) }
              })}
              placeholder="Ej: 11.380"
              className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Límite Sur
            </label>
            <input
              type="number"
              step="0.000001"
              value={zona.limites?.sur || ''}
              onChange={(e) => setZona({
                ...zona,
                limites: { ...zona.limites!, sur: parseFloat(e.target.value) }
              })}
              placeholder="Ej: 11.370"
              className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Límites Este y Oeste */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Límite Este
            </label>
            <input
              type="number"
              step="0.000001"
              value={zona.limites?.este || ''}
              onChange={(e) => setZona({
                ...zona,
                limites: { ...zona.limites!, este: parseFloat(e.target.value) }
              })}
              placeholder="Ej: -72.215"
              className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Límite Oeste
            </label>
            <input
              type="number"
              step="0.000001"
              value={zona.limites?.oeste || ''}
              onChange={(e) => setZona({
                ...zona,
                limites: { ...zona.limites!, oeste: parseFloat(e.target.value) }
              })}
              placeholder="Ej: -72.230"
              className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioZona;
