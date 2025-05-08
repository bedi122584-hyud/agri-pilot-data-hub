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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, Upload, ChevronRight, AlertTriangle, 
  BarChart, Info, Plus, Download, FileText 
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCrops } from "@/lib/data-service";
import { AddCropForm } from "@/components/forms/AddCropForm";

const Crops = () => {
  const crops = getCrops();
  const [isAddCropDialogOpen, setIsAddCropDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Actif</Badge>
        );
      case "planned":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Planifié</Badge>
        );
      case "harvested":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">Récolté</Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getHealthIndicator = (score: number) => {
    let color = "text-gray-400 bg-gray-100 dark:bg-gray-800";
    if (score === 0) return <div className={`w-2 h-2 rounded-full ${color}`} />;
    
    if (score > 80) {
      color = "text-green-500 bg-green-100 dark:bg-green-900";
    } else if (score > 60) {
      color = "text-yellow-500 bg-yellow-100 dark:bg-yellow-900";
    } else {
      color = "text-red-500 bg-red-100 dark:bg-red-900";
    }
    
    return (
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm">{score}%</span>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Gestion des cultures
          </h1>
          <p className="text-muted-foreground">
            Suivez et optimisez vos parcelles et productions végétales
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" asChild>
            <Link to="/data-center">
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Link>
          </Button>
          <Button onClick={() => setIsAddCropDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une culture
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total cultures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{crops.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {crops.filter(c => c.status === "active").length} cultures actives
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Surface totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {crops.reduce((sum, crop) => sum + crop.area, 0).toFixed(1)} ha
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Répartie sur {crops.reduce((sum, crop) => sum + crop.parcels, 0)} parcelles
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Santé moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">
                {Math.round(
                  crops
                    .filter(c => c.status === "active")
                    .reduce((sum, crop) => sum + crop.healthScore, 0) / 
                  crops.filter(c => c.status === "active").length
                )}%
              </div>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <Progress 
              value={
                crops
                  .filter(c => c.status === "active")
                  .reduce((sum, crop) => sum + crop.healthScore, 0) / 
                crops.filter(c => c.status === "active").length
              } 
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Vos cultures</CardTitle>
            <CardDescription>Gérez toutes vos cultures et parcelles</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <FileText className="mr-2 h-4 w-4" />
              Rapport
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Culture</TableHead>
                <TableHead>Parcelles</TableHead>
                <TableHead>Surface (ha)</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Rdt. estimé (t/ha)</TableHead>
                <TableHead>Santé</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell>{crop.parcels}</TableCell>
                  <TableCell>{crop.area.toFixed(1)}</TableCell>
                  <TableCell>{getStatusBadge(crop.status)}</TableCell>
                  <TableCell>{crop.yieldEstimate.toFixed(1)}</TableCell>
                  <TableCell>{getHealthIndicator(crop.healthScore)}</TableCell>
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

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Recommandations IA
            </CardTitle>
            <CardDescription>
              Suggestions basées sur l'analyse de vos données
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Alerte risque de sécheresse</h3>
                  <p className="text-sm text-muted-foreground">
                    Basé sur les prévisions météo, un risque de sécheresse est prévu pour les 2 prochaines semaines. Envisagez un plan d'irrigation supplémentaire pour vos parcelles de maïs.
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
                  <Leaf className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Opportunité de rotation des cultures</h3>
                  <p className="text-sm text-muted-foreground">
                    Pour la parcelle B2, après la récolte du manioc, une rotation avec des légumineuses (niébé ou arachide) pourrait améliorer la fertilité du sol pour la saison prochaine.
                  </p>
                  <Button variant="link" size="sm" className="mt-1 p-0">
                    Explorer les options
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <BarChart className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Analyse de rendement</h3>
                  <p className="text-sm text-muted-foreground">
                    D'après l'analyse de vos données, votre production de maïs pourrait être augmentée de 15% avec un ajustement de la densité de semis et une application fractionnée d'engrais.
                  </p>
                  <Button variant="link" size="sm" className="mt-1 p-0">
                    Voir l'analyse complète
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline">Afficher toutes les recommandations</Button>
          </CardFooter>
        </Card>
      </div>

      <AddCropForm 
        open={isAddCropDialogOpen} 
        onOpenChange={setIsAddCropDialogOpen}
      />
    </div>
  );
};

export default Crops;
