import React, { useState } from 'react';
import {
  Star,
  Calendar,
  Award,
  Linkedin,
  Twitter,
  Mail,
  X,
  GraduationCap,
  Globe2,
  Clock,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onOpenBooking: (dept?: string, docId?: string) => void;
  selectedDoctorIdFromOutside?: string | null;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeDept, setActiveDept] = useState<string>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const departments = [
    { id: 'all', label: 'All Doctors' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'neurology', label: 'Neurology' },
    { id: 'dermatology', label: 'Dermatology' },
    { id: 'orthopedics', label: 'Orthopedics' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'gynecology', label: 'Gynecology' },
    { id: 'general', label: 'Executive Health' },
    { id: 'dentistry', label: 'Dentistry' },
  ];

  const filteredDoctors = DOCTORS.filter(
    (doc) => activeDept === 'all' || doc.departmentId === activeDept
  );

  return (
    <section id="doctors" className="py-20 lg:py-28 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span>World-Class Medical Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Meet Our Attending Physicians
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Our multi-disciplinary team features world-renowned specialists, professors, and published researchers dedicated to patient-first care.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeDept === dept.id
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between group"
            >
              {/* Image Frame */}
              <div
                onClick={() => setSelectedDoctor(doc)}
                className="relative h-64 overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800"
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 text-slate-800 dark:text-white text-xs font-bold flex items-center space-x-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{doc.rating}</span>
                </div>

                {/* Experience Tag */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-sky-500/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                  {doc.experienceYears} Yrs Experience
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => setSelectedDoctor(doc)}
                    className="text-lg font-bold text-slate-900 dark:text-white hover:text-sky-500 transition-colors cursor-pointer font-display"
                  >
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
                    {doc.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {doc.specialty}
                  </p>
                </div>

                {/* Socials & Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <div className="flex space-x-2">
                      {doc.socials.linkedin && (
                        <a
                          href={doc.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-sky-500 transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {doc.socials.twitter && (
                        <a
                          href={doc.socials.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-sky-400 transition-colors"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {doc.socials.email && (
                        <a
                          href={`mailto:${doc.socials.email}`}
                          className="hover:text-teal-500 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400"
                    >
                      View Profile
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenBooking(doc.departmentId, doc.id)}
                    className="w-full py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Bio Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl glass-modal p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-5 relative rounded-2xl overflow-hidden h-72 sm:h-full bg-slate-100 dark:bg-slate-800">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-sky-500 uppercase tracking-widest mb-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Attending Specialist</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                    {selectedDoctor.title}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedDoctor.bio}
                </p>

                {/* Education & Credentials */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                    <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-sky-500" />
                    Education & Fellowships
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {selectedDoctor.education.map((edu, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <Globe2 className="w-3.5 h-3.5 text-teal-500" />
                  <span>Languages: <strong>{selectedDoctor.languages.join(', ')}</strong></span>
                </div>

                {/* Available Days */}
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Clinic Days: <strong>{selectedDoctor.availableDays.join(', ')}</strong></span>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {selectedDoctor.reviewsCount} Verified Patient Reviews
                  </span>
                  <button
                    onClick={() => {
                      const docId = selectedDoctor.id;
                      const deptId = selectedDoctor.departmentId;
                      setSelectedDoctor(null);
                      onOpenBooking(deptId, docId);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs font-semibold shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 flex items-center space-x-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book With {selectedDoctor.name.split(',')[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
