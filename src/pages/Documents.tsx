
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ScrollText,
  FileText,
  Upload,
  Download,
  Search,
  ChevronRight,
  BookOpen,
  FileCog,
  FileQuestion,
  Dna,
  Tag,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FileUploader } from "@/components/FileUploader";
import { getDocuments, DocumentItem } from "@/lib/data-service";

const Documents = () => {
  const documents = getDocuments();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploader, setShowUploader] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(documents.flatMap((doc) => doc.tags))
  ).sort();

  const documentTypes = [
    { value: "report", label: "Rapports" },
    { value: "certificate", label: "Certificats" },
    { value: "guide", label: "Guides" },
    { value: "regulation", label: "Réglementations" },
    { value: "other", label: "Autres" },
  ];

  const toggleType = (value: string) => {
    setSelectedTypes((current) =>
      current.includes(value)
        ? current.filter((type) => type !== value)
        : [...current, value]
    );
  };

  const toggleTag = (value: string) => {
    setSelectedTags((current) =>
      current.includes(value)
        ? current.filter((tag) => tag !== value)
        : [...current, value]
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    // Filter by search query
    if (
      searchQuery &&
      !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    // Filter by selected types
    if (selectedTypes.length > 0 && !selectedTypes.includes(doc.type)) {
      return false;
    }

    // Filter by selected tags
    if (
      selectedTags.length > 0 &&
      !doc.tags.some((tag) => selectedTags.includes(tag))
    ) {
      return false;
    }

    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "report":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "certificate":
        return <FileCog className="h-5 w-5 text-green-500" />;
      case "guide":
        return <BookOpen className="h-5 w-5 text-amber-500" />;
      case "regulation":
        return <FileQuestion className="h-5 w-5 text-red-500" />;
      default:
        return <Dna className="h-5 w-5 text-violet-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "report":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Rapport</Badge>;
      case "certificate":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Certificat</Badge>;
      case "guide":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">Guide</Badge>;
      case "regulation":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Réglementation</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ScrollText className="h-6 w-6 text-slate-600" />
            Documents & Rapports
          </h1>
          <p className="text-muted-foreground">
            Gérez vos documents techniques et rapports agricoles
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" onClick={() => setShowUploader(!showUploader)}>
            <Upload className="mr-2 h-4 w-4" />
            {showUploader ? "Annuler" : "Importer"}
          </Button>
          <Button asChild>
            <Link to="/data-center">
              <Search className="mr-2 h-4 w-4" />
              Analyser
            </Link>
          </Button>
        </div>
      </div>

      {showUploader && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Importer des documents</CardTitle>
            <CardDescription>
              Ajoutez vos documents pour les classer automatiquement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader
              maxSizeMB={10}
              allowedTypes={[
                "application/pdf",
                "text/csv",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "image/jpeg",
                "image/png",
              ]}
              multiple={true}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un document..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Types
                {selectedTypes.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {selectedTypes.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Types de documents</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {documentTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.value}
                  checked={selectedTypes.includes(type.value)}
                  onCheckedChange={() => toggleType(type.value)}
                >
                  {type.label}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedTypes.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => setSelectedTypes([])}
                  >
                    Réinitialiser
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Tag className="h-4 w-4" />
                Tags
                {selectedTags.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedTags.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => setSelectedTags([])}
                  >
                    Réinitialiser
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {(selectedTypes.length > 0 || selectedTags.length > 0 || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedTypes([]);
                setSelectedTags([]);
                setSearchQuery("");
              }}
            >
              Réinitialiser tous les filtres
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Vos documents</CardTitle>
            <CardDescription>
              {filteredDocuments.length} document(s) trouvé(s)
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length > 0 ? (
            <div className="divide-y">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded">
                      {getTypeIcon(doc.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{doc.title}</h3>
                        <div className="text-muted-foreground text-sm">
                          {doc.fileSize}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getTypeBadge(doc.type)}
                        <span className="text-sm text-muted-foreground">
                          Ajouté le {doc.uploadDate}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium mb-1">Aucun document trouvé</h3>
              <p className="text-sm text-muted-foreground">
                Aucun document ne correspond à vos critères de recherche.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSelectedTypes([]);
                setSelectedTags([]);
                setSearchQuery("");
              }}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </CardContent>
        {filteredDocuments.length > 0 && (
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline">Charger plus</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Documents;
