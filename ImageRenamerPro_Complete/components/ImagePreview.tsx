import { useState } from 'react';

export default function ImagePreview() {
  const [images, setImages] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const readers = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(setImages);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="w-full max-w-md border-2 border-dashed rounded-xl p-6 text-center"
    >
      <p className="mb-2">ここに画像をドロップ</p>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`preview-${i}`} className="w-full h-24 object-cover rounded" />
        ))}
      </div>
    </div>
  );
}
