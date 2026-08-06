import React, { useState } from 'react';
import { Search, X, Stethoscope, User, FileText, Sparkles, ChevronRight } from 'lucide-react';
import { DOCTORS, SERVICES, BLOG_POSTS, TREATMENTS } from '../data/clinicData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctor: (doctorId: string) => void;
  onOpenBooking: (dept?: string, docId?: string) => void;
  onOpenBlog: (blogId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoctor,
  onOpenBooking,
  onOpenBlog,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const filteredDoctors = cleanQuery
    ? DOCTORS.filter(
        (d) =>
          d.name.toLowerCase().includes(cleanQuery) ||
          d.specialty.toLowerCase().includes(cleanQuery) ||
          d.title.toLowerCase().includes(cleanQuery)
      )
    : DOCTORS.slice(0, 3);

  const filteredServices = cleanQuery
    ? SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.description.toLowerCase().includes(cleanQuery) ||
          s.commonConditions.some((c) => c.toLowerCase().includes(cleanQuery))
      )
    : SERVICES.slice(0, 3);

  const filteredTreatments = cleanQuery
    ? TREATMENTS.filter(
        (t) =>
          t.title.toLowerCase().includes(cleanQuery) ||
          t.description.toLowerCase().includes(cleanQuery)
      )
    : TREATMENTS.slice(0, 2);

  const filteredBlogs = cleanQuery
    ? BLOG_POSTS.filter(
        (b) =>
          b.title.toLowerCase().includes(cleanQuery) ||
          b.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl glass-modal overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="relative flex items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-sky-500 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors, medical specialties, treatments, conditions..."
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Quick Doctor Matches */}
          <div>
            <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              <User className="w-3.5 h-3.5 mr-1.5 text-sky-500" />
              Doctors & Specialists
            </div>
            {filteredDoctors.length > 0 ? (
              <div className="space-y-2">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onClose();
                      onSelectDoctor(doc.id);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {doc.specialty} • {doc.title}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        onOpenBooking(doc.departmentId, doc.id);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all flex items-center"
                    >
                      Book <ChevronRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No doctors matched "{query}"</p>
            )}
          </div>

          {/* Services Matches */}
          <div>
            <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-teal-500" />
              Medical Services
            </div>
            {filteredServices.length > 0 ? (
              <div className="space-y-2">
                {filteredServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      onClose();
                      const el = document.getElementById('services');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-500 transition-colors">
                        {srv.title}
                      </h4>
                      <span className="text-xs font-medium text-slate-400">{srv.startingPrice}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {srv.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No services matched "{query}"</p>
            )}
          </div>

          {/* Treatments */}
          {filteredTreatments.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sky-500" />
                Treatments & Technologies
              </div>
              <div className="space-y-2">
                {filteredTreatments.map((tr) => (
                  <div
                    key={tr.id}
                    onClick={() => {
                      onClose();
                      const el = document.getElementById('treatments');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-500">
                      {tr.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {tr.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Articles */}
          {filteredBlogs.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-teal-500" />
                Medical Insights & Articles
              </div>
              <div className="space-y-2">
                {filteredBlogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      onClose();
                      onOpenBlog(b.id);
                    }}
                    className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-500">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {b.category} • {b.readTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
          Need urgent help? Call emergency hotline <strong className="text-sky-500">+1 (800) 911-AURA</strong>
        </div>
      </div>
    </div>
  );
};
