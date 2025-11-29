const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-medium text-slate-600">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
