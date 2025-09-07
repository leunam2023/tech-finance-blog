import Link from 'next/link';
import { getArticleById } from '@/lib/newsApi';

export default async function TestSpecificIdPage() {
    const targetId = 'news_tf8qsq';

    console.log(`=== TESTING SPECIFIC ID: ${targetId} ===`);

    try {
        // Intentar buscar el artículo específico
        const article = await getArticleById(targetId);

        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">🧪 Test ID Específico: {targetId}</h1>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800">
                        <strong>ID de prueba:</strong> {targetId}
                    </p>
                    <p className="text-blue-800">
                        <strong>URL original:</strong> https://bbc.com/demo-general-1
                    </p>
                </div>

                {article ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-green-800 mb-4">✅ ARTÍCULO ENCONTRADO</h2>

                        <div className="space-y-3">
                            <div>
                                <strong className="text-green-800">Título:</strong>
                                <p className="text-green-700">{article.title}</p>
                            </div>

                            <div>
                                <strong className="text-green-800">ID:</strong>
                                <code className="bg-green-100 px-2 py-1 rounded text-green-800">
                                    {article.id}
                                </code>
                            </div>

                            <div>
                                <strong className="text-green-800">Descripción:</strong>
                                <p className="text-green-700">{article.description}</p>
                            </div>

                            <div>
                                <strong className="text-green-800">URL Original:</strong>
                                <p className="text-green-700 break-all">{article.sourceUrl}</p>
                            </div>

                            <div>
                                <strong className="text-green-800">Categoría:</strong>
                                <span className="bg-green-100 px-2 py-1 rounded text-green-800">
                                    {article.category}
                                </span>
                            </div>

                            <div>
                                <strong className="text-green-800">Autor:</strong>
                                <span className="text-green-700">{article.author}</span>
                            </div>
                        </div>

                        <div className="mt-6 space-x-4">
                            <a
                                href={`/blog/${targetId}`}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-block"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                🔗 Probar enlace en nueva pestaña
                            </a>

                            <Link
                                href={`/blog/${targetId}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-block"
                            >
                                🔗 Probar enlace en misma pestaña
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-red-800 mb-4">❌ ARTÍCULO NO ENCONTRADO</h2>
                        <p className="text-red-700">
                            La función getArticleById no pudo encontrar un artículo con el ID: <code>{targetId}</code>
                        </p>

                        <div className="mt-4">
                            <p className="text-red-700 font-medium">Posibles causas:</p>
                            <ul className="list-disc list-inside text-red-600 mt-2 space-y-1">
                                <li>El ID no coincide con ningún artículo generado</li>
                                <li>Hay un problema en la función generateId</li>
                                <li>Los datos de la API han cambiado</li>
                                <li>Error en la lógica de búsqueda</li>
                            </ul>
                        </div>
                    </div>
                )}

                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-2">🔧 Debug Info</h3>
                    <p className="text-gray-600 text-sm">
                        Revisa la consola del navegador (F12) para ver los logs detallados de la búsqueda.
                    </p>

                    <div className="mt-4 space-x-4">
                        <Link
                            href="/test-ids"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Ver test de todos los IDs
                        </Link>
                        <Link
                            href="/debug"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Ver página de debug completa
                        </Link>
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error en test específico:', error);

        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">🧪 Test ID Específico: {targetId}</h1>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-red-800 mb-4">💥 ERROR EN EL TEST</h2>
                    <p className="text-red-700">
                        Ocurrió un error al intentar buscar el artículo:
                    </p>
                    <code className="block bg-red-100 p-3 rounded mt-2 text-red-800">
                        {error instanceof Error ? error.message : String(error)}
                    </code>
                </div>
            </div>
        );
    }
}
