import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Trash2, FileText, AlertCircle } from "lucide-react";

const NAVY = "#0B1F45";
const GOLD = "#D4A843";
const GREEN = "#27ae60";

export default function LunaKnowledgeBase() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const docs = await base44.entities.StoredDocument.filter({ category: "luna_knowledge" });
      setDocuments(docs || []);
    } catch (e) {
      console.error("Failed to load documents:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file || !title.trim()) return alert("Please select a file and enter a title");

    setUploading(true);
    try {
      const fileData = await base44.integrations.Core.UploadFile({ file });

      await base44.entities.StoredDocument.create({
        title: title,
        category: "luna_knowledge",
        file_url: fileData.file_url,
        file_name: file.name,
        file_type: file.type,
        file_size: (file.size / 1024).toFixed(2) + " KB",
        notes: `Uploaded for Luna's knowledge base on ${new Date().toLocaleDateString()}`
      });

      setTitle("");
      setFile(null);
      loadDocuments();
      alert("✅ Knowledge file uploaded! Luna will use this in her responses.");
    } catch (e) {
      alert("Upload failed: " + e.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this knowledge file?")) return;
    try {
      await base44.entities.StoredDocument.delete(id);
      loadDocuments();
    } catch (e) {
      alert("Failed to delete: " + e.message);
    }
  }

  const inp = { width: "100%", padding: "10px 12px", border: "1.5px solid #e0e0e0", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 24 }}>💡</div>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: NAVY, margin: 0 }}>Luna's Knowledge Base</h3>
      </div>

      <div style={{ background: "#f9f9f9", border: "1.5px solid #e0e0e0", borderRadius: 8, padding: 16, marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: "#666", margin: "0 0 12px", lineHeight: 1.6 }}>
          Upload documents, guides, scripts, FAQs, or any knowledge files here. Luna will learn from them and use this information when helping visitors.
        </p>

        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>Document Title *</label>
            <input
              style={inp}
              placeholder="e.g., Cash Offer Process Guide"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#555", display: "block", marginBottom: 4 }}>Upload File *</label>
            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              style={{ ...inp, padding: "8px" }}
              accept=".pdf,.doc,.docx,.txt,.md"
              required
            />
            {file && <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>📄 {file.name}</div>}
          </div>

          <button
            type="submit"
            disabled={uploading || !file || !title.trim()}
            style={{
              background: uploading || !file || !title.trim() ? "#ccc" : GREEN,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: 10,
              fontWeight: 700,
              fontSize: 12,
              cursor: uploading || !file || !title.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
          >
            <Upload size={16} /> {uploading ? "Uploading..." : "Upload for Luna"}
          </button>
        </form>
      </div>

      {/* KNOWLEDGE FILES */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 12 }}>📚 Luna's Current Knowledge ({documents.length})</div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 20, color: "#888" }}>Loading...</div>
        ) : documents.length === 0 ? (
          <div style={{ padding: 20, background: "#f9f9f9", borderRadius: 6, textAlign: "center", color: "#888", fontSize: 12 }}>
            No knowledge files yet. Upload some to get started!
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {documents.map(doc => (
              <div key={doc.id} style={{ background: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: 6, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <FileText size={14} color={GOLD} />
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{doc.title}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#666" }}>
                    {doc.file_name} • {doc.file_size}
                  </div>
                  {doc.notes && <div style={{ fontSize: 10, color: "#888", marginTop: 4, fontStyle: "italic" }}>{doc.notes}</div>}
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#c0392b",
                    cursor: "pointer",
                    padding: 6,
                    fontSize: 12,
                    fontWeight: 700
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 20, padding: 12, background: "#fffbf0", border: "1px solid #f0c86a", borderRadius: 6, fontSize: 11, color: "#7a5e1a", lineHeight: 1.6 }}>
        <AlertCircle size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
        <strong>Pro Tip:</strong> Upload your scripts, FAQs, process guides, and company policies. Luna will reference these when answering visitor questions.
      </div>
    </div>
  );
}
