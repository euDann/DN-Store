const imagem = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

// Produtos, descrições e preços abaixo são fictícios e servem para a demonstração.
export const produtosFixos = [
  {
    id: 1,
    nome: 'Teclado Mecânico Custom',
    preco: 850,
    categoria: 'Teclados',
    descricao: 'Monte o teclado com switches e acabamento do seu jeito.',
    imagem: imagem('photo-1595225476474-87563907a212'),
    selo: 'Personalizável',
    options: {
      Switches: ['Gateron Blue', 'Cherry MX Red', 'Akko V3 Creamy'],
      Cor: ['Preto', 'Branco', 'Roxo']
    }
  },
  {
    id: 2,
    nome: 'Mouse Gamer Pro Wireless',
    preco: 420,
    categoria: 'Mouses',
    descricao: 'Formato leve para longas sessões e movimentos precisos.',
    imagem: imagem('photo-1527814050087-3793815479db'),
    selo: 'Sem fio',
    options: {
      DPI: ['16 mil DPI', '25 mil DPI'],
      Conexão: ['USB-C', 'Adaptador sem fio']
    }
  },
  {
    id: 3,
    nome: 'Monitor Ultrawide 34”',
    preco: 2800,
    categoria: 'Monitores',
    descricao: 'Tela ampla para trabalhar, jogar e deixar tudo à vista.',
    imagem: imagem('photo-1527443224154-c4a3942d3acf'),
    selo: 'Tela ampla'
  },
  {
    id: 4,
    nome: 'Headset Pulse Surround',
    preco: 590,
    categoria: 'Headsets',
    descricao: 'Conforto acolchoado e som envolvente para o setup.',
    imagem: imagem('photo-1599669454699-248893623440'),
    selo: 'Conforto'
  },
  {
    id: 5,
    nome: 'Microfone StreamCast USB',
    preco: 349,
    categoria: 'Acessórios',
    descricao: 'Uma opção compacta para chamadas, aulas e transmissões.',
    imagem: imagem('photo-1590602847861-f357a9332bbc'),
    selo: 'Plug & play'
  },
  {
    id: 6,
    nome: 'Notebook Creator 15',
    preco: 3990,
    categoria: 'Hardware',
    descricao: 'Uma tela ampla e portátil para estudo, trabalho e criação.',
    imagem: imagem('photo-1496181133206-80ce9b88a853'),
    selo: 'Portátil'
  },
  {
    id: 7,
    nome: 'SSD NVMe 1 TB',
    preco: 520,
    categoria: 'Hardware',
    descricao: 'Mais espaço e agilidade para seus jogos e projetos.',
    imagem: imagem('photo-1597872200969-2b65d56bd16b'),
    selo: 'Upgrade'
  },
  {
    id: 8,
    nome: 'Mousepad Desk XL',
    preco: 159,
    categoria: 'Acessórios',
    descricao: 'Superfície ampla para organizar teclado e mouse.',
    imagem: imagem('photo-1497366754035-f200968a6e72'),
    selo: 'Tamanho XL'
  },
  {
    id: 9,
    nome: 'Caixa de Som Stereo Duo',
    preco: 299,
    categoria: 'Acessórios',
    descricao: 'Som estéreo compacto para completar a mesa.',
    imagem: imagem('photo-1608043152269-423dbba4e7e1'),
    selo: 'Compacta'
  }
];
