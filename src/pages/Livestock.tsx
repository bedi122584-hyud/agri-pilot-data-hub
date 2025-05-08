import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tractor,
  Upload,
  ChevronRight,
  Calendar,
  AlertTriangle,
  Info,
  Plus,
  Download,
  LineChart,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getLivestock } from "@/lib/data-service";
import { AddLivestockForm } from "@/components/forms/AddLivestockForm";

const Livestock = () => {
  const livestock = getLivestock();
  const [isAddLivestockDialogOpen, setIsAddLivestockDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Bon</span>
          </div>
        );
      case "average":
        return (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span>Moyen</span>
          </div>
        );
      case "needs_attention":
        return (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Attention requise</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <span>Non évalué</span>
          </div>
        );
    }
  };

  const getTotalAnimals = () => {
    return livestock.reduce((sum, group) => sum + group.count, 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const getUrgentActions = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return livestock
      .filter(
        (group) =>
          group.nextAction &&
          new Date(group.nextAction.date) <= nextWeek
      )
      .map((group) => ({
        id: group.id,
        type: group.type,
        action: group.nextAction?.type || "",
        date: group.nextAction?.date || "",
        isUrgent:
          group.nextAction &&
          new Date(group.nextAction.date) <= today,
      }));
  };

  const urgentActions = getUrgentActions();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Tractor className="h-6 w-6 text-amber-600" />
            Gestion de l'élevage
          </h1>
          <p className="text-muted-foreground">
            Suivez et optimisez votre production animale
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" asChild>
            <Link to="/data-center">
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Link>
          </Button>
          <Button onClick={() => setIsAddLivestockDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un groupe
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total animaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getTotalAnimals()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {livestock.length} groupes d'animaux
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Actions à venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{urgentActions.length}</div>
              {urgentActions.some((a) => a.isUrgent) && (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {urgentActions.filter((a) => a.isUrgent).length} actions urgentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              État de santé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <div>
                {livestock.filter((g) => g.healthStatus === "good").length} / {livestock.length}
              </div>
              <Badge variant="outline" className="text-xs">
                {Math.round((livestock.filter((g) => g.healthStatus === "good").length / livestock.length) * 100)}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Groupes en bonne santé
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Vos animaux</CardTitle>
                <CardDescription>
                  Tous les groupes d'animaux de votre exploitation
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>État de santé</TableHead>
                    <TableHead>Prochaine action</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {livestock.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">
                        {group.type}
                      </TableCell>
                      <TableCell>{group.count}</TableCell>
                      <TableCell>
                        {getStatusBadge(group.healthStatus)}
                      </TableCell>
                      <TableCell>
                        {group.nextAction ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {group.nextAction.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(group.nextAction.date)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Aucune
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Détails
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Actions à venir
              </CardTitle>
              <CardDescription>
                Planning des prochaines interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {urgentActions.length > 0 ? (
                <div className="space-y-4">
                  {urgentActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border"
                    >
                      <div
                        className={`p-1.5 rounded-full ${
                          action.isUrgent
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {action.isUrgent ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <Calendar className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{action.action}</h3>
                          {action.isUrgent && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pour: {action.type}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{formatDate(action.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" size="sm" className="w-full">
                    Voir toutes les actions
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <h3 className="font-medium">Aucune action prévue</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vous n'avez pas d'actions planifiées pour les 7 prochains jours.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Recommandations IA
          </CardTitle>
          <CardDescription>
            Suggestions basées sur l'analyse de vos données d'élevage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">
                  Vaccination nécessaire
                </h3>
                <p className="text-sm text-muted-foreground">
                  Votre groupe de bovins doit recevoir la vaccination contre la fièvre aphteuse dans les 2 semaines. Contactez votre vétérinaire pour planifier l'intervention.
                </p>
                <Button variant="link" size="sm" className="mt-1 p-0">
                  Voir les détails
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <LineChart className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">
                  Optimisation de l'alimentation
                </h3>
                <p className="text-sm text-muted-foreground">
                  L'analyse de vos données suggère qu'une modification du régime alimentaire pour vos génisses pourrait améliorer leur croissance de 10-15%. Un supplément protéique est recommandé.
                </p>
                <Button variant="link" size="sm" className="mt-1 p-0">
                  Voir les recommandations
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Info className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">
                  Suivi particulier recommandé
                </h3>
                <p className="text-sm text-muted-foreground">
                  Deux animaux de votre groupe de porcins (identifiants #P103 et #P107) présentent des signes précoces de trouble digestif. Une surveillance accrue et un traitement préventif sont recommandés.
                </p>
                <Button variant="link" size="sm" className="mt-1 p-0">
                  Plan de traitement
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="outline">
            Afficher toutes les recommandations
          </Button>
        </CardFooter>
      </Card>

      <AddLivestockForm 
        open={isAddLivestockDialogOpen} 
        onOpenChange={setIsAddLivestockDialogOpen}
      />
    </div>
  );
};

export default Livestock;
