import React, { useState } from 'react';
import {
  HeartPulse,
  Brain,
  Activity,
  Sparkles,
  Baby,
  Venus,
  Stethoscope,
  Smile,
  Microscope,
  Dumbbell,
  ArrowRight,
  Clock,
  Tag,
  CheckCircle2,
  X,
  Search,
  Calendar,
} from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { MedicalService } from '../types';

interface ServicesSectionProps {
  onOpenBooking: (dept?: string, docId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const getIcon = (name: string) => {
    switch (name) {
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-sky-500" />;
      case 'Brain': return <Brain className="w-6 h-6 text-indigo-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-teal-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Baby': return <Baby className="w-6 h-6 text-pink-500" />;
      case 'Venus': return <Venus className="w-6 h-6 text-purple-500" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-sky-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-emerald-500" />;
      case 'Microscope': return <Microscope className="w-6 h-6 text-blue-500" />;
      case 'Dumbbell': return <Dumbbell className="w-6 h-6 text-cyan-500" />;
      default: return <Stethoscope className="w-6 h-6 text-sky-500" />;
    }
  };

  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.commonConditions.some((c) => c.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'primary', label: 'Primary & Family' },
    { id: 'specialized', label: 'Specialized Medicine' },
    { id: 'surgery', label: 'Surgical & Ortho' },
    { id: 'wellness', label: 'Wellness & Esthetics' },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 relative bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span>Comprehensive Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            World-Class Medical Disciplines
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            From preventative health audits to robotic micro-surgeries, our accredited departments deliver compassionate precision care.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
          
          {/* Categories Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search conditions, services..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="glass-card glass-card-hover p-7 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="service-icon !mb-0 !w-12 !h-12 border border-sky-200/50 dark:border-sky-800/50 shadow-sm group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-500 transition-colors font-display">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Common Conditions Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.commonConditions.slice(0, 3).map((cond, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {cond}
                    </span>
                  ))}
                  {service.commonConditions.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-[10px] font-semibold text-sky-500">
                      +{service.commonConditions.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer row */}
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">
                  From <strong className="text-slate-900 dark:text-white font-bold">{service.startingPrice}</strong>
                </span>
                <span className="text-sky-500 group-hover:text-sky-600 flex items-center group-hover:translate-x-1 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No medical services matched "{searchFilter}". Try searching for another keyword or department.
            </p>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl glass-modal p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center shrink-0">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest">
                  {selectedService.category} Department
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              {selectedService.fullDetails}
            </p>

            {/* Key Features List */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Department Capabilities & Equipment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Duration info */}
            <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 mb-8">
              <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Est. Duration: <strong>{selectedService.estDuration}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
                <Tag className="w-4 h-4 text-teal-500" />
                <span>Starting Price: <strong>{selectedService.startingPrice}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const deptId = selectedService.id;
                  setSelectedService(null);
                  onOpenBooking(deptId);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs font-semibold shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 flex items-center space-x-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book This Department</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
