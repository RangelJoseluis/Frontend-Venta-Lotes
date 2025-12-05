const AyudaCoordenadas = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-6 mt-8">
      <h4 className="text-base font-bold text-yellow-900 dark:text-yellow-300 mb-4">
        💡 Cómo obtener las coordenadas:
      </h4>
      <ol className="list-decimal list-inside space-y-2 text-yellow-900 dark:text-yellow-200 mb-4 pl-2">
        <li>Abre Google Maps</li>
        <li>Busca tu urbanización o proyecto</li>
        <li>Haz click derecho en el centro del área</li>
        <li>Selecciona "Copiar coordenadas"</li>
        <li>Pega las coordenadas en los campos de arriba</li>
      </ol>
      <p className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg text-yellow-900 dark:text-yellow-300 font-semibold text-sm">
        O simplemente haz click en el mapa de vista previa para seleccionar el centro.
      </p>
    </div>
  );
};

export default AyudaCoordenadas;
