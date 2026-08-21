import fs from "fs/promises";
import path from "path";
import mammoth from "mammoth";

/**
 * =====================================================
 * Extract text from PDF
 * =====================================================
 */
const extractPdfText = async (
    filePath: string
): Promise<string> => {
    const buffer = await fs.readFile(filePath);

    // Load pdf-parse only when PDF processing is actually requested.
    // This prevents it from being loaded during Vercel function startup.
    const { PDFParse } = await import("pdf-parse");

    const parser = new PDFParse({
        data: buffer,
    });

    try {
        const data = await parser.getText();

        return data.text.trim();
    } finally {
        await parser.destroy();
    }
};

/**
 * =====================================================
 * Extract text from DOCX
 * =====================================================
 */
const extractDocxText = async (
    filePath: string
): Promise<string> => {
    const result = await mammoth.extractRawText({
        path: filePath,
    });

    return result.value.trim();
};

/**
 * =====================================================
 * Extract Resume Text
 * =====================================================
 */
export const extractResumeText = async (
    filePath: string
): Promise<string> => {
    const extension = path
        .extname(filePath)
        .toLowerCase();

    let extractedText = "";

    try {
        switch (extension) {
            case ".pdf":
                extractedText =
                    await extractPdfText(filePath);
                break;

            case ".docx":
                extractedText =
                    await extractDocxText(filePath);
                break;

            default:
                throw new Error(
                    "Unsupported file format."
                );
        }

        if (!extractedText) {
            throw new Error(
                "No readable text found in resume."
            );
        }

        return extractedText;
    } finally {
        // Always delete uploaded file
        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.error(
                "Failed to delete uploaded file:",
                err
            );
        }
    }
};