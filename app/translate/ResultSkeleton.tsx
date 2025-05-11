export default function ResultSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4 animate-pulse">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="h-8 w-16 text-md bg-primary/10 font-bold px-3 py-1 rounded-full" />
          <span className="h-3 w-32 rounded-lg text-xs bg-primary/10" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="bg-primary/10 rounded-xl h-4 w-32 mb-2" />
          <p className="bg-primary/10 rounded-xl h-4 w-96 max-w-full" />
        </div>

        <div>
          <p className="bg-primary/10 rounded-xl h-4 w-32 mb-2" />
          <p className="bg-primary/10 rounded-xl h-4 w-96 max-w-full" />
        </div>
      </div>
    </div>
  );
}
