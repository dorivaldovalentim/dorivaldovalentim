export type Locale = 'pt' | 'en'

const messages = {
  pt: {
    navHome: 'Início', navAbout: 'Sobre', navExperience: 'Experiência', navSkills: 'Competências', navProjects: 'Projetos', navContact: 'Contacto', navCv: 'CV',
    heroEyebrow: 'Fullstack developer', heroWork: 'Explorar trabalho', heroCv: 'Ver currículo', available: 'Disponível para novos desafios',
    about: 'Sobre mim', funFacts: 'Curiosidades',
    experience: 'Experiência', more: 'Ver mais', projects: 'Projetos', allProjects: 'Ver todos', details: 'Ver detalhes', present: 'Presente',
    contact: 'Contacto', contactLead: 'Tem uma pergunta, uma proposta ou quer apenas dizer olá? Fique à vontade para entrar em contacto.', name: 'O seu nome', email: 'O seu email', message: 'A sua mensagem', send: 'Enviar mensagem', socialLead: 'Ou encontre-me nas redes sociais:', socialLabel: 'Redes sociais',
    rights: 'Todos os direitos reservados.',
    cvLabel: 'Curriculum vitae', backPortfolio: '← Voltar ao portfólio', savePdf: 'Guardar como PDF', profile: 'Perfil',
    projectsTitle: 'Meus projetos', projectsLead: 'Explore os projetos que desenvolvi ao longo da minha carreira como desenvolvedor web fullstack.', searchProjects: 'Pesquisar projetos e tecnologias…', filterStatus: 'Filtrar por estado', noneProjects: 'Nenhum projeto encontrado com os critérios seleccionados.', all: 'Todos', planning: 'Planeamento', inProgress: 'Em progresso', completed: 'Concluído', maintained: 'Mantido', archived: 'Arquivado',
    experienceLead: 'O meu percurso profissional como desenvolvedor web fullstack.', noneExperience: 'Nenhuma experiência publicada neste momento.', client: 'Cliente', status: 'Estado', technologies: 'Tecnologias', gallery: 'Galeria', repository: 'Repositório', demo: 'Demonstração', website: 'Visitar website', close: 'Fechar'
  },
  en: {
    navHome: 'Home', navAbout: 'About', navExperience: 'Experience', navSkills: 'Skills', navProjects: 'Projects', navContact: 'Contact', navCv: 'Résumé',
    heroEyebrow: 'Full-stack developer', heroWork: 'Explore my work', heroCv: 'View résumé', available: 'Available for new opportunities',
    about: 'About me', funFacts: 'A few fun facts',
    experience: 'Experience', more: 'See more', projects: 'Projects', allProjects: 'View all', details: 'View details', present: 'Present',
    contact: 'Contact', contactLead: 'Have a question, a proposal or just want to say hello? Feel free to get in touch.', name: 'Your name', email: 'Your email', message: 'Your message', send: 'Send message', socialLead: 'Or find me on social media:', socialLabel: 'Social media',
    rights: 'All rights reserved.',
    cvLabel: 'Curriculum vitae', backPortfolio: '← Back to portfolio', savePdf: 'Save as PDF', profile: 'Profile',
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
