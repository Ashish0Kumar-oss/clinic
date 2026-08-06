import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  X,
  Send,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  Calendar,
  RefreshCw,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface AiHealthAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (dept?: string) => void;
}

interface TriageResult {
  summary?: string;
  possibleCauses?: string[];
  recommendation?: string;
  department?: string;
  triageLevel?: string;
  tips?: string[];
  disclaimer?: string;
}

export const AiHealthAssistantModal: React.FC<AiHealthAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [duration, setDuration] = useState('A few days');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleRunTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await fetch('/api/ai/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms,
          age,
          duration,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze symptoms');
      }

      setResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to AI health assistant');
    } finally {
      setLoading(false);
    }
  };

  const getTriageBadgeColor = (level?: string) => {
    if (level?.toLowerCase().includes('urgent')) {
      return 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-200';
    }
    if (level?.toLowerCase().includes('priority')) {
      return 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200';
    }
    return 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200';
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-modal p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-500 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lumina AI Health Triage</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              AI Symptom & Department Assistant
            </h2>
          </div>
        </div>

        {!result ? (
          <form onSubmit={handleRunTriage} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Describe What You Are Feeling / Symptoms *
              </label>
              <textarea
                rows={4}
                required
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Sharp discomfort in lower right back, mild fever since yesterday, slight fatigue..."
                className="w-full p-3.5 rounded-2xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Patient Age (Optional)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 42"
                  className="w-full p-3 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  How Long Have Symptoms Lasted?
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Less than 24 hours">Less than 24 hours</option>
                  <option value="1 to 3 days">1 to 3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="More than 2 weeks">More than 2 weeks</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Medical Disclaimer:</strong> Lumina AI Triage provides preliminary educational guidance only and does not formulate a binding clinical diagnosis. If experiencing severe chest pain or emergency symptoms, dial 911 immediately.
            </div>

            <button
              type="submit"
              disabled={loading || !symptoms.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Clinical Biomarkers...</span>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Analyze Symptoms & Recommend Department</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Triage Result Display */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Triage Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase">Assessment Level</span>
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-bold border ${getTriageBadgeColor(
                  result.triageLevel
                )}`}
              >
                {result.triageLevel || 'Routine Consultation'}
              </span>
            </div>

            {/* Clinical Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Clinical Overview</span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Possible Causes */}
            {result.possibleCauses && result.possibleCauses.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Potential Non-Diagnostic Causes To Consider
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.possibleCauses.map((cause, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/50 dark:border-sky-800/50"
                    >
                      • {cause}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation & Dept */}
            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-teal-700 dark:text-teal-300">
                <Stethoscope className="w-4 h-4 text-teal-500" />
                <span>Recommended LuminaCare Department: <strong>{result.department || 'General Medicine'}</strong></span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.recommendation}
              </p>
            </div>

            {/* Next Step Action Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setResult(null);
                  setSymptoms('');
                }}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Consultation</span>
              </button>

              <button
                onClick={() => {
                  const dept = result.department?.toLowerCase().split(' ')[0] || '';
                  onClose();
                  onOpenBooking(dept);
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs font-bold shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment in {result.department || 'Clinic'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
