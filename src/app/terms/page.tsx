import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { FileText, Scale, AlertTriangle, Globe, Shield, User } from 'lucide-react';
import { COMPANY_INFO } from '@/config/company';

export const metadata: Metadata = generateMetadata({
    title: 'Términos de Uso',
    description: `Términos y condiciones de uso del sitio web ${COMPANY_INFO.site.name}. Lee nuestras reglas y condiciones.`,
    keywords: ['términos de uso', 'condiciones', 'legal', 'normas', 'reglas'],
    canonicalUrl: '/terms'
}); export default function TermsPage() {
    const lastUpdated = "1 de Septiembre de 2025";

    const keyPoints = [
        {
            icon: FileText,
            title: 'Aceptación de Términos',
            description: 'Al usar nuestro sitio, aceptas estos términos y condiciones en su totalidad.'
        },
        {
            icon: Scale,
            title: 'Uso Responsable',
            description: 'Debes usar nuestro contenido de manera legal y respetuosa.'
        },
        {
            icon: AlertTriangle,
            title: 'Limitación de Responsabilidad',
            description: 'El contenido es informativo y no constituye asesoramiento financiero.'
        },
        {
            icon: Globe,
            title: 'Propiedad Intelectual',
            description: 'Todo el contenido está protegido por derechos de autor.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Términos de Uso
                    </h1>
                    <p className="text-lg text-gray-600">
                        Última actualización: {lastUpdated}
                    </p>
                </div>

                {/* Key Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {keyPoints.map((point, index) => (
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
                        <p className="text-gray-600 mb-4">
                            Al acceder y utilizar el sitio web TechFinance Blog (el &quot;Sitio&quot;), usted acepta estar sujeto a estos
                            Términos de Uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del
                            cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos,
                            tiene prohibido usar o acceder a este sitio.
                        </p>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                            <div className="flex items-center mb-2">
                                <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                                <span className="font-semibold text-amber-900">Importante</span>
                            </div>
                            <p className="text-amber-800">
                                El uso continuado del sitio implica la aceptación de cualquier modificación a estos términos.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descripción del Servicio</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                TechFinance Blog es una plataforma de información que proporciona:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Artículos y análisis sobre tecnología y finanzas</li>
                                <li>Noticias actualizadas del sector</li>
                                <li>Guías educativas sobre inversión y tecnología</li>
                                <li>Newsletter semanal con contenido seleccionado</li>
                                <li>Recomendaciones de productos y servicios (enlaces de afiliados)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer Financiero</h2>
                        <div className="bg-red-50 border-l-4 border-red-500 p-6">
                            <div className="flex items-center mb-4">
                                <Shield className="w-6 h-6 text-red-600 mr-3" />
                                <h3 className="text-lg font-semibold text-red-900">Aviso Importante sobre Inversiones</h3>
                            </div>
                            <div className="space-y-3 text-red-800">
                                <p>
                                    <strong>El contenido de este sitio es únicamente informativo y educativo.</strong>
                                    No constituye asesoramiento financiero, de inversión o legal.
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Las inversiones siempre conllevan riesgos y puedes perder parte o todo tu capital</li>
                                    <li>Los rendimientos pasados no garantizan resultados futuros</li>
                                    <li>Consulta siempre con un asesor financiero calificado antes de invertir</li>
                                    <li>Realiza tu propia investigación antes de tomar decisiones financieras</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propiedad Intelectual</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                El contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos,
                                íconos, imágenes, clips de audio, descargas digitales y software, es propiedad de TechFinance Blog
                                o sus proveedores de contenido y está protegido por las leyes de derechos de autor.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900">Uso Permitido:</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Lectura personal y educativa del contenido</li>
                                <li>Compartir enlaces a nuestros artículos en redes sociales</li>
                                <li>Citar fragmentos con atribución adecuada y enlace a la fuente</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-900">Uso Prohibido:</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Reproducir, distribuir o modificar el contenido sin autorización</li>
                                <li>Uso comercial del contenido sin licencia expresa</li>
                                <li>Scraping automatizado del sitio web</li>
                                <li>Crear obras derivadas sin permiso</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Conducta del Usuario</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>Al utilizar nuestro sitio, usted se compromete a:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <User className="w-5 h-5 text-green-600 mr-2" />
                                        <h4 className="font-semibold text-green-900">Conductas Permitidas</h4>
                                    </div>
                                    <ul className="text-sm space-y-1">
                                        <li>• Usar el sitio legalmente</li>
                                        <li>• Respetar la propiedad intelectual</li>
                                        <li>• Proporcionar información veraz</li>
                                        <li>• Respetar a otros usuarios</li>
                                    </ul>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                                        <h4 className="font-semibold text-red-900">Conductas Prohibidas</h4>
                                    </div>
                                    <ul className="text-sm space-y-1">
                                        <li>• Actividades ilegales o fraudulentas</li>
                                        <li>• Spam o contenido malicioso</li>
                                        <li>• Interferir con la funcionalidad del sitio</li>
                                        <li>• Violar derechos de terceros</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Enlaces de Afiliados</h2>
                        <div className="space-y-4 text-gray-600">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                                <p className="text-blue-800">
                                    <strong>Transparencia:</strong> Algunos enlaces en nuestro sitio son enlaces de afiliados.
                                    Esto significa que podemos recibir una comisión si realizas una compra a través de estos enlaces,
                                    sin costo adicional para ti.
                                </p>
                            </div>

                            <p>Nuestro compromiso:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Solo recomendamos productos y servicios que consideramos valiosos</li>
                                <li>Nuestras opiniones siguen siendo honestas e imparciales</li>
                                <li>Identificamos claramente los enlaces de afiliados cuando sea posible</li>
                                <li>Las comisiones no influyen en nuestro contenido editorial</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitación de Responsabilidad</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                En ningún caso TechFinance Blog, sus directores, empleados, afiliados, agentes, contratistas,
                                pasantes, proveedores, proveedores de servicios o licenciantes serán responsables de cualquier
                                lesión, pérdida, reclamo o daño directo, indirecto, incidental, punitivo, especial o consecuente
                                de cualquier tipo.
                            </p>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Esto incluye, pero no se limita a:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>Pérdidas financieras por decisiones de inversión</li>
                                    <li>Daños por uso o incapacidad de usar el sitio</li>
                                    <li>Interrupciones del servicio o errores técnicos</li>
                                    <li>Pérdida de datos o información</li>
                                    <li>Daños resultantes de virus o software malicioso</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modificaciones del Servicio</h2>
                        <p className="text-gray-600">
                            Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del sitio
                            en cualquier momento sin previo aviso. También podemos imponer límites a ciertas características
                            y servicios o restringir el acceso a partes o todo el sitio sin notificación o responsabilidad.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Ley Aplicable</h2>
                        <p className="text-gray-600">
                            Estos términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta
                            sus disposiciones sobre conflicto de leyes. Cualquier disputa relacionada con estos términos estará
                            sujeta a la jurisdicción exclusiva de los tribunales de Madrid, España.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contacto</h2>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <p className="text-gray-600 mb-4">
                                Si tienes preguntas sobre estos Términos de Uso, por favor contáctanos:
                            </p>
                            <div className="space-y-2 text-gray-600">
                                <p><strong>Email:</strong> {COMPANY_INFO.contact.email.legal}</p>
                                <p><strong>Contacto principal:</strong> {COMPANY_INFO.founder.name}</p>
                                <p><strong>Ubicación:</strong> {COMPANY_INFO.contact.location.displayAddress}</p>
                                <p><strong>Teléfono:</strong> {COMPANY_INFO.contact.phone.display}</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            ¿Alguna duda sobre nuestros términos?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Nuestro equipo legal está disponible para resolver cualquier consulta
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
