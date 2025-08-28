import { useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  Maximize2,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Mock PDF URL for demonstration
const MOCK_PDF_URL = "/placeholder.pdf";

export default function DocumentViewer() {
  const [searchParams] = useSearchParams();
  const targetPage = parseInt(searchParams.get("page") || "1");
  const documentId = searchParams.get("docId") || "unknown";

  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(targetPage);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
      // If a target page was specified, navigate to it
      if (targetPage && targetPage <= numPages) {
        setCurrentPage(targetPage);
      }
    },
    [targetPage],
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Error loading PDF:", error);
    setError(
      "Failed to load document. This is a demo - in production, the actual uploaded document would be displayed here.",
    );
    setLoading(false);
  }, []);

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(numPages || 1, prev + 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(3, prev + 0.2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.2));
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= (numPages || 1)) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/results">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analysis
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-bold text-brand-900">
                  Document Viewer
                </h1>
                <p className="text-sm text-brand-600">
                  {targetPage && `Viewing page ${targetPage} • `}
                  Cloud Infrastructure RFP
                </p>
              </div>
            </div>

            {/* Page Navigation */}
            {numPages && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevPage}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-700">Page</span>
                    <input
                      type="number"
                      min={1}
                      max={numPages}
                      value={currentPage}
                      onChange={(e) => goToPage(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 text-sm border rounded text-center"
                    />
                    <span className="text-sm text-brand-700">
                      of {numPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage >= numPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-brand-700 min-w-[3rem] text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Document Viewer */}
          <div className="lg:col-span-3">
            <Card className="border-brand-200">
              <CardContent className="p-6">
                {loading && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-brand-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-brand-600">Loading document...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center max-w-md">
                      <FileText className="h-12 w-12 text-brand-400 mx-auto mb-4" />
                      <p className="text-brand-600 mb-4">{error}</p>
                      <Badge
                        variant="secondary"
                        className="bg-brand-100 text-brand-700"
                      >
                        Demo Mode
                      </Badge>
                    </div>
                  </div>
                )}

                {!error && (
                  <div className="flex justify-center">
                    <div className="border border-brand-200 shadow-lg">
                      <Document
                        file={MOCK_PDF_URL}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading=""
                      >
                        <Page
                          pageNumber={currentPage}
                          scale={scale}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          loading=""
                        />
                      </Document>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Page Highlights */}
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="text-lg">Page Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {targetPage && (
                  <div className="p-3 bg-brand-50 rounded-lg border border-brand-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800"
                      >
                        Target Page
                      </Badge>
                    </div>
                    <p className="text-sm text-brand-700">
                      You navigated to page {targetPage} from the analysis
                      results.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-brand-900">Quick Jump</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(12)}
                      className={cn(currentPage === 12 && "bg-brand-100")}
                    >
                      Page 12
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(18)}
                      className={cn(currentPage === 18 && "bg-brand-100")}
                    >
                      Page 18
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(22)}
                      className={cn(currentPage === 22 && "bg-brand-100")}
                    >
                      Page 22
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(25)}
                      className={cn(currentPage === 25 && "bg-brand-100")}
                    >
                      Page 25
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Info */}
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="text-lg">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-brand-600">Document:</span>
                  <span className="font-medium text-brand-900">Cloud RFP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Current Page:</span>
                  <span className="font-medium text-brand-900">
                    {currentPage}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Total Pages:</span>
                  <span className="font-medium text-brand-900">
                    {numPages || "..."}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Zoom Level:</span>
                  <span className="font-medium text-brand-900">
                    {Math.round(scale * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Fullscreen View
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Rotate Page
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link to="/results">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Analysis
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
