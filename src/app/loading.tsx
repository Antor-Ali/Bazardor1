
export default function Loading() {
  return (
    <main className="container-main animate-pulse py-10">
      <div className="mb-8">
        <div className="h-4 w-40 rounded bg-gray-200" />
        <div className="mt-4 h-10 max-w-lg rounded-lg bg-gray-200" />
        <div className="mt-3 h-4 max-w-md rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="h-36 bg-gray-200" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
              <div className="h-7 w-1/2 rounded bg-gray-200" />
              <div className="h-9 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
