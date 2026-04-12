import { motion } from 'framer-motion'

export default function Categories({ categoriaAtiva, setCategoriaAtiva }) {
  const categorias = ["Todos", "Teclados", "Mouses", "Monitores", "Hardware"];

  return (
    <div className="w-full flex sm:justify-center gap-3 mb-12 overflow-x-auto px-6 no-scrollbar snap-x">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategoriaAtiva(cat)}
          className="relative flex-none px-6 sm:px-8 py-3 rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-colors overflow-hidden group snap-center"
        >
          {categoriaAtiva === cat && (
            <motion.div 
              layoutId="activeTab"
              className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          <span className={`relative z-10 transition-colors duration-300 ${
            categoriaAtiva === cat ? "text-black" : "text-gray-500 group-hover:text-white"
          }`}>
            {cat}
          </span>

          {categoriaAtiva !== cat && (
            <div className="absolute inset-0 border border-white/5 rounded-2xl transition-colors group-hover:border-purple-500/30" />
          )}
        </button>
      ))}
    </div>
  );
}