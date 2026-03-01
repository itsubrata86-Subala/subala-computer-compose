import { BusinessInfo, DownloadableFile } from './types';

export const BUSINESS_DATA: BusinessInfo = {
  "id": "subala-001",
  "ownerName": "সুব্রত মজুমদার",
  "businessName": "সুবালা কম্পিউটার এন্ড কম্পোজ",
  "location": "হেড অফিসঃ নরপতি, বটতলা বাজার, শালিখা, মাগুরা, খুলনা, বাংলাদেশ।",
  "contactNumber": "০১৭৫১৭৫৬০৯২",
  "openingTime": "09:00",
  "closingTime": "20:00",
  "weeklyOff": "Friday",
  "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14674.347526117464!2d89.3142!3d23.2384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzE4LjIiTiA4OcKwMTgnNTEuMSJF!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
  "logoLetter": "S",
  "logoGradient": "from-blue-600 to-indigo-700",
  "logoImage": "data:image/png;base64,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",
  "services": [
    {
      "id": "1",
      "name": "অনলাইন আবেদন",
      "icon": "📝",
      "description": "সব ধরনের সরকারি ও বেসরকারি চাকরির আবেদন ও ফর্ম ফিলাপ।",
      "basePrice": "৫০"
    },
    {
      "id": "2",
      "name": "কম্পিউটার কম্পোজ",
      "icon": "⌨️",
      "description": "বাংলা ও ইংরেজি দ্রুত ও নির্ভুল টাইপিং এবং প্রিন্টিং।",
      "basePrice": "২০"
    },
    {
      "id": "3",
      "name": "ফটো এডিটিং",
      "icon": "📸",
      "description": "পাসপোর্ট সাইজ ছবি ও ল্যাব কোয়ালিটি প্রিন্ট।",
      "basePrice": "৩০"
    },
    {
      "id": "4",
      "name": "স্ক্যানিং ও মেইল",
      "icon": "📧",
      "description": "ডকুমেন্ট স্ক্যান করে সরাসরি ইমেইল বা হোয়াটসঅ্যাপে পাঠানো।",
      "basePrice": "১০"
    }
  ]
};

export const PRICING_LIST = [
  {
    "item": "ছবি প্রিন্ট (ল্যাব)",
    "price": "৫-৫০"
  },
  {
    "item": "অনলাইন আবেদন",
    "price": "৫০-১০০"
  },
  {
    "item": "কম্পিউটার টাইপিং (প্রতি পৃষ্ঠা)",
    "price": "২০"
  },
  {
    "item": "স্ক্যানিং",
    "price": "১০"
  },
  {
    "item": "ল্যামিনেশন",
    "price": "২০-১০০"
  },
  {
    "item": "ইমেইল পাঠানো",
    "price": "১০"
  }
];

export const DOWNLOADABLE_FILES: DownloadableFile[] = [
  {
    "id": "f1",
    "name": "চাকরির আবেদন ফর্ম",
    "description": "সাধারণ সরকারি চাকরির আবেদন ফর্ম (PDF)",
    "price": "১০"
  },
  {
    "id": "f2",
    "name": "জীবনবৃত্তান্ত টেমপ্লেট",
    "description": "আধুনিক সিভি বা জীবনবৃত্তান্তের ফরম্যাট (MS Word)",
    "price": "২০"
  },
  {
    "id": "f3",
    "name": "প্রত্যয়ন পত্রের নমুনা",
    "description": "বিভিন্ন ধরনের প্রত্যয়ন পত্রের বাংলা ফরম্যাট",
    "price": "১৫"
  },
  {
    "id": "1772384163518",
    "name": "শর্ট মুভি",
    "description": "বিবরণ দিন",
    "price": "০",
    "category": "অন্যান্য"
  },
  {
    "id": "1772384166373",
    "name": "নিউজ",
    "description": "বিবরণ দিন",
    "price": "০",
    "category": "অন্যান্য"
  }
];
