import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { Shield, Lock, Eye, Database, Mail, Cookie } from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';

export const metadata: Metadata = generateMetadata({
    title: 'Política de Privacidad',
    description: 'Conoce cómo protegemos tu privacidad y manejamos tus datos personales en TechFinance Blog.',
    keywords: ['política de privacidad', 'protección de datos', 'privacidad', 'cookies'],
    canonicalUrl: '/privacy'
});

export default function PrivacyPage() {
    const lastUpdated = "1 de Septiembre de 2025";

    const privacyPoints = [
        {
            icon: Shield,
            title: 'Protección de Datos',
            description: 'Implementamos medidas de seguridad avanzadas para proteger tu información personal.'
        },
        {
            icon: Lock,
            title: 'Cifrado Seguro',
            description: 'Toda la información sensible se transmite usando cifrado SSL/TLS de última generación.'
        },
        {
            icon: Eye,
            title: 'Transparencia Total',
            description: 'Te informamos claramente sobre qué datos recopilamos y cómo los utilizamos.'
        },
        {
            icon: Database,
            title: 'Almacenamiento Responsable',
            description: 'Mantenemos tus datos solo el tiempo necesario y según las regulaciones aplicables.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-lg text-gray-600">
                        Última actualización: {lastUpdated}
                    </p>
                </div>

                {/* Principles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {privacyPoints.map((point, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                                    <point.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{point.title}</h3>
                            </div>
                            <p className="text-gray-600">{point.description}</p>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Información que Recopilamos</h2>
                        <div className="space-y-4 text-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900">Información que nos proporcionas directamente:</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Nombre y dirección de correo electrónico al suscribirte a nuestro newsletter</li>
                                <li>Comentarios y feedback que nos envíes</li>
                                <li>Información de contacto cuando nos escribes</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-900">Información recopilada automáticamente:</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Dirección IP y ubicación geográfica aproximada</li>
                                <li>Tipo de navegador y dispositivo utilizado</li>
                                <li>Páginas visitadas y tiempo de permanencia</li>
                                <li>Fuente de referencia (cómo llegaste a nuestro sitio)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cómo Utilizamos tu Información</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                            <li>Enviarte nuestro newsletter semanal con contenido relevante</li>
                            <li>Personalizar tu experiencia en el sitio web</li>
                            <li>Analizar el tráfico y mejorar nuestros servicios</li>
                            <li>Responder a tus consultas y comentarios</li>
                            <li>Cumplir con obligaciones legales</li>
                            <li>Detectar y prevenir fraudes o actividades maliciosas</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies y Tecnologías Similares</h2>
                        <div className="space-y-4 text-gray-600">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                                <div className="flex items-center mb-2">
                                    <Cookie className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="font-semibold text-blue-900">Uso de Cookies</span>
                                </div>
                                <p>Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.</p>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">Tipos de cookies que utilizamos:</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
                                <li><strong>Cookies analíticas:</strong> Google Analytics para entender el comportamiento de los usuarios</li>
                                <li><strong>Cookies de publicidad:</strong> Google AdSense para mostrar anuncios relevantes</li>
                                <li><strong>Cookies de preferencias:</strong> Recordar tus configuraciones y preferencias</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compartir Información con Terceros</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>No vendemos, alquilamos o compartimos tu información personal con terceros, excepto en los siguientes casos:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Proveedores de servicios:</strong> Google Analytics, Google AdSense, servicios de email marketing</li>
                                <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o autoridades competentes</li>
                                <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos, propiedad o seguridad</li>
                                <li><strong>Consentimiento:</strong> Cuando hayas dado tu consentimiento explícito</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Tus Derechos</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>Tienes los siguientes derechos sobre tu información personal:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Acceso</h4>
                                    <p className="text-sm">Solicitar una copia de tu información personal</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Rectificación</h4>
                                    <p className="text-sm">Corregir información incorrecta o incompleta</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Eliminación</h4>
                                    <p className="text-sm">Solicitar la eliminación de tu información</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Portabilidad</h4>
                                    <p className="text-sm">Obtener tus datos en formato estructurado</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seguridad de los Datos</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>Implementamos medidas técnicas y organizativas apropiadas para proteger tu información:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Cifrado SSL/TLS para todas las transmisiones de datos</li>
                                <li>Acceso restringido a la información personal</li>
                                <li>Monitoreo regular de nuestros sistemas de seguridad</li>
                                <li>Copias de seguridad regulares y planes de recuperación</li>
                                <li>Formación continua del personal en protección de datos</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retención de Datos</h2>
                        <p className="text-gray-600">
                            Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política,
                            a menos que un período de retención más largo sea requerido o permitido por ley. Los datos de suscripción al newsletter
                            se mantienen hasta que te des de baja, y los datos analíticos se conservan según las políticas de Google Analytics.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contacto</h2>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-900">¿Tienes preguntas sobre tu privacidad?</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, contáctanos:
                            </p>
                            <div className="space-y-2 text-gray-600">
                                <p><strong>Email:</strong> {COMPANY_INFO.contact.email.privacy}</p>
                                <p><strong>Contacto principal:</strong> {COMPANY_INFO.founder.name}</p>
                                <p><strong>Ubicación:</strong> {COMPANY_INFO.contact.location.displayAddress}</p>
                                <p><strong>Teléfono:</strong> {COMPANY_INFO.contact.phone.display}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cambios a esta Política</h2>
                        <p className="text-gray-600">
                            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento.
                            Te notificaremos sobre cambios significativos publicando la nueva política en esta página
                            y actualizando la fecha de &quot;última actualización&quot;. Te recomendamos revisar esta política
                            periódicamente para estar informado sobre cómo protegemos tu información.
                        </p>
                    </section>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            ¿Necesitas más información?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Estamos aquí para resolver cualquier duda sobre tu privacidad
                        </p>
                        <a
                            href="/contact"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Contáctanos
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
