export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  image: string;
  bio: string;
  education: string[];
  languages: string[];
  availableDays: string[];
  timeSlots: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface MedicalService {
  id: string;
  title: string;
  category: 'primary' | 'specialized' | 'surgery' | 'wellness';
  description: string;
  fullDetails: string;
  iconName: string;
  keyFeatures: string[];
  commonConditions: string[];
  estDuration: string;
  startingPrice: string;
}

export interface Treatment {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  benefits: string[];
  technologyUsed: string;
  image: string;
  recoveryTime: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  age: number;
  patientRole?: string;
  treatment: string;
  department: string;
  rating: number;
  comment: string;
  image: string;
  verified: boolean;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'facilities' | 'operating' | 'lounges' | 'diagnostics';
  imageUrl: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'appointments' | 'insurance' | 'billing' | 'emergency';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  department: string;
  doctorId: string;
  preferredDate: string;
  preferredTime: string;
  symptomsOrMessage: string;
  urgencyLevel: 'routine' | 'priority' | 'urgent';
  isFirstVisit: boolean;
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  emergencyPhone: string;
  mapLat: number;
  mapLng: number;
  isFlagship?: boolean;
}
