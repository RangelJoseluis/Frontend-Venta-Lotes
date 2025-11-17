import React from 'react';
import {UserPlus, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { HeaderGestionVentasProps } from '../../types';
import './HeaderGestionVentas.css';


const HeaderGestionVentas: React.FC<HeaderGestionVentasProps> = ({
  
  onNuevoVentas,
  onVolver,
  totalVentas,
 
}) => {
  const navigate = useNavigate();

  const handleVolver = () => {
    if (onVolver) {
      onVolver();
    } else {
      navigate('/dashboard');
    }
  };


  return (
     <div className="gestion-header">
          <div className="header-left">
            <h1>
              <Home size={24} />
              Gestión de Ventas
            </h1>
            <p className="header-subtitle">
              {totalVentas} de {totalVentas} usuarios
            </p>
          </div>
      


     <div style={{ display: 'flex', gap: '1rem' }}>
             <button
               onClick={handleVolver}
               className="btn-volver-dashboard"
               style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '0.5rem',
                 padding: '0.75rem 1.5rem',
                 background: 'white',
                 color: '#1e293b',
                 border: '2px solid #e2e8f0',
                 borderRadius: '0.5rem',
                 fontSize: '0.875rem',
                 fontWeight: 600,
                 cursor: 'pointer',
                 transition: 'all 0.2s'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#f8fafc';
                 e.currentTarget.style.borderColor = '#cbd5e1';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'white';
                 e.currentTarget.style.borderColor = '#e2e8f0';
               }}
             >
               <ArrowLeft size={20} />
               Volver al Dashboard
             </button>
             <button
               onClick={onNuevoVentas}
               className="btn-nuevo-lote"
             >
               <UserPlus size={20} />
               Nuevo Venta
             </button>
           </div>
         </div>
       );
     };
     

export default HeaderGestionVentas;
