export type Project = {
  name: string
  summary: string
  date: string
  description: string
  image: string
  tags: string[]
  url: string
  demoUrl: string
}
export const profile = {
  name: 'Dorivaldo',
  fullname: 'Dorivaldo Valentim',
  role: 'Desenvolvedor Web Fullstack',
  location: 'Luanda, Angola',
  email: 'hello@dorivaldovalentim.dev',
  headline: 'Olá, eu sou o Dorivaldo Valentim',
  intro:
    'Transformando ideias em realidade digital com código limpo e design moderno, diretamente de Angola para o mundo.',
  bio: `
      <p>Sou um desenvolvedor web fullstack de Angola, apaixonado por criar soluções tecnológicas que resolvem problemas reais. Sou um gamer dedicado, criador de conteúdo nas horas vagas e tenho uma personalidade divertida, curiosa e persistente.</p>
      <p>Meus hobbies vão desde explorar o universo com meu telescópio e pedalar por novas trilhas, até mergulhar em novas tecnologias e frameworks. Acredito que a curiosidade é o motor da inovação.</p>
    `,
  avatar:
    'https://cloud.squidex.io/api/assets/dorivaldovalentim/dbb965da-73de-4aa9-a799-05406cfaeae1/avatar.jpg?version=1',
  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/' },
    { label: 'YouTube', url: 'https://youtube.com/' },
    { label: 'Email', url: 'mailto:hello@dorivaldovalentim.dev' }
  ]
}

export const funFacts = [
  'Recentemente aprendi a usar hashis e agora me sinto invencível.',
  'Passo horas explorando o céu noturno com meu telescópio. Júpiter é meu vizinho favorito.',
  'Tenho uma lista de jogos para zerar que é maior que a Muralha da China. Mas eu vou conseguir... um dia.',
  'Meu primeiro "Hello World" foi em QBasic, numa tela azul que marcou minha alma.'
]

export const projects: Project[] = [
  {
    title: 'AstroGallery',
    summary: 'Uma galeria para compartilhar fotos de astronomia.',
    date: 'Novembro 2022',
    description:
      'Este projeto visa centralizar e facilitar a partilha de fotografias de astronomia. Desenvolvi um sistema de galeria com perfis, listagem, filtros e uma experiência simples para quem gosta de observar o céu.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    tags: ['React', 'Node.js', 'Express'],
    url: '#contacto',
    demoUrl: '#contacto'
  },
  {
    title: 'GameHub Connect',
    summary: 'Plataforma social para conectar gamers.',
    date: 'Janeiro 2023',
    description:
      'Uma plataforma social pensada para comunidades de jogos, com perfis, conversas em tempo real e espaços para encontrar equipas. O foco foi criar uma base rápida, moderna e preparada para interação ao vivo.',
    image:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=900&q=80',
    tags: ['TypeScript', 'Next.js', 'Socket.IO'],
    url: '#contacto',
    demoUrl: '#contacto'
  },
  {
    title: 'Trail Planner',
    summary: 'Aplicação para organizar rotas, trilhas e experiências ao ar livre.',
    date: 'Agosto 2023',
    description:
      'Aplicação para planear trilhas, guardar pontos de interesse e organizar rotas ao ar livre. Trabalhei a experiência visual dos mapas, estados de planeamento e uma navegação simples para consulta rápida.',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    tags: ['Vue.js', 'Maps API', 'Firebase'],
    url: '#contacto',
    demoUrl: '#contacto'
  },
  {
    title: 'TaskFlow',
    summary: 'Dashboard moderno para gerir tarefas, equipas e prioridades.',
    date: 'Março 2024',
    description:
      'Dashboard para equipas pequenas acompanharem tarefas, prioridades e progresso. A interface foi desenhada para leitura rápida, com uma API organizada para manter dados e permissões consistentes.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    tags: ['Nuxt', 'Laravel', 'PostgreSQL'],
    url: '#contacto',
    demoUrl: '#contacto'
  }
]
