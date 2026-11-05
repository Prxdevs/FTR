// Shared helpers for the page builders. Run a builder with: node _build/build-sector.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Plain-language definitions, written by us (not taken from the client's decks).
// Every one needs client sign-off before launch.
const GLOSSARY = {
  hepa: ['HEPA', 'A very fine air filter that traps almost every airborne particle. It is why a cleanroom stays clean.'],
  iso14644: ['ISO 14644', 'The international standard that grades how clean the air in a cleanroom has to be.'],
  esd: ['ESD', 'Electrostatic discharge: a tiny static spark that can destroy a microchip.'],
  diffpressure: ['differential pressure', 'Keeping the cleaner room at slightly higher air pressure, so dirty air can never drift in.'],
  diwater: ['DI water', 'Deionised water: water stripped of minerals so nothing in it can contaminate a chip.'],
  atmp: ['ATMP', 'Assembly, testing, marking and packaging: the factory step after chips are made.'],
  osat: ['OSAT', 'Outsourced assembly and test: a plant that finishes and checks chips made elsewhere.'],
  ism: ['ISM', 'The India Semiconductor Mission: the government programme backing India’s chip plants.'],
  n1: ['N+1', 'A backup design with one spare unit beyond what the load needs, so one failure changes nothing.'],
  twoN: ['2N', 'A backup design with a complete second system, so a whole side can fail and the hall stays on.'],
  ups: ['UPS', 'Uninterruptible power supply: batteries that carry the load for the seconds before generators start.'],
  crah: ['CRAH/CRAC', 'The cooling units that chill the air in a data hall.'],
  bms: ['BMS/SCADA', 'Control software that monitors and runs a building’s equipment from one place.'],
  ist: ['integrated systems testing', 'Deliberately causing failures, such as a power cut or lost cooling, to prove everything responds as designed.'],
  ce: ['cause-and-effect', 'A matrix proving that every possible fault triggers the right response.'],
  gmp: ['GMP', 'Good Manufacturing Practice: the rules that make medicines safe to produce.'],
  iqoqpq: ['IQ/OQ/PQ', 'Three documented checks: installed correctly, operates correctly, performs correctly over time.'],
  holdpoint: ['hold point', 'A mandatory stop: work cannot continue until a named person signs it off in writing.'],
  itp: ['ITP', 'Inspection and test plan: the written schedule of what gets checked, when and by whom.'],
  ncr: ['non-conformance', 'A formal record that something does not meet specification.'],
  p6: ['Primavera P6', 'The industry-standard software for building and tracking a construction programme.'],
  mep: ['M&E', 'Mechanical and electrical: the working systems of a building, such as power, cooling and piping.'],
  epc: ['EPC', 'Engineering, procurement and construction: one contractor responsible for designing and building a facility.'],
  commissioning: ['commissioning', 'Proving a finished facility actually works as designed before it is handed over.'],
};

const term = (key, label) => {
  const g = GLOSSARY[key];
  if (!g) throw new Error('unknown glossary term: ' + key);
  return `<span class="term-wrap"><button class="term" type="button" aria-expanded="false">${label || g[0]}</button><span class="term__def" role="note">${g[1]}</span></span>`;
};

// Link arrow: a drawn monoline arrow that takes the link's own colour (copper), so it
// belongs to the palette. The logo artwork is left alone and used only as the logo.
const arrowImg = (P, cls = 'link__arrow') => `<svg class="${cls}" viewBox="0 0 16 11" width="16" height="11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M1 5.5h13.5M10 1l4.5 4.5L10 10"/></svg>`;

