
import React, { useState } from 'react';

function ImageRenamerPro() {
  const [format, setFormat] = useState("webp");
  const [basename, setBasename] = useState("photo");
  const [startNumber, setStartNumber] = useState("00001");
  const [saveToDateFolder, setSaveToDateFolder] = useState(true);
  const [resizeOption, setResizeOption] = useState("original");
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ backgroundColor: "#111", color: "white", padding: 24, fontFamily: "sans-serif", maxWidth: 400, margin: "0 auto", borderRadius: 12 }}>
      <h2>ImageRenamer Pro</h2>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => alert("画像を選ぶ")}>🖼️ 画像を選ぶ</button>
        <button onClick={() => alert("フォルダを選ぶ")} style={{ marginLeft: 10 }}>📂 フォルダを選ぶ</button>
      </div>

      <label>変換形式</label><br />
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="webp">webp</option>
        <option value="png">png</option>
        <option value="jpg">jpg</option>
      </select>

      <div style={{ marginTop: 16 }}>
        <label>ファイル名ベース</label><br />
        <input value={basename} onChange={(e) => setBasename(e.target.value)} />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>開始番号</label><br />
        <input value={startNumber} onChange={(e) => setStartNumber(e.target.value)} />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>出力サイズ</label><br />
        <select value={resizeOption} onChange={(e) => setResizeOption(e.target.value)}>
          <option value="original">元のサイズのまま</option>
          <option value="3000">長辺 3000px</option>
          <option value="2000">長辺 2000px</option>
          <option value="1000">長辺 1000px</option>
          <option value="custom">カスタム入力</option>
        </select>

        {resizeOption === "custom" && (
          <div style={{ marginTop: 8 }}>
            <input type="number" placeholder="幅 (px)" value={customWidth} onChange={e => setCustomWidth(e.target.value)} style={{ marginRight: 8, width: 100 }} />
            <input type="number" placeholder="高さ (px)" value={customHeight} onChange={e => setCustomHeight(e.target.value)} style={{ width: 100 }} />
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, position: "relative" }}>
        <label>
          <input type="checkbox" checked={saveToDateFolder} onChange={() => setSaveToDateFolder(!saveToDateFolder)} />
          日付ごとのフォルダに保存する
        </label>
        <span
          onClick={() => setShowTooltip(!showTooltip)}
          style={{ marginLeft: 8, cursor: "pointer", color: "#0bf" }}
          title="保存先フォルダを日付ベースで自動作成（例：20250425-001）"
        >❔</span>
        {showTooltip && (
          <div style={{ position: "absolute", top: 24, left: 0, backgroundColor: "#222", padding: "8px 12px", borderRadius: 6, fontSize: 12, width: 300 }}>
            保存先フォルダを日付ベースで自動作成（例：20250425-001）<br />
            作業ごとにファイルが整理され、上書きリスクを軽減できます。
          </div>
        )}
      </div>

      <button onClick={() => alert("変換して保存")} style={{ marginTop: 24, backgroundColor: "#ffc107", color: "#000", padding: "10px 20px", borderRadius: 8 }}>
        変換して保存
      </button>
    </div>
  );
}

export default ImageRenamerPro;
