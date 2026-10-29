import { useState, useEffect, useMemo } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { produtosFixos } from './data/produtos'

import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartModal from './components/CartModal'
import Checkout from './components/pages/Checkout'
import ProductDetails from './components/pages/ProductDetails'
import Login from './components/pages/Login'
import Cadastro from './components/pages/Cadastro'
import Perfil from "./components/pages/Perfil" 
import Features from './components/Features'
import Footer from './components/Footer'
import Categories from './components/categories'
import { whatsappLoja } from './config/loja'
import { ArrowDown, ArrowRight, Search, ShoppingBag } from 'lucide-react'
import Painel from './components/pages/Painel'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  const [produtos, setProdutos] = useState(() => {
    try {
      const salvos = localStorage.getItem('dn-store-products');
      const listaSalva = salvos ? JSON.parse(salvos) : null;
      return Array.isArray(listaSalva) ? listaSalva : produtosFixos;
    } catch {
      return produtosFixos;
    }
  });
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [busca, setBusca] = useState('');
  const [isLogado, setIsLogado] = useState(!!localStorage.getItem('user-token'));
  
  const userName = localStorage.getItem('user-name') || "USUÁRIO";
  const location = useLocation();
  const esconderCarrinho = location.pathname === '/login' || location.pathname === '/cadastro';

  useEffect(() => { setCarrinhoAberto(false); }, [location]);

  useEffect(() => {
    const salvo = localStorage.getItem('dn-store-cart');
    if (salvo) {
      try {
        const itensSalvos = JSON.parse(salvo);
        if (Array.isArray(itensSalvos)) setCarrinho(itensSalvos.map(item => ({
          ...item,
          quantidade: Math.max(1, Number(item.quantidade) || 1),
          configuracao: item.configuracao || {}
        })));
      } catch {
        localStorage.removeItem('dn-store-cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dn-store-cart', JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    try {
      localStorage.setItem('dn-store-products', JSON.stringify(produtos));
    } catch {
      // O painel informa quando o navegador não tem espaço para salvar as fotos.
    }
  }, [produtos]);

  const adicionarAoCarrinho = (p) => {
    setCarrinho(atual => {
      const chave = JSON.stringify(p.configuracao || {});
      const existente = atual.find(item => item.id === p.id && JSON.stringify(item.configuracao || {}) === chave);
      if (existente) return atual.map(item => item === existente ? { ...item, quantidade: item.quantidade + 1 } : item);
      return [...atual, { ...p, quantidade: 1, configuracao: p.configuracao || {} }];
    });
    setCarrinhoAberto(true);
  };
  
  const alterarQuantidade = (id, configuracao, quantidade) => {
    const chave = JSON.stringify(configuracao || {});
    setCarrinho(atual => quantidade < 1
      ? atual.filter(item => !(item.id === id && JSON.stringify(item.configuracao || {}) === chave))
      : atual.map(item => item.id === id && JSON.stringify(item.configuracao || {}) === chave ? { ...item, quantidade } : item));
  };

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR');
    return produtos.filter(p => {
      const estaPublicado = p.ativo !== false;
      const correspondeCategoria = categoriaAtiva === "Todos" || p.categoria.toLowerCase() === categoriaAtiva.toLowerCase();
      const correspondeBusca = !termo || `${p.nome} ${p.categoria} ${p.descricao}`.toLocaleLowerCase('pt-BR').includes(termo);
      return estaPublicado && correspondeCategoria && correspondeBusca;
    });
  }, [produtos, categoriaAtiva, busca]);

  const categorias = useMemo(() => ['Todos', ...new Set(produtos.filter(produto => produto.ativo !== false).map(produto => produto.categoria))], [produtos]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      <Navbar 
        carrinhoCount={carrinho.reduce((total, item) => total + item.quantidade, 0)} 
        onOpenCart={() => setCarrinhoAberto(true)} 
        isLogado={isLogado}
        userName={userName}
        showCart={!esconderCarrinho} 
      />

      <Routes>
        <Route path="/" element={
          <div className="flex flex-col items-center">
            <section className="w-full max-w-[1320px] px-4 sm:px-6 pt-6 sm:pt-10">
              <div
                className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0b12] bg-cover bg-center px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=2000&q=90')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#08070b]/95 via-[#08070b]/80 to-[#120c1b]/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070b]/65 via-transparent to-[#08070b]/20" />
                <div className="absolute -right-16 top-[-8rem] h-80 w-80 rounded-full bg-purple-600/20 blur-[100px]" />
                <div className="relative z-10 flex min-h-[420px] items-center pb-20 sm:pb-16">
                  <div className="max-w-[620px]">
                    <p className="inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">DN Store <span className="h-1 w-1 rounded-full bg-purple-300" /> Setup & tecnologia</p>
                    <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.4rem]">Seu próximo <span className="text-purple-400">upgrade</span> começa aqui.</h1>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">Encontre peças e acessórios para montar um setup com a sua cara. Escolha os produtos e combine os detalhes do pedido direto com a loja.</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a href="#catalogo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-purple-500">Explorar catálogo <ArrowDown size={16} /></a>
                      <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-4 text-xs font-bold text-white transition hover:border-purple-400/50 hover:bg-white/5">Como funciona <ArrowRight size={15} /></a>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/50 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-8 sm:right-8"><div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/20 text-purple-200"><ShoppingBag size={19} /></div><div><p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Pedido simples</p><p className="mt-1 text-sm font-bold text-white">Finalização no WhatsApp</p></div></div>
              </div>
            </section>

            <main id="catalogo" className="w-full max-w-[1320px] px-4 py-12 sm:px-6 sm:py-24">
              <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-purple-400">Vitrine DN</p><h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-black tracking-tight">Explore o catálogo</h2><p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">Encontre seu próximo item para o setup.</p></div>
                <label className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition focus-within:border-purple-400/50 md:max-w-sm">
                  <Search size={18} className="shrink-0 text-gray-500" />
                  <input value={busca} onChange={evento => setBusca(evento.target.value)} placeholder="Buscar produto ou categoria" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500" />
                  {busca && <button type="button" onClick={() => setBusca('')} className="text-[10px] font-bold uppercase text-gray-400 hover:text-white">Limpar</button>}
                </label>
              </div>

              <Categories categorias={categorias} categoriaAtiva={categoriaAtiva} setCategoriaAtiva={setCategoriaAtiva} />
              <div className="mb-5 flex items-center justify-between"><p className="text-xs text-gray-500">{produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</p></div>
              {produtosFiltrados.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{produtosFiltrados.map(p => <ProductCard key={p.id} produto={p} onAdicionar={adicionarAoCarrinho} />)}</div> : <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center"><Search className="mx-auto text-gray-600" size={30} /><p className="mt-4 font-bold">Não encontramos esse produto.</p><p className="mt-1 text-sm text-gray-500">Tente outro termo ou escolha uma categoria diferente.</p></div>}
            </main>
            <Features />
          </div>
        } />

        <Route path="/login" element={<Login onLogin={() => setIsLogado(true)} />} />
        <Route path="/cadastro" element={<Cadastro onCadastro={() => setIsLogado(true)} />} />
        <Route path="/perfil" element={isLogado ? <Perfil /> : <Navigate to="/login" />} />
        <Route path="/painel" element={<Painel produtos={produtos} onSalvarProdutos={setProdutos} />} />
        <Route path="/produto/:id" element={<ProductDetails produtos={produtos} onAdicionar={adicionarAoCarrinho} />} />
        <Route path="/checkout" element={<Checkout itens={carrinho} whatsapp={whatsappLoja} />} />
      </Routes>

      <Footer />
      <FloatingWhatsApp numero={whatsappLoja} />
      <CartModal isOpen={carrinhoAberto} carrinho={carrinho} onClose={() => setCarrinhoAberto(false)} onAlterarQuantidade={alterarQuantidade} />
    </div>
  )
}

export default App;
