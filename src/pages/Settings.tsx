
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Settings, User, CloudIcon, Bot, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom doit contenir au moins 2 caractères.",
    })
    .max(30, {
      message: "Le nom ne doit pas dépasser 30 caractères.",
    }),
  email: z
    .string()
    .email({
      message: "Veuillez saisir une adresse email valide.",
    }),
  farm_name: z.string().optional(),
  bio: z
    .string()
    .max(160, {
      message: "La bio ne doit pas dépasser 160 caractères.",
    })
    .optional(),
  location: z.string().optional(),
});

const notificationsSchema = z.object({
  email_notifications: z.boolean().default(true),
  push_notifications: z.boolean().default(false),
  weather_alerts: z.boolean().default(true),
  financial_updates: z.boolean().default(true),
  ai_recommendations: z.boolean().default(true),
  marketing: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsSchema>;

const SettingsPage = () => {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Amadou Koné",
      email: "amadou.kone@example.com",
      farm_name: "Ferme du Progrès",
      bio: "Agriculteur depuis 15 ans, spécialisé dans les cultures vivrières.",
      location: "Région Centre, Côte d'Ivoire",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      email_notifications: true,
      push_notifications: false,
      weather_alerts: true,
      financial_updates: true,
      ai_recommendations: true,
      marketing: false,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été mises à jour avec succès.",
    });
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast({
      title: "Préférences de notifications mises à jour",
      description: "Vos préférences de notifications ont été enregistrées.",
    });
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-muted-foreground" />
          Paramètres
        </h1>
        <p className="text-muted-foreground">
          Gérez votre profil et vos préférences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="profile" className="flex gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="flex gap-2">
            <Bot className="h-4 w-4" />
            IA & API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles et votre exploitation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="votre@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="farm_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l'exploitation</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nom de votre ferme ou exploitation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Parlez-nous un peu de vous et de votre activité agricole"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Une brève description de votre activité agricole.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localisation</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Région, Pays"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Enregistrer les modifications</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configurez comment et quand vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form
                  onSubmit={notificationsForm.handleSubmit(
                    onNotificationsSubmit
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Canaux de notification</h3>
                    <div className="space-y-3">
                      <FormField
                        control={notificationsForm.control}
                        name="email_notifications"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Notifications par email
                              </FormLabel>
                              <FormDescription>
                                Recevez des notifications via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="push_notifications"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Notifications push
                              </FormLabel>
                              <FormDescription>
                                Recevez des notifications push dans votre navigateur
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Types de notifications</h3>
                    <div className="space-y-3">
                      <FormField
                        control={notificationsForm.control}
                        name="weather_alerts"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Alertes météo
                              </FormLabel>
                              <FormDescription>
                                Soyez averti des changements météorologiques importants
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="financial_updates"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Mises à jour financières
                              </FormLabel>
                              <FormDescription>
                                Nouvelles opportunités de financement et échéances
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="ai_recommendations"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Recommandations IA
                              </FormLabel>
                              <FormDescription>
                                Conseils personnalisés basés sur vos données agricoles
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="marketing"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Marketing
                              </FormLabel>
                              <FormDescription>
                                Recevez des offres et mises à jour sur nos services
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit">Enregistrer les préférences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Configuration IA & API</CardTitle>
              <CardDescription>
                Gérez les paramètres d'intelligence artificielle et les connexions API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paramètres IA</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Modèle d'IA actif
                      </FormLabel>
                      <FormDescription>
                        Mistral AI - Large Language Model
                      </FormDescription>
                    </div>
                    <Badge className="ml-auto">Actif</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Personnalisation IA
                      </FormLabel>
                      <FormDescription>
                        L'IA est personnalisée en fonction de vos données
                      </FormDescription>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Historique des conversations
                      </FormLabel>
                      <FormDescription>
                        Stockez l'historique des conversations avec l'assistant IA
                      </FormDescription>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Intégrations API</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <CloudIcon className="h-5 w-5 text-blue-500" />
                        <FormLabel className="text-base">
                          API Météo
                        </FormLabel>
                      </div>
                      <FormDescription>
                        Connexion aux services météorologiques locaux
                      </FormDescription>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Connecté
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-violet-500" />
                        <FormLabel className="text-base">
                          LangChain
                        </FormLabel>
                      </div>
                      <FormDescription>
                        Framework pour les applications IA avancées
                      </FormDescription>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Connecté
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-red-500" />
                        <FormLabel className="text-base">
                          API Données agricoles
                        </FormLabel>
                      </div>
                      <FormDescription>
                        Base de données nationale des sols et cultures
                      </FormDescription>
                    </div>
                    <Badge className="ml-auto">Non connecté</Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="mr-2">
                  Tester les connexions
                </Button>
                <Button variant="outline">
                  Ajouter une nouvelle API
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
