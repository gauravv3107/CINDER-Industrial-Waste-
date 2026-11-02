# CINDER — B2B Thermal-Energy and Circular-Hardware Marketplace

> **"A better use for every degree."**  
> Enterprise-grade front-end built for AI data centers and circular thermal off-takers across Northern Virginia.

---

## 1. Quick Start & Run Commands

```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server (hot-module replacement)
npm run dev

# 3. Compile zero-warning production build
npm run build

# 4. Preview compiled production bundle
npm run preview
```

The application runs on `http://localhost:5173/`.

---

## 2. Route Map

| Path | Screen Name | Key Interactivity |
| :--- | :--- | :--- |
| `/` | **Executive Overview** | Live synced UTC clock, 4 animated count-up KPI cards with mini sparklines, 7D/30D/90D AreaChart toggle, live fluid visualizer ("Heat in motion"), real-time pipeline feed (auto-updates every 6s), and EPA Carbon Certificate launcher. |
| `/matchmaker` | **AI Thermal Matchmaker** | Dynamic hydraulic input sliders (35°C–65°C temp, flow rate, max distance), live capacity computation ($\dot{Q} = 1.20\text{ MW}$), thermodynamic loss gauge (7.4%), 12 ranked off-taker cards (Potomac 96%, Blue Ridge 91%, Dulles 84%), "Why this match?" AI rationale modal with streaming typing effect, facility detail drawer, and route schematic modal. |
| `/marketplace` | **Circular Hardware** | 24+ circular enterprise hardware listings (NVIDIA H100 SXM5 lot, H100 PCIe, A100, Vertiv CDUs, Dell AI servers), live auction countdowns, condition & price filters, Place Bid modal with stepper validation, My Bids slide-over drawer, and List Equipment form modal. |
| `/jobs` | **Green Infrastructure Jobs** | 10+ high-impact thermal/HVAC contracts, dynamic AI skill matching, List / Grid view toggle, interactive candidate profile (Alex Morgan), and real-time resume re-parsing simulation that recomputes match percentages. |
| `*` | **404 Catch-All** | Engineering-styled fallback with quick navigation recovery. |

---

## 3. Recommended 4-Minute Demo Walkthrough Script

1. **Executive Overview (`/`)**:
   - Notice the live-updating `SYNCED hh:mm:ss UTC` clock and the calm enterprise dark aesthetic (`#0F172A`).
   - Observe the **Heat in motion** widget at the bottom-left: notice the 3 nodes (ASH-01 64°C → HX-04 61°C → Potomac 58°C) with animated flowing fluid particles whose speed scales with flow rate.
   - Watch the **Pipeline activity** table on the bottom-right update every ~6s as trades advance from Review to Contracting to Delivering with highlight flashes.
   - Click the **Date-range pill** (`02 Oct – 31 Oct 2026`) and switch to **Last 7 days**: watch the 4 KPI values and AreaChart animate immediately.
   - Click **Export report** to trigger a real CSV report download (`CINDER_Executive_Report_Oct2026.csv`).
   - Click **View sample** on the Carbon card: explore the formal EPA Carbon Certificate preview modal with serif display headline and click **Download sample (HTML)**.

2. **AI Thermal Matchmaker (`/matchmaker`)**:
   - Observe the left panel: defaults show `64°C`, `28.6 L/s`, yielding `1.20 MW` recoverable thermal capacity.
   - Check the **Thermodynamic loss gauge**: displays `7.4%` (Within threshold).
   - In the ranked facilities list on the right, observe the top 3 results:
     - **#1 Potomac District Energy**: `96% THERMAL MATCH` (Best fit)
     - **#2 Blue Ridge Growers**: `91% THERMAL MATCH`
     - **#3 Dulles Aquatics Center**: `84% THERMAL MATCH`
   - Click **"Why this match?"** on #1 Potomac: observe the streaming AI rationale typing effect and the four weighted score bars (48% Temp, 25% Distance, 20% Continuity, 15% Capacity). Click **View inputs ↗** to expand the parameter table.
   - Adjust the **Supply temperature slider** or **Distance slider**: watch the rankings and "compatible facilities" count recalculate in real time.
   - Click **View facility** on any card to slide open the technical facility drawer with the compact radial loss gauge.
   - Click **Explore route** on the bottom green banner to inspect the SVG corridor schematic along Route 28.

3. **Circular Hardware Marketplace (`/marketplace`)**:
   - Filter by category chips: click **Enterprise GPUs** or **Liquid cooling rigs** to see instant filtering with dynamic counts.
   - Inspect the cards: custom inline SVG vector illustrations for GPUs, rack servers, CDUs, and immersion tanks; live countdown timers ("Ends in 4h 32m"); and verified test reports.
   - Click **Place bid** on any card: use the quantity stepper, enter a bid, and submit. Notice the success confirmation, the updated bid count, the toast notification, and open **My bids · N** to verify the active bid record.
   - Click **List equipment** to open the modal and test adding a new hardware listing.

4. **Green Infrastructure Job Board (`/jobs`)**:
   - Toggle the **List / Grid** view control.
   - Check the candidate sidebar on the right: Alex Morgan (86% profile strength, `Alex_Morgan_Resume.pdf`, 14 skills).
   - Click **Update resume**: watch the simulated document parsing spinner; notice the notification toast, the profile strength jumping to 95%, and match scores re-ranking!
   - Click **View contract** to inspect the required vs. matched skills breakdown and submit an application.

5. **Global Shell & Theming**:
   - Click the **Sun icon** in the header to switch to **Light mode**: verify that all cards, charts, gauges, and tables adapt instantly with crisp high-contrast readability.
   - Switch back to **Dark mode** (persists in `localStorage` without flash on reload).
   - Press **⌘K** (or Ctrl+K): type `H100` to inspect categorized cross-entity search results.
   - Click the **Workspace Switcher** ("Equinix DC-04 · Ashburn") and switch to "Digital Realty IAD-12 · Sterling": observe the workspace update and the source parameters update in the Matchmaker.
   - Click the **Notification bell** and click **Mark all read** to clear the amber indicator dot.

---

## 4. Technical Architecture & Future-Proofing

- **Front-End Stack**: React 18, Vite, Tailwind CSS v3.4 (`darkMode: 'class'`), Recharts, Lucide React, and `@fontsource` packages (Inter, JetBrains Mono, Newsreader).
- **Handcrafted UI Primitives**: No third-party UI component libraries (no MUI, Chakra, or Shadcn); 100% custom-crafted primitives with full keyboard focus rings (`focus-visible:ring-2`) and ARIA roles.
- **Service Layer**: Every data interaction (`getFacilities`, `getHardwareListings`, `placeListingBid`, `getJobs`, `getMatchRationale`) is isolated in `src/services/` with async latency simulation and detailed JSDoc comments mapping to future MERN REST endpoints and MongoDB Atlas 2dsphere `$geoNear` aggregation queries.
- **Thermodynamic Engine (`src/utils/thermo.js`)**: Real physics math computing:
  $$\dot{Q} = \dot{m} \times c_p \times \Delta T$$
  $$Loss (\%) = \text{Distance (km)} \times 3.083 \times \sqrt{\Delta T / 49}$$
  $$\text{Score} = \frac{48 \cdot S_{temp} + 25 \cdot S_{dist} + 20 \cdot S_{cont} + 15 \cdot S_{cap}}{108}$$
