import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, CheckCircle, ShoppingCart, User, LayoutGrid, Tag, Copy, Facebook, MessageCircle, ArrowLeft, ShieldCheck, Mail, Phone, MapPin, CreditCard, Send, Smartphone, Settings, LogOut, Plus, Trash2, Globe, Image as ImageIcon, Palette, Lock, Save, UserCheck, PhoneCall } from 'lucide-react';
import { BUSINESS_DATA, PRICING_LIST } from './constants';
import { ViewState, Order, Service } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<ViewState>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('লিঙ্ক কপি হয়েছে!');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminModalContent, setAdminModalContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('1234');
  const [loginInput, setLoginInput] = useState('');

  // Business Content States (Editable via Admin)
  const [businessInfo, setBusinessInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('business_info');
      return saved ? JSON.parse(saved) : BUSINESS_DATA;
    } catch (e) {
      return BUSINESS_DATA;
    }
  });

  const [pricingItems, setPricingItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pricing_list');
      return saved ? JSON.parse(saved) : PRICING_LIST;
    } catch (e) {
      return PRICING_LIST;
    }
  });

  // Order & Payment Steps
  const [orderStep, setOrderStep] = useState<'details' | 'payment' | 'confirm'>('details');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [trxId, setTrxId] = useState('');
  const [orderDetails, setOrderDetails] = useState({ name: '', phone: '', service: businessInfo.services[0]?.name || '' });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('orders_list');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('business_info', JSON.stringify(businessInfo));
    localStorage.setItem('pricing_list', JSON.stringify(pricingItems));
    localStorage.setItem('orders_list', JSON.stringify(orders));
  }, [businessInfo, pricingItems, orders]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setToastMsg('লিঙ্ক কপি হয়েছে!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  const generatePermanentCode = () => {
    const code = JSON.stringify({ businessInfo, pricingItems }, null, 2);
    setAdminModalContent(code);
    setShowAdminModal(true);
    navigator.clipboard.writeText(code).then(() => {
      setToastMsg('স্থায়ী কোড কপি হয়েছে! এটি আমাকে দিন।');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.includes('সুব্রত') || searchTerm.toLowerCase().includes('subrata')) {
      setView('profile');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput === password) {
      setIsLoggedIn(true);
      setView('admin');
      setLoginInput('');
    } else {
      alert('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।');
    }
  };

  const submitFinalOrder = () => {
    if (!trxId.trim()) {
      alert('অনুগ্রহ করে ট্রানজেকশন আইডি (TrxID) দিন।');
      return;
    }
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: orderDetails.name,
      phone: orderDetails.phone,
      serviceName: orderDetails.service,
      amount: "পেমেন্ট চেক করুন",
      paymentMethod: selectedMethod,
      trxId: trxId,
      status: 'pending',
      timestamp: new Date(),
    };
    setOrders([newOrder, ...orders]);
    setView('payment-success');
    setOrderStep('details');
    setSelectedMethod('');
    setTrxId('');
  };

  // Admin Handlers
  const addService = () => {
    const newService: Service = { id: Date.now().toString(), name: 'নতুন সেবা', icon: '✨', description: 'বিবরণ এখানে', basePrice: '০' };
    setBusinessInfo({...businessInfo, services: [...businessInfo.services, newService]});
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    const updated = businessInfo.services.map(s => s.id === id ? {...s, [field]: value} : s);
    setBusinessInfo({...businessInfo, services: updated});
  };

  const deleteService = (id: string) => {
    setBusinessInfo({...businessInfo, services: businessInfo.services.filter(s => s.id !== id)});
  };

  const addPricing = () => {
    setPricingItems([...pricingItems, { item: 'নতুন আইটেম', price: '০' }]);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessInfo({ ...businessInfo, logoImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const LogoComponent = ({ size = "normal" }) => (
    <div className="flex items-center">
      <div className={`${size === "small" ? "w-8 h-8" : "w-10 h-10"} bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md mr-3 overflow-hidden`}>
        {businessInfo.logoImage ? (
          <img src={businessInfo.logoImage} alt="Logo" className="w-full h-full object-cover" />
        ) : (
          businessInfo.logoLetter
        )}
      </div>
      <div className="flex flex-col text-left">
        <span className={`${size === "small" ? "text-sm" : "text-base md:text-lg"} font-bold text-gray-800 leading-tight`}>{businessInfo.businessName}</span>
        <span className="text-[9px] md:text-[10px] font-bold text-blue-600 tracking-widest uppercase">DIGITAL SOLUTION CENTER</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Hind_Siliguri'] text-gray-900 overflow-x-hidden">
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
          <CheckCircle size={18} className="text-green-400" />
          <span className="font-bold text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-20 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => setView('home')}>
            <LogoComponent />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setView('profile')} className={`flex items-center gap-1.5 font-bold ${view === 'profile' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600 transition-colors'}`}><User size={18} /> <span>প্রোফাইল</span></button>
            <button onClick={() => setView('services')} className={`flex items-center gap-1.5 font-bold ${view === 'services' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600 transition-colors'}`}><LayoutGrid size={18} /> <span>পরিসেবা</span></button>
            <button onClick={() => setView('pricing')} className={`flex items-center gap-1.5 font-bold ${view === 'pricing' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600 transition-colors'}`}><Tag size={18} /> <span>মূল্য</span></button>
            <button onClick={() => {setView('order'); setOrderStep('details');}} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-md transition-all">অর্ডার</button>
            {isLoggedIn && (
              <button onClick={() => setView('admin')} className={`flex items-center gap-1.5 font-bold ${view === 'admin' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600 transition-colors'}`}>
                <ShieldCheck size={18} /> <span>অ্যাডমিন</span>
              </button>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600"><Menu size={28} /></button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 space-y-4 shadow-xl md:hidden animate-in slide-in-from-top-2">
            <button onClick={() => {setView('profile'); setIsMenuOpen(false)}} className="flex items-center gap-3 w-full text-left font-bold text-gray-700 py-3 border-b border-gray-50"><User size={20} /> প্রোফাইল</button>
            <button onClick={() => {setView('services'); setIsMenuOpen(false)}} className="flex items-center gap-3 w-full text-left font-bold text-gray-700 py-3 border-b border-gray-50"><LayoutGrid size={20} /> পরিসেবা</button>
            <button onClick={() => {setView('pricing'); setIsMenuOpen(false)}} className="flex items-center gap-3 w-full text-left font-bold text-gray-700 py-3 border-b border-gray-50"><Tag size={20} /> মূল্য</button>
            <button onClick={() => {setView('order'); setIsMenuOpen(false); setOrderStep('details');}} className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold">অর্ডার দিন</button>
            {isLoggedIn && (
              <button onClick={() => {setView('admin'); setIsMenuOpen(false)}} className="flex items-center gap-3 w-full text-left font-bold text-gray-700 py-3"><ShieldCheck size={20} /> অ্যাডমিন</button>
            )}
          </div>
        )}
      </nav>

      <main className="min-h-[80vh]">
        {view === 'home' && (
          <div className="max-w-4xl mx-auto px-4 pt-16 pb-24 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-full mb-10 border border-blue-100 shadow-sm animate-fade-show">
              <CheckCircle size={16} className="fill-blue-600 text-white" />
              <span className="text-sm font-black">আমার ডিজিটাল সেবা কেন্দ্র</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter animate-text-color py-4 leading-tight">
              {businessInfo.businessName}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-bold max-w-2xl mx-auto mb-14 leading-relaxed">
              মাগুরা শালিখার নির্ভরযোগ্য ডিজিটাল সেবা কেন্দ্র। দ্রুত ও নির্ভুলভাবে সব অনলাইন আবেদন এবং কম্পোজ করা হয়।
            </p>
            <button onClick={() => {setView('order'); setOrderStep('details');}} className="group bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-3xl font-black text-2xl md:text-3xl shadow-2xl flex items-center gap-4 mx-auto mb-14 transition-all hover:scale-105 animate-premium-btn">
              <span className="animate-cart-drive"><ShoppingCart size={32} /></span> এখনই অর্ডার দিন
            </button>
            <div className="flex justify-center gap-6 mb-20">
              <button onClick={handleCopyLink} className="w-16 h-16 bg-white hover:bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center border border-gray-100 shadow-lg transition-transform hover:-translate-y-1"><Copy size={28} /></button>
              <a href={`https://wa.me/8801751756092`} target="_blank" className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xl transition-transform hover:-translate-y-1"><MessageCircle size={28} /></a>
              <a href="#" className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-xl transition-transform hover:-translate-y-1"><Facebook size={28} /></a>
            </div>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"><Search size={22} /></div>
              <input type="text" placeholder="প্রোফাইল দেখতে 'সুব্রত' লিখুন..." className="w-full pl-16 pr-32 py-6 rounded-[32px] border-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] outline-none font-bold text-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <button type="submit" className="absolute right-3 top-3 bottom-3 bg-gray-900 hover:bg-black text-white px-8 rounded-2xl font-black transition-colors">খুঁজুন</button>
            </form>
          </div>
        )}

        {view === 'profile' && (
          <div className="max-w-5xl mx-auto px-4 py-16 animate-in fade-in zoom-in">
            <div className="bg-white rounded-[60px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-12 md:p-20 relative border border-gray-100 text-center flex flex-col items-center overflow-visible">
              <div className="md:absolute md:top-10 md:right-10 w-24 h-24 md:w-36 md:h-36 bg-white rounded-3xl shadow-2xl p-4 flex flex-col items-center justify-center border border-gray-50 mb-8 md:mb-0 z-20 hover:scale-105 transition-transform">
                {businessInfo.logoImage ? (
                   <img src={businessInfo.logoImage} alt="Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                ) : (
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg">{businessInfo.logoLetter}</div>
                )}
                <span className="text-[10px] md:text-xs font-black text-gray-900 mt-2 uppercase tracking-tighter">IT SUBRATA</span>
              </div>
              <div className="mt-4 mb-10 w-full md:pr-40 overflow-visible"> 
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-[1.6] animate-text-color py-4 block whitespace-nowrap overflow-visible">
                  {businessInfo.businessName}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-400 mb-12">
                  <div className="p-2 bg-blue-50 rounded-full"><MapPin size={20} className="text-blue-500" /></div>
                  <span className="text-base md:text-xl font-bold text-gray-600">{businessInfo.location}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-8 justify-center max-w-3xl mx-auto">
                  <div className="flex-1 bg-white rounded-[32px] p-8 text-left border border-gray-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><UserCheck size={80} /></div>
                    <p className="text-blue-500 text-xs font-black uppercase mb-3 tracking-widest flex items-center gap-2"><User size={14} /> পরিচালক</p>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">{businessInfo.ownerName}</p>
                  </div>
                  <div className="flex-1 bg-white rounded-[32px] p-8 text-left border border-gray-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><PhoneCall size={80} /></div>
                    <p className="text-emerald-500 text-xs font-black uppercase mb-3 tracking-widest flex items-center gap-2"><Phone size={14} /> মোবাইল</p>
                    <p className="text-2xl md:text-3xl font-black text-gray-800 tracking-tighter">{businessInfo.contactNumber}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setView('home')} className="mt-12 bg-gray-900 hover:bg-black text-white px-12 py-5 rounded-2xl font-black text-lg transition-all hover:-translate-y-1 shadow-2xl flex items-center gap-2">
                <ArrowLeft size={20} /> হোমে ফিরে যান
              </button>
            </div>
          </div>
        )}

        {view === 'admin' && isLoggedIn && (
          <div className="max-w-7xl mx-auto px-4 py-10 animate-in fade-in">
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-50 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-100"><Settings size={32} /></div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">অ্যাডমিন কন্ট্রোল</h2>
                  <p className="text-gray-400 font-bold">ব্র্যান্ডিং, সেবা ও মূল্য এডিট করুন</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={generatePermanentCode} className="bg-emerald-600 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-emerald-50 transition-all hover:bg-emerald-700">
                   <Save size={20} /> স্থায়ী আপডেট কোড
                </button>
                <button onClick={() => {setIsLoggedIn(false); setView('home');}} className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-red-50 transition-all hover:bg-red-600">লগআউট</button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-50">
                  <div className="flex items-center gap-3 mb-8 text-blue-600"><User size={20} /> <span className="font-black uppercase tracking-wider text-sm">ব্যবসায়ের তথ্য</span></div>
                  <div className="space-y-4">
                    <div><p className="text-[10px] text-gray-400 font-black uppercase mb-1">প্রতিষ্ঠানের নাম</p><input type="text" value={businessInfo.businessName} onChange={e => setBusinessInfo({...businessInfo, businessName: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none border border-transparent focus:border-blue-100" /></div>
                    <div><p className="text-[10px] text-gray-400 font-black uppercase mb-1">মালিকের নাম</p><input type="text" value={businessInfo.ownerName} onChange={e => setBusinessInfo({...businessInfo, ownerName: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none border border-transparent focus:border-blue-100" /></div>
                    <div><p className="text-[10px] text-gray-400 font-black uppercase mb-1">মোবাইল নম্বর</p><input type="text" value={businessInfo.contactNumber} onChange={e => setBusinessInfo({...businessInfo, contactNumber: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none border border-transparent focus:border-blue-100" /></div>
                    <div><p className="text-[10px] text-gray-400 font-black uppercase mb-1">ঠিকানা</p><textarea value={businessInfo.location} onChange={e => setBusinessInfo({...businessInfo, location: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none border border-transparent focus:border-blue-100 h-24 resize-none" /></div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-8 text-indigo-600"><Globe size={20} /> <span className="font-black uppercase tracking-wider text-sm">ওয়েবসাইট ইউআরএল</span></div>
                  <input type="text" value={businessInfo.websiteUrl || ''} onChange={e => setBusinessInfo({...businessInfo, websiteUrl: e.target.value})} placeholder="https://your-site.netlify.app" className="w-full p-5 bg-gray-50 rounded-2xl font-bold text-gray-700 text-sm outline-none border border-transparent focus:border-blue-100" />
                </div>
                <div className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-50">
                  <div className="flex items-center gap-3 mb-8 text-blue-600"><Lock size={20} /> <span className="font-black uppercase tracking-wider text-sm">পাসওয়ার্ড এডিট</span></div>
                  <div className="space-y-4"><p className="text-xs text-gray-400 font-bold ml-1 uppercase">অ্যাডমিন পাসওয়ার্ড</p><input type="text" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-5 bg-gray-50 rounded-2xl font-black text-center text-xl outline-none focus:ring-2 focus:ring-blue-100" /></div>
                </div>
                <div className="bg-white p-8 rounded-[40px] shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-8 text-pink-600"><Palette size={20} /> <span className="font-black uppercase tracking-wider text-sm">লোগো ও ব্র্যান্ডিং</span></div>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-white rounded-3xl shadow-lg border border-gray-100 p-4 mb-6 flex items-center justify-center overflow-hidden">
                       {businessInfo.logoImage ? <img src={businessInfo.logoImage} alt="Logo" className="w-full h-full object-contain" /> : <span className="text-4xl font-black text-gray-200">{businessInfo.logoLetter}</span>}
                    </div>
                    <div className="flex gap-2 mb-8"><input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" /><button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1 shadow-lg shadow-blue-50"><ImageIcon size={14} /> ইমেজ দিন</button><button onClick={() => setBusinessInfo({...businessInfo, logoImage: undefined})} className="bg-red-50 text-red-400 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1"><Trash2 size={14} /> মুছুন</button></div>
                    <div className="w-full space-y-4"><p className="text-xs text-gray-400 font-bold uppercase ml-1">লোগো লেটার ({businessInfo.logoLetter})</p><input type="text" value={businessInfo.logoLetter} onChange={e => setBusinessInfo({...businessInfo, logoLetter: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl font-black text-center outline-none" /></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 space-y-10">
                <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-lg border border-gray-50">
                  <div className="flex justify-between items-center mb-10"><div className="flex items-center gap-4 text-gray-900"><LayoutGrid size={24} /> <h3 className="text-2xl font-black">সেবাসমূহ এডিট</h3></div><button onClick={addService} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-50 hover:bg-blue-700 transition-all"><Plus size={20} /> নতুন সেবা</button></div>
                  <div className="space-y-6">{businessInfo.services.map((service, idx) => (<div key={service.id} className="bg-gray-50 p-6 md:p-8 rounded-[32px] flex items-center gap-6 border border-gray-100 group transition-all hover:bg-white hover:shadow-xl"><div className="hidden md:flex text-gray-300 cursor-grab"><Menu size={20} /></div><div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4"><input value={service.name} onChange={e => updateService(service.id, 'name', e.target.value)} className="p-4 bg-white rounded-2xl font-black border border-gray-100 outline-none focus:ring-2 focus:ring-blue-100" /><input value={service.description} onChange={e => updateService(service.id, 'description', e.target.value)} className="p-4 bg-white rounded-2xl font-bold text-gray-400 text-xs border border-gray-100 outline-none focus:ring-2 focus:ring-blue-100" /><div className="flex items-center gap-2"><span className="text-blue-600 font-black">৳</span><input value={service.basePrice} onChange={e => updateService(service.id, 'basePrice', e.target.value)} className="w-full p-4 bg-white rounded-2xl font-black border border-gray-100 outline-none focus:ring-2 focus:ring-blue-100" /></div></div><button onClick={() => deleteService(service.id)} className="text-red-300 hover:text-red-500 transition-colors p-2"><Trash2 size={22} /></button></div>))}</div>
                </div>
                <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-lg border border-gray-50">
                  <div className="flex justify-between items-center mb-10"><div className="flex items-center gap-4 text-gray-900"><Tag size={24} /> <h3 className="text-2xl font-black">মূল্য তালিকা পরিবর্তন</h3></div><button onClick={addPricing} className="text-blue-600 font-black flex items-center gap-1 hover:text-blue-800"><Plus size={18} /> যোগ করুন</button></div>
                  <div className="space-y-4">{pricingItems.map((p, idx) => (<div key={idx} className="flex flex-col md:flex-row gap-4"><input value={p.item} onChange={e => { const updated = [...pricingItems]; updated[idx].item = e.target.value; setPricingItems(updated); }} className="flex-1 p-5 bg-gray-50 rounded-2xl font-bold outline-none border border-transparent focus:border-blue-100" /><input value={p.price} onChange={e => { const updated = [...pricingItems]; updated[idx].price = e.target.value; setPricingItems(updated); }} className="md:w-48 p-5 bg-gray-50 rounded-2xl font-black text-blue-600 outline-none border border-transparent focus:border-blue-100" /><button onClick={() => setPricingItems(pricingItems.filter((_, i) => i !== idx))} className="hidden md:block text-gray-200 hover:text-red-400 p-2"><Trash2 size={20} /></button></div>))}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Permanent Code Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-2xl rounded-[40px] p-10 shadow-2xl animate-in zoom-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-black mb-6">স্থায়ী আপডেট কোড</h3>
              <p className="text-gray-500 font-bold mb-4">এই কোডটি কপি করে আমাকে (AI) দিন। আমি এটি আপনার ফাইলে স্থায়ীভাবে লিখে দেব।</p>
              <textarea readOnly className="w-full h-64 p-6 bg-gray-50 rounded-3xl font-mono text-xs border-none resize-none focus:ring-0" value={adminModalContent} />
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowAdminModal(false)} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black">বন্ধ করুন</button>
                <button onClick={() => { navigator.clipboard.writeText(adminModalContent); alert('কোড কপি হয়েছে!'); }} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black">কপি করুন</button>
              </div>
            </div>
          </div>
        )}

        {view === 'login' && (
          <div className="max-w-md mx-auto mt-20 px-4">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6"><ShieldCheck size={40} /></div>
              <h2 className="text-2xl font-black mb-8 text-gray-900">অ্যাডমিন প্রবেশ</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="password" placeholder="পাসওয়ার্ড লিখুন" className="w-full p-5 bg-gray-50 border-none rounded-2xl font-black text-center text-xl outline-none focus:ring-2 focus:ring-blue-100" value={loginInput} onChange={e => setLoginInput(e.target.value)} autoFocus />
                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 transition-all">লগইন করুন</button>
              </form>
            </div>
          </div>
        )}

        {view === 'order' && (
          <div className="max-w-xl mx-auto px-4 py-16">
            <div className="bg-white rounded-[40px] shadow-2xl p-10 border relative overflow-hidden">
              <div className="flex justify-between mb-10 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black z-10 ${orderStep === 'details' ? 'bg-blue-600 text-white shadow-lg' : 'bg-green-500 text-white'}`}>১</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black z-10 ${orderStep === 'payment' ? 'bg-blue-600 text-white shadow-lg' : orderStep === 'confirm' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>২</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black z-10 ${orderStep === 'confirm' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>৩</div>
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0"></div>
              </div>
              {orderStep === 'details' && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <h2 className="text-2xl font-black text-center mb-8">অর্ডার ডিটেইলস</h2>
                  <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-100" placeholder="আপনার নাম" value={orderDetails.name} onChange={e => setOrderDetails({...orderDetails, name: e.target.value})} />
                  <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-100" placeholder="মোবাইল নম্বর" value={orderDetails.phone} onChange={e => setOrderDetails({...orderDetails, phone: e.target.value})} />
                  <select className="w-full p-5 bg-gray-50 rounded-2xl font-bold outline-none" value={orderDetails.service} onChange={e => setOrderDetails({...orderDetails, service: e.target.value})}>{businessInfo.services.map((s: Service) => <option key={s.id} value={s.name}>{s.name}</option>)}</select>
                  <button onClick={() => orderDetails.name && orderDetails.phone ? setOrderStep('payment') : alert('সব তথ্য পূরণ করুন')} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg">পেমেন্টে যান</button>
                </div>
              )}
              {orderStep === 'payment' && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <h2 className="text-2xl font-black text-center mb-8">পেমেন্ট মেথড</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {id: 'bKash', logo: 'https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo.png'},
                      {id: 'Nagad', logo: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png'},
                      {id: 'Upay', logo: 'https://seeklogo.com/images/U/upay-logo-84D60317D4-seeklogo.com.png'},
                      {id: 'Rocket', logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png'}
                    ].map(method => (
                      <button key={method.id} onClick={() => setSelectedMethod(method.id)} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selectedMethod === method.id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-100 hover:border-blue-100'}`}>
                        <img src={method.logo} alt={method.id} className="h-10 object-contain" /><span className="font-black text-xs">{method.id}</span>
                      </button>
                    ))}
                  </div>
                  {selectedMethod && (
                    <div className="bg-gray-900 text-white p-6 rounded-3xl mt-6 text-center animate-in zoom-in">
                       <p className="text-gray-400 font-bold mb-2 uppercase tracking-widest text-[10px]">{selectedMethod} পার্সোনাল নম্বর</p>
                       <p className="text-2xl font-black text-blue-400 tracking-wider">{businessInfo.contactNumber}</p>
                       <p className="text-[10px] text-gray-500 mt-2">টাকা পাঠিয়ে TrxID দিন</p>
                    </div>
                  )}
                  <div className="flex gap-4"><button onClick={() => setOrderStep('details')} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-2xl font-black">পিছনে</button><button onClick={() => selectedMethod ? setOrderStep('confirm') : alert('মেথড সিলেক্ট করুন')} className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black">পরবর্তী</button></div>
                </div>
              )}
              {orderStep === 'confirm' && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <h2 className="text-2xl font-black text-center mb-8">ভেরিফিকেশন</h2>
                  <input className="w-full p-6 bg-gray-50 border-2 border-blue-100 rounded-3xl font-black text-center text-2xl outline-none focus:bg-white transition-colors" placeholder="TrxID এখানে দিন" value={trxId} onChange={e => setTrxId(e.target.value)} />
                  <div className="flex gap-4"><button onClick={() => setOrderStep('payment')} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-2xl font-black">পিছনে</button><button onClick={submitFinalOrder} className="flex-1 bg-green-600 text-white py-5 rounded-2xl font-black shadow-lg">অর্ডার নিশ্চিত করুন</button></div>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'services' && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-in fade-in">
            <h2 className="text-4xl font-black mb-12 text-center">আমাদের সেবাসমূহ</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessInfo.services.map((s: Service) => (
                <div key={s.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-5xl mb-6">{s.icon}</div>
                  <h3 className="text-2xl font-black mb-3">{s.name}</h3>
                  <p className="text-gray-500 font-medium mb-6 leading-relaxed">{s.description}</p>
                  <div className="text-blue-600 font-black">৳ {s.basePrice}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'pricing' && (
          <div className="max-w-3xl mx-auto px-4 py-16 animate-in fade-in">
            <h2 className="text-4xl font-black mb-12 text-center">মূল্য তালিকা</h2>
            <div className="bg-white rounded-[32px] shadow-xl border overflow-hidden">
              <div className="bg-gray-900 p-8 text-white flex justify-between items-center font-black"><span>বিবরণ</span><span>মূল্য</span></div>
              <div className="divide-y divide-gray-50">{pricingItems.map((p, idx) => (<div key={idx} className="flex justify-between items-center p-8 hover:bg-gray-50"><span className="font-bold text-lg text-gray-700">{p.item}</span><span className="text-blue-600 font-black text-xl bg-blue-50 px-5 py-2 rounded-2xl">৳ {p.price}</span></div>))}</div>
            </div>
          </div>
        )}

        {view === 'payment-success' && (
          <div className="max-w-xl mx-auto mt-24 text-center px-4 animate-in zoom-in">
            <div className="bg-white p-12 rounded-[40px] shadow-2xl border">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle size={56} className="text-green-500" /></div>
              <h2 className="text-4xl font-black mb-4">অর্ডার সফল!</h2>
              <p className="text-gray-500 font-bold text-lg mb-10">পেমেন্ট ভেরিফিকেশন করার পর আমরা আপনার সাথে যোগাযোগ করব।</p>
              <button onClick={() => setView('home')} className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl">হোমে ফিরে যান</button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <LogoComponent />
          <p className="mt-8 text-gray-400 font-bold">© 2024 {businessInfo.businessName} | সকল স্বত্ব সংরক্ষিত।</p>
          <button onClick={() => setView('login')} className="mt-12 text-[10px] text-gray-300 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-gray-500 transition-colors"><ShieldCheck size={12} /> অ্যাডমিন কন্ট্রোল</button>
        </div>
      </footer>
    </div>
  );
};

export default App;