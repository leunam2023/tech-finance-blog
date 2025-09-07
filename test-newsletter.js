// Script de prueba para el newsletter
const testEmail = 'test@example.com';
const apiUrl = 'http://localhost:3000/api/newsletter';

console.log('Probando suscripción al newsletter...');

// Función para realizar pruebas
async function testNewsletter() {
    try {
        console.log('1. Probando suscripción...');

        // Prueba 1: Suscribir un email
        const subscribeResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: testEmail })
        });

        const subscribeData = await subscribeResponse.json();
        console.log('Respuesta de suscripción:', subscribeData);

        console.log('2. Obteniendo estadísticas...');

        // Prueba 2: Obtener estadísticas
        const statsResponse = await fetch(apiUrl);
        const statsData = await statsResponse.json();
        console.log('Estadísticas del newsletter:', statsData);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejecutar las pruebas
testNewsletter();