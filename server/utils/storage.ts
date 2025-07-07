
import { supabase } from '../config/supabase'

export async function uploadImageToStorage(
  bucket: string,
  fileName: string,
  fileBuffer: Buffer,
  contentType: string
) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileBuffer, {
        contentType,
        upsert: false
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return {
      path: data.path,
      publicUrl: urlData.publicUrl
    }
  } catch (error) {
    throw new Error(`Upload failed: ${error}`)
  }
}

export async function deleteImageFromStorage(bucket: string, fileName: string) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])
    
    if (error) throw error
    
    return true
  } catch (error) {
    throw new Error(`Delete failed: ${error}`)
  }
}

export function getPublicUrl(bucket: string, fileName: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)
  
  return data.publicUrl
}
