// Configuración de datos de la empresa/personal
export const COMPANY_INFO = {
  // Información personal del fundador
  founder: {
    name: 'Julio Cesar Hernández Pedraza',
    age: 29,
    birthDate: '19/09/1995',
    title: 'Ingeniero en Telecomunicaciones y Electrónica',
    role: 'Desarrollador de software web y aplicaciones móviles',
    bio: 'Ingeniero especializado en desarrollo de software con experiencia en tecnologías web y móviles. Apasionado por la tecnología financiera y las últimas tendencias del sector.',
  },

  // Información de contacto
  contact: {
    email: {
      primary: 'julio.hdez.blog@gmail.com',
      general: 'info@techfinance.blog',
      support: 'soporte@techfinance.blog',
      editorial: 'editorial@techfinance.blog',
      legal: 'legal@techfinance.blog',
      privacy: 'privacidad@techfinance.blog'
    },
    phone: {
      primary: '+53 56134605',
      display: '+53 5613-4605'
    },
    location: {
      country: 'Cuba',
      province: 'La Habana',
      city: 'La Habana',
      timezone: 'America/Havana',
      displayAddress: 'La Habana, Cuba'
    }
  },

  // Información del sitio/empresa
  site: {
    name: 'TechFinance Blog',
    shortName: 'TechFinance',
    tagline: 'Tu fuente de información sobre tecnología, finanzas y criptomonedas',
    description: 'Blog especializado en tecnología financiera, criptomonedas, desarrollo de software y las últimas tendencias del sector tech.',
    founded: '2025',
    logo: 'TF',
    domain: 'techfinance.blog',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  },

  // Redes sociales (para cuando las configures)
  social: {
    twitter: '@techfinanceblog',
    linkedin: 'techfinance-blog',
    instagram: '@techfinanceblog',
    facebook: 'techfinanceblog',
    github: 'julio-hdex',
    youtube: '@techfinanceblog'
  },

  // Horarios de atención
  businessHours: {
    timezone: 'CST',
    weekdays: 'Lunes - Viernes: 9:00 - 18:00',
    saturday: 'Sábados: 10:00 - 14:00',
    sunday: 'Domingos: Cerrado',
    urgent: 'Para consultas urgentes, disponible en horario laboral'
  },

  // Información legal
  legal: {
    country: 'Cuba',
    businessType: 'Blog Personal',
    vatNumber: null, // Si aplica en el futuro
    registrationNumber: null // Si aplica en el futuro
  },

  // Configuración de servicios
  services: {
    newsletter: {
      frequency: 'semanal',
      description: 'Newsletter semanal con las últimas noticias de tecnología y finanzas'
    },
    responseTime: {
      general: '24 horas en días laborables',
      urgent: 'Durante horario de oficina',
      support: 'Menos de 48 horas'
    }
  },

  // Estadísticas del sitio (puedes actualizarlas según crezca)
  stats: {
    monthlyReaders: '1K+',
    articlesPublished: '50+',
    userSatisfaction: '95%',
    yearsExperience: '3'
  }
};

// Funciones de utilidad para formatear datos
export const formatters = {
  phone: (phone: string) => phone.replace(/(\+\d{2})(\d{3})(\d{5})/, '$1 $2-$3'),
  email: (email: string) => email.toLowerCase(),
  fullName: () => COMPANY_INFO.founder.name,
  businessAddress: () => COMPANY_INFO.contact.location.displayAddress,
  contactEmail: () => COMPANY_INFO.contact.email.primary,
  supportEmail: () => COMPANY_INFO.contact.email.support,
  currentAge: () => {
    const birthDate = new Date('1995-09-19');
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }
};

// Configuración específica para diferentes páginas
export const pageConfig = {
  about: {
    teamMembers: [
      {
        name: COMPANY_INFO.founder.name,
        role: 'Fundador y Editor en Jefe',
        description: `${COMPANY_INFO.founder.title} con experiencia en ${COMPANY_INFO.founder.role.toLowerCase()}. Especializado en tecnología financiera y blockchain.`,
        image: '👨‍💻',
        location: COMPANY_INFO.contact.location.displayAddress
      }
    ]
  },
  
  contact: {
    responseTime: COMPANY_INFO.services.responseTime.general,
    urgentNote: COMPANY_INFO.services.responseTime.urgent,
    businessHours: [
      COMPANY_INFO.businessHours.weekdays,
      COMPANY_INFO.businessHours.saturday,
      COMPANY_INFO.businessHours.sunday
    ].join('\n')
  }
};

export default COMPANY_INFO;
