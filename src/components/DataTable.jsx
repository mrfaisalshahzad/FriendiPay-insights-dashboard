const DataTable = ({ data, title, columns, pageSize = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm w-full sm:w-64"
        />
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages || 1}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700">
              {columns.map((col, i) => (
                <th key={i} className="text-left py-2 px-2">{col.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">No data found</td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr key={i} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  {columns.map((col, j) => (
                    <td key={j} className="py-2 px-2 truncate max-w-xs">
                      {String(row[col.accessor] || '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ← Prev
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DataTable;