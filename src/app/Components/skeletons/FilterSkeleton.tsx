// Skeleton Component
export function FilterSkeleton() {
    return (
      <div className="max-w-full md:w-64 bg-white p-6 border border-gray-300 shadow-lg rounded-lg flex flex-col space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtros</h2>
        {[1, 2].map((section) => (
          <div key={section} className="w-full border-b border-gray-200 pb-4">
            <div className="w-full flex justify-between items-center py-2 px-3 bg-gray-50 text-gray-800 font-medium rounded-md">
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
            </div>
            <div className="mt-3 space-y-3 pl-4">
              {[1, 2, 3].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }