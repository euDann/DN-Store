import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CartModal({ isOpen, onClose, carrinho, onRemover }) {
  const navigate = useNavigate();
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay: Sem Blur para evitar travamento */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />

          {/* Painel: Usando transformações simples */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }} // Tween é mais leve que Spring
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-[#0a0a0a] border-l border-white/5 z-[70] p-6 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Seu Arsenal</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest cursor-pointer">
                Fechar [X]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
              {carrinho.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Vazio</p>
                </div>
              ) : (
                carrinho.map((item, index) => (
                  <div key={index} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex gap-4">
                    <img src={item.imagem} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[11px] font-black uppercase italic text-white">{item.nome}</h4>
                      <p className="text-[10px] text-purple-500 font-bold">R$ {item.preco.toFixed(2)}</p>
                      <button 
                        onClick={() => onRemover(index)}
                        className="text-[8px] text-gray-600 uppercase font-black mt-2 hover:text-red-500 cursor-pointer"
                      >
                        [ Remover ]
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="flex justify-between items-end mb-6">
                <span className="text-[9px] text-gray-500 font-black uppercase">Total</span>
                <span className="text-2xl font-black italic">R$ {total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={carrinho.length === 0}
                className="w-full bg-white text-black py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all disabled:opacity-10 cursor-pointer"
              >
                Finalizar Ordem
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}