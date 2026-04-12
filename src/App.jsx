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

function App() {
  const [produtos] = useState(produtosFixos); 
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [isLogado, setIsLogado] = useState(!!localStorage.getItem('user-token'));
  
  const userName = localStorage.getItem('user-name') || "USUÁRIO";
  const location = useLocation();
  const esconderCarrinho = location.pathname === '/login' || location.pathname === '/cadastro';

  useEffect(() => { setCarrinhoAberto(false); }, [location]);

  useEffect(() => {
    const salvo = localStorage.getItem('dn-store-cart');
    if (salvo) setCarrinho(JSON.parse(salvo));
  }, []);

  useEffect(() => {
    localStorage.setItem('dn-store-cart', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (p) => {
    setCarrinho([...carrinho, p]);
    setCarrinhoAberto(true);
  };
  
  const removerDoCarrinho = (index) => {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    localStorage.removeItem('dn-store-cart');
  };

  const produtosFiltrados = useMemo(() => {
    return produtos.filter(p => 
      categoriaAtiva === "Todos" || 
      p.categoria.toLowerCase() === categoriaAtiva.toLowerCase()
    );
  }, [produtos, categoriaAtiva]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      <Navbar 
        carrinhoCount={carrinho.length} 
        onOpenCart={() => setCarrinhoAberto(true)} 
        isLogado={isLogado}
        userName={userName}
        showCart={!esconderCarrinho} 
      />

      <Routes>
        <Route path="/" element={
          <div className="flex flex-col items-center">
            <header className="pt-24 pb-12 text-center w-full max-w-[1200px] px-6">
              <p className="text-purple-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 italic">Powered by DN Core</p>
              <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] font-[1000] uppercase tracking-tighter italic bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent leading-[0.85]">
                DN STORE
              </h1>
            </header>

            <Categories categoriaAtiva={categoriaAtiva} setCategoriaAtiva={setCategoriaAtiva} />

            <main className="w-full max-w-[1200px] px-6 py-12"> 
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
                {produtosFiltrados.map(p => (
                  <ProductCard key={p.id} produto={p} onAdicionar={adicionarAoCarrinho} />
                ))}
              </div>
            </main>
            <Features />
          </div>
        } />

        <Route path="/login" element={<Login onLogin={() => setIsLogado(true)} />} />
        <Route path="/cadastro" element={<Cadastro onCadastro={() => setIsLogado(true)} />} />
        <Route path="/perfil" element={isLogado ? <Perfil /> : <Navigate to="/login" />} />
        <Route path="/produto/:id" element={<ProductDetails produtos={produtos} onAdicionar={adicionarAoCarrinho} />} />
        <Route path="/checkout" element={isLogado ? <Checkout itens={carrinho} onCompraSucesso={limparCarrinho} /> : <Navigate to="/login" />} />
      </Routes>

      <Footer />
      <CartModal isOpen={carrinhoAberto} carrinho={carrinho} onClose={() => setCarrinhoAberto(false)} onRemover={removerDoCarrinho} />
    </div>
  )
}

export default App;
