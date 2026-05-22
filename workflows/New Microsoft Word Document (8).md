# New Microsoft Word Document (8)

Source: New Microsoft Word Document (8).docx

import \{ useEffect, useRef, useState \} from "react";

import L from "leaflet";

import "leaflet/dist/leaflet\.css";

import \{ getNeighborhoodData, generatePopupText, calculateNeighborhoodStats \} from "\./NeighborhoodData";

// Fix Leaflet icon issue

delete L\.Icon\.Default\.prototype\.\_getIconUrl;

L\.Icon\.Default\.mergeOptions\(\{

  iconRetinaUrl: "https://cdnjs\.cloudflare\.com/ajax/libs/leaflet/1\.9\.4/images/marker\-icon\-2x\.png",

  iconUrl: "https://cdnjs\.cloudflare\.com/ajax/libs/leaflet/1\.9\.4/images/marker\-icon\.png",

  shadowUrl: "https://cdnjs\.cloudflare\.com/ajax/libs/leaflet/1\.9\.4/images/marker\-shadow\.png",

\}\);

export default function InteractiveNeighborhoodMap\(\{ cityKey, cityName, height = "500px" \}\) \{

  const mapContainer = useRef\(null\);

  const map = useRef\(null\);

  const \[selectedNeighborhood, setSelectedNeighborhood\] = useState\(null\);

  useEffect\(\(\) => \{

    const neighborhoodData = getNeighborhoodData\(cityKey\);

    if \(\!neighborhoodData || \!mapContainer\.current\) return;

    // Initialize map

    if \(\!map\.current\) \{

      map\.current = L\.map\(mapContainer\.current\)\.setView\(

        neighborhoodData\.center,

        neighborhoodData\.zoom

      \);

      // Add tile layer

      L\.tileLayer\("https://\{s\}\.tile\.openstreetmap\.org/\{z\}/\{x\}/\{y\}\.png", \{

        attribution: '© OpenStreetMap contributors',

        maxZoom: 19,

      \}\)\.addTo\(map\.current\);

    \}

    // Clear existing markers

    map\.current\.eachLayer\(\(layer\) => \{

      if \(layer instanceof L\.Marker\) \{

        map\.current\.removeLayer\(layer\);

      \}

    \}\);

    // Add neighborhood markers

    neighborhoodData\.neighborhoods\.forEach\(\(neighborhood\) => \{

      const stats = calculateNeighborhoodStats\(neighborhood\);

      

      // Create custom marker

      const markerHtml = \`

        <div style="

          background: linear\-gradient\(135deg, \#0B1F45, \#122B5E\);

          color: \#fff;

          padding: 12px 16px;

          border\-radius: 8px;

          border: 2px solid \#D4A843;

          box\-shadow: 0 4px 12px rgba\(0,0,0,0\.3\);

          text\-align: center;

          min\-width: 120px;

          cursor: pointer;

          transition: transform 0\.2s;

        ">

          <div style="font\-size: 18px; margin\-bottom: 4px;">$\{neighborhood\.icon\}</div>

          <div style="font\-weight: 900; font\-size: 13px; margin\-bottom: 4px;">$\{stats\.name\}</div>

          <div style="font\-size: 11px; color: \#D4A843; font\-weight: 700;">✅ $\{stats\.deals\} closed</div>

          <div style="font\-size: 10px; color: \#a0b0c8;">⏱ $\{stats\.avgCloseDays\} days</div>

        </div>

      \`;

      const marker = L\.marker\(neighborhood\.coords, \{

        icon: L\.divIcon\(\{

          html: markerHtml,

          className: "neighborhood\-marker",

          iconSize: \[140, 100\],

          iconAnchor: \[70, 50\],

          popupAnchor: \[0, \-50\],

        \}\),

      \}\)\.addTo\(map\.current\);

      // Bind popup with testimonials

      const popupContent = generatePopupText\(neighborhood\);

      marker\.bindPopup\(popupContent, \{

        maxWidth: 260,

        className: "neighborhood\-popup",

      \}\);

      // Click handlers

      marker\.on\("click", \(\) => \{

        setSelectedNeighborhood\(neighborhood\);

        marker\.openPopup\(\);

      \}\);

    \}\);

    return \(\) => \{

      // Cleanup handled by React

    \};

  \}, \[cityKey\]\);

  return \(

    <div style=\{\{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 16px rgba\(0,0,0,0\.1\)" \}\}>

      \{/\* Header \*/\}

      <div style=\{\{

        background: "linear\-gradient\(135deg, \#0B1F45, \#122B5E\)",

        color: "\#fff",

        padding: "16px 20px",

        display: "flex",

        justifyContent: "space\-between",

        alignItems: "center",

      \}\}>

        <div>

          <h3 style=\{\{ fontSize: 16, fontWeight: 900, margin: "0 0 4px" \}\}>

            📍 Our Service Areas in \{cityName\}

          </h3>

          <p style=\{\{ fontSize: 12, color: "\#a0b0c8", margin: 0 \}\}>

            Click neighborhoods to see recent deals and testimonials

          </p>

        </div>

        \{selectedNeighborhood && \(

          <div style=\{\{

            background: "rgba\(255,255,255,0\.1\)",

            border: "1px solid rgba\(212,168,67,0\.3\)",

            borderRadius: 8,

            padding: "8px 12px",

            fontSize: 12,

            fontWeight: 600,

            color: "\#D4A843",

          \}\}>

            Selected: \{selectedNeighborhood\.name\}

          </div>

        \)\}

      </div>

      \{/\* Map Container \*/\}

      <div

        ref=\{mapContainer\}

        style=\{\{

          height,

          width: "100%",

          position: "relative",

          background: "\#f0f0f0",

        \}\}

      />

      \{/\* Legend \*/\}

      <div style=\{\{

        background: "\#f9f9f9",

        borderTop: "1px solid \#e0e0e0",

        padding: "12px 16px",

        display: "flex",

        gap: 20,

        flexWrap: "wrap",

        fontSize: 12,

      \}\}>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 6 \}\}>

          <span style=\{\{ fontSize: 16 \}\}>📍</span>

          <span style=\{\{ color: "\#666" \}\}>Click markers for details</span>

        </div>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 6 \}\}>

          <span style=\{\{ fontSize: 16 \}\}>✅</span>

          <span style=\{\{ color: "\#666" \}\}>Number of deals closed</span>

        </div>

        <div style=\{\{ display: "flex", alignItems: "center", gap: 6 \}\}>

          <span style=\{\{ fontSize: 16 \}\}>⏱</span>

          <span style=\{\{ color: "\#666" \}\}>Average closing time</span>

        </div>

      </div>

      \{/\* Stats Summary \*/\}

      <div style=\{\{

        background: "\#f0f4ff",

        borderTop: "1px solid \#cce5ff",

        padding: "14px 16px",

        display: "grid",

        gridTemplateColumns: "repeat\(auto\-fit, minmax\(140px, 1fr\)\)",

        gap: 12,

      \}\}>

        \{getNeighborhoodData\(cityKey\)?\.neighborhoods\.map\(\(n\) => \(

          <div key=\{n\.id\} style=\{\{

            padding: "10px",

            background: "\#fff",

            borderRadius: 6,

            textAlign: "center",

            borderLeft: "3px solid \#D4A843",

            cursor: "pointer",

            transition: "all 0\.2s",

          \}\}

            onMouseEnter=\{\(e\) => e\.currentTarget\.style\.boxShadow = "0 2px 8px rgba\(0,0,0,0\.1\)"\}

            onMouseLeave=\{\(e\) => e\.currentTarget\.style\.boxShadow = "none"\}

            onClick=\{\(\) => setSelectedNeighborhood\(n\)\}

          >

            <div style=\{\{ fontSize: 12, fontWeight: 900, color: "\#0B1F45", marginBottom: 4 \}\}>

              \{n\.name\}

            </div>

            <div style=\{\{ fontSize: 11, color: "\#666" \}\}>

              <div>✅ \{n\.deals\_closed\} deals</div>

              <div style=\{\{ color: "\#D4A843", fontWeight: 700 \}\}>

                \{n\.avg\_days\_to\_close\} day close

              </div>

            </div>

          </div>

        \)\)\}

      </div>

      \{/\* Selected Neighborhood Details \*/\}

      \{selectedNeighborhood && \(

        <div style=\{\{

          background: "\#fff",

          borderTop: "1px solid \#e0e0e0",

          padding: "16px",

        \}\}>

          <h4 style=\{\{ fontSize: 14, fontWeight: 800, color: "\#0B1F45", marginBottom: 10, margin: 0 \}\}>

            📍 \{selectedNeighborhood\.name\}

          </h4>

          <div style=\{\{

            display: "grid",

            gridTemplateColumns: "repeat\(auto\-fit, minmax\(120px, 1fr\)\)",

            gap: 12,

            marginTop: 12,

          \}\}>

            <div style=\{\{ background: "\#f0fff4", padding: 10, borderRadius: 6, textAlign: "center" \}\}>

              <div style=\{\{ fontSize: 11, color: "\#666", marginBottom: 4 \}\}>Homes Sold</div>

              <div style=\{\{ fontSize: 20, fontWeight: 900, color: "\#27ae60" \}\}>

                \{selectedNeighborhood\.deals\_closed\}

              </div>

            </div>

            <div style=\{\{ background: "\#fff0f0", padding: 10, borderRadius: 6, textAlign: "center" \}\}>

              <div style=\{\{ fontSize: 11, color: "\#666", marginBottom: 4 \}\}>Avg Close Time</div>

              <div style=\{\{ fontSize: 20, fontWeight: 900, color: "\#c0392b" \}\}>

                \{selectedNeighborhood\.avg\_days\_to\_close\}d

              </div>

            </div>

            <div style=\{\{ background: "\#f0f4ff", padding: 10, borderRadius: 6, textAlign: "center" \}\}>

              <div style=\{\{ fontSize: 11, color: "\#666", marginBottom: 4 \}\}>Testimonials</div>

              <div style=\{\{ fontSize: 20, fontWeight: 900, color: "\#3498db" \}\}>

                \{selectedNeighborhood\.testimonials\.length\}

              </div>

            </div>

          </div>

          <div style=\{\{ marginTop: 14, paddingTop: 14, borderTop: "1px solid \#f0f0f0" \}\}>

            <div style=\{\{ fontSize: 12, fontWeight: 700, color: "\#666", marginBottom: 8 \}\}>

              Recent Testimonials:

            </div>

            <div style=\{\{ display: "flex", flexDirection: "column", gap: 6 \}\}>

              \{selectedNeighborhood\.testimonials\.map\(\(testimonial, i\) => \(

                <div key=\{i\} style=\{\{

                  background: "\#f9f9f9",

                  padding: "8px 10px",

                  borderRadius: 6,

                  fontSize: 12,

                  color: "\#555",

                  borderLeft: "2px solid \#D4A843",

                \}\}>

                  "\{testimonial\}"

                </div>

              \)\)\}

            </div>

          </div>

        </div>

      \)\}

    </div>

  \);

\}
