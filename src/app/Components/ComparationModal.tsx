import React, { useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import highlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Estilo oscuro para el resaltado de código
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparaciones: string;
  resultadoFinal: string;
} 

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(gfm) // Soporte para GitHub Flavored Markdown
    .use(html) // Convierte Markdown a HTML
    .use(highlight) // Resaltado de código
    .process(markdown);
  return result.toString();
};

const ComparationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  comparaciones,
  resultadoFinal,
}) => {
  const [activeTab, setActiveTab] = useState<"comparaciones" | "resultado">("comparaciones");
  const [comparacionesHtml, setComparacionesHtml] = useState("");
  const [resultadoHtml, setResultadoHtml] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      markdownToHtml(comparaciones).then(setComparacionesHtml);
      markdownToHtml(resultadoFinal).then(setResultadoHtml);
    }
  }, [isOpen, comparaciones, resultadoFinal]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comparación de Productos</DialogTitle>
          <DialogClose className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DialogClose>
        </DialogHeader>
        <Tabs defaultValue="comparaciones" className="space-y-4">
          <TabsList>
            <TabsTrigger value="comparaciones">Comparaciones</TabsTrigger>
            <TabsTrigger value="resultado">Resultado Final</TabsTrigger>
          </TabsList>
          <TabsContent value="comparaciones">
            <div >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Comparaciones
              </h3>
              <div
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: comparacionesHtml }}
              />
            </div>
          </TabsContent>
          <TabsContent value="resultado">
            <div >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Resultado Final
              </h3>
              <div
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: resultadoHtml }}
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="default" className="w-full" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComparationModal;