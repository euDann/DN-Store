export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Coluna Logo */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-[1000] uppercase tracking-tighter italic text-white mb-4">
            TECHSTORE<span className="text-purple-500">PRO</span>
          </h2>
          <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-wider">
            A vanguarda do setup gamer. <br/> Equipamentos selecionados pela DN Core para performance extrema.
          </p>
        </div>

        {/* Colunas de Links */}
        <div>
          <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6">Navegação</h4>
          <ul className="space-y-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
            <li className="hover:text-purple-500 cursor-pointer transition-colors">Produtos</li>
            <li className="hover:text-purple-500 cursor-pointer transition-colors">Novidades</li>
            <li className="hover:text-purple-500 cursor-pointer transition-colors">Setup Pro</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6">Suporte</h4>
          <ul className="space-y-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
            <li className="hover:text-purple-500 cursor-pointer transition-colors">Rastreio</li>
            <li className="hover:text-purple-500 cursor-pointer transition-colors">Garantia</li>
            <li className="hover:text-purple-500 cursor-pointer transition-colors">Termos</li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div>
          <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6">Comunidade</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 transition-all cursor-pointer">
              <span className="text-white text-xs font-bold italic">IG</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 transition-all cursor-pointer">
              <span className="text-white text-xs font-bold italic">TW</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">
          © 2026 DN CORE TECHSTORE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-[9px] text-gray-700 font-bold uppercase tracking-widest">
          <span>Brasil / B. Roxo</span>
          <span>Status: Online</span>
        </div>
      </div>
    </footer>
  );
}