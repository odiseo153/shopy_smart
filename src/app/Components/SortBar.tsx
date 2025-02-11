import { Grid, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SortBarProps {
  view: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
}

export function SortBar({ view, onViewChange, children }: SortBarProps & { children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 flex items-center justify-between border-b">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-md",
            view === 'grid' ? 'bg-gray-100 text-blue-600 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-50'
          )}
          onClick={() => onViewChange('grid')}
        >
          <Grid className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-md",
            view === 'list' ? 'bg-gray-100 text-blue-600 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-50'
          )}
          onClick={() => onViewChange('list')}
        >
          <List className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex items-center space-x-4">{children}</div>
    </div>
  );
}

