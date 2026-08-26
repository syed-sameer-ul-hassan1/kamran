import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  MATERIALS_GUIDE as DEFAULT_MATERIALS,
  CRAFT_DETAILED_STEPS as DEFAULT_CRAFT,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQS as DEFAULT_FAQS,
  WHATSAPP_LINK as DEFAULT_WHATSAPP
} from '../data';

const StorefrontDataContext = createContext();

export function StorefrontDataProvider({ children }) {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [materials, setMaterials] = useState(DEFAULT_MATERIALS);
  const [craftSteps, setCraftSteps] = useState(DEFAULT_CRAFT);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [whatsappLink, setWhatsappLink] = useState(DEFAULT_WHATSAPP);
  const [settings, setSettings] = useState({
    siteName: 'Kamran Shawls',
    phonePrimary: '+92 300 2121224',
    phoneSecondary: '+92 349 9134377',
    email: 'hello@kamranshawls.com.pk',
    address: 'Main Bazaar, Nathia Gali, District Abbottabad, KPK, Pakistan',
    whatsappLink: DEFAULT_WHATSAPP
  });
  const [hero, setHero] = useState({
    title: 'Shawls chosen carefully, worn for years',
    lede: 'Kamran Shawls curates authentic hand-finished Pashmina, Shatoosh and Swati weaves directly from master artisans. Every piece is individually inspected in-store for thread density, finish, and authentic warmth.'
  });

  const fetchLiveSupabaseData = async () => {
    try {
      const [
        productsRes,
        settingsRes,
        heroRes,
        materialsRes,
        craftRes,
        testimonialsRes,
        faqsRes
      ] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('settings').select('*').eq('id', 'main').maybeSingle(),
        supabase.from('hero').select('*').eq('id', 'main').maybeSingle(),
        supabase.from('materials').select('*').order('sort_order', { ascending: true }),
        supabase.from('craft_steps').select('*').order('sort_order', { ascending: true }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('faqs').select('*').order('sort_order', { ascending: true })
      ]);

      if (productsRes.data) {
        setProducts(productsRes.data.map((p) => {
          const imagesList = p.images && Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : (p.image_url ? [p.image_url] : []);
          return {
            id: p.id,
            name: p.name,
            category: p.category,
            tag: p.tag,
            desc: p.desc,
            price: p.price,
            dimensions: p.dimensions,
            weight: p.weight,
            origin: p.origin,
            weave: p.weave,
            warmth: p.warmth,
            enquiryText: p.enquiry_text,
            visual: p.visual || 'pashmina',
            imageUrl: imagesList[0] || p.image_url || '',
            images: imagesList,
            inStock: p.in_stock !== false,
            featured: Boolean(p.featured)
          };
        }));
      }

      if (settingsRes.data) {
        const s = settingsRes.data;
        setSettings({
          siteName: s.site_name || 'Kamran Shawls',
          phonePrimary: s.phone_primary || '+92 300 2121224',
          phoneSecondary: s.phone_secondary || '+92 349 9134377',
          email: s.email || 'hello@kamranshawls.com.pk',
          address: s.address || 'Main Bazaar, Nathia Gali, District Abbottabad, KPK, Pakistan',
          whatsappLink: s.whatsapp_link || DEFAULT_WHATSAPP,
          instagramUrl: s.instagram_url,
          tiktokUrl: s.tiktok_url
        });
        if (s.whatsapp_link) {
          setWhatsappLink(s.whatsapp_link);
        }
      }

      if (heroRes.data) {
        setHero({
          title: heroRes.data.title || hero.title,
          lede: heroRes.data.lede || hero.lede
        });
      }

      if (materialsRes.data && materialsRes.data.length > 0) {
        setMaterials(materialsRes.data.map((m) => ({
          id: m.id,
          name: m.name,
          micron: m.micron,
          feel: m.feel,
          warmth: m.warmth,
          warmthPercent: m.warmth_percent,
          description: m.description,
          idealFor: m.ideal_for
        })));
      }

      if (craftRes.data && craftRes.data.length > 0) {
        setCraftSteps(craftRes.data.map((c) => ({
          number: c.number,
          stage: c.stage,
          title: c.title,
          desc: c.desc,
          details: c.details || []
        })));
      }

      if (testimonialsRes.data && testimonialsRes.data.length > 0) {
        setTestimonials(testimonialsRes.data.map((t) => ({
          id: t.id,
          name: t.name,
          city: t.city,
          shawl: t.shawl,
          comment: t.comment,
          rating: t.rating || 5
        })));
      }

      if (faqsRes.data && faqsRes.data.length > 0) {
        setFaqs(faqsRes.data.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer
        })));
      }
    } catch (err) {
      console.warn('Live data fetch failed, using fallback data:', err);
    }
  };

  useEffect(() => {
    fetchLiveSupabaseData();

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        fetchLiveSupabaseData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submitInquiry = async (inquiryData) => {
    try {
      const { error } = await supabase.from('inquiries').insert([inquiryData]);
      if (error) throw error;
      return { success: true };
    } catch (e) {
      console.error('Failed to submit inquiry to Supabase', e);
      return { success: false, error: e.message };
    }
  };

  return (
    <StorefrontDataContext.Provider
      value={{
        products,
        materials,
        craftSteps,
        testimonials,
        faqs,
        settings,
        hero,
        whatsappLink,
        submitInquiry,
        refreshData: fetchLiveSupabaseData
      }}
    >
      {children}
    </StorefrontDataContext.Provider>
  );
}

export function useStorefrontData() {
  const context = useContext(StorefrontDataContext);
  if (!context) {
    throw new Error('useStorefrontData must be used within StorefrontDataProvider');
  }
  return context;
}
