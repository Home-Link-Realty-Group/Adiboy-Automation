/* GetOffer page styles — extracted for reduced JS payload */

.pageWrapper {
  fontFamily: "'Segoe UI', Arial, sans-serif";
  color: #0B1F45;
  margin: 0;
  padding: 0;
}

.urgencyBar {
  background: #1a3a1a;
  borderBottom: 1px solid #22c55e33;
  padding: 7px 20px;
  textAlign: center;
  fontSize: 12px;
  color: #4ade80;
  fontWeight: 600;
  letterSpacing: 0.3px;
}

.urgencyContent {
  display: inline-flex;
  alignItems: center;
  gap: 6px;
}

.urgencyDot {
  width: 7px;
  height: 7px;
  borderRadius: 50%;
  background: #22c55e;
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
}

.urgencyLink {
  color: #86efac;
  fontWeight: 800;
  textDecoration: underline;
}

.navigation {
  background: #0B1F45;
  padding: 0 32px;
  display: flex;
  justifyContent: space-between;
  alignItems: center;
  position: sticky;
  top: 0;
  zIndex: 300;
  height: 64px;
  borderBottom: 2px solid rgba(230, 57, 70, 0.3);
}

.navBrand {
  display: flex;
  alignItems: center;
  gap: 10px;
  textDecoration: none;
  flexShrink: 0;
}

.navBrandLogo {
  height: 36px;
  width: auto;
}

.navBrandText {
  color: #fff;
  fontWeight: 900;
  fontSize: 15px;
  lineHeight: 1.1;
}

.navBrandSubtext {
  color: #aaa;
  fontSize: 10px;
  letterSpacing: 0.5px;
}

.navLinks {
  display: flex;
  alignItems: center;
  gap: 24px;
}

.navLink {
  color: #ccc;
  fontSize: 13px;
  textDecoration: none;
  fontWeight: 500;
}

.navCta {
  background: #D4A843;
  color: #fff;
  padding: 10px 18px;
  borderRadius: 8px;
  textDecoration: none;
  fontWeight: 800;
  fontSize: 14px;
  display: flex;
  alignItems: center;
  gap: 6px;
  flexShrink: 0;
}

.funnelContainer {
  padding: 48px 32px;
  textAlign: center;
}

.funnelContent {
  maxWidth: 760px;
  margin: 0 auto;
}

.funnelSubheading {
  display: inline-block;
  background: #D4A84315;
  color: #D4A843;
  fontSize: 11px;
  fontWeight: 700;
  padding: 4px 14px;
  borderRadius: 20px;
  letterSpacing: 1px;
  textTransform: uppercase;
  marginBottom: 16px;
}

.funnelTitle {
  fontSize: clamp(26px, 4vw, 38px);
  fontWeight: 900;
  color: #0B1F45;
  margin: 0 0 14px;
  lineHeight: 1.2;
}

.funnelDescription {
  fontSize: 17px;
  color: #555;
  lineHeight: 1.7;
  marginBottom: 24px;
}

.formWrapper {
  background: #fff;
  borderRadius: 14px;
  padding: 20px 24px;
  marginBottom: 20px;
  boxShadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.progressBar {
  display: flex;
  gap: 8px;
  marginBottom: 20px;
  justifyContent: center;
  flexWrap: wrap;
}

.progressStep {
  height: 4px;
  borderRadius: 2px;
  transition: all 0.3s ease;
}

.progressStepActive {
  background: #D4A843;
}

.progressStepInactive {
  background: #ddd;
}

.formGroup {
  marginBottom: 16px;
  textAlign: left;
}

.formLabel {
  fontSize: 11px;
  fontWeight: 700;
  color: #555;
  display: block;
  marginBottom: 6px;
  textTransform: uppercase;
  letterSpacing: 0.5px;
}

.formInput {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e0e0e0;
  borderRadius: 8px;
  fontSize: 14px;
  fontFamily: inherit;
  boxSizing: border-box;
}

.formSelect {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  borderRadius: 8px;
  fontSize: 13px;
  fontFamily: inherit;
  background: #fff;
}

.formButton {
  width: 100%;
  padding: 14px;
  background: #D4A843;
  color: #fff;
  border: none;
  borderRadius: 8px;
  fontWeight: 900;
  fontSize: 15px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.formButton:hover {
  background: #F0C86A;
  transform: translateY(-1px);
  boxShadow: 0 6px 20px rgba(230, 57, 70, 0.3);
}

.faqSection {
  background: #f8f9fa;
  padding: 60px 32px;
}

.faqContainer {
  maxWidth: 760px;
  margin: 0 auto;
}

.faqTitle {
  fontSize: clamp(24px, 3.5vw, 36px);
  fontWeight: 900;
  margin: 0 0 24px;
  color: #0B1F45;
}

.faqItem {
  borderBottom: 1px solid #f0f0f0;
  paddingTop: 16px;
  paddingBottom: 16px;
}

.faqQuestion {
  fontSize: 14px;
  fontWeight: 700;
  color: #0B1F45;
  cursor: pointer;
  display: flex;
  justifyContent: space-between;
  alignItems: center;
  background: none;
  border: none;
  width: 100%;
  textAlign: left;
}

.faqAnswer {
  fontSize: 13px;
  color: #555;
  lineHeight: 1.8;
  paddingTop: 12px;
  maxWidth: 620px;
}

.bottomCta {
  background: #0B1F45;
  padding: 52px 32px;
  textAlign: center;
}

.bottomCtaContent {
  maxWidth: 560px;
  margin: 0 auto;
}

.bottomCtaTitle {
  fontSize: 28px;
  fontWeight: 900;
  color: #fff;
  marginBottom: 10px;
}

.bottomCtaSubtitle {
  color: #9aa3b5;
  fontSize: 16px;
  marginBottom: 28px;
}

.ctaButtons {
  display: flex;
  gap: 14px;
  justifyContent: center;
  flexWrap: wrap;
}

.ctaButtonPrimary {
  background: #D4A843;
  color: #fff;
  padding: 16px 32px;
  borderRadius: 8px;
  fontWeight: 900;
  textDecoration: none;
  fontSize: 16px;
  boxShadow: 0 4px 20px rgba(230, 57, 70, 0.4);
}

.ctaButtonSecondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 16px 32px;
  borderRadius: 8px;
  fontWeight: 700;
  textDecoration: none;
  fontSize: 16px;
}

.trustBadgesBar {
  background: #fff;
  borderTop: 3px solid #D4A843;
  borderBottom: 3px solid #D4A843;
  padding: 20px 40px;
}

.badgesContent {
  maxWidth: 1100px;
  margin: 0 auto;
  display: flex;
  alignItems: center;
  justifyContent: center;
  gap: 48px;
  flexWrap: wrap;
}

.badge {
  display: flex;
  alignItems: center;
  gap: 12px;
}

.badgeIcon {
  width: 54px;
  height: 54px;
  borderRadius: 8px;
  display: flex;
  alignItems: center;
  justifyContent: center;
  flexShrink: 0;
}

.badgeText {
  fontSize: 14px;
  fontWeight: 800;
  lineHeight: 1.2;
}

.badgeSubtext {
  fontWeight: 700;
  fontSize: 13px;
  marginTop: 2px;
}

.badgeStars {
  display: flex;
  gap: 2px;
  marginTop: 2px;
  fontSize: 12px;
}
