import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import ApiCodeSnippet from '../components/ApiCodeSnippet';

const { Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

const SectionTitle: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => (
    <h2 id={id} className="text-3xl font-bold text-ui-text-heading mt-12 mb-4 pt-4 border-t border-ui-border">
        {children}
    </h2>
);

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-semibold text-ui-text-heading mt-8 mb-3">
        {children}
    </h3>
);

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <code className="bg-primary/10 text-primary font-mono text-sm px-1 py-0.5 rounded-md">{children}</code>
);

const docSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'authentication', title: 'Authentication' },
    { id: 'rate-limiting', title: 'Rate Limiting' },
    { id: 'endpoints', title: 'Endpoints', subSections: [
        { id: 'releases', title: 'Releases API' },
        { id: 'analytics', title: 'Analytics API' },
        { id: 'toolkit', title: 'Toolkit API' }
    ]},
];

export default function ApiDocsView() {
    return (
        <div className="flex gap-12">
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
                <nav className="space-y-2 text-sm">
                    {docSections.map(section => (
                        <div key={section.id}>
                            <a href={`#${section.id}`} className="font-bold text-ui-text-body hover:text-primary transition-colors">{section.title}</a>
                            {section.subSections && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    {section.subSections.map(sub => (
                                        <li key={sub.id}>
                                            <a href={`#${sub.id}`} className="text-ui-text-subtle hover:text-primary transition-colors">{sub.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            <div className="flex-1 min-w-0 max-w-4xl mx-auto animate-fade-in text-ui-text-body leading-relaxed">
                <header className="mb-12">
                    <h1 className="text-5xl font-black text-ui-text-heading font-oxanium">API Documentation</h1>
                    <p className="text-xl mt-2">Integrate Leher Music's powerful tools into your applications.</p>
                </header>

                <section>
                    <SectionTitle id="introduction">Introduction</SectionTitle>
                    <p>Welcome to the Leher Music Distribution API! Our API provides programmatic access to our suite of tools, allowing you to automate your music distribution and marketing workflows. Whether you're building custom dashboards, integrating with your own systems, or creating new applications, our API is designed to be powerful and easy to use.</p>
                    <p className="mt-2">The base URL for all API requests is: <Code>https://api.lehermusic.com/v1</Code></p>
                </section>
                
                <section>
                    <SectionTitle id="authentication">Authentication</SectionTitle>
                    <p>All API requests must be authenticated. We use API Keys to allow access to the API. You can get your key from the <Link to="/developer" className="text-primary hover:underline">API Management</Link> page.</p>
                    <p className="mt-2">Authentication is performed by providing your API key as a Bearer Token in the <Code>Authorization</Code> header of your request.</p>
                    <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
                </section>
                
                <section>
                    <SectionTitle id="rate-limiting">Rate Limiting</SectionTitle>
                    <p>To ensure the stability of our services, API requests are rate-limited. The default rate limit is 1,000 requests per minute. If you exceed this limit, you will receive a <Code>429 Too Many Requests</Code> response. The response headers will contain information about your current rate limit status:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><Code>X-RateLimit-Limit</Code>: The total number of requests allowed in the current window.</li>
                        <li><Code>X-RateLimit-Remaining</Code>: The number of requests remaining in the current window.</li>
                        <li><Code>X-RateLimit-Reset</Code>: The UTC epoch timestamp of when the current window resets.</li>
                    </ul>
                </section>

                <SectionTitle id="endpoints">Endpoints</SectionTitle>
                
                <SubTitle>Releases API</SubTitle>
                <p>Manage your music catalog, create new releases, and check distribution status.</p>
                
                <div className="mt-6">
                    <ApiCodeSnippet 
                        title="Create a New Release" 
                        description="Upload a new single, EP, or album to your catalog. This is the first step before distribution."
                        endpoint="POST /releases"
                        snippets={{
                            curl: `curl -X POST https://api.lehermusic.com/v1/releases \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
    "title": "Cosmic Drift",
    "artist_name": "Galaxy Runners",
    "release_type": "Single",
    ...
}'`,
                            javascript: `const releaseData = { title: "Cosmic Drift", ... };
const response = await fetch('https://api.lehermusic.com/v1/releases', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer YOUR_API_KEY', ... },
    body: JSON.stringify(releaseData)
});`,
                            python: `import requests
response = requests.post(
    'https://api.lehermusic.com/v1/releases',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={'title': 'Cosmic Drift', ...}
)`
                        }}
                    />
                </div>

                <SubTitle>Analytics API</SubTitle>
                <p>Fetch detailed analytics for your live releases.</p>
                 <div className="mt-6">
                    <ApiCodeSnippet 
                        title="Get Song Analytics" 
                        description="Retrieve streaming, listener, and revenue data for a specific"
                        endpoint="GET /analytics/song/{songId}"
                        snippets={{
                            curl: `curl https://api.lehermusic.com/v1/analytics/song/123 \\
-H "Authorization: Bearer YOUR_API_KEY"`,
                            javascript: `const response = await fetch('https://api.lehermusic.com/v1/analytics/song/123', {
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});`,
                            python: `import requests
response = requests.get(
    'https://api.lehermusic.com/v1/analytics/song/123',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)`
                        }}
                    />
                </div>

                 <SubTitle>Toolkit API</SubTitle>
                <p>Access Leher's powerful AI and marketing tools programmatically.</p>
                 <div className="mt-6">
                    <ApiCodeSnippet 
                        title="Generate Banner Image" 
                        description="Create a promotional banner for a release using AI."
                        endpoint="POST /tools/banner-generator"
                        snippets={{
                            curl: `curl -X POST https://api.lehermusic.com/v1/tools/banner-generator \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
    "songId": "123",
    "prompt": "A retro 80s vibe with neon lights",
    "aspectRatio": "16:9"
}'`,
                            javascript: `const response = await fetch('https://api.lehermusic.com/v1/tools/banner-generator', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer YOUR_API_KEY', ... },
    body: JSON.stringify({ songId: '123', ... })
});`,
                            python: `import requests
response = requests.post(
    'https://api.lehermusic.com/v1/tools/banner-generator',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={'songId': '123', ...}
)`
                        }}
                    />
                </div>

            </div>
        </div>
    );
}