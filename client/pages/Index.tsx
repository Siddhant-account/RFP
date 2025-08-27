import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, Brain, Clock, CheckCircle2, AlertCircle, FileSearch, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
}

export default function Index() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const newFile: UploadedFile = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          progress: 0,
          status: 'uploading'
        };
        
        setUploadedFiles(prev => [...prev, newFile]);
        
        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadedFiles(prev => 
            prev.map(f => {
              if (f.id === newFile.id) {
                if (f.progress < 100) {
                  return { ...f, progress: Math.min(f.progress + 10, 100) };
                } else {
                  return { ...f, status: 'processing' };
                }
              }
              return f;
            })
          );
        }, 200);

        // Simulate completion after upload
        setTimeout(() => {
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === newFile.id 
                ? { ...f, status: 'completed', progress: 100 }
                : f
            )
          );
        }, 3000);
      }
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Upload className="h-4 w-4 text-brand-500" />;
      case 'processing':
        return <Brain className="h-4 w-4 text-brand-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'processing': return 'Analyzing RFP...';
      case 'completed': return 'Analysis Complete';
      case 'failed': return 'Analysis Failed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-600 rounded-lg">
                <FileSearch className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-brand-900">RFP Analyzer</h1>
                <p className="text-sm text-brand-600">Intelligent RFP Analysis & Summarization</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-brand-100 text-brand-700">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            Analyze Cloud RFPs with
            <span className="text-brand-600"> AI Precision</span>
          </h1>
          <p className="text-xl text-brand-700 mb-8 max-w-3xl mx-auto">
            Extract key insights, summaries, and critical requirements from your cloud RFP documents in seconds. 
            Let AI handle the heavy lifting while you focus on strategic decisions.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 border-dashed border-brand-300 bg-brand-50/50">
            <CardContent className="p-8">
              <div
                className={cn(
                  "relative rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                  dragActive 
                    ? "border-brand-500 bg-brand-100" 
                    : "border-brand-300 bg-white hover:bg-brand-50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mx-auto mb-4 p-3 bg-brand-100 rounded-full w-fit">
                  <FileText className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-brand-900 mb-2">
                  Upload Your RFP Document
                </h3>
                <p className="text-brand-600 mb-6">
                  Drag and drop your PDF RFP document here, or click to browse
                </p>
                <Button 
                  className="bg-brand-600 hover:bg-brand-700"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                <p className="text-sm text-brand-500 mt-4">
                  Supports PDF files up to 50MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-brand-900">Processing Documents</h3>
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="border-brand-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(file.status)}
                        <div>
                          <p className="font-medium text-brand-900">{file.name}</p>
                          <p className="text-sm text-brand-600">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={file.status === 'completed' ? 'default' : 'secondary'}
                        className={cn(
                          file.status === 'completed' && "bg-success text-success-foreground"
                        )}
                      >
                        {getStatusText(file.status)}
                      </Badge>
                    </div>
                    {file.status !== 'completed' && (
                      <Progress value={file.progress} className="h-2" />
                    )}
                    {file.status === 'completed' && (
                      <Button className="w-full mt-3 bg-brand-600 hover:bg-brand-700">
                        <FileSearch className="h-4 w-4 mr-2" />
                        View Analysis Results
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-brand-200 bg-white">
            <CardHeader>
              <div className="p-2 bg-brand-100 rounded-lg w-fit mb-2">
                <Brain className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle className="text-brand-900">AI-Powered Analysis</CardTitle>
              <CardDescription className="text-brand-600">
                Advanced natural language processing extracts key insights and requirements automatically
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-brand-200 bg-white">
            <CardHeader>
              <div className="p-2 bg-brand-100 rounded-lg w-fit mb-2">
                <Target className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle className="text-brand-900">Smart Categorization</CardTitle>
              <CardDescription className="text-brand-600">
                Automatically categorizes requirements, deadlines, and evaluation criteria for easy review
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-brand-200 bg-white">
            <CardHeader>
              <div className="p-2 bg-brand-100 rounded-lg w-fit mb-2">
                <Clock className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle className="text-brand-900">Instant Results</CardTitle>
              <CardDescription className="text-brand-600">
                Get comprehensive summaries and action items in seconds, not hours of manual review
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Value Proposition */}
        <Card className="border-brand-200 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Transform Your RFP Process</h2>
            <p className="text-brand-100 text-lg mb-6 max-w-2xl mx-auto">
              Stop spending hours manually reviewing RFP documents. Our AI-powered platform extracts 
              critical information, identifies key requirements, and provides actionable insights instantly.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-brand-200">Time Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-brand-200">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">&lt; 60s</div>
                <div className="text-brand-200">Processing Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
