import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import { Project, SourceFile } from "ts-morph"

const project = new Project({
  compilerOptions: {
    allowJs: true,
  }
})

const acceptFileExtensions = [".js", ".ts", ".jsx", ".tsx"]

export async function POST(reqest: NextRequest): Promise<NextResponse> {
  const results = [];
  const formData = await reqest.formData();

  const files = formData.getAll("files[]")

  for (let file of files) {
    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const extName = path.extname(file.name)
      const fileName = file.name.split('/').pop();
      const fileDirectory = file.name.split("/").slice(0, -1).join("/")

      if (extName.length && acceptFileExtensions.includes(extName)) {
        const fileContent = buffer.toString("utf-8")

        const sourceFile = project.createSourceFile(file.name, fileContent, {
          overwrite: true
        })

        results.push({
          fileName: fileName,
          path: fileDirectory,
          size: file.size,
        })
      }
    }
  }
  
  const res = NextResponse.json({ msg: results })
  return res;
}