import { useNavigate } from 'react-router-dom';

export default function ProductCard({ produto, onAdicionar }) {
  const navigate = useNavigate();

  // Verifica se o produto pertence à categoria customizável
  const isCustomizavel = produto.categoria === "Teclados";

  return (
    <div className="group relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-4 sm:p-5 w-full max-w-[320px] transition-all hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]">
      
      {/* Imagem do Produto */}
      <div 
        onClick={() => navigate(`/produto/${produto.id}`)}
        className="relative aspect-square mb-4 sm:mb-6 overflow-hidden rounded-2xl bg-[#0F0F0F] cursor-pointer"
      >
        <img 
          src={produto.imagem} 
          alt={produto.nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=Hardware+Pro'} // Fallback se a imagem quebrar
        />
        {/* Overlay visível em hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Ver Detalhes</span>
        </div>
      </div>

      {/* Informações */}
      <div className="space-y-1 mb-4 sm:mb-6 min-h-[80px]"> {/* Altura mínima para manter o alinhamento dos botões */}
        <p className="text-purple-500 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] italic">
          {produto.categoria}
        </p>
        <h3 className="text-lg sm:text-xl font-[1000] uppercase tracking-tighter leading-tight italic group-hover:text-purple-400 transition-colors line-clamp-2">
          {produto.nome}
        </h3>
        <p className="text-xl sm:text-2xl font-black text-white/90">
          R$ {produto.preco.toFixed(2)}
        </p>
      </div>

      {/* Botões - Ajustados para toque mobile */}
      <div className="flex gap-2 w-full">
        <button 
          onClick={() => navigate(`/produto/${produto.id}`)}
          className="flex-[3] bg-white/5 hover:bg-white/10 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest py-3 rounded-xl border border-white/5 transition-all outline-none active:bg-white/20"
        >
          {isCustomizavel ? "Customizar" : "Analisar"}
        </button>
        
        <button 
          onClick={() => onAdicionar(produto)}
          aria-label="Adicionar ao carrinho"
          className="flex-1 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl transition-all active:scale-90 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>
    </div>
  );
}