# blogcms

Source: blogcms.docx

import { useState, useEffect } from "react";

import { base44 } from "@/api/base44Client";

import {

  generateMetadata,

  analyzeSEOScore,

} from "./MetadataAutoGenerator";

import {

  mapInternalLinks,

  generateInternalLinks,

  analyzeInternalLinkingScore,

} from "./InternalLinkingMapper";

import { generateArticleSchema, injectSchemaMarkup } from "./BlogSchemaMarkupGenerator";

const NAVY = "#0B1F45";

const GOLD = "#D4A843";

export default function BlogContentManager({ post, onSave, onCancel }) {

  const [form, setForm] = useState(post || {

    title: "",

    content: "",

    excerpt: "",

    category: "education",

    image_url: "",

    meta_title: "",

    meta_description: "",

    meta_keywords: "",

    tags: "",

  });

  const [seoScore, setSeoScore] = useState(0);

  const [seoIssues, setSeoIssues] = useState([]);

  const [internalLinkSuggestions, setInternalLinkSuggestions] = useState([]);

  const [internalLinkScore, setInternalLinkScore] = useState(0);

  const [generating, setGenerating] = useState(false);

  const [showPreview, setShowPreview] = useState(false);

  // Auto-generate SEO metadata when title/content changes

  const handleGenerateMetadata = async () => {

    setGenerating(true);

    try {

      const metadata = await generateMetadata(

        form.title,

        form.content,

        form.category

      );

      setForm((prev) => ({ ...prev, ...metadata }));

    } catch (error) {

      console.error("Failed to generate metadata:", error);

    }

    setGenerating(false);

  };

  // Analyze SEO score

  useEffect(() => {

    const { score, issues } = analyzeSEOScore(

      form.title,

      form.content,

      form.meta_description

    );

    setSeoScore(score);

    setSeoIssues(issues);

  }, [form.title, form.content, form.meta_description]);

  // Map internal linking opportunities

  useEffect(() => {

    const mapLinks = async () => {

      const suggestions = await mapInternalLinks(

        form.title,

        form.content,

        form.category

      );

      setInternalLinkSuggestions(suggestions);

      const linkScore = analyzeInternalLinkingScore(

        form.content,

        form.category

      );

      setInternalLinkScore(linkScore.score);

    };

    mapLinks();

  }, [form.title, form.content, form.category]);

  const handleAddInternalLinks = () => {

    const linkMarkdown = generateInternalLinks(internalLinkSuggestions);

    setForm((prev) => ({

      ...prev,

      content: prev.content + linkMarkdown,

    }));

  };

  const handleSave = async () => {

    // Generate slug if not present

    if (!form.slug) {

      form.slug = form.title

        .toLowerCase()

        .replace(/[^a-z0-9]/g, "-")

        .replace(/-+/g, "-");

    }

    // Generate schema markup

    const schemaData = generateArticleSchema(form);

    await onSave({

      ...form,

      schema_markup: JSON.stringify(schemaData),

    });

  };

  return (

    <div style={{

      background: "#fff",

      borderRadius: 16,

      padding: "32px",

      boxShadow: "0 2px 20px rgba(0,0,0,0.08)",

    }}>

      {/* Header */}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>

        <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: 0 }}>

          {post ? "✎ Edit Article" : "➕ New Article"}

        </h2>

        <div style={{ display: "flex", gap: 10 }}>

          <button

            onClick={() => setShowPreview(!showPreview)}

            style={{

              background: showPreview ? GOLD : "#f0f0f0",

              color: showPreview ? "#fff" : NAVY,

              border: "none",

              borderRadius: 8,

              padding: "10px 16px",

              cursor: "pointer",

              fontWeight: 600,

              fontSize: 13,

            }}

          >

            👁 Preview

          </button>

          <button

            onClick={handleGenerateMetadata}

            disabled={generating || !form.title}

            style={{

              background: generating ? "#ccc" : GOLD,

              color: "#fff",

              border: "none",

              borderRadius: 8,

              padding: "10px 16px",

              cursor: generating ? "not-allowed" : "pointer",

              fontWeight: 600,

              fontSize: 13,

            }}

          >

            {generating ? "⏳ Generating..." : "⚡ Auto-Generate SEO"}

          </button>

        </div>

      </div>

      {/* Main Content */}

      <div style={{ display: "grid", gridTemplateColumns: showPreview ? "1fr 1fr" : "1fr", gap: 24, marginBottom: 24 }}>

        <div>

          {/* Title */}

          <div style={{ marginBottom: 16 }}>

            <label style={{ fontSize: 12, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>

              Title *

            </label>

            <input

              type="text"

              placeholder="Article headline"

              value={form.title}

              onChange={(e) => setForm({ ...form, title: e.target.value })}

              style={{

                width: "100%",

                padding: "12px",

                border: "2px solid #e0e0e0",

                borderRadius: 8,

                fontSize: 14,

                fontFamily: "inherit",

                boxSizing: "border-box",

              }}

            />

          </div>

          {/* Excerpt */}

          <div style={{ marginBottom: 16 }}>

            <label style={{ fontSize: 12, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>

              Excerpt (shown in lists)

            </label>

            <textarea

              placeholder="Short summary of the article"

              value={form.excerpt}

              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}

              rows={3}

              style={{

                width: "100%",

                padding: "12px",

                border: "2px solid #e0e0e0",

                borderRadius: 8,

                fontSize: 14,

                fontFamily: "inherit",

                boxSizing: "border-box",

                resize: "vertical",

              }}

            />

          </div>

          {/* Category & Tags */}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>

            <div>

              <label style={{ fontSize: 12, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>

                Category

              </label>

              <select

                value={form.category}

                onChange={(e) => setForm({ ...form, category: e.target.value })}

                style={{

                  width: "100%",

                  padding: "10px",

                  border: "2px solid #e0e0e0",

                  borderRadius: 8,

                  background: "#fff",

                  fontSize: 14,

                }}

              >

                <option value="foreclosure">Foreclosure Help</option>

                <option value="inherited">Inherited Property</option>

                <option value="comparison">Comparisons</option>

                <option value="timeline">Timeline</option>

                <option value="education">Education</option>

                <option value="process">Process</option>

              </select>

            </div>

            <div>

              <label style={{ fontSize: 12, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>

                Tags

              </label>

              <input

                type="text"

                placeholder="comma, separated, tags"

                value={form.tags}

                onChange={(e) => setForm({ ...form, tags: e.target.value })}

                style={{

                  width: "100%",

                  padding: "10px",

                  border: "2px solid #e0e0e0",

                  borderRadius: 8,

                  fontSize: 13,

                  fontFamily: "inherit",

                  boxSizing: "border-box",

                }}

              />

            </div>

          </div>

          {/* Featured Image */}

          <div style={{ marginBottom: 16 }}>

            <label style={{ fontSize: 12, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>

              Featured Image URL

            </label>

            <input

              type="url"

              placeholder="https://example.com/image.jpg"

              value={form.image_url}

              onChange={(e) => setForm({ ...form, image_url: e.target.value })}

              style={{

                width: "100%",

                padding: "10px",

                border: "2px solid #e0e0e0",

                borderRadius: 8,

                fontSize: 13,

                fontFamily: "inherit",

                boxSizing: "border-box",

              }}

            />

          </div>

          {/* Content - Markdown */}

          <div style={{ marginBottom: 16 }}>

            <label style={{ fontSize: 12, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>

              Article Content (Markdown supported) *

            </label>

            <textarea

              placeholder="Write your article here. Use markdown: **bold**, *italic*, # Heading 1, ## Heading 2, etc."

              value={form.content}

              onChange={(e) => setForm({ ...form, content: e.target.value })}

              rows={12}

              style={{

                width: "100%",

                padding: "12px",

                border: "2px solid #e0e0e0",

                borderRadius: 8,

                fontSize: 13,

                fontFamily: "monospace",

                boxSizing: "border-box",

                resize: "vertical",

              }}

            />

            <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>

              {form.content.split(/\s+/).length} words · Supports markdown formatting

            </div>

          </div>

        </div>

        {/* Preview Panel */}

        {showPreview && (

          <div style={{

            background: "#f9f9f9",

            borderRadius: 12,

            padding: "16px",

            border: "1px solid #e0e0e0",

            maxHeight: "600px",

            overflowY: "auto",

          }}>

            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, marginBottom: 12, textTransform: "uppercase" }}>

              Preview

            </div>

            <h3 style={{ fontSize: 16, fontWeight: 900, color: NAVY, margin: "0 0 8px" }}>

              {form.title || "(Title)"}

            </h3>

            <p style={{ fontSize: 13, color: "#666", margin: "0 0 12px", lineHeight: 1.6 }}>

              {form.excerpt || "(Excerpt)"}

            </p>

            {form.image_url && (

              <img

                src={form.image_url}

                alt={form.title}

                style={{

                  width: "100%",

                  borderRadius: 8,

                  marginBottom: 12,

                  maxHeight: "150px",

                  objectFit: "cover",

                }}

              />

            )}

            <div style={{ fontSize: 12, color: "#888" }}>

              <strong>Meta Title:</strong> {form.meta_title || "(auto-generated)"}

            </div>

            <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>

              <strong>Description:</strong> {form.meta_description || "(auto-generated)"}

            </div>

          </div>

        )}

      </div>

      {/* SEO Metadata Section */}

      <div style={{

        background: "#f0f4ff",

        border: "1.5px solid #cce5ff",

        borderRadius: 12,

        padding: "16px",

        marginBottom: 20,

      }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>

          <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: 0 }}>

            📊 SEO Metadata

          </h3>

          <div style={{

            background: seoScore >= 70 ? "#27ae60" : seoScore >= 50 ? "#f39c12" : "#e74c3c",

            color: "#fff",

            padding: "6px 12px",

            borderRadius: 20,

            fontSize: 12,

            fontWeight: 700,

          }}>

            Score: {seoScore}%

          </div>

        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>

          <div>

            <label style={{ fontSize: 11, fontWeight: 700, color: NAVY, display: "block", marginBottom: 4 }}>

              Meta Title (50-60 chars)

            </label>

            <input

              type="text"

              value={form.meta_title}

              onChange={(e) => setForm({ ...form, meta_title: e.target.value })}

              placeholder="SEO title"

              maxLength={60}

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ddd",

                borderRadius: 6,

                fontSize: 12,

                boxSizing: "border-box",

              }}

            />

            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>

              {form.meta_title.length}/60 chars

            </div>

          </div>

          <div>

            <label style={{ fontSize: 11, fontWeight: 700, color: NAVY, display: "block", marginBottom: 4 }}>

              Meta Keywords (comma-separated)

            </label>

            <input

              type="text"

              value={form.meta_keywords}

              onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}

              placeholder="keyword1, keyword2, keyword3"

              style={{

                width: "100%",

                padding: "8px",

                border: "1px solid #ddd",

                borderRadius: 6,

                fontSize: 12,

                boxSizing: "border-box",

              }}

            />

          </div>

        </div>

        <div style={{ marginBottom: 12 }}>

          <label style={{ fontSize: 11, fontWeight: 700, color: NAVY, display: "block", marginBottom: 4 }}>

            Meta Description (150-160 chars)

          </label>

          <textarea

            value={form.meta_description}

            onChange={(e) => setForm({ ...form, meta_description: e.target.value })}

            placeholder="SEO description"

            maxLength={160}

            rows={2}

            style={{

              width: "100%",

              padding: "8px",

              border: "1px solid #ddd",

              borderRadius: 6,

              fontSize: 12,

              fontFamily: "inherit",

              boxSizing: "border-box",

            }}

          />

          <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>

            {form.meta_description.length}/160 chars

          </div>

        </div>

        {seoIssues.length > 0 && (

          <div style={{ background: "#fff9e6", border: "1px solid #ffe6cc", borderRadius: 6, padding: "10px", fontSize: 12, color: "#664d00" }}>

            <strong>SEO Opportunities:</strong>

            <ul style={{ margin: "6px 0 0", paddingLeft: 20, color: "#664d00", fontSize: 11 }}>

              {seoIssues.map((issue, i) => (

                <li key={i}>{issue}</li>

              ))}

            </ul>

          </div>

        )}

      </div>

      {/* Internal Linking Section */}

      <div style={{

        background: "#f0fff4",

        border: "1.5px solid #bbf7d0",

        borderRadius: 12,

        padding: "16px",

        marginBottom: 20,

      }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>

          <h3 style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: 0 }}>

            🔗 Internal Linking

          </h3>

          <div style={{

            background: internalLinkScore >= 70 ? "#27ae60" : "#f39c12",

            color: "#fff",

            padding: "6px 12px",

            borderRadius: 20,

            fontSize: 12,

            fontWeight: 700,

          }}>

            Score: {internalLinkScore}%

          </div>

        </div>

        {internalLinkSuggestions.length > 0 && (

          <div>

            <p style={{ fontSize: 12, color: "#333", marginBottom: 10 }}>

              <strong>Suggested links to related content:</strong>

            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>

              {internalLinkSuggestions.map((suggestion, i) => (

                <div key={i} style={{

                  background: "#fff",

                  border: "1px solid #ddd",

                  borderRadius: 6,

                  padding: "10px",

                  fontSize: 12,

                }}>

                  <div style={{ fontWeight: 600, color: NAVY }}>

                    {suggestion.anchor_text}

                  </div>

                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>

                    {suggestion.reason}

                  </div>

                </div>

              ))}

            </div>

            <button

              onClick={handleAddInternalLinks}

              style={{

                background: "#27ae60",

                color: "#fff",

                border: "none",

                borderRadius: 6,

                padding: "10px 14px",

                fontWeight: 600,

                fontSize: 12,

                cursor: "pointer",

              }}

            >

              ✓ Add Suggested Links to Article

            </button>

          </div>

        )}

      </div>

      {/* Action Buttons */}

      <div style={{ display: "flex", gap: 12 }}>

        <button

          onClick={onCancel}

          style={{

            flex: 1,

            padding: "12px",

            background: "#f0f0f0",

            border: "none",

            borderRadius: 8,

            fontWeight: 700,

            fontSize: 14,

            color: NAVY,

            cursor: "pointer",

          }}

        >

          Cancel

        </button>

        <button

          onClick={handleSave}

          disabled={!form.title || !form.content}

          style={{

            flex: 2,

            padding: "12px",

            background: form.title && form.content ? GOLD : "#ccc",

            border: "none",

            borderRadius: 8,

            fontWeight: 900,

            fontSize: 14,

            color: "#fff",

            cursor: form.title && form.content ? "pointer" : "not-allowed",

          }}

        >

          💾 Save & Publish

        </button>

      </div>

    </div>

  );

}
