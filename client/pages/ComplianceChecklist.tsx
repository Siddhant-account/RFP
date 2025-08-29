import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  Lock,
  Globe,
  Database,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  category: "soc2" | "gdpr" | "hipaa" | "general";
  priority: "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending";
  evidence: string[];
  responsible: string;
  dueDate: string;
}

const complianceItems: ComplianceItem[] = [
  {
    id: "1",
    title: "SOC 2 Type II Audit Preparation",
    description:
      "Prepare for SOC 2 Type II audit including security controls documentation",
    category: "soc2",
    priority: "high",
    status: "in-progress",
    evidence: ["Security Policy Document", "Access Control Matrix"],
    responsible: "Security Officer",
    dueDate: "2024-03-15",
  },
  {
    id: "2",
    title: "GDPR Data Processing Agreement",
    description:
      "Establish data processing agreements with all third-party vendors",
    category: "gdpr",
    priority: "high",
    status: "pending",
    evidence: [],
    responsible: "Legal Team",
    dueDate: "2024-02-28",
  },
  {
    id: "3",
    title: "HIPAA Risk Assessment",
    description:
      "Conduct comprehensive HIPAA risk assessment for healthcare data handling",
    category: "hipaa",
    priority: "high",
    status: "completed",
    evidence: ["Risk Assessment Report", "Remediation Plan"],
    responsible: "Compliance Officer",
    dueDate: "2024-02-15",
  },
  {
    id: "4",
    title: "Multi-factor Authentication Implementation",
    description:
      "Implement MFA for all user accounts accessing sensitive systems",
    category: "general",
    priority: "high",
    status: "completed",
    evidence: ["MFA Configuration Guide", "User Training Records"],
    responsible: "IT Security Team",
    dueDate: "2024-02-10",
  },
  {
    id: "5",
    title: "Data Encryption at Rest",
    description:
      "Ensure all sensitive data is encrypted when stored in databases and file systems",
    category: "general",
    priority: "high",
    status: "in-progress",
    evidence: ["Encryption Standards Document"],
    responsible: "Database Administrator",
    dueDate: "2024-03-01",
  },
  {
    id: "6",
    title: "Employee Privacy Training",
    description:
      "Conduct GDPR privacy training for all employees handling personal data",
    category: "gdpr",
    priority: "medium",
    status: "pending",
    evidence: [],
    responsible: "HR Department",
    dueDate: "2024-03-30",
  },
  {
    id: "7",
    title: "Audit Logging Implementation",
    description:
      "Implement comprehensive audit logging for all system access and data modifications",
    category: "soc2",
    priority: "medium",
    status: "in-progress",
    evidence: ["Logging Architecture Document"],
    responsible: "DevOps Team",
    dueDate: "2024-03-20",
  },
  {
    id: "8",
    title: "Business Associate Agreements",
    description:
      "Execute Business Associate Agreements with all HIPAA-covered entities",
    category: "hipaa",
    priority: "medium",
    status: "pending",
    evidence: [],
    responsible: "Legal Team",
    dueDate: "2024-04-15",
  },
];

export default function ComplianceChecklist() {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get("fileUrl");
  const fileName = searchParams.get("fileName") || "Uploaded Document";
  const fileId = searchParams.get("fileId") || "uploaded-file";

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleItem = (id: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(id)) {
      newCheckedItems.delete(id);
    } else {
      newCheckedItems.add(id);
    }
    setCheckedItems(newCheckedItems);
  };

  const filteredItems =
    selectedCategory === "all"
      ? complianceItems
      : complianceItems.filter((item) => item.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "soc2":
        return <Shield className="h-4 w-4" />;
      case "gdpr":
        return <Globe className="h-4 w-4" />;
      case "hipaa":
        return <Users className="h-4 w-4" />;
      case "general":
        return <Lock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "soc2":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "gdpr":
        return "bg-green-100 text-green-800 border-green-200";
      case "hipaa":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "general":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const completedCount = complianceItems.filter(
    (item) => item.status === "completed",
  ).length;
  const totalCount = complianceItems.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const checkedCount = checkedItems.size;
  const checklistProgress = Math.round(
    (checkedCount / filteredItems.length) * 100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to={`/results?fileUrl=${encodeURIComponent(fileUrl || "")}&fileName=${encodeURIComponent(fileName)}&fileId=${fileId}`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-brand-900">
                  Compliance Checklist
                </h1>
                <p className="text-sm text-brand-600">
                  Generated from {fileName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                Save Progress
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Compliance Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-brand-600" />
                  <span>Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm font-bold">
                      {completionPercentage}%
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="w-full" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Checklist Progress
                    </span>
                    <span className="text-sm font-bold">
                      {checklistProgress}%
                    </span>
                  </div>
                  <Progress value={checklistProgress} className="w-full" />
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {completedCount}
                    </div>
                    <div className="text-sm text-green-700">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">
                      {
                        complianceItems.filter(
                          (item) => item.status === "in-progress",
                        ).length
                      }
                    </div>
                    <div className="text-sm text-yellow-700">In Progress</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-600">
                      {
                        complianceItems.filter(
                          (item) => item.status === "pending",
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-700">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle>Compliance Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">SOC 2 Type II</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {
                      complianceItems.filter((item) => item.category === "soc2")
                        .length
                    }{" "}
                    items
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-green-600" />
                    <span className="text-sm">GDPR</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {
                      complianceItems.filter((item) => item.category === "gdpr")
                        .length
                    }{" "}
                    items
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">HIPAA</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {
                      complianceItems.filter(
                        (item) => item.category === "hipaa",
                      ).length
                    }{" "}
                    items
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">General Security</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {
                      complianceItems.filter(
                        (item) => item.category === "general",
                      ).length
                    }{" "}
                    items
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Items */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="soc2">SOC 2</TabsTrigger>
                <TabsTrigger value="gdpr">GDPR</TabsTrigger>
                <TabsTrigger value="hipaa">HIPAA</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-6">
                <ScrollArea className="h-[800px]">
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <Card key={item.id} className="border border-brand-100">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Checkbox
                              id={item.id}
                              checked={checkedItems.has(item.id)}
                              onCheckedChange={() => toggleItem(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <h3 className="font-semibold text-brand-900">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-brand-700">
                                    {item.description}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(item.status)}
                                  <Badge
                                    variant="outline"
                                    className={getCategoryColor(item.category)}
                                  >
                                    {getCategoryIcon(item.category)}
                                    <span className="ml-1 uppercase text-xs">
                                      {item.category}
                                    </span>
                                  </Badge>
                                  <Badge
                                    className={getPriorityColor(item.priority)}
                                  >
                                    {item.priority} priority
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-brand-600">
                                    Responsible:
                                  </span>
                                  <span className="ml-2">
                                    {item.responsible}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-medium text-brand-600">
                                    Due Date:
                                  </span>
                                  <span className="ml-2">
                                    {new Date(
                                      item.dueDate,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              {item.evidence.length > 0 && (
                                <div>
                                  <span className="font-medium text-brand-600 text-sm">
                                    Evidence:
                                  </span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {item.evidence.map((evidence, index) => (
                                      <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        <Database className="h-3 w-3 mr-1" />
                                        {evidence}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
