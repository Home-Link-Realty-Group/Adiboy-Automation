# dealanalyzer

Source: dealanalyzer.docx

/* Deal Analyzer Styles */

.container {

  font-family: 'Segoe UI', Arial, sans-serif;

  background: #f0f2f5;

  min-height: 100vh;

  padding: 24px;

}

.maxWidth {

  max-width: 1200px;

  margin: 0 auto;

}

.header {

  margin-bottom: 24px;

}

.title {

  font-size: 30px;

  font-weight: 900;

  color: #0B1F45;

  margin: 0;

}

.subtitle {

  font-size: 12px;

  color: #8ba3c7;

  margin-top: 4px;

}

.grid2Col {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 24px;

}

.card {

  background: #fff;

  border-radius: 14px;

  padding: 20px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

}

.cardTitle {

  font-weight: 800;

  font-size: 16px;

  color: #0B1F45;

  margin-bottom: 16px;

}

.input {

  width: 100%;

  padding: 11px 14px;

  border: 2px solid #e0e0e0;

  border-radius: 9px;

  font-size: 14px;

  box-sizing: border-box;

  font-weight: 600;

}

.select {

  width: 100%;

  padding: 10px 12px;

  border: 2px solid #e0e0e0;

  border-radius: 9px;

  font-size: 13px;

  background: #fff;

  font-weight: 600;

}

.fieldLabel {

  font-size: 11px;

  font-weight: 700;

  color: #666;

  margin-bottom: 4px;

  display: block;

}

.button {

  background: #D4A843;

  color: #fff;

  border: none;

  border-radius: 10px;

  padding: 12px 24px;

  font-weight: 900;

  font-size: 14px;

  cursor: pointer;

}

.button:hover:not(:disabled) {

  background: #c99a38;

}

.button:disabled {

  background: #ccc;

  cursor: not-allowed;

}

.compGrid {

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  gap: 12px;

}

.compCard {

  border: 1.5px solid #e0e0e0;

  border-radius: 10px;

  padding: 12px;

  font-size: 12px;

  cursor: pointer;

  transition: all 0.15s;

}

.compCard:hover {

  border-color: #D4A843;

  box-shadow: 0 4px 12px rgba(212, 168, 67, 0.2);

}

.resultBox {

  background: linear-gradient(135deg, #0B1F45 0%, #122B5E 100%);

  border-radius: 14px;

  padding: 24px;

  color: #fff;

  text-align: center;

}

.resultValue {

  font-size: 48px;

  font-weight: 900;

  color: #D4A843;

  margin-bottom: 8px;

}

.resultLabel {

  font-size: 12px;

  color: #8ba3c7;

  font-weight: 600;

}

.dealViability {

  border-radius: 14px;

  padding: 20px;

  margin-top: 16px;

}

.viabilityGood {

  background: #f0fff4;

  border: 2px solid #27ae60;

}

.viabilityWarning {

  background: #fff8e1;

  border: 2px solid #f39c12;

}

.viabilityBad {

  background: #fff3f3;

  border: 2px solid #e74c3c;

}
