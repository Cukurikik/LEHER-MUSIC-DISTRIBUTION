

import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = (ReactRouterDOM as any).default ?? ReactRouterDOM;

interface ContentRelocationViewProps {
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
}

const STORES = ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Tidal', 'Deezer', 'Other'];

const ContentRelocationView: React.FC<ContentRelocationViewProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [artistName, setArtistName] = useState('');
  const [store, setStore] = useState('');
  const [otherStoreName, setOtherStoreName] = useState('');
  const [upc, setUpc] = useState('');
  const [incorrectUrl, setIncorrectUrl] = useState('');
  const [correctUrl, setCorrectUrl] = useState('');
  const [releaseUrl, setReleaseUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!artistName || !store || !upc || !incorrectUrl || !correctUrl || !releaseUrl) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    if (store === 'Other' && !otherStoreName) {
      showToast('Please specify the store name.', 'error');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Your content relocation request has been submitted.', 'success');
      // Reset form
      setArtistName('');
      setStore('');
      setOtherStoreName('');
      setUpc('');
      setIncorrectUrl('');
      setCorrectUrl('');
      setReleaseUrl('');
    }, 1500);
  };

  const inputStyles = "form-input-modern w-full";

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
         <button onClick={() => navigate('/toolkit')} className="mb-6 flex items-center gap-2 text-ui-text hover:text-primary transition-colors font-semibold group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Toolkit
        </button>
        <h1 className="text-4xl font-bold text-ui-text-heading">Content Relocation Request</h1>
        <p className="text-lg text-ui-text mt-1">Submit this form if your release has been delivered to the wrong artist page on a streaming service.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-ui-surface/70 backdrop-blur-lg rounded-xl border border-ui-border shadow-sm p-6 space-y-6">
        <div>
          <label htmlFor="artist-name" className="font-semibold mb-2 block text-ui-text">Artist Name *</label>
          <input id="artist-name" type="text" value={artistName} onChange={e => setArtistName(e.target.value)} className={inputStyles} required />
        </div>
        <div>
            <label htmlFor="store" className="font-semibold mb-2 block text-ui-text">Store / DSP *</label>
            <select id="store" value={store} onChange={e => setStore(e.target.value)} className={inputStyles} required>
                <option value="" disabled>Select a store</option>
                {STORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
        {store === 'Other' && (
            <div className="animate-fade-in">
                <label htmlFor="other-store" className="font-semibold mb-2 block text-ui-text">Other Store Name *</label>
                <input id="other-store" type="text" value={otherStoreName} onChange={e => setOtherStoreName(e.target.value)} className={inputStyles} required />
            </div>
        )}
        <div>
            <label htmlFor="upc" className="font-semibold mb-2 block text-ui-text">Release UPC *</label>
            <input id="upc" type="text" value={upc} onChange={e => setUpc(e.target.value)} className={inputStyles} required />
        </div>
        <div>
            <label htmlFor="incorrect-url" className="font-semibold mb-2 block text-ui-text">Incorrect Artist Page URL *</label>
            <input id="incorrect-url" type="url" value={incorrectUrl} onChange={e => setIncorrectUrl(e.target.value)} className={inputStyles} placeholder="e.g., https://open.spotify.com/artist/..." required />
        </div>
        <div>
            <label htmlFor="correct-url" className="font-semibold mb-2 block text-ui-text">Correct Artist Page URL *</label>
            <input id="correct-url" type="url" value={correctUrl} onChange={e => setCorrectUrl(e.target.value)} className={inputStyles} placeholder="e.g., https://open.spotify.com/artist/..." required />
        </div>
        <div>
            <label htmlFor="release-url" className="font-semibold mb-2 block text-ui-text">Release URL on the Incorrect Page *</label>
            <input id="release-url" type="url" value={releaseUrl} onChange={e => setReleaseUrl(e.target.value)} className={inputStyles} placeholder="e.g., https://open.spotify.com/album/..." required />
        </div>
        <div className="pt-4 border-t border-ui-border">
            <button type="submit" disabled={isSubmitting} className="w-full mt-4 flex items-center justify-center gap-3 bg-primary text-black font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow-primary">
                {isSubmitting ? 'Submitting...' : 'Submit Relocation Request'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ContentRelocationView;