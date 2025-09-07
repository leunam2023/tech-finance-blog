import { getMixedNews } from '@/lib/newsApi';

export default async function DebugPage() {
    const allPosts = await getMixedNews(20);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">🔧 Debug de IDs de Artículos</h1>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Lista de artículos y sus IDs:</h2>

                    <div className="space-y-4">
                        {allPosts.map((post, index) => (
                            <div key={post.id} className="border-b pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-2">
                                            {index + 1}. {post.title}
                                        </h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p><strong>ID:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{post.id}</code></p>
                                            <p><strong>URL original:</strong> <code className="bg-blue-50 px-2 py-1 rounded text-xs">{post.sourceUrl}</code></p>
                                            <p><strong>Enlace del blog:</strong> <code className="bg-green-50 px-2 py-1 rounded">/blog/{post.id}</code></p>
                                            <p><strong>Categoría:</strong> {post.category}</p>
                                            <p><strong>Autor:</strong> {post.author}</p>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-col gap-2">
                                        <a
                                            href={`/blog/${post.id}`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                            target="_blank"
                                        >
                                            Probar enlace
                                        </a>
                                        <a
                                            href={post.sourceUrl || '#'}
                                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver original
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
                        <h3 className="font-semibold text-yellow-800 mb-2">💡 Instrucciones de testing:</h3>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>1. Haz clic en &quot;Probar enlace&quot; para verificar si el artículo se carga correctamente</li>
                            <li>2. Si aparece un 404, significa que hay un problema con ese ID específico</li>
                            <li>3. Usa &quot;Ver original&quot; para verificar que la URL fuente sea válida</li>
                            <li>4. Compara los IDs generados con los que aparecen en la página principal</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
