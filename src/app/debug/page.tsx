import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Debug - TechFinance Blog',
    description: 'Debug page for TechFinance Blog',
};

export default function DebugPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
            <p className="text-gray-600">This is a debug page for development purposes.</p>
        </div>
    );
}