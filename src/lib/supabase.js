import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon') &&
  !supabaseAnonKey.includes('PASTE_MY_PUBLISHABLE_KEY_HERE') &&
  supabaseUrl.startsWith('http')
);

export const supabase = (() => {
  if (!isSupabaseConfigured) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err);
    return null;
  }
})();

/**
 * Diagnostic helper to test the Supabase connection to public.testimonials
 */
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      connected: false,
      reason: 'Supabase credentials not configured in .env (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY required).'
    };
  }

  try {
    const { data, error, count } = await supabase
      .from('testimonials')
      .select('id', { count: 'exact', head: true });

    if (error) {
      return { connected: false, error: error.message };
    }

    return { connected: true, totalCount: count ?? 0 };
  } catch (err) {
    return { connected: false, error: err?.message || String(err) };
  }
}

/**
 * Fetch all approved testimonials from Supabase (Public)
 * Only returns reviews where approval_status = 'approved'
 */
export async function getApprovedTestimonials() {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id, customer_name, service_received, star_rating, review_text, created_at')
      .eq('approval_status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return null;
    }

    return (data || []).map(item => ({
      id: item.id,
      name: item.customer_name,
      location: item.service_received ? `Verified Service: ${item.service_received}` : 'Verified Customer',
      service: item.service_received,
      rating: item.star_rating,
      text: item.review_text,
      date: item.created_at,
      source: 'supabase',
    }));
  } catch (err) {
    console.warn('Failed to load testimonials from Supabase:', err);
    return null;
  }
}

/**
 * Submit a customer testimonial (Always inserted as 'pending' for moderation)
 */
export async function submitTestimonial({ customerName, serviceReceived, starRating, reviewText }) {
  if (!supabase) {
    throw new Error('Supabase database is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file to save reviews.');
  }

  const { data, error } = await supabase
    .from('testimonials')
    .insert([
      {
        customer_name: customerName.trim(),
        service_received: serviceReceived ? serviceReceived.trim() : null,
        star_rating: Number(starRating),
        review_text: reviewText.trim(),
        approval_status: 'pending'
      }
    ])
    .select();

  if (error) {
    throw error;
  }

  // Attempt to invoke the notify-review Edge Function for email delivery to bluelineautosuk@gmail.com
  // Handled asynchronously so failure to deliver email does not block the customer's review submission
  try {
    supabase.functions.invoke('notify-review', {
      body: {
        record: {
          customer_name: customerName.trim(),
          service_received: serviceReceived ? serviceReceived.trim() : null,
          star_rating: Number(starRating),
          review_text: reviewText.trim(),
        }
      }
    }).catch(err => {
      console.info('Edge function notification info (pending deployment or email secret):', err?.message || err);
    });
  } catch {
    // Non-blocking notification attempt
  }

  return data;
}

// ============================================================
// Secure Administrator Workflow Functions
// Authenticates via Supabase Auth without exposing credentials
// ============================================================

/**
 * Admin Sign In with Email & Password
 */
export async function adminSignIn(email, password) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet. Please configure .env with your Supabase credentials.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) throw error;
  return data;
}

/**
 * Admin Sign Out
 */
export async function adminSignOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get current admin user / session
 */
export async function getAdminUser() {
  if (!supabase) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

/**
 * Subscribe to Supabase Auth State changes
 */
export function onAdminAuthChange(callback) {
  if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabase.auth.onAuthStateChange(callback);
}

/**
 * Fetch all testimonials for admin moderation (pending, approved, rejected)
 * Requires authenticated session
 */
export async function getAllTestimonialsAdmin() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Update testimonial approval status ('approved' | 'rejected')
 * Requires authenticated admin session
 */
export async function updateTestimonialStatus(id, newStatus) {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  if (!['approved', 'rejected', 'pending'].includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const { data, error } = await supabase
    .from('testimonials')
    .update({ approval_status: newStatus })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

/**
 * Delete a testimonial (e.g. spam)
 * Requires authenticated admin session
 */
export async function deleteTestimonial(id) {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
