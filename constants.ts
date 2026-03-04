
import { BusinessInfo, DownloadableFile, SliderItem } from './types';

export const BUSINESS_DATA: BusinessInfo = {
  id: "subala-001",
  ownerName: "সুব্রত মজুমদার",
  businessName: "সুবালা কম্পিউটার এন্ড কম্পোজ",
  location: "হেড অফিসঃ নরপতি, বটতলা বাজার, শালিখা, মাগুরা, খুলনা, বাংলাদেশ।",
  contactNumber: "০১৭৫১৭৫৬০৯২",
  openingTime: "09:00",
  closingTime: "20:00",
  weeklyOff: "Friday",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14674.347526117464!2d89.3142!3d23.2384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzE4LjIiTiA4OcKwMTgnNTEuMSJF!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
  logoLetter: "S",
  logoGradient: "from-blue-600 to-indigo-700",
  logoImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=300&h=300",
  announcement: "দারুণ অফারঃ সীমিত বাজেটে আপনার দৈনন্দিন হিসাব রাখার অ্যাপ নিতে পারেন।",
  services: [
    { id: '1', name: 'অনলাইন আবেদন', icon: '📝', description: 'সব ধরনের সরকারি ও বেসরকারি চাকরির আবেদন ও ফর্ম ফিলাপ।', basePrice: '৫০' },
    { id: '2', name: 'কম্পিউটার কম্পোজ', icon: '⌨️', description: 'বাংলা ও ইংরেজি দ্রুত ও নির্ভুল টাইপিং এবং প্রিন্টিং।', basePrice: '২০' },
    { id: '3', name: 'ফটো এডিটিং', icon: '📸', description: 'পাসপোর্ট সাইজ ছবি ও ল্যাব কোয়ালিটি প্রিন্ট।', basePrice: '৩০' },
    { id: '4', name: 'স্ক্যানিং ও মেইল', icon: '📧', description: 'ডকুমেন্ট স্ক্যান করে সরাসরি ইমেইল বা হোয়াটসঅ্যাপে পাঠানো।', basePrice: '১০' }
  ]
};

export const PRICING_LIST = [
  { item: "ছবি প্রিন্ট (ল্যাব)", price: "৫-৫০" },
  { item: "অনলাইন আবেদন", price: "৫০-১০০" },
  { item: "কম্পিউটার টাইপিং (প্রতি পৃষ্ঠা)", price: "২০" },
  { item: "স্ক্যানিং", price: "১০" },
  { item: "ল্যামিনেশন", price: "২০-১০০" },
  { item: "ইমেইল পাঠানো", price: "১০" },
];

export const DOWNLOADABLE_FILES: DownloadableFile[] = [
  { id: 'f1', name: 'চাকরির আবেদন ফর্ম', description: 'সাধারণ সরকারি চাকরির আবেদন ফর্ম (PDF)', price: '১০', category: 'আবেদন', fileType: 'PDF', previewImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=300&h=400' },
  { id: 'f2', name: 'জীবনবৃত্তান্ত টেমপ্লেট', description: 'আধুনিক সিভি বা জীবনবৃত্তান্তের ফরম্যাট (MS Word)', price: '২০', category: 'ডকুমেন্ট', fileType: 'PDF', previewImage: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=300&h=400' },
  { id: 'f3', name: 'প্রত্যয়ন পত্রের নমুনা', description: 'বিভিন্ন ধরনের প্রত্যয়ন পত্রের বাংলা ফরম্যাট', price: '১৫', category: 'প্রত্যয়ন', fileType: 'PDF', previewImage: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=300&h=400' },
  { id: 'f4', name: 'এসএসসি পরীক্ষার রুটিন ২০২৪', description: 'সকল বোর্ডের এসএসসি পরীক্ষার পূর্ণাঙ্গ রুটিন', price: '৫', category: 'রুটিন', fileType: 'PDF', previewImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=300&h=400' },
  { id: 'f5', name: 'গণিতের সকল সূত্র', description: 'বীজগণিত ও জ্যামিতির সকল প্রয়োজনীয় সূত্র', price: '২৫', category: 'সূত্র', fileType: 'PDF', previewImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=300&h=400' },
];

export const SLIDER_DATA: SliderItem[] = [
  { id: 's1', type: 'image', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200&h=600', title: 'কম্পিউটার সার্ভিসিং' },
  { id: 's2', type: 'image', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200&h=600', title: 'অনলাইন আবেদন' },
  { id: 's3', type: 'image', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200&h=600', title: 'প্রোগ্রামিং ও ডেভেলপমেন্ট' },
  { id: 's4', type: 'image', url: 'https://images.unsplash.com/photo-1597872200349-016042c516ac?auto=format&fit=crop&q=80&w=1200&h=600', title: 'হার্ডওয়্যার মেরামত' },
  { id: 's5', type: 'image', url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200&h=600', title: 'নির্ভুল আবেদন' },
  { id: 's6', type: 'image', url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1200&h=600', title: 'প্রফেশনাল এডিটিং' },
  { id: 's7', type: 'image', url: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=1200&h=600', title: 'দ্রুত প্রিন্টিং সেবা' },
  { id: 's8', type: 'image', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200&h=600', title: 'অফিসিয়াল ডকুমেন্ট' },
  { id: 's9', type: 'image', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&h=600', title: 'আধুনিক প্রযুক্তি' },
  { id: 's10', type: 'image', url: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=1200&h=600', title: 'সেরা কাস্টমার সাপোর্ট' },
];
