# PULSE: Population-level Lung Cancer Screening Engine

PULSE is a data-driven ROI dashboard designed for the **Return on Prevention** challenge. It quantifies the economic and clinical impact of localized lung cancer screening programs in **Philadelphia (Grays Ferry)** and **Chicago (Fuller Park)**.

## 🚀 Presentation Deep Dive
For a detailed presentation script and speaker notes, see:
- [Presentation Script & Speaker Notes](file:///Users/himasaitummala/.gemini/antigravity/brain/da2a0716-f4f2-4b29-b13b-f008789de5f3/presentation_script.md)

## 📊 Return on Prevention Model
Our model uses hyper-local neighborhood data to demonstrate that **Equity is Efficiency**. Unlike city-level averages, PULSE highlights the "Yield Bonus" achieved by targeting specific high-risk hotspots.

### Key Metrics
- **Net Economic Impact**: Cumulative savings from shifting diagnoses from Stage IV to Stage I, minus infrastructure and variable costs.
- **Estimated Lives Saved**: Calculated using a **57% survival improvement delta** (American Lung Association 2024).
- **Equity Efficiency (ROI)**: Proves that targeted interventions in underserved areas yield a higher return on investment due to the concentration of risk factors.

## 🧪 Technical Documentation
- **[Metrics Overview](file:///Users/himasaitummala/.gemini/antigravity/brain/da2a0716-f4f2-4b29-b13b-f008789de5f3/metrics_overview.md)**: Breakdown of all constants ($5M fixed cost, $150 screening cost) and formulas.
- **[Latest Walkthrough](file:///Users/himasaitummala/.gemini/antigravity/brain/da2a0716-f4f2-4b29-b13b-f008789de5f3/walkthrough.md)**: Visual evidence of the dashboard's sensitivity scaling and city-specific projections.

## 🛠 Project Structure
- `src/App.jsx`: Core dashboard logic including the `calculateROI` clinical model.
- `metrics_overview.md`: Technical documentation for ROI logic.
- `presentation_script.md`: Prepared script for the final datathon presentation.

## 📡 Verified Data Sources
- **Chicago**: Fuller Park indicators via [Chicago Health Atlas](https://chicagohealthatlas.org/).
- **Philadelphia**: Grays Ferry cancer registry data via [Drexel Urban Health Collaborative](https://drexel.edu/uhc/).
- **Clinical**: [American Lung Association 2024 Report](https://www.lung.org/) and [NIH Treatment Cost Benchmarks](https://pubmed.ncbi.nlm.nih.gov/).

---
*Created for the Datathon Question 5: Return on Prevention.*
