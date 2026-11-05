// Monoline icons (32x32, stroke = currentColor) for the three services and six sectors.
// Inline SVG: no requests, no inline styles, so the CSP is untouched.
const wrap = (inner) => `<svg class="icon" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

module.exports = {
  skills: wrap('<path d="M4 8l12-4 12 4-12 4z"/><path d="M9 10.5V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-6.5"/><path d="M28 8v8"/><path d="M12 25l3 3 6-6"/>'),
  construction: wrap('<path d="M4 28h24"/><path d="M8 28V14h8v14"/><path d="M16 28V9l9 3v16"/><path d="M12 10V4h8"/><path d="M20 4v3"/>'),
  entry: wrap('<path d="M16 29s9-8 9-15a9 9 0 10-18 0c0 7 9 15 9 15z"/><circle cx="16" cy="14" r="3.5"/>'),
  semiconductor: wrap('<rect x="9" y="9" width="14" height="14" rx="1.5"/><rect x="13" y="13" width="6" height="6"/><path d="M12 9V4M16 9V4M20 9V4M12 28v-5M16 28v-5M20 28v-5M9 12H4M9 16H4M9 20H4M28 12h-5M28 16h-5M28 20h-5"/>'),
  atmp: wrap('<rect x="5" y="6" width="22" height="7" rx="1.5"/><rect x="5" y="14" width="22" height="7" rx="1.5"/><path d="M9 25h14"/><path d="M9.5 9.5h.01M9.5 17.5h.01"/>'),
  datacentre: wrap('<rect x="5" y="4" width="22" height="7" rx="1.5"/><rect x="5" y="12.5" width="22" height="7" rx="1.5"/><rect x="5" y="21" width="22" height="7" rx="1.5"/><path d="M9 7.5h.01M9 16h.01M9 24.5h.01M14 7.5h9M14 16h9M14 24.5h9"/>'),
  pharma: wrap('<path d="M12 4h8M13 4v8l-7 13a2 2 0 001.8 3h16.4a2 2 0 001.8-3L19 12V4"/><path d="M9.5 21h13"/>'),
  battery: wrap('<rect x="3" y="9" width="23" height="14" rx="2"/><path d="M29 14v4"/><path d="M15 12l-3.5 5H16l-2 4 5-6h-4.5z"/>'),
  piping: wrap('<path d="M3 9h12a4 4 0 014 4v6a4 4 0 004 4h6"/><path d="M3 5v8M29 19v8"/>'),
  electrical: wrap('<path d="M18 3L7 18h8l-1 11 11-15h-8z"/>'),
  hvac: wrap('<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="2"/><path d="M16 14c0-5 1-8 4-9M18 17c4 3 4 6 3 9M14 17c-5 0-9 2-10 4"/>'),
  cleanroom: wrap('<rect x="4" y="5" width="24" height="22" rx="1.5"/><path d="M4 12h24M4 19h24M12 5v22M20 5v22"/>'),
  commissioning: wrap('<path d="M5 22a11 11 0 1122 0"/><path d="M16 22l5-7"/><circle cx="16" cy="22" r="1.5"/><path d="M8 27h16"/>'),
  check: wrap('<circle cx="16" cy="16" r="12"/><path d="M10.5 16.5l4 4 7-8"/>'),
  globe: wrap('<circle cx="16" cy="16" r="12"/><path d="M4 16h24M16 4c-4 4-4 20 0 24M16 4c4 4 4 20 0 24"/>'),
  people: wrap('<circle cx="11" cy="11" r="4"/><circle cx="22" cy="12" r="3.2"/><path d="M3 27c0-5 3.5-8 8-8s8 3 8 8"/><path d="M20 20c4 0 9 2 9 7"/>'),
  link: wrap('<path d="M13 19l6-6"/><path d="M11 15l-3 3a4.2 4.2 0 006 6l3-3"/><path d="M21 17l3-3a4.2 4.2 0 00-6-6l-3 3"/>'),
  medical: wrap('<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M16 10v12M10 16h12"/>'),
  transmission: wrap('<path d="M16 3v26M9 29l7-26 7 26"/><path d="M5 11h22M8 18h16"/><path d="M5 11l3 7M27 11l-3 7"/>'),
  defence: wrap('<path d="M16 3l11 4v8c0 7-5 11-11 14C10 26 5 22 5 15V7z"/><path d="M11 16l4 4 6-8"/>'),
  electronics: wrap('<rect x="3" y="6" width="26" height="17" rx="1.5"/><path d="M12 28h8M16 23v5"/><path d="M8 14l3-3 3 4 3-5 3 4"/>'),
  hydrogen: wrap('<circle cx="10" cy="19" r="5"/><circle cx="22" cy="19" r="5"/><path d="M15 19h2"/><path d="M16 4c-2.5 3-4 5-4 7a4 4 0 008 0c0-2-1.5-4-4-7z"/>'),
};
