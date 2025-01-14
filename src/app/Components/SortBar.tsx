import { Grid, List } from 'lucide-react'

interface SortBarProps {
  view: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
}

export function SortBar({ view, onViewChange, children }: SortBarProps & { children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 flex items-center justify-between border-b">
      <div className="flex items-center space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            view === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => onViewChange('grid')}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === 'list' ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => onViewChange('list')}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center space-x-4">{children}</div>
    </div>
  );
}

