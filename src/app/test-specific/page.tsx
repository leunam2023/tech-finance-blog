import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Test Specific - TechFinance Blog',
    description: 'Test specific page for TechFinance Blog',
};

export default function TestSpecificPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Test Specific Page</h1>
            <p className="text-gray-600">This is a test page for specific testing purposes.</p>
        </div>
    );
}