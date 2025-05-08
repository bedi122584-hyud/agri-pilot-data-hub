
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  AlertCircle, Upload, FileText, Leaf, Tractor, 
  HelpCircle, FileSpreadsheet, ScrollText, Info 
} from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { FileAnalysis } from "@/components/FileAnalysis";
import { FileUploadResult, AnalysisResult } from "@/lib/file-service";
import { toast } from "@/hooks/use-toast";

const DataCenter = () => {
  const [uploadedFile, setUploadedFile] = useState<FileUploadResult | null>(null);
  const navigate = useNavigate();

  const handleFileUploaded = (fileResult: FileUploadResult) => {
    setUploadedFile(fileResult);
  };

  const handleFileProceed = (file: FileUploadResult, analysis: AnalysisResult) => {
    // Déterminer vers quelle page rediriger en fonction du type de module détecté
    let route = "/";
    switch (analysis.moduleType) {
      case "crops":
        route = "/crops";
        break;
      case "livestock":
        route = "/livestock";
        break;
      case "decision":
        route = "/decision-support";
        break;
      case "financing":
        route = "/financing";
        break;
      case "documents":
        route = "/documents";
        break;
    }

    // Afficher un toast de confirmation
    toast({
      title: "Document intégré avec succès",
      description: `"${file.name}" a été intégré au module ${getModuleName(analysis.moduleType)}.`,
    });

    // Rediriger vers la page du module correspondant
    navigate(route);
  };

  const getModuleIcon = (moduleType: string) => {
    switch (moduleType) {
      case "crops":
        return <Leaf className="h-5 w-5" />;
      case "livestock":
        return <Tractor className="h-5 w-5" />;
      case "decision":
        return <HelpCircle className="h-5 w-5" />;
      case "financing":
        return <FileSpreadsheet className="h-5 w-5" />;
      case "documents":
        return <ScrollText className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getModuleName = (moduleType: string) => {
    switch (moduleType) {
      case "crops":
        return "Cultures";
      case "livestock":
        return "Élevage";
      case "decision":
        return "Aide à la décision";
      case "financing":
        return "Financement";
      case "documents":
        return "Documents";
      default:
        return "Non classifié";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Centre de données</h1>
        <p className="text-muted-foreground">
          Importez et analysez vos documents agricoles avec notre IA
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Importer des fichiers
              </CardTitle>
              <CardDescription>
                Ajoutez vos documents pour analyse IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader
                onFileAnalyzed={handleFileUploaded}
                maxSizeMB={10}
                allowedTypes={[
                  "application/pdf",
                  "text/csv",
                  "application/vnd.ms-excel",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  "image/jpeg",
                  "image/png",
                ]}
              />

              <div className="mt-6">
                <Separator className="mb-4" />
                <h3 className="text-sm font-medium mb-3">Types de fichiers acceptés</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-red-100 dark:bg-red-900 p-1 rounded">
                      <FileText className="h-4 w-4 text-red-600 dark:text-red-300" />
                    </div>
                    <span>PDF (.pdf)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-green-100 dark:bg-green-900 p-1 rounded">
                      <FileText className="h-4 w-4 text-green-600 dark:text-green-300" />
                    </div>
                    <span>CSV (.csv)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <span>Excel (.xlsx)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-amber-100 dark:bg-amber-900 p-1 rounded">
                      <FileText className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                    </div>
                    <span>Images (.jpg, .png)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {!uploadedFile ? (
            <Card className="h-full flex flex-col justify-center">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">Aucun fichier sélectionné</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Importez un fichier pour commencer l'analyse. Notre IA va
                    analyser le contenu et suggérer le module le plus approprié.
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Astuce</AlertTitle>
                    <AlertDescription>
                      Les documents PDF et tableurs Excel sont analysés avec plus de
                      précision par notre IA pour vous fournir des recommandations
                      personnalisées et détaillées.
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4 sm:grid-cols-2 mt-6">
                    <Card className="bg-muted/50">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span>Optimisation des cultures</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-muted-foreground">
                          Importez des données sur vos parcelles, sols ou historique cultural pour des recommandations personnalisées.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/50">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Tractor className="h-4 w-4 text-amber-600" />
                          <span>Élevage de précision</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-muted-foreground">
                          Suivez votre cheptel avec des données sanitaires et des recommandations vétérinaires automatisées.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/50">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-violet-600" />
                          <span>Financement & subventions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-muted-foreground">
                          Identifiez rapidement les opportunités de financement adaptées à votre exploitation.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/50">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <ScrollText className="h-4 w-4 text-slate-600" />
                          <span>Simplification administrative</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-muted-foreground">
                          Archivez et organisez automatiquement vos documents administratifs et techniques.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <FileAnalysis file={uploadedFile} onProceed={handleFileProceed} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DataCenter;
