# homemodule

Source: homemodule.docx

/\* Home page styles — extracted from inline to reduce JS payload \*/

\.heroSection \{

  background: linear\-gradient\(135deg, \#0B1F45 0%, \#122B5E 100%\);

  padding: 70px 32px 80px;

  text\-align: center;

  position: relative;

  overflow: hidden;

\}

\.heroSection::before \{

  content: '';

  position: absolute;

  inset: 0;

  backgroundImage: radial\-gradient\(circle at 20% 50%, rgba\(230, 57, 70, 0\.08\) 0%, transparent 50%\), 

                   radial\-gradient\(circle at 80% 50%, rgba\(52, 152, 219, 0\.06\) 0%, transparent 50%\);

\}

\.heroContent \{

  position: relative;

  maxWidth: 760px;

  margin: 0 auto;

\}

\.trustLine \{

  display: inline\-flex;

  alignItems: center;

  gap: 8px;

  background: rgba\(255, 255, 255, 0\.07\);

  border: 1px solid rgba\(255, 255, 255, 0\.15\);

  borderRadius: 30px;

  padding: 6px 16px;

  marginBottom: 24px;

  fontSize: 12px;

  color: \#ccc;

\}

\.heroTitle \{

  fontSize: clamp\(32px, 5vw, 52px\);

  fontWeight: 900;

  color: \#fff;

  lineHeight: 1\.15;

  margin: 0 0 18px;

\}

\.heroTitle strong \{

  color: \#D4A843;

\}

\.heroSubtitle \{

  fontSize: clamp\(15px, 2vw, 20px\);

  color: \#b0b8c8;

  maxWidth: 560px;

  margin: 0 auto 36px;

  lineHeight: 1\.6;

\}

\.addressForm \{

  maxWidth: 580px;

  margin: 0 auto 24px;

\}

\.formContainer \{

  display: flex;

  gap: 0;

  background: \#fff;

  borderRadius: 12px;

  overflow: hidden;

  boxShadow: 0 8px 40px rgba\(0, 0, 0, 0\.3\);

\}

\.formInput \{

  flex: 1;

  display: flex;

  alignItems: center;

  padding: 0 16px;

  gap: 8px;

\}

\.formInput input \{

  flex: 1;

  border: none;

  outline: none;

  fontSize: 15px;

  padding: 18px 0;

  fontFamily: inherit;

  color: \#0B1F45;

\}

\.formButton \{

  background: \#D4A843;

  color: \#fff;

  border: none;

  padding: 18px 28px;

  fontWeight: 900;

  fontSize: 15px;

  cursor: pointer;

  whiteSpace: nowrap;

  letterSpacing: 0\.3px;

\}

\.trustBar \{

  display: flex;

  justifyContent: center;

  gap: 24px;

  flexWrap: wrap;

  fontSize: 12px;

  color: \#888;

  marginBottom: 16px;

\}

\.trustItem \{

  color: \#a0aab8;

\}

\.secondaryCta \{

  fontSize: 13px;

  color: \#6b7280;

\}

\.secondaryCta a \{

  color: \#F0C86A;

  fontWeight: 800;

  textDecoration: none;

\}

\.trustBadgesBar \{

  background: \#f8f9fa;

  borderBottom: 1px solid \#e8e8e8;

  borderTop: 1px solid \#e8e8e8;

  padding: 16px 32px;

\}

\.trustBadgesContainer \{

  maxWidth: 900px;

  margin: 0 auto;

  display: flex;

  justifyContent: center;

  alignItems: center;

  gap: 40px;

  flexWrap: wrap;

\}

\.badgeItem \{

  display: flex;

  alignItems: center;

  gap: 8px;

  fontSize: 13px;

  fontWeight: 600;

  color: \#444;

\}

\.socialProofSection \{

  background: \#fff;

  padding: 50px 32px;

\}

\.testimonialContainer \{

  maxWidth: 800px;

  margin: 0 auto;

  textAlign: center;

\}

\.testimonialQuote \{

  fontSize: clamp\(18px, 2\.5vw, 24px\);

  fontStyle: italic;

  color: \#333;

  lineHeight: 1\.6;

  marginBottom: 20px;

\}

\.testimonialAuthor \{

  fontWeight: 800;

  color: \#0B1F45;

  fontSize: 14px;

\}

\.testimonialLocation \{

  color: \#888;

  fontSize: 12px;

  marginTop: 2px;

\}

\.dotsContainer \{

  display: flex;

  justifyContent: center;

  gap: 8px;

  marginTop: 20px;

\}

\.dot \{

  width: 8px;

  height: 8px;

  borderRadius: 50%;

  background: \#ddd;

  border: none;

  cursor: pointer;

\}

\.dotActive \{

  background: \#D4A843;

\}

\.starsContainer \{

  display: flex;

  justifyContent: center;

  gap: 6px;

  marginTop: 16px;

\}

\.star \{

  color: \#ffd700;

  fontSize: 22px;

\}
