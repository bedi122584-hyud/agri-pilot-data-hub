
export type FileType = 'csv' | 'excel' | 'pdf' | 'image' | 'other';

export interface FileUploadResult {
  id: string;
  name: string;
  size: number;
  type: FileType;
  lastModified: number;
  url: string;
  detectedModule: string;
}

export interface AnalysisResult {
  moduleType: 'crops' | 'livestock' | 'decision' | 'financing' | 'documents';
  confidence: number;
  summary: string;
  recommendations: string[];
  entities: Record<string, any>;
}

export const analyzeFile = async (file: File): Promise<FileUploadResult> => {
  // Dans une implémentation réelle, cette fonction enverrait le fichier à un backend
  // pour analyse IA. Ici, nous simulons le résultat.
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Déterminer le type de fichier
      let fileType: FileType = 'other';
      if (file.name.endsWith('.csv')) fileType = 'csv';
      else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) fileType = 'excel';
      else if (file.name.endsWith('.pdf')) fileType = 'pdf';
      else if (file.name.match(/\.(jpe?g|png|gif|bmp)$/i)) fileType = 'image';

      // Simuler une détection du module basée sur le nom du fichier
      let detectedModule = 'documents';
      if (file.name.match(/cult|plante|semis|sol|parcel|ferti/i)) {
        detectedModule = 'crops';
      } else if (file.name.match(/animal|vache|bovin|poule|vaccination|élevage/i)) {
        detectedModule = 'livestock';
      } else if (file.name.match(/finance|aide|subvention|credit|budget/i)) {
        detectedModule = 'financing';
      } else if (file.name.match(/decision|analyse|rapport|conseils/i)) {
        detectedModule = 'decision-support';
      }

      resolve({
        id: Math.random().toString(36).substring(2, 15),
        name: file.name,
        size: file.size,
        type: fileType,
        lastModified: file.lastModified,
        url: URL.createObjectURL(file),
        detectedModule
      });
    }, 1500);
  });
};

export const getFileAnalysis = async (fileId: string): Promise<AnalysisResult> => {
  // Simuler une analyse IA
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAnalyses: Record<string, AnalysisResult> = {
        crops: {
          moduleType: 'crops',
          confidence: 0.92,
          summary: "Ce document contient des informations sur les cultures de maïs avec un historique de rendement sur 3 ans et des données sur la qualité du sol.",
          recommendations: [
            "Rotation avec une légumineuse recommandée pour la prochaine saison",
            "Ajustement du pH du sol nécessaire dans la parcelle B3",
            "Augmentation de l'irrigation recommandée de 15%"
          ],
          entities: {
            cultures: ["Maïs", "Manioc"],
            parcelles: ["A2", "B3", "C1"],
            saisons: ["2023", "2024"]
          }
        },
        livestock: {
          moduleType: 'livestock',
          confidence: 0.88,
          summary: "Registre de suivi pour 24 bovins avec historique médical et données de production laitière.",
          recommendations: [
            "Vaccination contre la fièvre aphteuse recommandée dans les 2 semaines",
            "Modification du régime alimentaire pour les génisses",
            "Suivi particulier pour les animaux 103 et 107"
          ],
          entities: {
            especes: ["Bovins"],
            nombre: 24,
            maladies: ["Mammite", "Parasitose"]
          }
        },
        financing: {
          moduleType: 'financing',
          confidence: 0.85,
          summary: "Documents sur le Programme National d'Aide aux Agriculteurs avec critères d'éligibilité et formulaires.",
          recommendations: [
            "Votre exploitation est éligible à l'aide A3 avec un potentiel de financement de 2.5M FCFA",
            "Préparez les documents administratifs nécessaires avant le 30 juin",
            "Un cofinancement à 20% est nécessaire"
          ],
          entities: {
            programmes: ["PNAA", "Fonds Agricole 2025"],
            montants: ["2.5M FCFA", "750K FCFA"],
            echeances: ["30/06/2025"]
          }
        },
        "decision-support": {
          moduleType: 'decision',
          confidence: 0.90,
          summary: "Rapport d'analyse agronomique avec données climatiques et prévisions de rendement pour la région Centre.",
          recommendations: [
            "Anticiper une saison des pluies précoce cette année (début mi-mai)",
            "Privilégier les variétés à cycle court pour cette saison",
            "Préparer un plan de drainage pour les parcelles en zone basse"
          ],
          entities: {
            facteurs: ["Pluviométrie", "Température", "Humidité"],
            previsions: ["Pluies précoces", "Température +2°C"],
            zones: ["Centre", "Sud-Est"]
          }
        },
        documents: {
          moduleType: 'documents',
          confidence: 0.75,
          summary: "Document technique sur les pratiques agricoles durables avec focus sur l'agroforesterie.",
          recommendations: [
            "Application possible des techniques d'agroforesterie sur vos parcelles A1 et B2",
            "Formation disponible au centre agricole régional en juillet",
            "Possibilité de certification bio dans un délai de 2 ans"
          ],
          entities: {
            themes: ["Agroforesterie", "Agriculture durable"],
            techniques: ["Cultures associées", "Couvert végétal"],
            certifications: ["Bio", "Rainforest"]
          }
        }
      };

      // Choisir aléatoirement une analyse parmi nos mocks
      const moduleTypes = ['crops', 'livestock', 'financing', 'decision-support', 'documents'];
      const selectedType = moduleTypes[Math.floor(Math.random() * moduleTypes.length)];
      
      resolve(mockAnalyses[selectedType]);
    }, 2000);
  });
};

export const getFileSizeString = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + ' B';
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(1) + ' KB';
  } else {
    return (sizeInBytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
};
