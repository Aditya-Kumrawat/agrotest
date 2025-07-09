
// import { supabase } from '../config/supabase'

export async function uploadImageToStorage(
  bucket: string,
  fileName: string,
  fileBuffer: Buffer,
  contentType: string
) {
  // TODO: Replace with S3/local storage logic
  throw new Error('Not implemented: uploadImageToStorage')
}

export async function deleteImageFromStorage(bucket: string, fileName: string) {
  // TODO: Replace with S3/local storage logic
  throw new Error('Not implemented: deleteImageFromStorage')
}

export function getPublicUrl(bucket: string, fileName: string) {
  // TODO: Replace with S3/local storage logic
  return ''
}
