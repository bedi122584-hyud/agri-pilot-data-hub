
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  HelpCircle,
  Send,
  MessageSquare,
  LineChart,
  AlertTriangle,
  Bot,
  Clock,
  Calendar,
  Thermometer,
  Droplets,
  CloudRain,
  Leaf,
  Tractor,
  Upload,
  ArrowRight,
  Info,
  Search,
  FileText,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
  timestamp: Date;
}

const DecisionSupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Bonjour, je suis votre assistant agricole IA. Comment puis-je vous aider aujourd'hui? Vous pouvez me poser des questions sur vos cultures, votre élevage, ou demander des conseils basés sur vos données.",
      type: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      type: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simuler une réponse après un délai (dans un projet réel, cela serait une requête API)
    setTimeout(() => {
      let botResponse: Message;

      // Générer une réponse basée sur le contenu du message
      if (inputMessage.toLowerCase().includes("météo")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "D'après les prévisions météorologiques pour votre région, les 7 prochains jours seront chauds et secs avec des températures entre 28°C et 32°C. Il y a un risque de sécheresse à surveiller. Je recommande d'augmenter l'irrigation de vos cultures, particulièrement pour les parcelles de maïs qui sont en phase critique de développement.",
          type: "assistant",
          timestamp: new Date(),
        };
      } else if (
        inputMessage.toLowerCase().includes("culture") ||
        inputMessage.toLowerCase().includes("maïs") ||
        inputMessage.toLowerCase().includes("manioc")
      ) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "Basé sur l'analyse de vos données de sol et historique cultural, je recommande pour votre culture de maïs un apport d'azote supplémentaire dans les 10 prochains jours. Le taux d'humidité du sol est optimal actuellement, mais surveillez la parcelle B2 qui montre des signes de stress hydrique potentiel.",
          type: "assistant",
          timestamp: new Date(),
        };
      } else if (
        inputMessage.toLowerCase().includes("animal") ||
        inputMessage.toLowerCase().includes("vache") ||
        inputMessage.toLowerCase().includes("élevage")
      ) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "Pour votre élevage bovin, l'analyse de vos données indique un bon état de santé général. Cependant, je note que la production laitière a légèrement diminué ces deux dernières semaines. Cela pourrait être lié à la qualité du fourrage ou à la chaleur. Je recommande de vérifier la qualité nutritionnelle de l'alimentation et d'assurer un accès permanent à de l'eau fraîche.",
          type: "assistant",
          timestamp: new Date(),
        };
      } else if (
        inputMessage.toLowerCase().includes("finance") ||
        inputMessage.toLowerCase().includes("subvention") ||
        inputMessage.toLowerCase().includes("aide")
      ) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "J'ai identifié 2 programmes de subventions auxquels vous êtes potentiellement éligible: le Programme National d'Aide aux Agriculteurs (date limite: 30 juin) et le Financement pour Équipement Agricole de la Banque Agricole. D'après vos données, votre taux d'éligibilité est de 85% pour le premier et 70% pour le second. Souhaitez-vous que je vous aide à préparer un dossier de demande?",
          type: "assistant",
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "Merci pour votre question. D'après l'analyse de vos documents et données agricoles, je peux vous suggérer plusieurs pistes d'optimisation. Souhaitez-vous des informations spécifiques sur vos cultures, votre élevage, ou les opportunités de financement disponibles?",
          type: "assistant",
          timestamp: new Date(),
        };
      }

      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const weatherData = [
    {
      day: "Aujourd'hui",
      icon: <CloudRain className="h-6 w-6 text-blue-500" />,
      temp: "28°C",
      precip: "60%",
    },
    {
      day: "Demain",
      icon: <CloudRain className="h-6 w-6 text-blue-500" />,
      temp: "27°C",
      precip: "70%",
    },
    {
      day: "Mercredi",
      icon: <Thermometer className="h-6 w-6 text-amber-500" />,
      temp: "30°C",
      precip: "10%",
    },
    {
      day: "Jeudi",
      icon: <Thermometer className="h-6 w-6 text-amber-500" />,
      temp: "31°C",
      precip: "5%",
    },
    {
      day: "Vendredi",
      icon: <Thermometer className="h-6 w-6 text-red-500" />,
      temp: "32°C",
      precip: "0%",
    },
  ];

  const suggestions = [
    {
      title: "Alertes sécheresse",
      description:
        "Plan d'action recommandé pour faire face au risque de sécheresse prévu",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      category: "météo",
    },
    {
      title: "Optimisation d'irrigation",
      description:
        "Réduisez votre consommation d'eau de 20% avec ces techniques d'irrigation",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      category: "culture",
    },
    {
      title: "Alerte sanitaire bovins",
      description:
        "Vigilance parasites suite aux fortes pluies récentes",
      icon: <Tractor className="h-5 w-5 text-amber-500" />,
      category: "élevage",
    },
    {
      title: "Nouvelles subventions",
      description:
        "2 nouvelles opportunités de financement détectées",
      icon: <FileText className="h-5 w-5 text-violet-500" />,
      category: "finance",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            Aide à la décision
          </h1>
          <p className="text-muted-foreground">
            Obtenez des conseils personnalisés basés sur vos données
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" asChild>
            <Link to="/data-center">
              <Upload className="mr-2 h-4 w-4" />
              Importer des données
            </Link>
          </Button>
          <Button onClick={() => setShowSuggestionDialog(true)}>
            <Search className="mr-2 h-4 w-4" />
            Rechercher
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="chat" className="flex gap-2">
                <MessageSquare className="h-4 w-4" />
                Assistant IA
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex gap-2">
                <LineChart className="h-4 w-4" />
                Prévisions & Analyses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Assistant agricole IA
                  </CardTitle>
                  <CardDescription>
                    Posez des questions sur vos cultures, votre élevage ou
                    demandez des conseils
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg border mb-4">
                    <ScrollArea className="h-[400px] p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.type === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.type === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div
                                className={`text-xs mt-1 ${
                                  message.type === "user"
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <p className="text-sm">L'IA réfléchit...</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Posez votre question..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="resize-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Envoyer</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudRain className="h-5 w-5 text-blue-500" />
                    Prévisions météorologiques
                  </CardTitle>
                  <CardDescription>
                    Données météo et impact sur vos cultures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {weatherData.map((day, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center p-3 border rounded-lg"
                      >
                        <div className="text-sm font-medium">{day.day}</div>
                        <div className="my-2">{day.icon}</div>
                        <div className="text-lg font-bold">{day.temp}</div>
                        <div className="text-xs text-muted-foreground">
                          Précip: {day.precip}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <div className="flex gap-2 items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">
                          Alerte risque de sécheresse
                        </h4>
                        <p className="text-sm mt-1 text-muted-foreground">
                          Un risque de sécheresse est prévu à partir de jeudi. Préparez votre plan d'irrigation pour les parcelles de maïs qui sont particulièrement sensibles à ce stade.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Calendrier agricole
                  </CardTitle>
                  <CardDescription>
                    Planification optimale basée sur vos données
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Semis du maïs</h3>
                        <p className="text-sm text-muted-foreground">
                          Période optimale: 15-30 mai. Avec les prévisions météorologiques actuelles, planifiez vos semis pour la semaine prochaine pour maximiser le rendement.
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>10-17 mai recommandé</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <Tractor className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Vaccination bovins
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Vaccination contre la fièvre aphteuse à planifier avant le 20 mai pour votre troupeau.
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Avant le 20 mai</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <FileText className="h-5 w-5 text-violet-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Échéance subvention
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          La date limite pour soumettre votre dossier de demande de subvention PNAA est le 30 juin.
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Échéance: 30 juin</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button variant="outline">
                    Voir le calendrier complet
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Suggestions IA
              </CardTitle>
              <CardDescription>
                Basées sur vos données récentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setInputMessage(suggestion.title);
                    setActiveTab("chat");
                  }}
                >
                  <div className="flex items-start gap-2">
                    <div>{suggestion.icon}</div>
                    <div>
                      <h3 className="font-medium text-sm">{suggestion.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {suggestion.description}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {suggestion.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => setShowSuggestionDialog(true)}>
                Toutes les suggestions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={showSuggestionDialog} onOpenChange={setShowSuggestionDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Suggestions & Recherche</DialogTitle>
            <DialogDescription>
              Explorez toutes les suggestions de l'IA ou recherchez des
              informations spécifiques dans vos données.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/30 p-4 rounded-lg border mb-4">
            <div className="flex mb-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher dans vos données..."
                  className="w-full rounded-md border bg-background pl-8 py-2 text-sm"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[...suggestions, ...suggestions].map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div>{suggestion.icon}</div>
                    <div>
                      <h3 className="font-medium text-sm">{suggestion.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {suggestion.description}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {suggestion.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuggestionDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DecisionSupport;
