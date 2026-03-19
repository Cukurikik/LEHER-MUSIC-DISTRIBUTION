import React, { useState } from 'react';

interface ApiCodeSnippetProps {
    title: string;
    description: string;
    endpoint: string;
    snippets: {
        curl: string;
        javascript: string;
        python: string;
    };
}

const LanguageTab: React.FC<{ lang: string; activeLang: string; onClick: (lang: string) => void }> = ({ lang, activeLang, onClick }) => (
    <button
        onClick={() => onClick(lang)}
        className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${activeLang === lang ? 'bg-[#010409] text-white border-t border-x border-ui-border' : 'bg-transparent text-ui-text-subtle hover:text-white'}`}
    >
        {lang}
    </button>
);

const ApiCodeSnippet: React.FC<ApiCodeSnippetProps> = ({ title, description, endpoint, snippets }) => {
    const [activeLang, setActiveLang] = useState<'curl' | 'javascript' | 'python'>('curl');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeLang]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-ui-text-heading">{title}</h3>
            <p className="text-sm text-ui-text-body mt-1">{description}</p>
            <p className="font-mono text-sm bg-ui-surface/50 border border-ui-border rounded-md px-3 py-2 my-4 text-primary">{endpoint}</p>
            
            <div className="bg-ui-surface rounded-xl border border-ui-border overflow-hidden">
                <div className="flex justify-between items-center bg-ui-surface/50 px-4 border-b border-ui-border">
                    <div className="flex space-x-1">
                        <LanguageTab lang="cURL" activeLang={activeLang} onClick={() => setActiveLang('curl')} />
                        <LanguageTab lang="JavaScript" activeLang={activeLang} onClick={() => setActiveLang('javascript')} />
                        <LanguageTab lang="Python" activeLang={activeLang} onClick={() => setActiveLang('python')} />
                    </div>
                     <button onClick={handleCopy} className="text-sm font-semibold text-ui-text-body hover:text-primary transition-colors flex items-center gap-2">
                         {copied ? (
                             <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Copied!
                             </>
                         ) : (
                             <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                Copy
                            </>
                         )}
                    </button>
                </div>
                <div className="relative">
                    <pre><code>{snippets[activeLang]}</code></pre>
                </div>
            </div>
        </div>
    );
};

export default ApiCodeSnippet;