import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const uploadImageToSupabase = async (
  imageFile: File
): Promise<string | null> => {
  try {
    // Loại bỏ phần kiểm tra user
    // Validate file
    if (!imageFile) {
      console.warn('No image file provided');
      return null;
    }

    // Phần còn lại giữ nguyên
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `fund-images/${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('EdVentures')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type,
      });

    if (error) {
      console.error('Supabase Upload Error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('EdVentures')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Image upload catch error:', error);
    return null;
  }
};
