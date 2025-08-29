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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Target,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  duration: string;
  dependencies: string[];
  assignees: string[];
  status: "pending" | "in-progress" | "completed";
}

const defaultPhases: ProjectPhase[] = [
  {
    id: "1",
    name: "Requirements Analysis",
    description: "Detailed analysis of RFP requirements and stakeholder needs",
    duration: "2 weeks",
    dependencies: [],
    assignees: ["Business Analyst", "Project Manager"],
    status: "completed",
  },
  {
    id: "2",
    name: "System Design",
    description: "Architectural design and technical specifications",
    duration: "3 weeks",
    dependencies: ["1"],
    assignees: ["Solution Architect", "Technical Lead"],
    status: "in-progress",
  },
  {
    id: "3",
    name: "Infrastructure Setup",
    description: "Cloud infrastructure provisioning and configuration",
    duration: "2 weeks",
    dependencies: ["2"],
    assignees: ["DevOps Engineer", "Cloud Architect"],
    status: "pending",
  },
  {
    id: "4",
    name: "Development Phase 1",
    description: "Core system development and basic features",
    duration: "6 weeks",
    dependencies: ["3"],
    assignees: ["Frontend Developer", "Backend Developer"],
    status: "pending",
  },
  {
    id: "5",
    name: "Security Implementation",
    description: "Security compliance and audit implementation",
    duration: "3 weeks",
    dependencies: ["4"],
    assignees: ["Security Engineer", "Compliance Officer"],
    status: "pending",
  },
  {
    id: "6",
    name: "Testing & QA",
    description: "Comprehensive testing and quality assurance",
    duration: "4 weeks",
    dependencies: ["5"],
    assignees: ["QA Engineer", "Test Automation Engineer"],
    status: "pending",
  },
  {
    id: "7",
    name: "Deployment & Migration",
    description: "Production deployment and data migration",
    duration: "2 weeks",
    dependencies: ["6"],
    assignees: ["DevOps Engineer", "Database Administrator"],
    status: "pending",
  },
];

export default function CreateService() {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('fileUrl');
  const fileName = searchParams.get('fileName') || 'Uploaded Document';
  const fileId = searchParams.get('fileId') || 'uploaded-file';

  const [phases, setPhases] = useState<ProjectPhase[]>(defaultPhases);
  const [projectName, setProjectName] = useState("Cloud Infrastructure Migration Project");
  const [projectDescription, setProjectDescription] = useState("Migration and modernization of existing infrastructure to multi-cloud environment based on RFP requirements");
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState("2024-07-31");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const addNewPhase = () => {
    const newPhase: ProjectPhase = {
      id: (phases.length + 1).toString(),
      name: "New Phase",
      description: "Phase description",
      duration: "1 week",
      dependencies: [],
      assignees: [],
      status: "pending",
    };
    setPhases([...phases, newPhase]);
  };

  const removePhase = (id: string) => {
    setPhases(phases.filter(phase => phase.id !== id));
  };

  const totalWeeks = phases.reduce((total, phase) => {
    const weeks = parseInt(phase.duration.split(' ')[0]) || 0;
    return total + weeks;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/results?fileUrl=${encodeURIComponent(fileUrl || '')}&fileName=${encodeURIComponent(fileName)}&fileId=${fileId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-brand-900">Create Project Timeline</h1>
                <p className="text-sm text-brand-600">
                  Based on {fileName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Save Draft
              </Button>
              <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                Create Timeline
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-brand-600" />
                  <span>Project Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="projectDescription">Description</Label>
                  <Textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle>Timeline Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{phases.length}</div>
                    <div className="text-sm text-blue-700">Total Phases</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{totalWeeks}</div>
                    <div className="text-sm text-green-700">Total Weeks</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Completed:</span>
                    <span className="font-medium">
                      {phases.filter(p => p.status === "completed").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">In Progress:</span>
                    <span className="font-medium">
                      {phases.filter(p => p.status === "in-progress").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Pending:</span>
                    <span className="font-medium">
                      {phases.filter(p => p.status === "pending").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Phases */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-brand-900">Project Phases</h2>
              <Button onClick={addNewPhase} size="sm" className="bg-brand-600 hover:bg-brand-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Phase
              </Button>
            </div>

            <ScrollArea className="h-[800px]">
              <div className="space-y-4">
                {phases.map((phase, index) => (
                  <Card key={phase.id} className="border border-brand-100">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-600 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{phase.name}</CardTitle>
                            <CardDescription>{phase.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(phase.status)}>
                            {getStatusIcon(phase.status)}
                            <span className="ml-1 capitalize">{phase.status.replace('-', ' ')}</span>
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removePhase(phase.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-brand-600">Duration</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-4 w-4 text-brand-500" />
                            <span className="text-sm">{phase.duration}</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-brand-600">Assignees</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Users className="h-4 w-4 text-brand-500" />
                            <span className="text-sm">{phase.assignees.length} assigned</span>
                          </div>
                        </div>
                      </div>
                      {phase.assignees.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {phase.assignees.map((assignee, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {assignee}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {phase.dependencies.length > 0 && (
                        <div className="mt-3">
                          <Label className="text-sm font-medium text-brand-600">Dependencies</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {phase.dependencies.map((depId) => {
                              const dep = phases.find(p => p.id === depId);
                              return dep ? (
                                <Badge key={depId} variant="secondary" className="text-xs">
                                  {dep.name}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}
