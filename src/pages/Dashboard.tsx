
import React from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, FileText, Upload, Timer, CheckCircle2, AlertTriangle, 
  Leaf, Tractor, HelpCircle, FileSpreadsheet, ScrollText, ArrowRight, 
  Info, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { getRecentActivity, getDashboardStats } from "@/lib/data-service";

const Dashboard = () => {
  const stats = getDashboardStats();
  const activities = getRecentActivity();

  const getModuleIcon = (module: string | undefined) => {
    switch(module) {
      case 'crops':
        return <Leaf className="h-4 w-4" />;
      case 'livestock':
        return <Tractor className="h-4 w-4" />;
      case 'decisions':
        return <HelpCircle className="h-4 w-4" />;
      case 'financing':
        return <FileSpreadsheet className="h-4 w-4" />;
      case 'documents':
        return <ScrollText className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'upload':
        return <Upload className="h-5 w-5" />;
      case 'analysis':
        return <FileText className="h-5 w-5" />;
      case 'recommendation':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'task':
        return <Timer className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getActivityStatus = (type: string) => {
    switch(type) {
      case 'upload':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case 'analysis':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      case 'recommendation':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case 'task':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue sur AgriPilot+ Data Hub, votre assistant agricole intelligent
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild className="gap-1">
            <Link to="/data-center">
              Importer des données
              <Upload className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="agri-transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documents importés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">{stats.totalFiles}</div>
              <Badge variant="outline" className="text-xs font-normal">
                {stats.analyzedDocuments} analysés
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="agri-transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tâches en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.pendingTasks}</div>
              <AlertTriangle className={`h-5 w-5 ${stats.pendingTasks > 0 ? 'text-amber-500' : 'text-muted-foreground'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="agri-transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Module le plus actif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">Cultures</div>
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="agri-transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Analyse IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">Actif</div>
              <Badge variant="outline" className="text-xs font-normal">Mistral AI</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 mt-6">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Les 5 dernières activités sur votre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className={`mt-0.5 p-2 rounded-full ${getActivityStatus(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium leading-none">{activity.title}</p>
                      <time className="text-sm text-muted-foreground">
                        {formatDate(activity.timestamp)}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center pt-1">
                      {activity.module && (
                        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                          {getModuleIcon(activity.module)}
                          <span>{activity.module.charAt(0).toUpperCase() + activity.module.slice(1)}</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Répartition par module</CardTitle>
            <CardDescription>
              Distribution de vos documents par module
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Cultures</span>
                </div>
                <span className="text-sm">{stats.modules.crops} documents</span>
              </div>
              <Progress value={stats.modules.crops / stats.totalFiles * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium">Élevage</span>
                </div>
                <span className="text-sm">{stats.modules.livestock} documents</span>
              </div>
              <Progress value={stats.modules.livestock / stats.totalFiles * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">Aide à la décision</span>
                </div>
                <span className="text-sm">{stats.modules.decisions} documents</span>
              </div>
              <Progress value={stats.modules.decisions / stats.totalFiles * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                  <span className="text-sm font-medium">Financement</span>
                </div>
                <span className="text-sm">{stats.modules.financing} documents</span>
              </div>
              <Progress value={stats.modules.financing / stats.totalFiles * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  <span className="text-sm font-medium">Documents</span>
                </div>
                <span className="text-sm">{stats.modules.documents} documents</span>
              </div>
              <Progress value={stats.modules.documents / stats.totalFiles * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès rapides</CardTitle>
            <CardDescription>
              Accédez rapidement aux modules principaux
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Link to="/crops" className="agri-card flex flex-col items-center justify-center p-4 text-center">
                <Leaf className="h-10 w-10 text-green-600 mb-3" />
                <h3 className="font-medium">Cultures</h3>
                <p className="text-sm text-muted-foreground mt-1">Gestion de vos parcelles et cultures</p>
                <Button variant="link" size="sm" className="mt-2 gap-1">
                  Accéder <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
              
              <Link to="/livestock" className="agri-card flex flex-col items-center justify-center p-4 text-center">
                <Tractor className="h-10 w-10 text-amber-600 mb-3" />
                <h3 className="font-medium">Élevage</h3>
                <p className="text-sm text-muted-foreground mt-1">Suivi de vos animaux et productions</p>
                <Button variant="link" size="sm" className="mt-2 gap-1">
                  Accéder <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
              
              <Link to="/decision-support" className="agri-card flex flex-col items-center justify-center p-4 text-center">
                <HelpCircle className="h-10 w-10 text-blue-600 mb-3" />
                <h3 className="font-medium">Aide à la décision</h3>
                <p className="text-sm text-muted-foreground mt-1">Conseils personnalisés par IA</p>
                <Button variant="link" size="sm" className="mt-2 gap-1">
                  Accéder <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
              
              <Link to="/financing" className="agri-card flex flex-col items-center justify-center p-4 text-center">
                <FileSpreadsheet className="h-10 w-10 text-violet-600 mb-3" />
                <h3 className="font-medium">Financement</h3>
                <p className="text-sm text-muted-foreground mt-1">Aides et opportunités financières</p>
                <Button variant="link" size="sm" className="mt-2 gap-1">
                  Accéder <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
              
              <Link to="/documents" className="agri-card flex flex-col items-center justify-center p-4 text-center">
                <ScrollText className="h-10 w-10 text-slate-600 mb-3" />
                <h3 className="font-medium">Documents</h3>
                <p className="text-sm text-muted-foreground mt-1">Gestion de vos documents techniques</p>
                <Button variant="link" size="sm" className="mt-2 gap-1">
                  Accéder <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