// Alt text for the stock photography. It describes what is pictured and never implies
// that FTR built it.
const ALT = {
  'gmp-isolator': 'Operators in cleanroom gowns at a stainless-steel isolator line',
  'fire-main': 'Engineer in high-visibility clothing inspecting pipework in a plant room',
  'pipe-runs': 'Insulated pipe runs and cable tray in a services corridor',
  'welding-training': 'Two welders in helmets working at a bench',
  'switchgear-hall': 'A row of electrical switchgear panels in a plant hall',
  'hero-cranes': 'Tower cranes over a large building under construction',
  'plant-exterior': 'Industrial plant exterior with stacks and steel platforms',
  'data-hall': 'Server cabinets in a data hall',
  'process-valves': 'Stainless-steel process pipework, valves and pumps',
  'panel-technician': 'Technician testing an electrical panel with a multimeter',
  'cable-containment': 'Insulated ductwork running overhead',
  'distribution-board': 'Circuit breakers in a distribution board',
  'sector-semiconductor': 'Gowned technician in a white cleanroom corridor',
  'sector-data-centres': 'Server cabinets in a data hall',
  'sector-pharma': 'Gowned operator at a pharmaceutical cleanroom isolator',
  'cleanroom-corridor': 'Technician in a cleanroom suit walking through a cleanroom bay',
  'site-team': 'Construction team in hard hats working on a building site',
  'battery-cells': 'Close-up of cylindrical battery cells',
  'substation': 'Electrical substation with steel structures and lines',
  'transformers': 'Row of high-voltage transformer bushings',
  'site-engineer': 'Engineer in a hard hat and high-visibility vest on site',
  'drawing-review': 'Engineer in a high-visibility vest reviewing drawings with a colleague',
  'lab-gowned': 'Two people in gowns and masks working in a clean laboratory',
  'gloved-tray': 'Gloved hand placing a sample tray in a clean cabinet',
  'conveyor-line': 'Conveyor lines running through a large production hall',
  'panel-test': 'Gloved hands testing a control panel with a multimeter',
  'network-rack': 'Network racks lit blue in a data hall',
  'server-closeup': 'Close-up of server equipment in a rack',
  'circuit-board': 'Close-up of a circuit board and its components',
  'pipe-welder': 'Welder joining a steel pipe on site',
  'electrician-panel': 'Electrician drilling inside an electrical panel',
  'site-supervisor': 'Supervisor in a high-visibility vest holding a hard hat on site',
  'breaker-wiring': 'Wiring and breakers in an electrical installation',
  'storage-tanks': 'Row of white industrial storage tanks under a blue sky',
  'process-tanks': 'Large process tanks inside an industrial hall',
  'workshop-trainees': 'Trainees working on electronics at a workshop bench',
  'welding-sparks': 'Welder at work with sparks',
  'roof-ventilation': 'Ventilation units on a building roof',
  'pipe-fitting': 'Hands fitting insulated pipework',
  'floor-plan': 'Engineer in a hard hat checking a floor plan on a wall',
  'laptop-review': 'Engineers in hard hats reviewing a drawing on a laptop',
  'steel-frame-inspection': 'Engineer with a clipboard in front of a steel frame',
  'tablet-engineer': 'Engineer in a hard hat checking a tablet on site',
  'plan-discussion': 'Two engineers in hard hats discussing a drawing under a steel structure',
  'site-conversation': 'Two engineers in hard hats talking on a construction site',
  'steel-structure': 'Low-angle view of a steel structure under construction',
  'ahmedabad-towers': 'Office towers along a road in Ahmedabad',
  'ahmedabad-bridge': 'Atal pedestrian bridge over the Sabarmati river in Ahmedabad',
  'ahmedabad-dusk': 'High-rise buildings in Ahmedabad at dusk',
  'control-room': 'Engineers working at screens in a control room',
  'lab-interior': 'Clean laboratory interior with stainless benches',
  'steel-tank': 'Stainless-steel process tank',
  'lab-trays': 'Sample trays in a laboratory',
  'chip-tray': 'Gloved hand handling components on a tray',
  'qc-microscope': 'Technician in protective clothing inspecting a sample under a microscope',
  'factory-engineer': 'Engineer in a hard hat and blue coveralls holding a clipboard in a plant',
  'plant-aerial': 'Aerial view of an industrial plant with pipework and tanks',
  'blister-packs': 'Close-up of pharmaceutical blister packs',
  'bench-technician': 'Technician working on electronic equipment at a bench',
  'shaft-inspection': 'Worker in a high-visibility vest inspecting a large machine shaft',
  'factory-floor': 'Worker in a hard hat in a factory hall',
  'cobot-gripper': 'Robotic arm with a gripper in a clean production area',
  'operating-room': 'Modern operating room with surgical lights and equipment',
  'surgery-suite': 'Operating table in a clean surgical suite',
  'pylon-lines': 'High-voltage transmission pylon against an evening sky',
  'towers-field': 'High-voltage transmission towers in an open field at dusk',
  'jet-hangar': 'Business jet inside an aircraft hangar',
  'rocket-assembly': 'Rocket stage under assembly in an aerospace factory',
  'boards-line': 'Electronic circuit boards on a production line',
  'display-panel': 'Industrial control panel with a touch display',
  'wind-solar': 'Wind turbines above a solar farm',
  'crew-vests': 'Workers in high-visibility vests and hard hats working together on site',
  'crew-orange': 'Crew in orange overalls and yellow hard hats at an industrial plant',
  'team-machine': 'Three trainees working together on a machine in a workshop',
  'robotics-lab': 'Robotic arms on a production line in a training lab',
};
const alt = (name) => ALT[name] || '';
const link = (P, href, text) => `<a class="link" href="${href}">${text} ${arrowImg(P)}</a>`;

const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&rsquo;/g, '’').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

const faq = (items) => `<div class="faq">
${items.map(([q, a]) => `        <details class="faq__item"><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
      </div>`;

const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
});

const next = (P, href, label, title) => `<a class="next reveal" href="${href}">
        <span class="next__label">${label}</span>
        <span class="next__title">${title} ${arrowImg(P)}</span>
      </a>`;

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const write = (rel, s) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, s);
};

// Client brief: NO physical address anywhere; contact is info@ftright.com; legal name in
// Title Case; LinkedIn URL to follow (add to sameAs when supplied).
const organization = {
  '@type': 'Organization', '@id': 'https://ftright.com/#organization',
  name: 'FTR', alternateName: 'First Time Right', legalName: 'Ftright Tech-Infra & Solutions Private Limited',
  url: 'https://ftright.com/', logo: 'https://ftright.com/assets/img/ftr-logo-64.png',
  areaServed: { '@type': 'Country', name: 'India' },
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', email: 'info@ftright.com' }],
};

module.exports = { ROOT, GLOSSARY, term, link, arrowImg, alt, plain, faq, faqSchema, next, read, write, organization };
