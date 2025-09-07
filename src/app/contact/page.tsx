import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, FileText } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/config/company';

export const metadata: Metadata = generateMetadata({
    title: 'Contacto',
    description: `Ponte en contacto con ${COMPANY_INFO.founder.name} y el equipo de ${COMPANY_INFO.site.name}. Estamos aquí para resolver tus dudas sobre tecnología y finanzas.`,
    keywords: ['contacto', 'soporte', 'consultas', 'equipo', 'ayuda'],
    canonicalUrl: '/contact'
});

export default function ContactPage() {
    const contactInfo = [
        {
            icon: Mail,
            title: 'Email General',
            details: COMPANY_INFO.contact.email.primary,
            description: 'Para consultas generales y colaboraciones'
        },
        {
            icon: MessageSquare,
            title: 'Soporte',
            details: COMPANY_INFO.contact.email.support,
            description: 'Ayuda técnica y problemas del sitio'
        },
        {
            icon: FileText,
            title: 'Propuestas Editoriales',
            details: COMPANY_INFO.contact.email.editorial,
            description: 'Envía tus ideas de artículos o guest posts'
        },
        {
            icon: Phone,
            title: 'Teléfono',
            details: COMPANY_INFO.contact.phone.display,
            description: `${COMPANY_INFO.businessHours.weekdays} (${COMPANY_INFO.businessHours.timezone})`
        }
    ];

    const officeInfo = [
        {
            icon: MapPin,
            title: 'Ubicación',
            details: `${COMPANY_INFO.contact.location.city}, ${COMPANY_INFO.contact.location.province}\n${COMPANY_INFO.contact.location.country}`
        },
        {
            icon: Clock,
            title: 'Horario',
            details: `${COMPANY_INFO.businessHours.weekdays}\n${COMPANY_INFO.businessHours.saturday}\n${COMPANY_INFO.businessHours.sunday}`
        }
    ];

    const faqItems = [
        {
            question: '¿Cómo puedo suscribirme al newsletter?',
            answer: 'Puedes suscribirte usando el formulario en el footer de cualquier página o en la página principal.'
        },
        {
            question: '¿Ofrecen asesoramiento financiero personalizado?',
            answer: 'No, nuestro contenido es educativo. Para asesoramiento personalizado, consulta con un profesional certificado.'
        },
        {
            question: '¿Puedo enviar artículos como autor invitado?',
            answer: 'Sí, envianos tu propuesta a editorial@techfinance.blog con tu idea y experiencia relevante.'
        },
        {
            question: '¿Cómo reporto un error en el sitio?',
            answer: 'Escríbenos a soporte@techfinance.blog con detalles del problema y capturas de pantalla si es posible.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        ¡Hablemos!
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Estamos aquí para ayudarte. Ya sea que tengas una pregunta, una propuesta de colaboración
                        o simplemente quieras decir hola, nos encantaría escucharte.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Envíanos un mensaje
                            </h2>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-500"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Apellidos *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-500"
                                            placeholder="Tus apellidos"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-500"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Asunto *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-500"
                                    >
                                        <option value="" className="text-gray-500">Selecciona un tema</option>
                                        <option value="general" className="text-gray-900">Consulta general</option>
                                        <option value="collaboration" className="text-gray-900">Propuesta de colaboración</option>
                                        <option value="guest-post" className="text-gray-900">Artículo como invitado</option>
                                        <option value="technical" className="text-gray-900">Problema técnico</option>
                                        <option value="business" className="text-gray-900">Propuesta comercial</option>
                                        <option value="feedback" className="text-gray-900">Feedback del sitio</option>
                                        <option value="other" className="text-gray-900">Otro</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                        Empresa/Organización
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-500"
                                        placeholder="Nombre de tu empresa (opcional)"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mensaje *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none placeholder:text-gray-500"
                                        placeholder="Cuéntanos más sobre tu consulta o propuesta..."
                                    />
                                </div>

                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="privacy"
                                        name="privacy"
                                        required
                                        className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="privacy" className="text-sm text-gray-600">
                                        He leído y acepto la{' '}
                                        <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                                            Política de Privacidad
                                        </a>{' '}
                                        y los{' '}
                                        <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                                            Términos de Uso
                                        </a>
                                        . *
                                    </label>
                                </div>

                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="newsletter"
                                        name="newsletter"
                                        className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                                        Me gustaría recibir el newsletter semanal con las últimas noticias de tecnología y finanzas.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Enviar mensaje
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Methods */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Información de contacto
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="bg-blue-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                            <info.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{info.title}</h4>
                                            <p className="text-blue-600 font-medium">{info.details}</p>
                                            <p className="text-sm text-gray-600">{info.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Office Info */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Oficina
                            </h3>
                            <div className="space-y-4">
                                {officeInfo.map((info, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="bg-green-100 rounded-lg p-2 mr-4 flex-shrink-0">
                                            <info.icon className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{info.title}</h4>
                                            <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6">
                            <h3 className="text-lg font-bold mb-2">Tiempo de respuesta</h3>
                            <p className="text-blue-100 mb-4">
                                {COMPANY_INFO.services.responseTime.general}
                            </p>
                            <div className="bg-red-600 bg-opacity-20 rounded-lg p-3">
                                <p className="text-sm text-white">
                                    <strong>Urgente:</strong> {COMPANY_INFO.services.responseTime.urgent}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Preguntas Frecuentes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {item.question}
                                </h3>
                                <p className="text-gray-600">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alternative Contact Methods */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Otras formas de conectar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-blue-600 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Redes Sociales
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Síguenos en nuestras redes sociales para estar al día.
                            </p>
                            <div className="space-x-4">
                                <a href="#" className="text-blue-600 hover:text-blue-700">Twitter</a>
                                <a href="#" className="text-blue-600 hover:text-blue-700">LinkedIn</a>
                                <a href="#" className="text-blue-600 hover:text-blue-700">Instagram</a>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                                <User className="w-8 h-8 text-green-600 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Colaboraciones
                            </h3>
                            <p className="text-gray-600 mb-4">
                                ¿Eres experto en tech o finanzas? Colabora con nosotros.
                            </p>
                            <a
                                href={`mailto:${COMPANY_INFO.contact.email.editorial}`}
                                className="text-green-600 hover:text-green-700 font-medium"
                            >
                                Envía tu propuesta
                            </a>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                                <FileText className="w-8 h-8 text-purple-600 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Newsletter
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Recibe contenido exclusivo cada semana.
                            </p>
                            <Link
                                href="/#newsletter"
                                className="text-purple-600 hover:text-purple-700 font-medium"
                            >
                                Suscríbete aquí
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
