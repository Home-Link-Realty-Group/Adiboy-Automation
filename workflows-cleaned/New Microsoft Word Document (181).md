# New Microsoft Word Document (181)

Source: New Microsoft Word Document (181).docx

import React from "react";

import ReactMarkdown from "react-markdown";

const NAVY = "#0B1F45";

const GOLD = "#D4A843";

export default function BlogTemplate({ post, showHeader = true }) {

  if (!post) return <div>Post not found</div>;

  const categoryEmojis = {

    foreclosure: "⚠️",

    inherited: "📜",

    comparison: "⚖️",

    timeline: "📅",

    education: "📚",

    process: "🔄",

  };

  return (

    <article style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: NAVY }}>

      {showHeader && (

        <>

          {/* HERO */}

          <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #122B5E 100%)`, padding: "64px 32px", textAlign: "center" }}>

            <div style={{ maxWidth: 800, margin: "0 auto" }}>

              <div style={{ display: "inline-block", background: `${GOLD}25`, border: `1px solid ${GOLD}60`, borderRadius: 20, padding: "4px 16px", fontSize: 11, color: GOLD, fontWeight: 700, marginBottom: 16, letterSpacing: 1.2, textTransform: "uppercase" }}>

                {categoryEmojis[post.category]} {post.category}

              </div>

              <h1 style={{ fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>

                {post.title}

              </h1>

              <p style={{ fontSize: 16, color: "#b0b8c8", marginBottom: 0 }}>

                {post.published_date && new Date(post.published_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.read_time || 5} min read

              </p>

            </div>

          </section>

          {/* FEATURED IMAGE */}

          {post.image_url && (

            <section style={{ padding: "40px 32px", background: "#f8f9fa" }}>

              <img

                src={post.image_url}

                alt={post.title}

                style={{ width: "100%", maxWidth: 900, height: "auto", borderRadius: 12, margin: "0 auto", display: "block", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}

              />

            </section>

          )}

        </>

      )}

      {/* CONTENT */}

      <section style={{ padding: "60px 32px", background: "#fff" }}>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          <ReactMarkdown

            className="prose prose-lg max-w-none"

            components={{

              h2: ({ children }) => (

                <h2 style={{ fontSize: 28, fontWeight: 900, color: NAVY, margin: "32px 0 16px", lineHeight: 1.3 }}>

                  {children}

                </h2>

              ),

              h3: ({ children }) => (

                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: "24px 0 12px" }}>

                  {children}

                </h3>

              ),

              p: ({ children }) => (

                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, margin: "16px 0" }}>

                  {children}

                </p>

              ),

              strong: ({ children }) => (

                <strong style={{ fontWeight: 700, color: NAVY }}>

                  {children}

                </strong>

              ),

              ul: ({ children }) => (

                <ul style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginLeft: 20, margin: "16px 0 16px 20px" }}>

                  {children}

                </ul>

              ),

              li: ({ children }) => (

                <li style={{ margin: "8px 0" }}>

                  {children}

                </li>

              ),

              blockquote: ({ children }) => (

                <blockquote style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: 16, marginLeft: 0, marginY: 16, color: "#666", fontStyle: "italic" }}>

                  {children}

                </blockquote>

              ),

              a: ({ children, href }) => (

                <a href={href} style={{ color: GOLD, fontWeight: 600, textDecoration: "none" }}>

                  {children}

                </a>

              ),

              code: ({ children }) => (

                <code style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontFamily: "monospace" }}>

                  {children}

                </code>

              ),

            }}

          >

            {post.content}

          </ReactMarkdown>

        </div>

      </section>

      {/* TAGS */}

      {post.tags && (

        <section style={{ padding: "40px 32px", background: "#f8f9fa", borderTop: "1px solid #eee" }}>

          <div style={{ maxWidth: 760, margin: "0 auto" }}>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>

              {post.tags.split(",").map(tag => (

                <span key={tag.trim()} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#555" }}>

                  #{tag.trim()}

                </span>

              ))}

            </div>

          </div>

        </section>

      )}

    </article>

  );

}
