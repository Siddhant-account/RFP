/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * RFP Document types
 */
export interface RFPDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  status: "uploading" | "processing" | "completed" | "failed";
}

/**
 * RFP Analysis Result
 */
export interface RFPAnalysis {
  documentId: string;
  summary: string;
  keyPoints: KeyPoint[];
  metadata: {
    documentType: string;
    pageCount: number;
    wordCount: number;
    processedAt: Date;
  };
}

/**
 * Key Point extracted from RFP
 */
export interface KeyPoint {
  id: string;
  category:
    | "requirement"
    | "deadline"
    | "evaluation"
    | "technical"
    | "budget"
    | "other";
  title: string;
  description: string;
  importance: "high" | "medium" | "low";
  pageReference?: number;
}

/**
 * API request for uploading RFP document
 */
export interface UploadRFPRequest {
  file: File;
  metadata?: {
    title?: string;
    description?: string;
  };
}

/**
 * API response for uploading RFP document
 */
export interface UploadRFPResponse {
  success: boolean;
  document: RFPDocument;
  message?: string;
}

/**
 * API response for RFP analysis
 */
export interface AnalyzeRFPResponse {
  success: boolean;
  analysis: RFPAnalysis;
  message?: string;
}
