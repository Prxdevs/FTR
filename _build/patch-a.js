const fs = require('fs');
const f = __dirname + '/pages-a.js';
let s = fs.readFileSync(f, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 60)); s = s.replace(a, b); };

// Services overview: CTA on white after the navy flow section
rep("${ctaSection(P, {}, '', ' on-navy')}\n`,\n  });\n}\n\n// ---------------------------------------------------------------- Skills", "${ctaSection(P, {}, '', '')}\n`,\n  });\n}\n\n// ---------------------------------------------------------------- Skills");

// Skills: facts row with aligned numerals
rep(`<dd class="fact__value fact__value--text">6 + 3 weeks</dd><p class="fact__note">Cleanroom Construction Fundamentals + EHS Safe-Site Pass</p>`,
    `<dd class="fact__value"><span class="count" data-to="9" data-pad="2">09</span><span class="fact__unit">weeks</span></dd><p class="fact__note">Cleanroom Construction Fundamentals (6) + EHS Safe-Site Pass (3)</p>`);
rep(`<dt class="fact__label">Per pathway</dt><dd class="fact__value fact__value--text">360&ndash;1,120 hrs</dd><p class="fact__note">Core trade pathways ~16 weeks, commissioning ~8 weeks</p>`,
    `<dt class="fact__label">Core trade pathway</dt><dd class="fact__value">~16<span class="fact__unit">weeks</span></dd><p class="fact__note">Commissioning ~8 weeks. 360&ndash;1,120 hours per pathway</p>`);
rep(`<dt class="fact__label">Mandatory foundation</dt>`, `<dt class="fact__label">Foundation for all</dt>`);

// Skills: trades, tiers, bars, band
rep("${head('How the certification works')}\n      <dl class=\"facts\">", "${head('How the certification works')}\n      <dl class=\"facts\">");
rep("    ['Sectors served', 'Semiconductor fabs, ATMP/OSAT, hyperscale data centres, pharma cleanrooms, EV/battery gigafactories, green hydrogen.'],\n  ])}` })}",
    "    ['Sectors served', 'Semiconductor fabs, ATMP/OSAT, hyperscale data centres, pharma cleanrooms, EV/battery gigafactories, green hydrogen.'],\n  ])}` })}\n\n" +
    "${sec({ id: 'trades', tone: 'on-paper', num: '02', label: 'Trades covered', body: `${head('Five trades, one standard.')}\n${trades([['piping', 'Process and utility piping'], ['electrical', 'Electrical'], ['hvac', 'HVAC'], ['cleanroom', 'Cleanroom fit-out'], ['commissioning', 'Commissioning']])}` })}\n\n" +
    "${sec({ id: 'tiers', num: '03', label: 'Certification tiers', body: `${head('Three certification tiers.')}\n${tiers(['Foundation', 'Trade Specialist', 'Deployment-Ready Diploma'])}` })}\n\n" +
    "${sec({ id: 'length', tone: 'on-paper', num: '04', label: 'Programme length', body: `${head('Nine programmes, measured in weeks.')}\n${bars()}` })}\n\n" +
    "${band(P, { id: 'trainer-h', img: 'panel-technician', label: 'Train-the-trainer', title: 'Capability that stays in India.', text: 'Master trainers certify Indian instructors so capability stays in India.', href: P + 'careers/#trainer', linkText: 'Become a trainer' })}");

// Construction: meters, band
rep(`<span class="card3__num">01</span><h3 class="card3__title">Specialist consultancy</h3>`, `<span class="card3__num">01</span>\${meter(1, 'Advice')}<h3 class="card3__title">Specialist consultancy</h3>`);
rep(`<span class="card3__num">02</span><h3 class="card3__title">Package delivery</h3>`, `<span class="card3__num">02</span>\${meter(2, 'Packages')}<h3 class="card3__title">Package delivery</h3>`);
rep(`<span class="card3__num">03</span><h3 class="card3__title">Full EPC</h3>`, `<span class="card3__num">03</span>\${meter(3, 'Everything')}<h3 class="card3__title">Full EPC</h3>`);
rep("${sec({ id: 'people', tone: 'on-paper', num: '02', label: 'Who delivers'", "${band(P, { id: 'class-h', img: 'data-hall', label: 'A different facility class', title: 'General M&amp;E practice does not transfer.', text: 'Semiconductor fabs, data centres and cleanrooms are a different facility class. FTR brings Irish and European mission-critical execution standards to Indian projects.', href: P + 'why-ftr/', linkText: 'Why FTR' })}\n\n${sec({ id: 'people', tone: 'on-paper', num: '02', label: 'Who delivers'");

// Entry: route graphic + band
rep("${sec({ id: 'detail', tone: 'on-paper', num: '02', label: 'What to expect', body: `${head('Where, who and how fast.')}\n${kv([",
    "${sec({ id: 'detail', tone: 'on-paper', num: '02', label: 'What to expect', body: `${head('Where, who and how fast.')}\n${route(['Ireland', 'Finland', 'Netherlands', 'Sweden', 'Denmark', 'Germany', 'Belgium', 'and wider Europe'])}\n${kv([");
rep("${sec({ id: 'context', num: '03', label: 'Market context'", "${band(P, { id: 'pilot-h', img: 'distribution-board', label: 'Pilot offer', title: '180-day target to construction readiness.', text: 'Permissions and licences driven through proven channels, while you keep every decision.', href: P + 'contact/?type=india-market-entry', linkText: 'Book an India entry call' })}\n\n${sec({ id: 'context', num: '03', label: 'Market context'");
fs.writeFileSync(f, s);
console.log('patched pages-a');
