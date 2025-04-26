
import React, { useState, useRef } from 'react';
import JSZip from 'jszip';

function ImageRenamerPro() {
  const [files, setFiles] = useState([]);
  const [basename, setBasename] = useState("photo");
  const [startNumber, setStartNumber] = useState(1);
  const [digits, setDigits] = useState(5);
  const [quality, setQuality] = useState("medium");
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const qualitySettings = {
    low: { size: 1000, quality: 0.5 },
    medium: { size: 2000, quality: 0.75 },
    high: { size: 3000, quality: 0.95 }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleFolderChange = (e) => {
    setFiles([...e.target.files]);
  };

  const resizeAndZip = async () => {
    const zip = new JSZip();
    const { size, quality: q } = qualitySettings[quality];

    const promises = files.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            let scale = size / Math.max(img.width, img.height);
            if (scale > 1) scale = 1;
            const canvas = document.createElement("canvas");
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              const number = String(startNumber + index).padStart(digits, "0");
              zip.file(`${basename}${number}.webp`, blob);
              resolve();
            }, "image/webp", q);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    });

    await Promise.all(promises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      link.download = `ImageRenamerPro_${dateStr}.zip`;
      link.href = URL.createObjectURL(content);
      link.click();
    });
  };

  return (
    <div style={{ backgroundColor: "#111", color: "white", padding: 24, fontFamily: "sans-serif", maxWidth: 500, margin: "0 auto", borderRadius: 12 }}>
      <h2>ImageRenamer Pro</h2>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => fileInputRef.current.click()}>🖼️ 画像を選ぶ</button>
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <button onClick={() => folderInputRef.current.click()} style={{ marginLeft: 10 }}>📂 フォルダを選ぶ</button>
        <input
          type="file"
          webkitdirectory="true"
          directory=""
          multiple
          style={{ display: "none" }}
          ref={folderInputRef}
          onChange={handleFolderChange}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>ファイル名ベース：</label><br />
        <input value={basename} onChange={(e) => setBasename(e.target.value)} />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>開始番号：</label><br />
        <input type="number" value={startNumber} onChange={(e) => setStartNumber(parseInt(e.target.value, 10))} />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>桁数（3〜5桁）：</label><br />
        <select value={digits} onChange={(e) => setDigits(parseInt(e.target.value, 10))}>
          <option value="3">3桁</option>
          <option value="4">4桁</option>
          <option value="5">5桁</option>
        </select>
      </div>

      <div style={{ marginTop: 16 }}>
        <label>解像度と画質：</label><br />
        <label><input type="radio" value="low" checked={quality === "low"} onChange={() => setQuality("low")} /> 低（1000px / 50%）</label><br />
        <label><input type="radio" value="medium" checked={quality === "medium"} onChange={() => setQuality("medium")} /> 中（2000px / 75%）</label><br />
        <label><input type="radio" value="high" checked={quality === "high"} onChange={() => setQuality("high")} /> 高（3000px / 95%）</label>
      </div>

      <button onClick={resizeAndZip} style={{ marginTop: 24, backgroundColor: "#ffc107", color: "#000", padding: "10px 20px", borderRadius: 8 }}>
        変換してZIP保存
      </button>

      <div style={{ marginTop: 24 }}>
        <h4>選択されたファイル:</h4>
        <ul>
          {files.map((file, index) => (
            <li key={index} style={{ fontSize: 12 }}>{file.webkitRelativePath || file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageRenamerPro;
