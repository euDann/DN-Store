import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, MapPin, Loader2 } from 'lucide-react';

export default function Checkout({ itens, onCompraSucesso }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);
  
  // Novo estado para o frete dinâmico
  const [valorFrete, setValorFrete] = useState(0);

  const [form, setForm] = useState({
    cep: '',
    numero: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    nomeCartao: '',
    numeroCartao: '',
    cvv: ''
  });

  const subtotal = useMemo(() => {
    return itens.reduce((acc, item) => acc + item.preco, 0);
  }, [itens]);

  // Função para definir o frete baseado no estado (UF)
  const calcularFretePorRegiao = (uf) => {
    if (subtotal > 1000) return 0; // Regra de Frete Grátis

    const tabelaFrete = {
      'SP': 15.00, 'RJ': 20.00, 'MG': 25.00, 'ES': 25.00, // Sudeste
      'PR': 30.00, 'SC': 30.00, 'RS': 35.00,             // Sul
      'DF': 35.00, 'GO': 40.00,                         // Centro-Oeste
      'BA': 45.00, 'PE': 50.00,                         // Nordeste
      'AM': 65.00, 'PA': 60.00                          // Norte
    };

    return tabelaFrete[uf] || 40.00; // Valor padrão para outros estados
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    setBuscandoCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        // Calcula o frete assim que a UF é descoberta
        const freteCalculado = calcularFretePorRegiao(data.uf);
        setValorFrete(freteCalculado);

        setForm(prev => ({
          ...prev,
          cep: data.cep,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
    } finally {
      setBuscandoCep(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      usuario: localStorage.getItem('user-name') || "Usuário Anonimo",
      itens: itens.map(i => ({ id: i.id, nome: i.nome, preco: i.preco })),
      total: subtotal + valorFrete,
      frete: valorFrete,
      endereco: `${form.endereco}, ${form.numero} - ${form.cidade}/${form.uf} (CEP: ${form.cep})`,
      pagamento: "Cartão de Crédito"
    };

    try {
      const response = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        onCompraSucesso();
        alert("Operação Finalizada! Pedido enviado para o arsenal.");
        navigate('/perfil');
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (itens.length === 0) return (/* ... mantém seu Arsenal Vazio ... */ null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-[1200px] mx-auto">
      {/* ... Cabeçalho ... */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-purple-500">
              <MapPin size={20} />
              <h2 className="font-black uppercase tracking-widest text-xs">Destino da Entrega</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input 
                  name="cep" 
                  required 
                  placeholder="CEP" 
                  onBlur={handleCepBlur}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" 
                />
                {buscandoCep && <Loader2 className="absolute right-4 top-4 animate-spin text-purple-500" size={18} />}
              </div>
              <input name="numero" required placeholder="Número" onChange={handleInputChange} className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
              <input name="endereco" required placeholder="Endereço Completo" value={form.endereco} onChange={handleInputChange} className="md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
              <input name="cidade" placeholder="Cidade" value={form.cidade} readOnly className="bg-white/2 border border-white/5 p-4 rounded-xl text-gray-500 text-sm" />
              <input name="uf" placeholder="UF" value={form.uf} readOnly className="bg-white/2 border border-white/5 p-4 rounded-xl text-gray-500 text-sm" />
            </div>
          </section>

          {/* ... Seção de Pagamento ... */}

          <button 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white font-[1000] uppercase italic py-5 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all active:scale-95 flex justify-center items-center gap-3"
          >
            {loading ? <><Loader2 className="animate-spin" /> Processando...</> : "Confirmar e Pagar"}
          </button>
        </form>

        <aside className="bg-white/5 border border-white/10 rounded-3xl p-8 h-fit space-y-6">
          <h2 className="font-black uppercase tracking-widest text-sm border-b border-white/5 pb-4">Resumo do Pedido</h2>
          
          {/* ... Lista de Itens ... */}

          <div className="space-y-2 pt-4 border-t border-white/5">
            <div className="flex justify-between text-gray-400 text-xs">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <span className="flex items-center gap-1"><Truck size={12} /> Frete</span>
              <span className={valorFrete === 0 ? "text-green-500 font-bold" : ""}>
                {valorFrete === 0 ? "GRÁTIS" : `R$ ${valorFrete.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-white font-black text-xl pt-2">
              <span>TOTAL</span>
              <span className="text-purple-500">R$ {(subtotal + valorFrete).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Badge de Proteção */}
          <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl flex items-center gap-3">
            <ShieldCheck className="text-purple-500 shrink-0" size={24} />
            <p className="text-[9px] uppercase font-bold leading-tight">
              Criptografia de nível militar ativa. Operação monitorada pelo sistema DN-Core.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}