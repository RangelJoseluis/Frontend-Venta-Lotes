import { Info } from 'lucide-react';
import type { ConfigMora } from '../../shared/types';

interface EjemploCalculoProps {
  config: ConfigMora;
}

const EjemploCalculo = ({ config }: EjemploCalculoProps) => {
  const cuota = 750000;
  const diasRetraso = 30;

  const calculoMoraDiaria = cuota * (config.tasaMoraDiaria / 100) * diasRetraso;
  const calculoMoraMensual = cuota * (config.tasaMoraMensual / 100);

  return (
    <div className="config-ayuda">
      <div className="ayuda-header">
        <Info size={20} />
        <h4>Ejemplo de Cálculo</h4>
      </div>
      <div className="ejemplo-calculo">
        <p><strong>Cuota:</strong> $750,000</p>
        <p><strong>Días de retraso:</strong> 30 días (después de los {config.diasGracia} días de gracia)</p>
        <p><strong>Método:</strong> {config.calculoMora === 'diario' ? 'Diario' : 'Mensual'}</p>
        <hr />
        {config.calculoMora === 'diario' ? (
          <>
            <p><strong>Cálculo:</strong> $750,000 × {config.tasaMoraDiaria}% × 30 días</p>
            <p className="resultado">
              <strong>Mora:</strong> ${calculoMoraDiaria.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </>
        ) : (
          <>
            <p><strong>Cálculo:</strong> $750,000 × {config.tasaMoraMensual}% × 1 mes</p>
            <p className="resultado">
              <strong>Mora:</strong> ${calculoMoraMensual.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EjemploCalculo;
