export type Locale = 'pt' | 'en'

const messages = {
  pt: {
    navHome: 'Início', navAbout: 'Sobre', navExperience: 'Experiência', navAchievements: 'Conquistas', navSkills: 'Competências', navProjects: 'Projetos', navContact: 'Contacto', navCv: 'CV',
    heroEyebrow: 'Fullstack developer', heroWork: 'Explorar trabalho', heroCv: 'Ver currículo', available: 'Disponível para novos desafios',
    about: 'Sobre mim', funFacts: 'Curiosidades',
    experience: 'Experiência', achievements: 'Conquistas', achievementsLead: 'Marcos que traduzem trabalho em equipa, execução e impacto.', teamOf: 'Equipa de', people: 'pessoas', more: 'Ver mais', projects: 'Projetos', allProjects: 'Ver todos', details: 'Ver detalhes', present: 'Presente', featuredProduct: 'Produto em destaque', viewCaseStudy: 'Explorar case study', productCaseStudy: 'Case study de produto', problem: 'O problema', solution: 'A solução', role: 'O meu papel', outcome: 'Resultado', selectedProduct: 'Produto seleccionado',
    contact: 'Contacto', contactLead: 'Tem uma pergunta, uma proposta ou quer apenas dizer olá? Fique à vontade para entrar em contacto.', name: 'O seu nome', email: 'O seu email', message: 'A sua mensagem', send: 'Enviar mensagem', sending: 'A enviar…', sent: 'Mensagem enviada com sucesso. Obrigado pelo contacto!', sendError: 'Não foi possível enviar a mensagem. Tente novamente dentro de instantes.', socialLead: 'Ou encontre-me nas redes sociais:', socialLabel: 'Redes sociais',
    rights: 'Todos os direitos reservados.',
    cvLabel: 'Curriculum vitae', backPortfolio: '← Voltar ao portfólio', savePdf: 'Guardar como PDF', profile: 'Perfil',
    projectsTitle: 'Meus projetos', projectsLead: 'Uma selecção de soluções digitais que transformei em produtos, plataformas e experiências para diferentes negócios.', searchProjects: 'Pesquisar projetos, clientes e tecnologias…', filterStatus: 'Filtrar por estado', filterTechnology: 'Todas as tecnologias', filterClient: 'Todas as empresas/clientes', filters: 'Filtros', clearSearch: 'Limpar pesquisa', clearFilters: 'Limpar filtros', resultsFound: 'projetos encontrados', resultFound: 'projeto encontrado', noneProjects: 'Nenhum projeto encontrado com os critérios seleccionados.', all: 'Todos', planning: 'Planeamento', inProgress: 'Em progresso', completed: 'Concluído', maintained: 'Mantido', archived: 'Arquivado',
    experienceLead: 'O meu percurso profissional como desenvolvedor fullstack.', noneExperience: 'Nenhuma experiência publicada neste momento.', client: 'Cliente', status: 'Estado', technologies: 'Tecnologias', gallery: 'Galeria', repository: 'Repositório', demo: 'Demonstração', website: 'Ver site', close: 'Fechar', share: 'Partilhar', copyLink: 'Copiar link', copied: 'Link copiado', backProjects: '← Voltar aos projectos', projectNotFound: 'Projecto não encontrado.', viewProject: 'Ver projecto', previousImage: 'Imagem anterior', nextImage: 'Imagem seguinte', openImage: 'Abrir imagem'
  },
  en: {
    navHome: 'Home', navAbout: 'About', navExperience: 'Experience', navAchievements: 'Achievements', navSkills: 'Skills', navProjects: 'Projects', navContact: 'Contact', navCv: 'Résumé',
    heroEyebrow: 'Full-stack developer', heroWork: 'Explore my work', heroCv: 'View résumé', available: 'Available for new opportunities',
    about: 'About me', funFacts: 'A few fun facts',
    experience: 'Experience', achievements: 'Achievements', achievementsLead: 'Milestones shaped by teamwork, execution and impact.', teamOf: 'Team of', people: 'people', more: 'See more', projects: 'Projects', allProjects: 'View all', details: 'View details', present: 'Present', featuredProduct: 'Featured product', viewCaseStudy: 'Explore case study', productCaseStudy: 'Product case study', problem: 'The problem', solution: 'The solution', role: 'My role', outcome: 'Outcome', selectedProduct: 'Selected product',
    contact: 'Contact', contactLead: 'Have a question, a proposal or just want to say hello? Feel free to get in touch.', name: 'Your name', email: 'Your email', message: 'Your message', send: 'Send message', sending: 'Sending…', sent: 'Your message was sent successfully. Thank you for reaching out!', sendError: 'Your message could not be sent. Please try again in a moment.', socialLead: 'Or find me on social media:', socialLabel: 'Social media',
    rights: 'All rights reserved.',
    cvLabel: 'Curriculum vitae', backPortfolio: '← Back to portfolio', savePdf: 'Save as PDF', profile: 'Profile',
    projectsTitle: 'My projects', projectsLead: 'A selection of digital solutions I turned into products, platforms and experiences for different businesses.', searchProjects: 'Search projects, clients and technologies…', filterStatus: 'Filter by status', filterTechnology: 'All technologies', filterClient: 'All companies/clients', filters: 'Filters', clearSearch: 'Clear search', clearFilters: 'Clear filters', resultsFound: 'projects found', resultFound: 'project found', noneProjects: 'No projects match the selected criteria.', all: 'All', planning: 'Planning', inProgress: 'In progress', completed: 'Completed', maintained: 'Maintained', archived: 'Archived',
    experienceLead: 'My professional journey as a full-stack developer.', noneExperience: 'No professional experience is currently published.', client: 'Client', status: 'Status', technologies: 'Technologies', gallery: 'Gallery', repository: 'Repository', demo: 'Live demo', website: 'Visit site', close: 'Close', share: 'Share', copyLink: 'Copy link', copied: 'Link copied', backProjects: '← Back to projects', projectNotFound: 'Project not found.', viewProject: 'View project', previousImage: 'Previous image', nextImage: 'Next image', openImage: 'Open image'
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
