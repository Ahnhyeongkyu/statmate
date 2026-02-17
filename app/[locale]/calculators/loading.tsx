export default function CalculatorLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div>
        <div className="h-9 w-64 rounded bg-gray-200" />
        <div className="mt-2 h-5 w-96 rounded bg-gray-100" />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="h-64 rounded-lg border bg-gray-50" />
          <div className="flex gap-3">
            <div className="h-10 flex-1 rounded bg-gray-200" />
            <div className="h-10 w-28 rounded bg-gray-100" />
            <div className="h-10 w-20 rounded bg-gray-100" />
          </div>
        </div>
        <div className="h-80 rounded-lg border border-dashed bg-gray-50" />
      </div>
    </div>
  );
}
