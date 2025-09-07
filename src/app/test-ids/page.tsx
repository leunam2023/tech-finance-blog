import { getMixedNews, getArticleById } from '@/lib/newsApi';

export default async function TestIdsPage() {
    console.log('=== INICIANDO TEST DE IDs ===');

    // Obtener artículos
    const articles = await getMixedNews(10);
    console.log('📰 Artículos obtenidos:', articles.length);

    const testResults = [];

    for (const article of articles.slice(0, 5)) {
        console.log(`\n🔍 Testing artículo: ${article.title}`);
        console.log(`📋 ID generado: ${article.id}`);

        // Intentar buscar el artículo por su propio ID
        const foundArticle = await getArticleById(article.id);

        const result = {
            originalTitle: article.title,
            originalId: article.id,
            originalUrl: article.sourceUrl,
            found: !!foundArticle,
            foundTitle: foundArticle?.title || 'No encontrado'
        };

        testResults.push(result);

        console.log(`✅ Resultado: ${result.found ? 'ENCONTRADO' : 'NO ENCONTRADO'}`);
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">🧪 Test de Consistencia de IDs</h1>

            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
                <h2 className="font-bold text-yellow-800">ℹ️ Información del Test</h2>
                <p className="text-yellow-700 mt-2">
                    Este test verifica si los IDs generados en la página principal coinciden con los IDs
                    que puede encontrar la función getArticleById().
                </p>
            </div>

            <div className="space-y-4">
                {testResults.map((result, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${result.found
                                ? 'bg-green-50 border-green-200'
                                : 'bg-red-50 border-red-200'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-2">
                                    {result.originalTitle.substring(0, 60)}...
                                </h3>
                                <div className="text-sm space-y-1">
                                    <div>
                                        <span className="font-medium">ID Original:</span>
                                        <code className="bg-gray-200 px-2 py-1 rounded ml-2">
                                            {result.originalId}
                                        </code>
                                    </div>
                                    <div>
                                        <span className="font-medium">URL:</span>
                                        <span className="text-gray-600 ml-2 text-xs">
                                            {result.originalUrl}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Estado:</span>
                                        <span className={`ml-2 font-bold ${result.found ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {result.found ? '✅ ENCONTRADO' : '❌ NO ENCONTRADO'}
                                        </span>
                                    </div>
                                    {result.found && (
                                        <div>
                                            <span className="font-medium">Título encontrado:</span>
                                            <span className="text-green-700 ml-2">
                                                {result.foundTitle}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="ml-4">
                                <a
                                    href={`/blog/${result.originalId}`}
                                    className={`px-4 py-2 rounded-lg text-white font-medium ${result.found
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Probar enlace
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="font-bold text-blue-800 mb-2">📋 Resumen del Test</h2>
                <div className="text-blue-700 space-y-1">
                    <p>
                        ✅ Encontrados: {testResults.filter(r => r.found).length} / {testResults.length}
                    </p>
                    <p>
                        ❌ No encontrados: {testResults.filter(r => !r.found).length} / {testResults.length}
                    </p>
                    {testResults.filter(r => !r.found).length > 0 && (
                        <p className="font-medium text-red-700 mt-2">
                            ⚠️ Hay problemas de consistencia en la generación de IDs
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-6 text-center">
                <a
                    href="/debug"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium mr-4"
                >
                    Ver página de debug completa
                </a>
                <a
                    href="/"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                    Volver al inicio
                </a>
            </div>
        </div>
    );
}
