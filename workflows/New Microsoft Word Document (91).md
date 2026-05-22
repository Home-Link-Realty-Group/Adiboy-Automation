# New Microsoft Word Document (91)

Source: New Microsoft Word Document (91).docx

/\*\*

 \* Shared CSV parsing utility for scraper pages\.

 \* Handles quoted fields, normalizes common column variants\.

 \*/

export function parseCSV\(text\) \{

  const lines = text\.trim\(\)\.split\("\\n"\);

  if \(lines\.length < 2\) return \[\];

  const headers = lines\[0\]\.split\(","\)\.map\(h => h\.replace\(/"/g, ""\)\.trim\(\)\.toLowerCase\(\)\.replace\(/\\s\+/g, "\_"\)\);

  return lines\.slice\(1\)\.map\(line => \{

    const vals = \[\];

    let cur = "", inQ = false;

    for \(const ch of line\) \{

      if \(ch === '"'\) inQ = \!inQ;

      else if \(ch === ',' && \!inQ\) \{ vals\.push\(cur\.trim\(\)\); cur = ""; \}

      else cur \+= ch;

    \}

    vals\.push\(cur\.trim\(\)\);

    const obj = \{\};

    headers\.forEach\(\(h, i\) => \{ obj\[h\] = \(vals\[i\] || ""\)\.replace\(/"/g, ""\)\.trim\(\); \}\);

    if \(\!obj\.name && \(obj\.owner\_name || obj\.first\_name\)\) \{

      obj\.name = obj\.owner\_name || \`$\{obj\.first\_name || ""\} $\{obj\.last\_name || ""\}\`\.trim\(\);

    \}

    if \(\!obj\.address && obj\.property\_address\) obj\.address = obj\.property\_address;

    if \(\!obj\.arv\_estimate && obj\.estimated\_value\) obj\.arv\_estimate = obj\.estimated\_value;

    return obj;

  \}\)\.filter\(r => r\.address || r\.name\);

\}
