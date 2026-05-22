# MetaData

Source: MetaData.docx

import \{ base44 \} from "@/api/base44Client";

/\*\*

 \* Auto\-generates SEO\-friendly metadata from blog content

 \* Analyzes title, content, and keywords to create optimized meta fields

 \*/

export const generateMetadata = async \(title, content, category\) => \{

  const prompt = \`You are an SEO expert\. Given a blog post title, content preview, and category, generate SEO metadata\.

Title: "$\{title\}"

Category: "$\{category\}"

Content Preview: "$\{content\.substring\(0, 500\)\}"

Return a JSON object with:

\- meta\_title \(50\-60 chars\): Catchy, keyword\-rich title with category context

\- meta\_description \(150\-160 chars\): Compelling description with call\-to\-action

\- meta\_keywords: 5\-7 comma\-separated keywords related to title, category, and content

\- slug: URL\-friendly slug \(lowercase, hyphens, no special chars\)

Focus on: real estate selling, cash offers, foreclosure help, inherited properties\.\`;

  try \{

    const response = await base44\.integrations\.Core\.InvokeLLM\(\{

      prompt,

      response\_json\_schema: \{

        type: "object",

        properties: \{

          meta\_title: \{ type: "string" \},

          meta\_description: \{ type: "string" \},

          meta\_keywords: \{ type: "string" \},

          slug: \{ type: "string" \},

        \},

      \},

    \}\);

    return response;

  \} catch \(error\) \{

    console\.error\("Metadata generation failed:", error\);

    // Fallback to basic metadata

    return \{

      meta\_title: title\.substring\(0, 60\),

      meta\_description: content\.substring\(0, 160\),

      meta\_keywords: "real estate, cash home buyer, sell house fast",

      slug: title

        \.toLowerCase\(\)

        \.replace\(/\[^a\-z0\-9\]/g, "\-"\)

        \.replace\(/\-\+/g, "\-"\),

    \};

  \}

\};

/\*\*

 \* Analyzes blog content for SEO readability

 \*/

export const analyzeSEOScore = \(title, content, meta\_description\) => \{

  let score = 0;

  const issues = \[\];

  // Title analysis \(target 50\-60 chars, 8\-12 words\)

  if \(title\.length >= 50 && title\.length <= 60\) \{

    score \+= 15;

  \} else \{

    issues\.push\(

      \`Title is $\{title\.length\} chars \(target: 50\-60\)\`

    \);

  \}

  // Content length \(target 1000\+ words for better SEO\)

  const wordCount = content\.split\(/\\s\+/\)\.length;

  if \(wordCount >= 1000\) \{

    score \+= 20;

  \} else if \(wordCount >= 500\) \{

    score \+= 10;

    issues\.push\(\`Content is $\{wordCount\} words \(target: 1000\+\)\`\);

  \} else \{

    issues\.push\(\`Content too short: $\{wordCount\} words\`\);

  \}

  // Meta description \(target 150\-160 chars\)

  if \(

    meta\_description &&

    meta\_description\.length >= 150 &&

    meta\_description\.length <= 160

  \) \{

    score \+= 15;

  \} else if \(meta\_description\) \{

    issues\.push\(\`Meta description is $\{meta\_description\.length\} chars \(target: 150\-160\)\`\);

  \}

  // Keyword density check \(simple heuristic\)

  const titleWords = title\.toLowerCase\(\)\.split\(/\\s\+/\);

  const contentLower = content\.toLowerCase\(\);

  const keywordMatches = titleWords\.filter\(\(w\) =>

    contentLower\.includes\(w\)

  \)\.length;

  if \(keywordMatches >= titleWords\.length \* 0\.6\) \{

    score \+= 15;

  \} else \{

    issues\.push\("Title keywords not well\-distributed in content"\);

  \}

  // Headings check \(look for markdown headings\)

  const headingCount = \(content\.match\(/^\#\{1,3\}\\s/gm\) || \[\]\)\.length;

  if \(headingCount >= 3\) \{

    score \+= 15;

  \} else \{

    issues\.push\(\`Add more headings \(found: $\{headingCount\}, target: 3\+\)\`\);

  \}

  // Internal link check \(look for markdown links\)

  const linkCount = \(content\.match\(/\\\[\.\+?\\\]\\\(\.\+?\\\)/g\) || \[\]\)\.length;

  if \(linkCount >= 2\) \{

    score \+= 10;

  \} else \{

    issues\.push\("Add 2\+ internal links for better SEO"\);

  \}

  // Lists check \(ordered/unordered\)

  const listCount = \(content\.match\(/^\[\\\*\\\-\\\+\]\\s/gm\) || \[\]\)\.length;

  if \(listCount >= 5\) \{

    score \+= 10;

  \}

  return \{ score: Math\.min\(score, 100\), issues \};

\};
