const AyudaCoordenadas = () => {
  return (
    <div className="config-ayuda">
      <h4>💡 Cómo obtener las coordenadas:</h4>
      <ol>
        <li>Abre Google Maps</li>
        <li>Busca tu urbanización o proyecto</li>
        <li>Haz click derecho en el centro del área</li>
        <li>Selecciona "Copiar coordenadas"</li>
        <li>Pega las coordenadas en los campos de arriba</li>
      </ol>
      <p className="ayuda-nota">
        O simplemente haz click en el mapa de vista previa para seleccionar el centro.
      </p>
    </div>
  );
};

export default AyudaCoordenadas;
