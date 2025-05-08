
import React, { useState, useRef } from "react";
import { 
  Upload, CheckCircle2, FileText, FileSpreadsheet, 
  FileImage, File, AlertTriangle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { analyzeFile, FileType, FileUploadResult } from "@/lib/file-service";

interface FileUploaderProps {
  onFileAnalyzed?: (fileResult: FileUploadResult) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
  multiple?: boolean;
}

export function FileUploader({
  onFileAnalyzed,
  maxSizeMB = 10,
  allowedTypes = ["application/pdf", "text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "image/jpeg", "image/png"],
  multiple = false
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'csv':
      case 'excel':
        return <FileSpreadsheet className="h-6 w-6 text-green-600" />;
      case 'image':
        return <FileImage className="h-6 w-6 text-blue-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = multiple ? e.dataTransfer.files : [e.dataTransfer.files[0]];
      await processFiles(files);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = multiple ? e.target.files : [e.target.files[0]];
      await processFiles(files);
    }
  };

  const processFiles = async (files: FileList | File[]) => {
    let validFiles: File[] = [];
    let errors: string[] = [];

    // Validate files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`Le fichier "${file.name}" dépasse la taille maximale de ${maxSizeMB}MB.`);
        continue;
      }

      // Check file type
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        errors.push(`Le type de fichier "${file.name}" n'est pas pris en charge.`);
        continue;
      }

      validFiles.push(file);
    }

    // Show errors if any
    if (errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Erreur lors du téléchargement",
        description: (
          <div className="mt-2 max-h-40 overflow-y-auto">
            <ul className="list-disc pl-4 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ),
      });
    }

    // Process valid files
    if (validFiles.length > 0) {
      setIsUploading(true);
      setProgress(0);

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 10;
            if (next >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return next;
          });
        }, 300);

        // Process each file
        for (const file of validFiles) {
          const result = await analyzeFile(file);
          
          if (onFileAnalyzed) {
            onFileAnalyzed(result);
          }
        }

        setProgress(100);
        
        // Show success toast - fixed by removing icon property
        toast({
          title: "Fichiers téléchargés avec succès",
          description: `${validFiles.length} fichier(s) analysé(s) et prêt(s) à être utilisé(s).`
        });

        // Reset progress after a delay
        setTimeout(() => {
          setProgress(0);
          setIsUploading(false);
        }, 1000);

      } catch (error) {
        console.error("File upload error:", error);
        setIsUploading(false);
        
        // Fixed by removing icon property
        toast({
          variant: "destructive",
          title: "Erreur lors de l'analyse",
          description: "Une erreur est survenue pendant l'analyse des fichiers. Veuillez réessayer."
        });
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <div
        className={`file-drop-zone ${isDragging ? "active" : ""} ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="bg-primary/10 p-3 rounded-full">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium">
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyse en cours...
              </span>
            ) : (
              "Déposez vos fichiers ici"
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            ou cliquez pour sélectionner des fichiers
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            PDF, CSV, Excel, images ({maxSizeMB}MB max)
          </p>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          accept={allowedTypes.join(",")}
          multiple={multiple}
          disabled={isUploading}
        />
      </div>

      {progress > 0 && (
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress === 100 ? "Terminé" : "Analyse en cours..."}</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
}
