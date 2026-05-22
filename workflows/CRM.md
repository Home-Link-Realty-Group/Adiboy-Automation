# CRM

Source: CRM.docx

/\* CRM Dashboard Styles \*/

\.container \{

  font\-family: 'Segoe UI', Arial, sans\-serif;

  background: \#f0f2f5;

  min\-height: 100vh;

  display: flex;

\}

\.sidebar \{

  width: 220px;

  background: \#0B1F45;

  color: \#fff;

  flex\-shrink: 0;

  position: fixed;

  height: 100vh;

  overflow\-y: auto;

  z\-index: 100;

\}

\.sidebarHeader \{

  padding: 22px 20px 14px;

  border\-bottom: 1px solid rgba\(255, 255, 255, 0\.08\);

\}

\.sidebarTitle \{

  font\-weight: 900;

  font\-size: 15px;

\}

\.sidebarSubtitle \{

  font\-size: 10px;

  color: \#666;

  margin\-top: 3px;

\}

\.sidebarNav \{

  display: flex;

  flex\-direction: column;

\}

\.sidebarButton \{

  display: flex;

  align\-items: center;

  gap: 10px;

  width: 100%;

  padding: 12px 20px;

  background: transparent;

  border: none;

  border\-left: 3px solid transparent;

  color: \#888;

  cursor: pointer;

  font\-size: 13px;

  font\-weight: 400;

  text\-align: left;

\}

\.sidebarButton:hover,

\.sidebarButton\.active \{

  background: rgba\(230, 57, 70, 0\.2\);

  border\-left\-color: \#D4A843;

  color: \#fff;

\}

\.sidebarButton\.active \{

  font\-weight: 700;

\}

\.sidebarBadge \{

  margin\-left: auto;

  background: \#D4A843;

  color: \#fff;

  font\-size: 10px;

  font\-weight: 700;

  padding: 2px 6px;

  border\-radius: 10px;

\}

\.main \{

  margin\-left: 220px;

  flex: 1;

  padding: 28px;

\}

\.button \{

  background: \#D4A843;

  color: \#fff;

  border: none;

  border\-radius: 8px;

  padding: 10px 20px;

  font\-weight: 700;

  font\-size: 13px;

  cursor: pointer;

\}

\.button:hover \{

  background: \#c99a38;

\}

\.buttonGhost \{

  background: transparent;

  color: \#D4A843;

  border: 1\.5px solid \#D4A843;

  border\-radius: 8px;

  padding: 9px 16px;

  font\-weight: 600;

  font\-size: 13px;

  cursor: pointer;

\}

\.input \{

  width: 100%;

  padding: 9px 12px;

  border: 1\.5px solid \#ddd;

  border\-radius: 8px;

  font\-size: 13px;

  box\-sizing: border\-box;

  font\-family: inherit;

\}

\.card \{

  background: \#fff;

  border\-radius: 12px;

  padding: 20px;

  box\-shadow: 0 1px 6px rgba\(0, 0, 0, 0\.07\);

  margin\-bottom: 16px;

\}

\.scoreCard \{

  background: \#0B1F45;

  border\-radius: 12px;

  padding: 18px 20px;

  margin\-bottom: 20px;

  border: 2px solid rgba\(230, 57, 70, 0\.33\);

  color: \#fff;

\}

\.scoreBorder \{

  display: flex;

  align\-items: center;

  gap: 20px;

  margin\-bottom: 16px;

\}

\.scoreValue \{

  font\-size: 52px;

  font\-weight: 900;

  line\-height: 1;

\}

\.scoreBar \{

  background: \#333;

  border\-radius: 6px;

  height: 8px;

  overflow: hidden;

  position: relative;

  margin\-bottom: 6px;

\}

\.scoreBarFill \{

  height: 100%;

  border\-radius: 8px;

  transition: width 0\.4s;

\}
