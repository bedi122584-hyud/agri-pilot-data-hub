
export interface DashboardStats {
  totalFiles: number;
  analyzedDocuments: number;
  pendingTasks: number;
  modules: {
    crops: number;
    livestock: number;
    financing: number;
    decisions: number;
    documents: number;
  };
}

export interface RecentActivity {
  id: string;
  type: 'upload' | 'analysis' | 'recommendation' | 'task';
  title: string;
  description: string;
  timestamp: string;
  module?: string;
}

export interface CropData {
  id: string;
  name: string;
  parcels: number;
  area: number;
  status: 'active' | 'planned' | 'harvested';
  yieldEstimate: number;
  healthScore: number;
}

export interface LivestockGroup {
  id: string;
  type: string;
  count: number;
  healthStatus: 'good' | 'average' | 'needs_attention';
  nextAction?: {
    type: string;
    date: string;
  };
}

export interface FinancingOpportunity {
  id: string;
  title: string;
  provider: string;
  amount: string;
  eligibility: number;
  deadline: string;
  status: 'open' | 'applied' | 'received' | 'closed';
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'report' | 'certificate' | 'guide' | 'regulation' | 'other';
  uploadDate: string;
  fileSize: string;
  tags: string[];
}

// Mock dashboard stats
export const getDashboardStats = (): DashboardStats => {
  return {
    totalFiles: 48,
    analyzedDocuments: 37,
    pendingTasks: 5,
    modules: {
      crops: 12,
      livestock: 8,
      financing: 6,
      decisions: 14,
      documents: 8
    }
  };
};

// Mock recent activity
export const getRecentActivity = (): RecentActivity[] => {
  return [
    {
      id: '1',
      type: 'upload',
      title: 'Données de sol parcelle B2',
      description: 'Analyse de sol complète avec recommandations',
      timestamp: '2025-05-07T08:30:00Z',
      module: 'crops'
    },
    {
      id: '2',
      type: 'analysis',
      title: 'Registre de vaccination bovins',
      description: 'Analyse de l\'historique vaccinal pour 24 bovins',
      timestamp: '2025-05-06T16:45:00Z',
      module: 'livestock'
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Alerte météorologique',
      description: 'Risque de sécheresse prévu pour la semaine prochaine',
      timestamp: '2025-05-06T10:15:00Z',
      module: 'decisions'
    },
    {
      id: '4',
      type: 'task',
      title: 'Dossier de subvention',
      description: 'Formulaire principal complété à 70%',
      timestamp: '2025-05-05T14:20:00Z',
      module: 'financing'
    },
    {
      id: '5',
      type: 'upload',
      title: 'Guide technique agroforesterie',
      description: 'Manuel de bonnes pratiques 2025',
      timestamp: '2025-05-04T11:30:00Z',
      module: 'documents'
    }
  ];
};

// Mock crop data
export const getCrops = (): CropData[] => {
  return [
    {
      id: '1',
      name: 'Maïs',
      parcels: 3,
      area: 5.2,
      status: 'active',
      yieldEstimate: 6.7,
      healthScore: 85
    },
    {
      id: '2',
      name: 'Manioc',
      parcels: 2,
      area: 3.8,
      status: 'active',
      yieldEstimate: 28.4,
      healthScore: 90
    },
    {
      id: '3',
      name: 'Cacao',
      parcels: 1,
      area: 2.5,
      status: 'active',
      yieldEstimate: 0.8,
      healthScore: 75
    },
    {
      id: '4',
      name: 'Riz',
      parcels: 2,
      area: 4.0,
      status: 'planned',
      yieldEstimate: 4.2,
      healthScore: 0
    },
    {
      id: '5',
      name: 'Arachide',
      parcels: 1,
      area: 1.5,
      status: 'harvested',
      yieldEstimate: 1.8,
      healthScore: 100
    }
  ];
};

// Mock livestock data
export const getLivestock = (): LivestockGroup[] => {
  return [
    {
      id: '1',
      type: 'Bovins',
      count: 24,
      healthStatus: 'good',
      nextAction: {
        type: 'Vaccination',
        date: '2025-05-20'
      }
    },
    {
      id: '2',
      type: 'Volailles',
      count: 150,
      healthStatus: 'average',
      nextAction: {
        type: 'Traitement préventif',
        date: '2025-05-15'
      }
    },
    {
      id: '3',
      type: 'Caprins',
      count: 18,
      healthStatus: 'good'
    },
    {
      id: '4',
      type: 'Porcins',
      count: 12,
      healthStatus: 'needs_attention',
      nextAction: {
        type: 'Visite vétérinaire',
        date: '2025-05-10'
      }
    }
  ];
};

// Mock financing data
export const getFinancingOpportunities = (): FinancingOpportunity[] => {
  return [
    {
      id: '1',
      title: 'Programme National d\'Aide aux Agriculteurs',
      provider: 'Ministère de l\'Agriculture',
      amount: '2.500.000 FCFA',
      eligibility: 85,
      deadline: '2025-06-30',
      status: 'open'
    },
    {
      id: '2',
      title: 'Financement Équipement Agricole',
      provider: 'Banque Agricole',
      amount: '5.000.000 FCFA',
      eligibility: 70,
      deadline: '2025-07-15',
      status: 'open'
    },
    {
      id: '3',
      title: 'Subvention Irrigation Durable',
      provider: 'Agence de l\'Eau',
      amount: '1.750.000 FCFA',
      eligibility: 90,
      deadline: '2025-05-30',
      status: 'applied'
    },
    {
      id: '4',
      title: 'Aide à la Transition Bio',
      provider: 'Fonds Vert Agricole',
      amount: '950.000 FCFA',
      eligibility: 60,
      deadline: '2025-09-01',
      status: 'open'
    },
    {
      id: '5',
      title: 'Crédit de Campagne 2025',
      provider: 'Coopérative Agricole',
      amount: '1.200.000 FCFA',
      eligibility: 100,
      deadline: '2025-04-30',
      status: 'received'
    }
  ];
};

// Mock documents
export const getDocuments = (): DocumentItem[] => {
  return [
    {
      id: '1',
      title: 'Guide des bonnes pratiques agricoles 2025',
      type: 'guide',
      uploadDate: '2025-05-02',
      fileSize: '3.2 MB',
      tags: ['agriculture', 'guide', 'pratiques']
    },
    {
      id: '2',
      title: 'Certificat Bio - Maïs',
      type: 'certificate',
      uploadDate: '2025-04-15',
      fileSize: '1.1 MB',
      tags: ['bio', 'certification', 'maïs']
    },
    {
      id: '3',
      title: 'Rapport annuel d\'exploitation 2024',
      type: 'report',
      uploadDate: '2025-01-20',
      fileSize: '4.5 MB',
      tags: ['rapport', 'annuel', 'financier']
    },
    {
      id: '4',
      title: 'Réglementation sur l\'usage des pesticides',
      type: 'regulation',
      uploadDate: '2025-03-10',
      fileSize: '2.8 MB',
      tags: ['pesticides', 'règlementation', 'normes']
    },
    {
      id: '5',
      title: 'Fiche technique - Culture du manioc',
      type: 'guide',
      uploadDate: '2025-02-18',
      fileSize: '1.7 MB',
      tags: ['manioc', 'culture', 'technique']
    },
    {
      id: '6',
      title: 'Contrat de vente - Coopérative',
      type: 'other',
      uploadDate: '2025-04-22',
      fileSize: '0.8 MB',
      tags: ['contrat', 'vente', 'coopérative']
    }
  ];
};
