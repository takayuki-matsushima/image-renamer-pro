
import React, { useState, useRef } from 'react';

function ImageRenamerPro() {
  const [files, setFiles] = useState([]);
  const [basename, setBasename] = useState("photo");
  const [startNumber, setStartNumber] = useState(1);
  const [quality, setQuality] = useState("medium");
  const fileInputRef = useRef(null);

  const qualitySettings = {
    low: { size: 1000, quality: 0.5 },
    medium: { size: 2000, quality: 0.75 },
    high: { size: 3000, quality: 0.95 }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const resizeAndDownload = (imageFile, index) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const { size, quality: q } = qualitySettings[quality];
        let scale = size / Math.max(img.width, img.height);
        if (scale > 1) scale = 1;
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          const number = String(startNumber + index).padStart(5, "0");
          link.download = `${basename}${number}.webp`;
          link.href = URL.createObjectURL(blob);
          link.click();
        }, "image/webp", q);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleConvertAndSave = () => {
    files.forEach((file, index) => {
      resizeAndDownload(file, index);
    });
  };

  return (
    <div style={{ backgroundColor: "#111", color: "white", padding: 24, fontFamily: "sans-serif", maxWidth: 500, margin: "0 auto", borderRadius: 12 }}>
      <h2>ImageRenamer Pro</h2>

      <button onClick={() => fileInputRef.current.click()}>🖼️ 画像を選ぶ</button>
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div style={{ marginTop: 16 }}>
        <label>ファイル名ベース：</label><br />
        <input value={basename} onChange={(e) => setBasename(e.target.value)} />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>開始番号：</label><br />
        <input type="number" value={startNumber} onChange={(e) => setStartNumber(parseInt(e.target.value, 10))} />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>解像度と画質：</label><br />
        <label><input type="radio" value="low" checked={quality === "low"} onChange={() => setQuality("low")} /> 低（1000px / 50%）</label><br />
        <label><input type="radio" value="medium" checked={quality === "medium"} onChange={() => setQuality("medium")} /> 中（2000px / 75%）</label><br />
        <label><input type="radio" value="high" checked={quality === "high"} onChange={() => setQuality("high")} /> 高（3000px / 95%）</label>
      </div>

      <button onClick={handleConvertAndSave} style={{ marginTop: 24, backgroundColor: "#ffc107", color: "#000", padding: "10px 20px", borderRadius: 8 }}>
        変換して保存
      </button>

      <div style={{ marginTop: 24 }}>
        <h4>選択されたファイル:</h4>
        <ul>
          {files.map((file, index) => (
            <li key={index} style={{ fontSize: 12 }}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageRenamerPro;
