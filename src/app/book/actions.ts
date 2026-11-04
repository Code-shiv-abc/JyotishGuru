"use server";

import { createClient } from "@supabase/supabase-js";

interface BookConsultationData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  consultationType: string;
  query: string;
}

export async function submitConsultationRequest(data: BookConsultationData) {
  const { fullName, phoneNumber, emailAddress, consultationType, query } = data;

  // 1. Optionally log to Supabase Free Tier if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from('leads').insert([{
        full_name: fullName,
        phone_number: phoneNumber,
        email_address: emailAddress,
        consultation_type: consultationType,
        query: query,
        created_at: new Date().toISOString()
      }]);

      if (error) {
        console.error("Supabase error logging lead:", error);
        // Continue even if logging fails, to ensure WhatsApp redirect works
      }
    } catch (e) {
      console.error("Error setting up Supabase client:", e);
    }
  }

  // 2. Generate WhatsApp link
  const waNumber = "917233972105";

  const text = `Hari Om Acharya Ji,\n\nI would like to request a consultation.\n\n*Name:* ${fullName}\n*Phone:* ${phoneNumber}\n*Email:* ${emailAddress}\n*Service:* ${consultationType}\n\n*Query/Birth Details:*\n${query}\n\nPlease let me know the availability and payment process.\n\nThank you.`;

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  return { success: true, redirectUrl: waUrl };
}
