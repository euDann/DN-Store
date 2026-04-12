import { useNavigate } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react';

export default function Navbar({ carrinhoCount, onOpenCart, isLogado, userName, showCart = true }) {
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LADO ESQUERDO: Logo Atualizado */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <h1 className="text-lg md:text-xl font-[1000] uppercase tracking-tighter italic text-white leading-none">
            DN<span className="text-purple-500 group-hover:text-white transition-colors ml-1">STORE</span>
          </h1>
        </div>

        {/* LADO DIREITO: Ações */}
        <div className="flex items-center gap-3 md:gap-6">
          
          <button 
            onClick={() => isLogado ? navigate('/perfil') : navigate('/login')}
            className="flex items-center gap-3 transition-all cursor-pointer outline-none group"
          >
            <div className="hidden sm:flex flex-col items-end">
              {isLogado ? (
                <>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] leading-none mb-1">
                    Usuário Ativo
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 group-hover:text-white">
                    {userName}
                  </span>
                </>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                  Fazer Login
                </span>
              )}
            </div>

            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-purple-500/50 transition-all">
              <User size={18} className={isLogado ? "text-purple-500" : "text-gray-400"} />
            </div>
          </button>

          {/* SÓ MOSTRA SE showCart FOR TRUE */}
          {showCart && (
            <>
              <div className="w-[1px] h-4 bg-white/10 hidden sm:block"></div>

              <button 
                onClick={onOpenCart}
                className="relative bg-purple-600 hover:bg-purple-500 text-white p-2 sm:px-5 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-3 transition-all active:scale-95 group shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Carrinho</span>
                <div className="bg-white/20 w-[1px] h-4 hidden sm:block"></div>
                
                <div className="sm:hidden">
                   <ShoppingCart size={18} />
                </div>

                <span className="text-sm font-black italic">{carrinhoCount}</span>
                
                {carrinhoCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-purple-600 text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full sm:hidden">
                    {carrinhoCount}
                  </span>
                )}
              </button>
            </>
          )}
          
        </div>
      </div>
    </nav>
  );
}