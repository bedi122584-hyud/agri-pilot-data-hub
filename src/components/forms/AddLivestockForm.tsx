
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  type: z.string().min(2, { message: "Le type doit contenir au moins 2 caractères" }),
  count: z.coerce.number().positive({ message: "Le nombre d'animaux doit être positif" }),
  healthStatus: z.enum(["good", "average", "needs_attention"], { 
    required_error: "Veuillez sélectionner un état de santé" 
  }),
  nextActionType: z.string().optional(),
  nextActionDate: z.string().optional()
});

type AddLivestockFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function AddLivestockForm({ open, onOpenChange, onSuccess }: AddLivestockFormProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      count: 1,
      healthStatus: "good",
      nextActionType: "",
      nextActionDate: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically save the data to your backend
    console.log(values);
    
    toast({
      title: "Groupe d'animaux ajouté",
      description: `Le groupe de ${values.type} a été ajouté avec succès.`,
    });
    
    form.reset();
    onOpenChange(false);
    if (onSuccess) onSuccess();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un groupe d'animaux</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'animal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Bovins, Ovins, Volailles..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre d'animaux</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="healthStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>État de santé</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un état de santé" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="good">Bon</SelectItem>
                      <SelectItem value="average">Moyen</SelectItem>
                      <SelectItem value="needs_attention">Attention requise</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nextActionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prochaine action (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Vaccination, Déparasitage..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nextActionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date prévue (optionnel)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
