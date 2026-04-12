export default function Features() {
  const items = [
    { title: "Entrega Global", desc: "Logística avançada DN Core", icon: "🌐" },
    { title: "Pagamento Seguro", desc: "Criptografia de ponta a ponta", icon: "🔒" },
    { title: "Suporte Pro", desc: "Atendimento técnico 24/7", icon: "⚡" }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <div key={i} className="bg-[#0f1218]/30 border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/20 transition-all text-center group">
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
          <h4 className="text-white font-black uppercase tracking-tighter text-lg">{item.title}</h4>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}