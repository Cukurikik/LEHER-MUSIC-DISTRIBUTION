import React, { useState } from 'react';
import type { RoyaltyReport, DocumentType } from '../types';
import GeminiIcon from './icons/GeminiIcon';

interface GenerateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (options: { docType: DocumentType; period: string; netIncome: number; includeAi: boolean; }) => void;
  report: RoyaltyReport | null;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

const DOCUMENT_TYPES: DocumentType[] = ['Invoice', 'Tax Summary', 'Payment Confirmation'];

const GenerateDocumentModal: React.FC<GenerateDocumentModalProps> = ({ isOpen, onClose, onGenerate, report }) => {
  const [docType, setDocType] = useState<DocumentType>('Invoice');
  const [includeAi, setIncludeAi] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use a default report for standalone generation
    const targetReport = report || { period: 'Last 30 Days', netIncome: 1234.56 }; // Mock data for standalone
    
    if (!targetReport) {
        // This case should ideally not happen if a report is required.
        // For now, we'll close the modal or show an error.
        onClose();
        return;
    }

    onGenerate({
        docType,
        period: targetReport.period,
        netIncome: targetReport.netIncome,
        includeAi,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="bg-ui-surface/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all relative modal-glow-border"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-ui-text-subtle hover:text-primary transition-colors p-2 rounded-full"><CloseIcon className="w-6 h-6"/></button>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="text-center">
             <h2 className="text-2xl font-bold text-ui-text-heading">Generate Document</h2>
             <p className="text-ui-text-body">Create an official document for your records.</p>
          </div>
          
           {report && (
                <div className="bg-ui-surface/50 border border-ui-border rounded-lg p-3 text-center">
                    <p className="text-sm text-ui-text-subtle">For Period:</p>
                    <p className="font-bold text-lg text-primary">{report.period}</p>
                </div>
            )}
            
            <div>
              <label htmlFor="doc-type" className="text-sm font-medium text-ui-text-body block mb-1">Document Type</label>
              <select 
                id="doc-type"
                value={docType}
                onChange={e => setDocType(e.target.value as DocumentType)}
                className="w-full bg-ui-surface border-ui-border rounded-lg p-3 text-ui-text-heading form-input-glow"
              >
                  {DOCUMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <div>
                <label 
                    htmlFor="include-ai" 
                    className="flex items-center justify-between p-3 bg-ui-surface border border-ui-border rounded-lg cursor-pointer hover:border-secondary transition-colors"
                >
                    <div className="flex items-center gap-2">
                         <GeminiIcon className="w-6 h-6 text-secondary" />
                         <div>
                            <span className="font-semibold text-ui-text-heading">Include AI Summary</span>
                            <p className="text-xs text-ui-text-subtle">Add a professional summary by Gemini.</p>
                         </div>
                    </div>
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            id="include-ai" 
                            checked={includeAi} 
                            onChange={e => setIncludeAi(e.target.checked)} 
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-ui-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </div>
                </label>
            </div>
          

          <div className="flex justify-end gap-4 pt-4 border-t border-ui-border">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-full bg-ui-border hover:bg-opacity-50 text-ui-text-heading font-bold transition">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-full bg-primary text-black font-bold transition shadow-lg hover:brightness-110 btn-glow-primary">Generate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateDocumentModal;