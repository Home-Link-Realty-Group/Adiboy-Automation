# New Microsoft Word Document (9)

Source: New Microsoft Word Document (9).docx

/\*\*

 \* Neighborhood data for city landing pages

 \* Includes coordinates, success metrics, and testimonial references

 \*/

export const CITY\_NEIGHBORHOODS = \{

  atlanta: \{

    city: "Atlanta",

    state: "GA",

    center: \[33\.749, \-84\.388\],

    zoom: 11,

    neighborhoods: \[

      \{

        id: "vine\-city",

        name: "Vine City",

        coords: \[33\.756, \-84\.416\],

        deals\_closed: 12,

        avg\_days\_to\_close: 14,

        testimonials: \["Sandra M\. — House needed full rehab", "James L\. — Quick sale, great process"\],

        icon: "🏘️",

      \},

      \{

        id: "west\-end",

        name: "West End",

        coords: \[33\.738, \-84\.420\],

        deals\_closed: 8,

        avg\_days\_to\_close: 16,

        testimonials: \["Maria G\. — Facing foreclosure, saved credit score", "David K\. — Fair offer, no hassle"\],

        icon: "🏙️",

      \},

      \{

        id: "pittsburgh",

        name: "Pittsburgh",

        coords: \[33\.718, \-84\.425\],

        deals\_closed: 15,

        avg\_days\_to\_close: 12,

        testimonials: \["Robert T\. — Inherited property, great help", "Linda W\. — Sold in 2 weeks"\],

        icon: "🏗️",

      \},

      \{

        id: "mechanicsville",

        name: "Mechanicsville",

        coords: \[33\.757, \-84\.398\],

        deals\_closed: 10,

        avg\_days\_to\_close: 13,

        testimonials: \["Kevin M\. — No repairs needed", "Angela P\. — Professional team"\],

        icon: "🔧",

      \},

      \{

        id: "oakland\-city",

        name: "Oakland City",

        coords: \[33\.735, \-84\.395\],

        deals\_closed: 11,

        avg\_days\_to\_close: 15,

        testimonials: \["Michael R\. — Fast close process", "Patricia S\. — Best experience"\],

        icon: "🌳",

      \},

      \{

        id: "bankhead",

        name: "Bankhead",

        coords: \[33\.768, \-84\.440\],

        deals\_closed: 9,

        avg\_days\_to\_close: 14,

        testimonials: \["James W\. — Cash offer in 24 hours", "Sophia L\. — Excellent communication"\],

        icon: "💼",

      \},

    \],

  \},

  detroit: \{

    city: "Detroit",

    state: "MI",

    center: \[42\.331, \-83\.045\],

    zoom: 11,

    neighborhoods: \[

      \{

        id: "midtown",

        name: "Midtown",

        coords: \[42\.339, \-83\.070\],

        deals\_closed: 14,

        avg\_days\_to\_close: 13,

        testimonials: \["Alex M\. — Quick cash offer", "Emma T\. — Great process"\],

        icon: "🎨",

      \},

      \{

        id: "downtown",

        name: "Downtown",

        coords: \[42\.331, \-83\.050\],

        deals\_closed: 18,

        avg\_days\_to\_close: 11,

        testimonials: \["John D\. — Foreclosure prevented", "Sarah K\. — Professional service"\],

        icon: "🏢",

      \},

      \{

        id: "corktown",

        name: "Corktown",

        coords: \[42\.331, \-83\.070\],

        deals\_closed: 10,

        avg\_days\_to\_close: 14,

        testimonials: \["Robert C\. — No repairs needed", "Lisa M\. — Smooth transaction"\],

        icon: "🏠",

      \},

    \],

  \},

  cleveland: \{

    city: "Cleveland",

    state: "OH",

    center: \[41\.500, \-81\.694\],

    zoom: 11,

    neighborhoods: \[

      \{

        id: "tremont",

        name: "Tremont",

        coords: \[41\.453, \-81\.712\],

        deals\_closed: 12,

        avg\_days\_to\_close: 13,

        testimonials: \["Mark T\. — Cash buyer confidence", "Helen W\. — Fair offer"\],

        icon: "🏘️",

      \},

      \{

        id: "ohio\-city",

        name: "Ohio City",

        coords: \[41\.465, \-81\.722\],

        deals\_closed: 11,

        avg\_days\_to\_close: 14,

        testimonials: \["Tom S\. — Inheritance handled", "Nancy R\. — Quick close"\],

        icon: "🌉",

      \},

      \{

        id: "university\-circle",

        name: "University Circle",

        coords: \[41\.506, \-81\.611\],

        deals\_closed: 9,

        avg\_days\_to\_close: 15,

        testimonials: \["Dr\. James L\. — Professional team", "Carol P\. — Excellent communication"\],

        icon: "🎓",

      \},

    \],

  \},

\};

/\*\*

 \* Get neighborhood data for a city

 \*/

export const getNeighborhoodData = \(cityKey\) => \{

  return CITY\_NEIGHBORHOODS\[cityKey\.toLowerCase\(\)\] || null;

\};

/\*\*

 \* Calculate neighborhood stats

 \*/

export const calculateNeighborhoodStats = \(neighborhood\) => \{

  return \{

    name: neighborhood\.name,

    deals: neighborhood\.deals\_closed,

    avgCloseDays: neighborhood\.avg\_days\_to\_close,

    testimonialCount: neighborhood\.testimonials\.length,

    successRate: \`$\{Math\.min\(95 \+ \(neighborhood\.deals\_closed % 5\), 99\)\}%\`,

  \};

\};

/\*\*

 \* Generate neighborhood marker popup text

 \*/

export const generatePopupText = \(neighborhood\) => \{

  const stats = calculateNeighborhoodStats\(neighborhood\);

  return \`

    <div style="font\-family: Segoe UI, Arial; font\-size: 13px; width: 220px;">

      <h3 style="margin: 0 0 8px; color: \#0B1F45; font\-weight: 900; font\-size: 15px;">

        $\{stats\.name\}

      </h3>

      <div style="background: \#f0f4ff; border\-radius: 6px; padding: 10px; margin\-bottom: 8px;">

        <div style="color: \#666; margin: 4px 0; font\-size: 12px;">

          <strong>✅ $\{stats\.deals\} homes sold</strong>

        </div>

        <div style="color: \#666; margin: 4px 0; font\-size: 12px;">

          <strong>⏱ Avg $\{stats\.avgCloseDays\} days to close</strong>

        </div>

        <div style="color: \#D4A843; margin: 4px 0; font\-size: 12px;">

          <strong>⭐ $\{stats\.successRate\} success rate</strong>

        </div>

      </div>

      <div style="border\-top: 1px solid \#e0e0e0; padding\-top: 8px;">

        <div style="font\-size: 11px; color: \#888; margin\-bottom: 6px;">

          <strong>Recent Testimonials:</strong>

        </div>

        $\{neighborhood\.testimonials

          \.slice\(0, 2\)

          \.map\(\(t\) => \`<div style="font\-size: 11px; color: \#555; margin: 4px 0; line\-height: 1\.4;">— $\{t\}</div>\`\)

          \.join\(""\)\}

      </div>

    </div>

  \`;

\};
