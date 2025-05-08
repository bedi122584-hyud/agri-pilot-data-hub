
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, FileSpreadsheet, FileImage, File, ChevronRight, 
  Loader2, CheckCircle, AlertCircle, Tag, List, Lightbulb
} from "lucide-react";
import { getFileAnalysis, FileUploadResult, AnalysisResult, getFileSizeString } from "@/lib/file-service";
import { useToast } from "@/hooks/use-toast";

interface FileAnalysisProps {
  file: FileUploadResult;
  onProceed?: (file: FileUploadResult, analysis: AnalysisResult) => void;
}

export function FileAnalysis({ file, onProceed }: FileAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const { toast } = useToast();

  useEffect(() => {
    const analyzeFile = async () => {
      setIsAnalyzing(true);
      try {
        const result = await getFileAnalysis(file.id);
        setAnalysis(result);
      } catch (error) {
        console.error("Analysis error:", error);
        toast({
          variant: "destructive",
          title: "Erreur d'analyse",
          description: "Impossible d'analyser ce fichier. Veuillez réessayer.",
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeFile();
  }, [file.id, toast]);

  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'csv':
      case 'excel':
        return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
      case 'image':
        return <FileImage className="h-8 w-8 text-blue-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getModuleColor = (moduleType: string) => {
    switch (moduleType) {
      case 'crops':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case 'livestock':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
      case 'decision':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case 'financing':
        return "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100";
      case 'documents':
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getModuleName = (moduleType: string) => {
    switch (moduleType) {
      case 'crops':
        return "Cultures";
      case 'livestock':
        return "Élevage";
      case 'decision':
        return "Aide à la décision";
      case 'financing':
        return "Financement";
      case 'documents':
        return "Documents";
      default:
        return "Non classifié";
    }
  };

  const handleProceed = () => {
    if (analysis && onProceed) {
      onProceed(file, analysis);
    }
  };

  return (
    <Card className="w-full shadow-lg border-t-4 border-t-primary">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-muted rounded-lg p-3 flex-shrink-0">
            {getFileIcon()}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium truncate max-w-xs sm:max-w-sm" title={file.name}>
                {file.name}
              </h3>
              <Badge variant="outline">{getFileSizeString(file.size)}</Badge>
            </div>
            
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              {isAnalyzing ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Analyse en cours...
                </span>
              ) : analysis ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  <span>Analyse complétée</span>
                  <span className="px-2">•</span>
                  <Badge className={getModuleColor(analysis.moduleType)}>
                    {getModuleName(analysis.moduleType)}
                  </Badge>
                </>
              ) : (
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                  Analyse indisponible
                </span>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {isAnalyzing ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <div className="mt-6">
              <Skeleton className="h-4 w-1/2" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          </div>
        ) : analysis ? (
          <>
            <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="summary">Résumé</TabsTrigger>
                <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
                <TabsTrigger value="entities">Entités détectées</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <List className="h-4 w-4" />
                    <span>Résumé du document</span>
                  </div>
                  <p className="text-base">{analysis.summary}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Confiance de l'analyse : </span>
                    <span className="font-medium">{Math.round(analysis.confidence * 100)}%</span>
                  </div>
                  <Button onClick={handleProceed} className="gap-1">
                    Intégrer au module
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Lightbulb className="h-4 w-4" />
                    <span>Recommandations basées sur l'analyse</span>
                  </div>
                  
                  <ul className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li 
                        key={index} 
                        className="bg-muted/50 p-3 rounded-md flex gap-3 items-start"
                      >
                        <div className="bg-background rounded-full p-1 shadow-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleProceed} className="gap-1">
                      Intégrer au module
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="entities">
                <div>
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>Entités détectées dans le document</span>
                  </div>
                  
                  <div className="mt-3 space-y-4">
                    {Object.entries(analysis.entities).map(([key, values]) => (
                      <div key={key}>
                        <h4 className="text-sm font-medium capitalize mb-1">
                          {key}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(values) ? (
                            values.map((value, i) => (
                              <Badge key={i} variant="secondary">
                                {value}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary">{String(values)}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleProceed} className="gap-1">
                      Intégrer au module
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-4">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-3" />
            <h3 className="font-medium mb-1">Analyse impossible</h3>
            <p className="text-sm text-muted-foreground">
              Impossible d'analyser ce fichier. Veuillez vérifier le format et réessayer.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
