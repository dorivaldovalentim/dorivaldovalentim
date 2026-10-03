export type Locale = 'pt' | 'en'

const messages = {
  pt: {
    navHome: 'Início', navAbout: 'Sobre', navExperience: 'Experiência', navSkills: 'Competências', navProjects: 'Projetos', navContact: 'Contacto', navCv: 'CV',
    heroEyebrow: 'Fullstack developer', heroHeadline: 'Olá, eu sou o Dorivaldo Valentim', heroRole: 'Desenvolvedor Web Fullstack', heroIntro: 'Transformando ideias em realidade digital com código limpo e design moderno, diretamente de Angola para o mundo.', heroWork: 'Explorar trabalho', heroCv: 'Ver currículo', available: 'Disponível para novos desafios',
    about: 'Sobre mim', aboutBio: '<p>Sou um desenvolvedor web fullstack de Angola, apaixonado por criar soluções tecnológicas que resolvem problemas reais. Sou um gamer dedicado, criador de conteúdo nas horas vagas e tenho uma personalidade divertida, curiosa e persistente.</p><p>Meus hobbies vão desde explorar o universo com meu telescópio e pedalar por novas trilhas, até mergulhar em novas tecnologias e frameworks. Acredito que a curiosidade é o motor da inovação.</p>', funFacts: 'Curiosidades',
    fact1: 'Recentemente aprendi a usar hashis e agora me sinto invencível.', fact2: 'Passo horas explorando o céu nocturno com o meu telescópio. Júpiter é o meu vizinho favorito.', fact3: 'Tenho uma lista de jogos para terminar que é maior que a Muralha da China.', fact4: 'O meu primeiro “Hello World” foi em QBasic, numa tela azul que marcou a minha alma.',
    experience: 'Experiência', more: 'Ver mais', projects: 'Projetos', allProjects: 'Ver todos', details: 'Ver detalhes', present: 'Presente',
    contact: 'Contacto', contactLead: 'Tem uma pergunta, uma proposta ou quer apenas dizer olá? Fique à vontade para entrar em contacto.', name: 'O seu nome', email: 'O seu email', message: 'A sua mensagem', send: 'Enviar mensagem', socialLead: 'Ou encontre-me nas redes sociais:', socialLabel: 'Redes sociais',
    rights: 'Todos os direitos reservados.',
    cvLabel: 'Curriculum vitae', backPortfolio: '← Voltar ao portfólio', savePdf: 'Guardar como PDF', profile: 'Perfil', professionalSkills: 'Competências profissionais', cvSkill1: 'Desenvolvimento de aplicações web de ponta a ponta.', cvSkill2: 'Interfaces responsivas, acessíveis e orientadas à experiência do utilizador.', cvSkill3: 'Integração de APIs, CMS headless e bases de dados.', cvSkill4: 'Versionamento, automação e entrega com práticas modernas de desenvolvimento.',
    projectsTitle: 'Meus projetos', projectsLead: 'Explore os projetos que desenvolvi ao longo da minha carreira como desenvolvedor web fullstack.', searchProjects: 'Pesquisar projetos e tecnologias…', filterStatus: 'Filtrar por estado', noneProjects: 'Nenhum projeto encontrado com os critérios seleccionados.', all: 'Todos', planning: 'Planeamento', inProgress: 'Em progresso', completed: 'Concluído', maintained: 'Mantido', archived: 'Arquivado',
    experienceLead: 'O meu percurso profissional como desenvolvedor web fullstack.', noneExperience: 'Nenhuma experiência publicada neste momento.', client: 'Cliente', status: 'Estado', technologies: 'Tecnologias', gallery: 'Galeria', repository: 'Repositório', demo: 'Demonstração', website: 'Visitar website', close: 'Fechar'
  },
  en: {
    navHome: 'Home', navAbout: 'About', navExperience: 'Experience', navSkills: 'Skills', navProjects: 'Projects', navContact: 'Contact', navCv: 'Résumé',
    heroEyebrow: 'Full-stack developer', heroHeadline: "Hi, I'm Dorivaldo Valentim", heroRole: 'Full-Stack Web Developer', heroIntro: 'Turning ideas into digital products with clean code and modern design, from Angola to the world.', heroWork: 'Explore my work', heroCv: 'View résumé', available: 'Available for new opportunities',
    about: 'About me', aboutBio: '<p>I am a full-stack web developer from Angola, passionate about creating technology that solves real problems. I am also a dedicated gamer and occasional content creator, with a playful, curious and persistent personality.</p><p>My hobbies range from exploring the universe through my telescope and cycling new trails to learning new technologies and frameworks. I believe curiosity is the engine of innovation.</p>', funFacts: 'A few fun facts',
    fact1: 'I recently learned to use chopsticks and now feel unstoppable.', fact2: 'I spend hours exploring the night sky with my telescope. Jupiter is my favourite neighbour.', fact3: 'My backlog of games is longer than the Great Wall of China.', fact4: 'My first “Hello World” was written in QBasic, on a blue screen I will never forget.',
    experience: 'Experience', more: 'See more', projects: 'Projects', allProjects: 'View all', details: 'View details', present: 'Present',
    contact: 'Contact', contactLead: 'Have a question, a proposal or just want to say hello? Feel free to get in touch.', name: 'Your name', email: 'Your email', message: 'Your message', send: 'Send message', socialLead: 'Or find me on social media:', socialLabel: 'Social media',
    rights: 'All rights reserved.',
    cvLabel: 'Curriculum vitae', backPortfolio: '← Back to portfolio', savePdf: 'Save as PDF', profile: 'Profile', professionalSkills: 'Professional skills', cvSkill1: 'End-to-end web application development.', cvSkill2: 'Responsive, accessible interfaces focused on user experience.', cvSkill3: 'API, headless CMS and database integration.', cvSkill4: 'Version control, automation and modern software delivery practices.',
    projectsTitle: 'My projects', projectsLead: 'Explore the projects I have built throughout my career as a full-stack web developer.', searchProjects: 'Search projects and technologies…', filterStatus: 'Filter by status', noneProjects: 'No projects match the selected criteria.', all: 'All', planning: 'Planning', inProgress: 'In progress', completed: 'Completed', maintained: 'Maintained', archived: 'Archived',
    experienceLead: 'My professional journey as a full-stack web developer.', noneExperience: 'No professional experience is currently published.', client: 'Client', status: 'Status', technologies: 'Technologies', gallery: 'Gallery', repository: 'Repository', demo: 'Live demo', website: 'Visit website', close: 'Close'
  }
} as const

export const useLocale = () => {
  const cookie = useCookie<Locale>('portfolio-locale', { default: () => 'pt', sameSite: 'lax', maxAge: 31536000 })
  const locale = useState<Locale>('portfolio-locale', () => cookie.value === 'en' ? 'en' : 'pt')
  const t = (key: keyof typeof messages.pt) => messages[locale.value][key]
  const setLocale = (value: Locale) => { locale.value = value; cookie.value = value }
  const toggleLocale = () => setLocale(locale.value === 'pt' ? 'en' : 'pt')

  watchEffect(() => {
    if (import.meta.client) document.documentElement.lang = locale.value === 'pt' ? 'pt-AO' : 'en'
  })

  return { locale, t, setLocale, toggleLocale }
}
