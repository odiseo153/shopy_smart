import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";



export const InfoBubble = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sobre ShopyMart</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-3">
            <p>
              ShopMate es una aplicación revolucionaria diseñada para optimizar tu experiencia de compra en línea.
            </p>
            <p>
              Nuestras características principales incluyen:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Búsqueda y comparación de productos en múltiples plataformas</li>
              <li>Asistente de IA personalizado para guiar tus decisiones de compra</li>
              <li>Interfaz moderna y fácil de usar</li>
              <li>Recomendaciones inteligentes basadas en tus preferencias</li>
            </ul>
            <p>
              Con ShopyMart, transformamos tu experiencia de compra haciéndola más eficiente, rápida y completamente personalizada.
            </p>
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={onClose}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };