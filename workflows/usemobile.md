# usemobile

Source: usemobile.docx

import \* as React from "react"

const MOBILE\_BREAKPOINT = 768

export function useIsMobile\(\) \{

  const \[isMobile, setIsMobile\] = React\.useState\(undefined\)

  React\.useEffect\(\(\) => \{

    const mql = window\.matchMedia\(\`\(max\-width: $\{MOBILE\_BREAKPOINT \- 1\}px\)\`\)

    const onChange = \(\) => \{

      setIsMobile\(window\.innerWidth < MOBILE\_BREAKPOINT\)

    \}

    mql\.addEventListener\("change", onChange\)

    setIsMobile\(window\.innerWidth < MOBILE\_BREAKPOINT\)

    return \(\) => mql\.removeEventListener\("change", onChange\);

  \}, \[\]\)

  return \!\!isMobile

\}
