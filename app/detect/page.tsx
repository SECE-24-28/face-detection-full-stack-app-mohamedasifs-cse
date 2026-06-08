import { detectActions } from "../actions/detectActions";

type SearchParams = Promise<{
  result?: string;
}>;

export default async function DetectPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const result = params.result
    ? JSON.parse(decodeURIComponent(params.result))
    : null;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <form
          action={detectActions}
          className="bg-white p-5 rounded shadow flex gap-3 mb-8"
        >
          <input
            type="text"
            name="imageUrl"
            placeholder="Paste image URL with face"
            className="border p-2 rounded flex-1"
            required
          />

          <button className="bg-blue-600 text-white px-5 py-2 rounded">
            Detect
          </button>
        </form>

        {result && (
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              Faces Found: {result.faceCount}
            </h2>

            <div className="relative inline-block">
              <img
                src={result.imageUrl}
                alt="Detected"
                className="max-w-full rounded"
              />

              {result.boxes.map((box: any, index: number) => (
                <div
                  key={index}
                  className="absolute border-4 border-red-500"
                  style={{
                    left: `${box.left}px`,
                    top: `${box.top}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}