import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HeaderBeton } from "@/components/layout/HeaderBeton";
import { Button } from "@/components/ui/button";
import { Camera, Upload, FileImage, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Scan() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      simulateProcessing();
    };
    reader.readAsDataURL(file);
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    // Simulation du traitement IA
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <AppLayout>
      <HeaderBeton
        title="Scan IA"
        subtitle="Numérisez vos brouillons"
      />

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Zone d'upload */}
          <div
            className={cn(
              "bloc-chantier relative overflow-hidden transition-all",
              isDragging && "border-primary border-4",
              uploadedImage ? "p-0" : "p-8"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {uploadedImage ? (
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Devis scanné" 
                  className="w-full h-auto"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-foreground/80 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <div className="text-center">
                      <p className="text-primary-foreground font-bold text-lg">
                        Analyse en cours...
                      </p>
                      <p className="text-primary-foreground/70 text-sm">
                        L'IA extrait les informations
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Camera className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-2">
                  Prenez en photo votre brouillon
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xs">
                  Devis manuscrit, notes de chantier, ou tout document à numériser
                </p>
                
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                  id="camera-input"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="camera-input">
                    <Button variant="massif" className="w-full gap-3" asChild>
                      <span>
                        <Camera className="h-6 w-6" />
                        Prendre une photo
                      </span>
                    </Button>
                  </label>
                  <label htmlFor="file-input">
                    <Button variant="outline" className="w-full gap-3" asChild>
                      <span>
                        <Upload className="h-6 w-6" />
                        Importer une image
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Info IA */}
          {!uploadedImage && (
            <div className="mt-6 bloc-chantier p-4 border-primary/30">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Propulsé par l'IA</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Notre intelligence artificielle extrait automatiquement les informations de votre brouillon : client, prestations, montants...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions après scan */}
          {uploadedImage && !isProcessing && (
            <div className="mt-6 space-y-4">
              <Button variant="success" className="w-full gap-3">
                <FileImage className="h-6 w-6" />
                Créer le devis
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setUploadedImage(null)}
              >
                Scanner un autre document
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
