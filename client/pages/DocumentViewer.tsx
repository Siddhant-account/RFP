import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
  RotateCw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocumentViewer() {
  const [searchParams] = useSearchParams();
  const targetPage = parseInt(searchParams.get('page') || '1');
  const documentId = searchParams.get('docId') || 'unknown';
  
  const [numPages] = useState(45); // Mock total pages
  const [currentPage, setCurrentPage] = useState(targetPage || 1);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    if (targetPage && targetPage <= numPages) {
      setCurrentPage(targetPage);
    }
  }, [targetPage, numPages]);

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(numPages, prev + 1));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(3, prev + 0.2));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.2));
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
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
                <h1 className="text-xl font-bold text-brand-900">Document Viewer</h1>
                <p className="text-sm text-brand-600">
                  {targetPage && `Viewing page ${targetPage} • `}
                  Cloud Infrastructure RFP
                </p>
              </div>
            </div>
            
            {/* Page Navigation */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage <= 1}>
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
                  <span className="text-sm text-brand-700">of {numPages}</span>
                </div>
                <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage >= numPages}>
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Document Viewer */}
          <div className="lg:col-span-3">
            <Card className="border-brand-200">
              <CardContent className="p-6">
                <div className="flex justify-center">
                  <div className="border border-brand-200 shadow-lg bg-white p-8 rounded-lg w-full max-w-2xl">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-brand-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-brand-900 mb-2">
                        Document Viewer Demo
                      </h3>
                      <p className="text-brand-600 mb-4">
                        In production, this would display page {currentPage} of your uploaded document.
                      </p>
                      <div className="bg-brand-50 p-6 rounded border border-brand-200">
                        <p className="text-sm text-brand-700 mb-4">
                          <strong>Mock Page {currentPage} Content:</strong>
                        </p>
                        <div className="text-left space-y-2 text-sm text-brand-700">
                          {currentPage === 12 && (
                            <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                              <p><strong>Multi-cloud deployment capability</strong></p>
                              <p>Solution must support AWS, Azure, and Google Cloud platforms with unified management interface...</p>
                            </div>
                          )}
                          {currentPage === 18 && (
                            <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                              <p><strong>Security compliance requirements</strong></p>
                              <p>Must meet SOC 2 Type II, GDPR, and HIPAA compliance standards...</p>
                            </div>
                          )}
                          {currentPage === 22 && (
                            <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                              <p><strong>Data migration requirements</strong></p>
                              <p>Migration of 50TB of data with zero downtime requirement...</p>
                            </div>
                          )}
                          {currentPage === 25 && (
                            <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                              <p><strong>Budget constraints</strong></p>
                              <p>Total annual cost should not exceed $500,000...</p>
                            </div>
                          )}
                          {![12, 18, 22, 25].includes(currentPage) && (
                            <p>This represents the content that would be displayed from your RFP document. The actual implementation would render the real PDF page here.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Target Page
                      </Badge>
                    </div>
                    <p className="text-sm text-brand-700">
                      You navigated to page {targetPage} from the analysis results.
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
                  <span className="font-medium text-brand-900">{currentPage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Total Pages:</span>
                  <span className="font-medium text-brand-900">{numPages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Zoom Level:</span>
                  <span className="font-medium text-brand-900">{Math.round(scale * 100)}%</span>
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
                <Button className="w-full justify-start" variant="outline" asChild>
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
