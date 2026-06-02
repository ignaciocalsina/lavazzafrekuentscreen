import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Botón "Atrás" que solo aparece dentro del flujo de demo (/demo)
 * y devuelve al usuario a la vista ilustrativa (/).
 */
const ViewToggle = () => {
  const { pathname } = useLocation();
  if (!pathname.startsWith('/demo')) return null;

  return (
    <Link
      to="/"
      aria-label="Volver"
      className="fixed top-3 right-3 z-50 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 backdrop-blur px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-card transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Atrás
    </Link>
  );
};

export default ViewToggle;
