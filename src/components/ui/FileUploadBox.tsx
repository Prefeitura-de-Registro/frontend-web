import { useState, type ChangeEvent } from 'react';
import { Upload, Search, X } from 'lucide-react';

export function FileUploadBox() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-secondary rounded-2xl p-4 flex flex-col items-center justify-center min-h-40 border border-dashed border-tertiary">
      <input
        type="file"
        id="file-upload"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {files.length === 0 ? (
        <div className="flex flex-col items-center text-center space-y-2">
          <Upload className="w-6 h-6 text-gray-600" />

          <span className="text-xs text-gray-600 font-medium">
            Clique para procurar o arquivo
          </span>

          <span className="text-[10px] text-gray-600 font-normal">
            Tamanho Máx.: 30MB
          </span>

          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-primary text-secondary text-xs px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-primary/90 transition-colors mt-1"
          >
            <Search className="w-3.5 h-3.5" />
            Procurar arquivo
          </label>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between gap-3 overflow-visible">
          <div className="flex gap-4 overflow-visible max-w-[65%] items-center py-2 px-2">
            {files.map((file, index) => (
              <div key={index} className="relative shrink-0 overflow-visible">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-20 h-20 object-cover rounded-lg border border-primary/20"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute -top-2 -right-2 bg-danger text-secondary rounded-full p-1 hover:bg-danger/90 transition-colors shadow-sm z-20 flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-primary text-secondary text-xs px-3 py-2 rounded-lg text-center hover:bg-primary/90 transition-colors shrink-0"
          >
            Adicionar mais
          </label>
        </div>
      )}
    </div>
  );
}
