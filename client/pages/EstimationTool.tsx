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
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  DollarSign,
  Calculator,
  Cloud,
  Users,
  Server,
  Database,
  Shield,
  Download,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

interface CostComponent {
  id: string;
  name: string;
  category: "infrastructure" | "personnel" | "software" | "services";
  basePrice: number;
  unit: string;
  quantity: number;
  totalCost: number;
  description: string;
}

interface EstimationParameters {
  projectDuration: number;
  teamSize: number;
  cloudProvider: string;
  dataVolume: number;
  complianceLevel: string;
}

export default function EstimationTool() {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get("fileUrl");
  const fileName = searchParams.get("fileName") || "Uploaded Document";
  const fileId = searchParams.get("fileId") || "uploaded-file";

  const [parameters, setParameters] = useState<EstimationParameters>({
    projectDuration: 6,
    teamSize: 8,
    cloudProvider: "aws",
    dataVolume: 50,
    complianceLevel: "high",
  });

  const [costComponents, setCostComponents] = useState<CostComponent[]>([
    {
      id: "1",
      name: "Cloud Infrastructure - Compute",
      category: "infrastructure",
      basePrice: 2500,
      unit: "month",
      quantity: parameters.projectDuration,
      totalCost: 0,
      description: "EC2 instances, load balancers, auto-scaling groups",
    },
    {
      id: "2",
      name: "Cloud Storage & Database",
      category: "infrastructure",
      basePrice: 1200,
      unit: "month",
      quantity: parameters.projectDuration,
      totalCost: 0,
      description: "RDS, S3, EBS storage, backup solutions",
    },
    {
      id: "3",
      name: "Project Manager",
      category: "personnel",
      basePrice: 12000,
      unit: "month",
      quantity: parameters.projectDuration,
      totalCost: 0,
      description: "Senior project manager for cloud migration project",
    },
    {
      id: "4",
      name: "Cloud Architect",
      category: "personnel",
      basePrice: 15000,
      unit: "month",
      quantity: parameters.projectDuration,
      totalCost: 0,
      description: "Lead architect for multi-cloud solution design",
    },
    {
      id: "5",
      name: "DevOps Engineers",
      category: "personnel",
      basePrice: 10000,
      unit: "month",
      quantity: parameters.projectDuration * 2,
      totalCost: 0,
      description: "2 DevOps engineers for infrastructure automation",
    },
    {
      id: "6",
      name: "Security Specialists",
      category: "personnel",
      basePrice: 12000,
      unit: "month",
      quantity: parameters.projectDuration,
      totalCost: 0,
      description: "Security engineer for compliance implementation",
    },
    {
      id: "7",
      name: "Monitoring & Logging Tools",
      category: "software",
      basePrice: 800,
      unit: "month",
      quantity: parameters.projectDuration,
      totalCost: 0,
      description: "DataDog, CloudWatch, ELK stack licensing",
    },
    {
      id: "8",
      name: "Security & Compliance Tools",
      category: "software",
      basePrice: 1500,
      unit: "month",
      quantity: parameters.projectDuration,
      totalCost: 0,
      description: "Security scanning, compliance monitoring tools",
    },
    {
      id: "9",
      name: "SOC 2 Audit Services",
      category: "services",
      basePrice: 25000,
      unit: "one-time",
      quantity: 1,
      totalCost: 0,
      description: "Third-party SOC 2 Type II audit and certification",
    },
    {
      id: "10",
      name: "Training & Documentation",
      category: "services",
      basePrice: 15000,
      unit: "one-time",
      quantity: 1,
      totalCost: 0,
      description: "Team training and comprehensive documentation",
    },
  ]);

  // Calculate costs based on parameters
  const calculateCosts = () => {
    const updatedComponents = costComponents.map((component) => {
      let adjustedPrice = component.basePrice;
      let adjustedQuantity = component.quantity;

      // Adjust pricing based on parameters
      if (component.category === "infrastructure") {
        // Cloud provider multiplier
        const providerMultiplier =
          parameters.cloudProvider === "aws"
            ? 1.0
            : parameters.cloudProvider === "azure"
              ? 1.1
              : 1.15;
        adjustedPrice *= providerMultiplier;

        // Data volume impact
        if (component.name.includes("Storage")) {
          adjustedPrice *= 1 + parameters.dataVolume / 100;
        }
      }

      if (component.category === "personnel") {
        // Team size impact on project complexity
        const complexityMultiplier = 1 + (parameters.teamSize - 5) * 0.1;
        adjustedPrice *= Math.max(0.8, complexityMultiplier);
      }

      if (
        component.category === "software" ||
        component.category === "services"
      ) {
        // Compliance level impact
        const complianceMultiplier =
          parameters.complianceLevel === "high"
            ? 1.3
            : parameters.complianceLevel === "medium"
              ? 1.1
              : 1.0;
        adjustedPrice *= complianceMultiplier;
      }

      // Update quantity for duration-based items
      if (component.unit === "month") {
        adjustedQuantity = component.name.includes("DevOps Engineers")
          ? parameters.projectDuration * 2
          : parameters.projectDuration;
      }

      return {
        ...component,
        quantity: adjustedQuantity,
        totalCost: adjustedPrice * adjustedQuantity,
      };
    });

    setCostComponents(updatedComponents);
  };

  // Recalculate when parameters change
  useState(() => {
    calculateCosts();
  });

  const updateParameter = <K extends keyof EstimationParameters>(
    key: K,
    value: EstimationParameters[K],
  ) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
    setTimeout(calculateCosts, 100);
  };

  const totalCost = costComponents.reduce(
    (sum, component) => sum + component.totalCost,
    0,
  );
  const monthlyRecurringCost = costComponents
    .filter((c) => c.unit === "month")
    .reduce(
      (sum, component) => sum + component.totalCost / component.quantity,
      0,
    );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "infrastructure":
        return <Cloud className="h-4 w-4" />;
      case "personnel":
        return <Users className="h-4 w-4" />;
      case "software":
        return <Server className="h-4 w-4" />;
      case "services":
        return <Shield className="h-4 w-4" />;
      default:
        return <Calculator className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "infrastructure":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "personnel":
        return "bg-green-100 text-green-800 border-green-200";
      case "software":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "services":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const costByCategory = costComponents.reduce(
    (acc, component) => {
      acc[component.category] =
        (acc[component.category] || 0) + component.totalCost;
      return acc;
    },
    {} as Record<string, number>,
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
                  Cost Estimation Tool
                </h1>
                <p className="text-sm text-brand-600">Based on {fileName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Estimate
              </Button>
              <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                Save Estimate
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Parameters Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-brand-600" />
                  <span>Project Parameters</span>
                </CardTitle>
                <CardDescription>
                  Adjust these parameters to customize your cost estimate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="duration">
                    Project Duration: {parameters.projectDuration} months
                  </Label>
                  <Slider
                    id="duration"
                    min={3}
                    max={24}
                    step={1}
                    value={[parameters.projectDuration]}
                    onValueChange={(value) =>
                      updateParameter("projectDuration", value[0])
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="teamSize">
                    Team Size: {parameters.teamSize} people
                  </Label>
                  <Slider
                    id="teamSize"
                    min={3}
                    max={15}
                    step={1}
                    value={[parameters.teamSize]}
                    onValueChange={(value) =>
                      updateParameter("teamSize", value[0])
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="cloudProvider">Primary Cloud Provider</Label>
                  <Select
                    value={parameters.cloudProvider}
                    onValueChange={(value) =>
                      updateParameter("cloudProvider", value)
                    }
                  >
                    <SelectTrigger id="cloudProvider" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">
                        Amazon Web Services (AWS)
                      </SelectItem>
                      <SelectItem value="azure">Microsoft Azure</SelectItem>
                      <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dataVolume">
                    Data Volume: {parameters.dataVolume} TB
                  </Label>
                  <Slider
                    id="dataVolume"
                    min={10}
                    max={500}
                    step={10}
                    value={[parameters.dataVolume]}
                    onValueChange={(value) =>
                      updateParameter("dataVolume", value[0])
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="compliance">Compliance Requirements</Label>
                  <Select
                    value={parameters.complianceLevel}
                    onValueChange={(value) =>
                      updateParameter("complianceLevel", value)
                    }
                  >
                    <SelectTrigger id="compliance" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Security</SelectItem>
                      <SelectItem value="medium">
                        Standard Compliance
                      </SelectItem>
                      <SelectItem value="high">
                        High Compliance (SOC2, GDPR, HIPAA)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-brand-200">
              <CardHeader>
                <CardTitle>Cost Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-brand-50 rounded-lg border border-brand-200">
                  <div className="text-3xl font-bold text-brand-900">
                    ${totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-brand-600">
                    Total Project Cost
                  </div>
                </div>

                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">
                    ${monthlyRecurringCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">Monthly Recurring</div>
                </div>

                <Separator />

                <div className="space-y-2">
                  {Object.entries(costByCategory).map(([category, cost]) => (
                    <div
                      key={category}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-brand-600 capitalize">
                        {category}:
                      </span>
                      <span className="font-medium">
                        ${cost.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
                <TabsTrigger value="timeline">Cost Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="breakdown" className="mt-6">
                <ScrollArea className="h-[800px]">
                  <div className="space-y-4">
                    {costComponents.map((component) => (
                      <Card
                        key={component.id}
                        className="border border-brand-100"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-brand-900">
                                {component.name}
                              </h3>
                              <p className="text-sm text-brand-700">
                                {component.description}
                              </p>
                            </div>
                            <div className="text-right space-y-1">
                              <div className="text-2xl font-bold text-brand-900">
                                ${component.totalCost.toLocaleString()}
                              </div>
                              <Badge
                                variant="outline"
                                className={getCategoryColor(component.category)}
                              >
                                {getCategoryIcon(component.category)}
                                <span className="ml-1 capitalize">
                                  {component.category}
                                </span>
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-brand-600">
                                Unit Price:
                              </span>
                              <div>
                                $
                                {(
                                  component.totalCost / component.quantity
                                ).toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-brand-600">
                                Quantity:
                              </span>
                              <div>
                                {component.quantity} {component.unit}(s)
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-brand-600">
                                Unit Type:
                              </span>
                              <div className="capitalize">{component.unit}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-brand-600" />
                      <span>Cost Distribution Over Time</span>
                    </CardTitle>
                    <CardDescription>
                      Monthly cost breakdown for the{" "}
                      {parameters.projectDuration}-month project duration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-2">
                            One-time Costs
                          </h4>
                          <div className="text-2xl font-bold text-green-700">
                            $
                            {costComponents
                              .filter((c) => c.unit === "one-time")
                              .reduce((sum, c) => sum + c.totalCost, 0)
                              .toLocaleString()}
                          </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-900 mb-2">
                            Monthly Recurring
                          </h4>
                          <div className="text-2xl font-bold text-blue-700">
                            ${monthlyRecurringCost.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {Array.from(
                          { length: parameters.projectDuration },
                          (_, i) => {
                            const month = i + 1;
                            const monthlyTotal =
                              monthlyRecurringCost +
                              (month === 1
                                ? costComponents
                                    .filter((c) => c.unit === "one-time")
                                    .reduce((sum, c) => sum + c.totalCost, 0)
                                : 0);

                            return (
                              <div
                                key={month}
                                className="flex items-center justify-between p-3 bg-white rounded border"
                              >
                                <span className="font-medium">
                                  Month {month}
                                </span>
                                <span className="text-lg font-bold text-brand-900">
                                  ${monthlyTotal.toLocaleString()}
                                </span>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
