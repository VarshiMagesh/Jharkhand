import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
interface CultureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  description: string;
}

export default function CultureModal({ isOpen, onClose, title, image, description }: CultureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full w-8 h-8 p-0 hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 p-6">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

         {/* Description Section */}
            <div className="lg:w-1/2 p-6 lg:border-l border-border">
  <div className="prose prose-slate dark:prose-invert max-w-none">
    <p className="text-muted-foreground leading-relaxed text-2xl font-bold">
      {description}
    </p>
  </div>


            
          </div>
        </div>
      </div>
    </div>
  );
}