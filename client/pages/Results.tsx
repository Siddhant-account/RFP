import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Target,
  DollarSign,
  Calendar,
  Download,
  Share,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockAnalysis = {
  documentId: "rfp-001",
  summary:
    "This RFP seeks a comprehensive cloud infrastructure solution for a mid-size enterprise looking to modernize their IT infrastructure. The project involves migrating existing workloads to cloud, implementing security frameworks, and establishing monitoring and automation capabilities. Key focus areas include scalability, security compliance (SOC 2, GDPR), cost optimization, and 24/7 support.",
  metadata: {
    documentType: "Cloud Infrastructure RFP",
    pageCount: 45,
    wordCount: 12500,
    processedAt: new Date(),
  },
  keyPoints: [
    {
      id: "1",
      category: "requirement" as const,
      title: "Multi-cloud deployment capability",
      description:
        "Solution must support AWS, Azure, and Google Cloud platforms with unified management",
      importance: "high" as const,
      pageReference: 12,
    },
    {
      id: "2",
      category: "deadline" as const,
      title: "Project completion deadline",
      description:
        "Full implementation and migration must be completed within 6 months",
      importance: "high" as const,
      pageReference: 3,
    },
    {
      id: "3",
      category: "technical" as const,
      title: "Security compliance requirements",
      description:
        "Must meet SOC 2 Type II, GDPR, and HIPAA compliance standards",
      importance: "high" as const,
      pageReference: 18,
    },
    {
      id: "4",
      category: "budget" as const,
      title: "Annual budget constraints",
      description:
        "Total annual cost should not exceed $500,000 including all cloud services and support",
      importance: "medium" as const,
      pageReference: 25,
    },
    {
      id: "5",
      category: "evaluation" as const,
      title: "Vendor evaluation criteria",
      description:
        "Technical capability (40%), cost (30%), experience (20%), support (10%)",
      importance: "medium" as const,
      pageReference: 8,
    },
    {
      id: "6",
      category: "technical" as const,
      title: "Data migration requirements",
      description:
        "Migration of 50TB of data with zero downtime requirement for critical systems",
      importance: "high" as const,
      pageReference: 22,
    },
  ],
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "requirement":
      return <Target className="h-4 w-4" />;
    case "deadline":
      return <Clock className="h-4 w-4" />;
    case "evaluation":
      return <CheckCircle2 className="h-4 w-4" />;
    case "technical":
      return <FileText className="h-4 w-4" />;
    case "budget":
      return <DollarSign className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "requirement":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "deadline":
      return "bg-red-100 text-red-800 border-red-200";
    case "evaluation":
      return "bg-green-100 text-green-800 border-green-200";
    case "technical":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "budget":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Results() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredKeyPoints =
    selectedCategory === "all"
      ? mockAnalysis.keyPoints
      : mockAnalysis.keyPoints.filter(
          (point) => point.category === selectedCategory,
        );

  const categories = Array.from(
    new Set(mockAnalysis.keyPoints.map((point) => point.category)),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Upload
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-brand-900">
                  RFP Analysis Results
                </h1>
                <p className="text-sm text-brand-600">
                  Cloud Infrastructure RFP • 45 pages
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Summary Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-brand-600" />
                  <span>Executive Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-700 leading-relaxed">
                  {mockAnalysis.summary}
                </p>
              </CardContent>
            </Card>

            {/* Key Points Section */}
            <Card className="border-brand-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Key Points & Requirements</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="bg-brand-100 text-brand-700"
                    >
                      {filteredKeyPoints.length} items
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Click page refs to view document
                    </Badge>
                  </div>
                </div>

                {/* Category Filter */}
                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="capitalize"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {filteredKeyPoints.map((point) => (
                      <Card key={point.id} className="border border-brand-100">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className={`${getCategoryColor(point.category)} capitalize`}
                              >
                                {getCategoryIcon(point.category)}
                                <span className="ml-1">{point.category}</span>
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={getImportanceColor(point.importance)}
                              >
                                {point.importance} priority
                              </Badge>
                            </div>
                            {point.pageReference && (
                              <Badge
                                variant="outline"
                                className="text-xs hover:bg-brand-100 cursor-pointer transition-colors"
                                asChild
                              >
                                <Link
                                  to={`/document?page=${point.pageReference}&docId=${mockAnalysis.documentId}`}
                                >
                                  Page {point.pageReference}
                                </Link>
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold text-brand-900 mb-2">
                            {point.pageReference ? (
                              <Link
                                to={`/document?page=${point.pageReference}&docId=${mockAnalysis.documentId}`}
                                className="hover:text-brand-600 hover:underline cursor-pointer transition-colors"
                              >
                                {point.title}
                              </Link>
                            ) : (
                              point.title
                            )}
                          </h4>
                          <p className="text-brand-700 text-sm">
                            {point.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Metadata Sidebar */}
          <div className="space-y-6">
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="text-lg">Document Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-brand-600">Document Type:</span>
                  <span className="font-medium text-brand-900">
                    {mockAnalysis.metadata.documentType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Pages:</span>
                  <span className="font-medium text-brand-900">
                    {mockAnalysis.metadata.pageCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Word Count:</span>
                  <span className="font-medium text-brand-900">
                    {mockAnalysis.metadata.wordCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Processed:</span>
                  <span className="font-medium text-brand-900">
                    {mockAnalysis.metadata.processedAt.toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Stats */}
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="text-lg">Analysis Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">
                      {
                        mockAnalysis.keyPoints.filter(
                          (p) => p.importance === "high",
                        ).length
                      }
                    </div>
                    <div className="text-sm text-red-700">High Priority</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">
                      {
                        mockAnalysis.keyPoints.filter(
                          (p) => p.importance === "medium",
                        ).length
                      }
                    </div>
                    <div className="text-sm text-yellow-700">
                      Medium Priority
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Requirements:</span>
                    <span className="font-medium">
                      {
                        mockAnalysis.keyPoints.filter(
                          (p) => p.category === "requirement",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Deadlines:</span>
                    <span className="font-medium">
                      {
                        mockAnalysis.keyPoints.filter(
                          (p) => p.category === "deadline",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Technical:</span>
                    <span className="font-medium">
                      {
                        mockAnalysis.keyPoints.filter(
                          (p) => p.category === "technical",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Budget:</span>
                    <span className="font-medium">
                      {
                        mockAnalysis.keyPoints.filter(
                          (p) => p.category === "budget",
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Project Timeline
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Generate Compliance Checklist
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Cost Estimation Tool
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
