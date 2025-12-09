import { supabase } from "@/supabase/supabase";

export const validateImage = (file: File): string => {
  const validTypes = ["image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    return "Невалиден формат. Само JPEG/PNG.";
  }
  if (file.size > 4 * 1024 * 1024) {
    return "Файлът е твърде голям (макс 4MB).";
  }
  return "";
};

export const uploadToSupabase = async (
  file: File,
  path: string
): Promise<string> => {
  const { error } = await supabase.storage.from("images").upload(path, file, {
    upsert: false,
  });

  if (error) {
    throw new Error("Грешка при качване на файл: " + error.message);
  }

  const { data: urlData } = await supabase.storage
    .from("images")
    .getPublicUrl(path);

  return (urlData as any)?.publicUrl || "";
};
