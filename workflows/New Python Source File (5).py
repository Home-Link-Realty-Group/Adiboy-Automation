import { useState } from "react";
import { X } from "lucide-react";

const GOLD = "#D4A843";
const NAVY = "#0B1F45";
const GREEN = "#27ae60";

export default function ImageOptimizer({ onClose, onOptimized }) {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState(null);

  async function handleOptimize() {
    if (!file) return alert("Please select an image");
    setOptimizing(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          blob => {
            const originalSize = (file.size / 1024 / 1024).toFixed(2);
            const optimizedSize = (blob.size / 1024 / 1024).toFixed(2);
            const savings = (((file.size - blob.size) / file.size) * 100).toFixed(1);
            setResult({ blob, originalSize, optimizedSize, savings, width, height });
            setOptimizing(false);
          },
          "image/jpeg",
          quality / 100
        );
      };
      img.src = URL.createObjectURL(file);
    } catch (e) {
      alert("Error optimizing image: " + e.message);
      setOptimizing(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.split(".")[0] + "-optimized.jpg";
    a.click();
    URL.revokeObjectURL(url);
    if (onOptimized) onOptimized(url);
  }

  const inp = { width: "100%", padding: "10px 12px", border: "1.5px solid #e0e0e0", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: 24, maxWidth: 500, width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>🖼️ Image Optimizer</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <X size={24} color={NAVY} />
          </button>
        </div>

        {!result ? (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 8 }}>Select Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setFile(e.target.files[0])}
                style={{ ...inp, padding: "8px" }}
              />
              {file && <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={e => setQuality(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
              <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>Lower = smaller file, higher = better quality</div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>Max Width (px)</label>
              <input
                type="number"
                value={maxWidth}
                onChange={e => setMaxWidth(parseInt(e.target.value))}
                style={inp}
              />
              <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>Larger dimensions = larger file size</div>
            </div>

            <button
              onClick={handleOptimize}
              disabled={!file || optimizing}
              style={{
                width: "100%",
                background: optimizing ? "#ccc" : GREEN,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: 12,
                fontWeight: 700,
                fontSize: 14,
                cursor: optimizing ? "not-allowed" : "pointer"
              }}
            >
              {optimizing ? "Optimizing..." : "⚡ Optimize Image"}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ background: "#f9f9f9", borderRadius: 6, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 12 }}>✅ Optimization Complete</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12 }}>
                <div>
                  <div style={{ color: "#666", marginBottom: 4 }}>Original Size</div>
                  <div style={{ fontWeight: 700, color: NAVY }}>{result.originalSize} MB</div>
                </div>
                <div>
                  <div style={{ color: "#666", marginBottom: 4 }}>Optimized Size</div>
                  <div style={{ fontWeight: 700, color: GREEN }}>{result.optimizedSize} MB</div>
                </div>
                <div>
                  <div style={{ color: "#666", marginBottom: 4 }}>Space Saved</div>
                  <div style={{ fontWeight: 700, color: GREEN }}>{result.savings}%</div>
                </div>
                <div>
                  <div style={{ color: "#666", marginBottom: 4 }}>New Dimensions</div>
                  <div style={{ fontWeight: 700, color: NAVY }}>{result.width}×{result.height}px</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleDownload}
                style={{
                  flex: 1,
                  background: GREEN,
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: 12,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer"
                }}
              >
                ⬇️ Download
              </button>
              <button
                onClick={() => { setResult(null); setFile(null); }}
                style={{
                  flex: 1,
                  background: "#eee",
                  color: "#333",
                  border: "none",
                  borderRadius: 6,
                  padding: 12,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer"
                }}
              >
                Optimize Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
