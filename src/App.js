
import React, { useState, useRef } from 'react';

function ImageRenamerPro() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleFolderChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  return (
    <div style={{ backgroundColor: "#111", color: "white", padding: 24, fontFamily: "sans-serif", maxWidth: 400, margin: "0 auto", borderRadius: 12 }}>
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

      <div>
        <h4>選択されたファイル:</h4>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index} style={{ fontSize: 12 }}>{file.webkitRelativePath || file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageRenamerPro;
