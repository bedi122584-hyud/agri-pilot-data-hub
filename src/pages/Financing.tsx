
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileSpreadsheet,
  Upload,
  ChevronRight,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  PlusCircle,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFinancingOpportunities } from "@/lib/data-service";

const Financing = () => {
  const opportunities = getFinancingOpportunities();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            Ouvert
          </Badge>
        );
      case "applied":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
            Candidature soumise
          </Badge>
        );
      case "received":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Reçu
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            Fermé
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "applied":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "received":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "closed":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  };

  const calculateDaysRemaining = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTotalFunding = () => {
    return opportunities
      .filter((opp) => opp.status === "received")
      .reduce((total, opp) => {
        const amount = parseFloat(opp.amount.replace(/[^\d]/g, ""));
        return total + amount;
      }, 0);
  };

  const pendingOpportunities = opportunities.filter((opp) => opp.status === "open" || opp.status === "applied");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-violet-600" />
            Financement & Subventions
          </h1>
          <p className="text-muted-foreground">
            Explorez les opportunités de financement adaptées à votre exploitation
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" asChild>
            <Link to="/data-center">
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Link>
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle demande
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Financements disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{opportunities.filter((o) => o.status === "open").length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Opportunités ouvertes adaptées à votre profil
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Demandes en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{opportunities.filter((o) => o.status === "applied").length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Candidatures soumises en attente de réponse
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Financement total obtenu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getTotalFunding().toLocaleString()} FCFA</div>
            <p className="text-xs text-muted-foreground mt-1">
              Montant total des subventions reçues
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="mb-6">
        <TabsList>
          <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
          <TabsTrigger value="applications">Mes candidatures</TabsTrigger>
        </TabsList>
        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Opportunités de financement</CardTitle>
              <CardDescription>
                Subventions et aides disponibles pour votre exploitation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities
                  .filter((opp) => opp.status === "open")
                  .map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{opportunity.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {opportunity.provider}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-lg font-medium">
                          {opportunity.amount}
                        </Badge>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm mb-1 flex justify-between">
                          <span>Éligibilité</span>
                          <span>{opportunity.eligibility}%</span>
                        </div>
                        <Progress value={opportunity.eligibility} className="h-2" />
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Échéance: {formatDate(opportunity.deadline)}
                          </span>
                          <span className="ml-1 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded">
                            J-{calculateDaysRemaining(opportunity.deadline)}
                          </span>
                        </div>
                        
                        <Button variant="outline" size="sm" className="gap-1">
                          Candidater <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                {opportunities.filter((opp) => opp.status === "open").length === 0 && (
                  <div className="text-center py-6">
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune opportunité disponible</h3>
                    <p className="text-sm text-muted-foreground">
                      Aucune nouvelle opportunité de financement n'est disponible pour le moment.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Mes candidatures</CardTitle>
                <CardDescription>
                  Suivez l'état de vos demandes de financement
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities
                  .filter((opp) => opp.status !== "open")
                  .map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getStatusIcon(opportunity.status)}</div>
                          <div>
                            <h3 className="font-medium">{opportunity.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {opportunity.provider}
                            </p>
                            <div className="mt-2">
                              {getStatusBadge(opportunity.status)}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-lg font-medium">
                          {opportunity.amount}
                        </Badge>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Échéance: {formatDate(opportunity.deadline)}
                          </span>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Voir les détails
                        </Button>
                      </div>
                    </div>
                  ))}

                {opportunities.filter((opp) => opp.status !== "open").length === 0 && (
                  <div className="text-center py-6">
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune candidature</h3>
                    <p className="text-sm text-muted-foreground">
                      Vous n'avez pas encore soumis de candidature pour un financement.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Découvrir les opportunités
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>À surveiller</CardTitle>
          <CardDescription>
            Opportunités nécessitant votre attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingOpportunities.length > 0 ? (
            <div className="space-y-4">
              {pendingOpportunities
                .filter((opp) => calculateDaysRemaining(opp.deadline) <= 30)
                .map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border"
                  >
                    <div 
                      className={`p-1.5 rounded-full ${
                        calculateDaysRemaining(opportunity.deadline) <= 7 
                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" 
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                      }`}
                    >
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{opportunity.title}</h3>
                        {calculateDaysRemaining(opportunity.deadline) <= 7 && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {opportunity.status === "open"
                          ? "Date limite de candidature"
                          : "Complétez votre dossier avant"}: {formatDate(opportunity.deadline)}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Button variant="outline" size="sm">
                          {opportunity.status === "open" ? "Candidater" : "Compléter le dossier"}
                        </Button>
                        <Badge variant="outline" className="ml-2">
                          J-{calculateDaysRemaining(opportunity.deadline)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium mb-1">Tout est à jour</h3>
              <p className="text-sm text-muted-foreground">
                Vous n'avez aucune échéance urgente pour le moment.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="outline">
            Toutes les échéances
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Financing;
