'use server'

import { writeFile, mkdir } from 'fs/promises';
import { join } from "node:path";

export async function uploadFolder(formData: FormData) {  
  const files = formData.getAll('file');

  const uploadDir = join(process.cwd(), 'tmp', 'analysis');
  await mkdir(uploadDir, { recursive: true, });

  for (let file of files) {
    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
  
      const fileContent = buffer.toString("utf-8")      

      console.log(file.name)
      console.log(fileContent)
    }
  }
  
  return 'Hello World'
}