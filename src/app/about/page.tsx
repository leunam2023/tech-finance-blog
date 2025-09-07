import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, formatters } from '@/config/company';

export const metadata: Metadata = generateMetadata({
    title: 'Sobre Nosotros',
    description: `Conoce más sobre ${COMPANY_INFO.site.name}, nuestro fundador ${COMPANY_INFO.founder.name} y nuestra misión de brindar información confiable sobre tecnología y finanzas.`,
    keywords: ['sobre nosotros', 'equipo', 'misión', 'tecnología', 'finanzas', COMPANY_INFO.founder.name],
    canonicalUrl: '/about'
});

export default function AboutPage() {
    const teamMembers = [
        {
            name: COMPANY_INFO.founder.name,
            role: 'Fundador y Editor en Jefe',
            description: `${COMPANY_INFO.founder.title} con ${formatters.currentAge()} años de edad. ${COMPANY_INFO.founder.role}. Especializado en tecnología financiera, blockchain y desarrollo de software.`,
            image: '👨‍💻',
            location: COMPANY_INFO.contact.location.displayAddress
        }
    ];

    const values = [
        {
            icon: Target,
            title: 'Precisión',
            description: 'Información verificada y análisis rigurosos para tomar mejores decisiones.'
        },
        {
            icon: Users,
            title: 'Comunidad',
            description: 'Construimos una comunidad de aprendizaje sobre tecnología y finanzas.'
        },
        {
            icon: TrendingUp,
            title: 'Innovación',
            description: 'Cubrimos las últimas tendencias y tecnologías emergentes del mercado.'
        },
        {
            icon: Award,
            title: 'Calidad',
            description: 'Contenido de alta calidad respaldado por investigación y experiencia.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Sobre <span className="text-blue-600">{COMPANY_INFO.site.shortName}</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Conoce a {COMPANY_INFO.founder.name}, {COMPANY_INFO.founder.title} especializado en
                        tecnología financiera, desarrollo de software y blockchain.
                        Comprometido con brindar información confiable y análisis profundos
                        para ayudarte a navegar en el mundo digital y financiero.
                    </p>
                </div>

                {/* Misión y Visión */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Democratizar el acceso a información de calidad sobre tecnología y finanzas,
                            proporcionando análisis claros, actualizaciones del mercado y guías prácticas
                            que empoderen a nuestros lectores para tomar decisiones informadas en sus
                            inversiones y carrera profesional.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Ser la plataforma de referencia en español para profesionales, inversores
                            y entusiastas que buscan mantenerse al día con las innovaciones tecnológicas
                            y las oportunidades financieras del futuro, construyendo una comunidad
                            educada y próspera.
                        </p>
                    </div>
                </div>

                {/* Valores */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Nuestros Valores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                                    <value.icon className="w-8 h-8 text-blue-600 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Equipo */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Nuestro Equipo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
                                <div className="text-4xl mb-4">{member.image}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">50K+</div>
                            <div className="text-blue-100">Lectores mensuales</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">500+</div>
                            <div className="text-blue-100">Artículos publicados</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">95%</div>
                            <div className="text-blue-100">Satisfacción de usuarios</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">3</div>
                            <div className="text-blue-100">Años de experiencia</div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        ¿Quieres formar parte de nuestra comunidad?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Únete a miles de profesionales que ya confían en nuestro contenido
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Contáctanos
                        </a>
                        <Link
                            href="/"
                            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        >
                            Explora nuestros artículos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
