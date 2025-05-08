
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6 max-w-md">
        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileSearch className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oups ! Cette page n'existe pas
        </p>
        <p className="text-muted-foreground mb-8">
          La page que vous cherchez n'a pas été trouvée ou a été déplacée.
        </p>
        <Button asChild className="mx-auto">
          <a href="/">Retour à l'accueil</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
