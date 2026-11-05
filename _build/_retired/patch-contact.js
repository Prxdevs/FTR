// Adds a short FAQ to /contact/ (safe to re-run). Questions are OURS; answers draw on MD 17, 18, 28.
const { faq, faqSchema, read, write } = require('./lib');

const items = [
  ['Do I have to commit to anything by getting in touch?', 'No. The first step is one working session on the facility, the programme and the current constraint. Nothing beyond it is asked of you until it is worth asking.'],
  ['Who will reply?', 'A director. Enquiries are routed by type, so a facility project reaches delivery and a skills or government enquiry reaches the right director, and you are not handed on.'],
  ['What should I tell you?', 'The type of facility, where it is, the stage it is at, and the constraint you are trying to solve. A few lines is plenty.'],
];

let html = read('contact/index.html');
html = html.replace(/\n?<!-- faq:start -->[\s\S]*?<!-- faq:end -->\n?/g, '\n');
html = html.replace(/\n?<script type="application\/ld\+json" id="faq-ld">[\s\S]*?<\/script>\n?/g, '\n');

const section = `<!-- faq:start -->
  <section class="section gate" id="questions" aria-labelledby="questions-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">02</span>
        <span class="label" id="questions-h">Questions</span>
        <span class="gate__status">Before you write</span>
      </div>

      ${faq(items)}
    </div>
  </section>
  <!-- faq:end -->

`;
const anchor = '  <section class="section on-navy gate" aria-labelledby="path-h">';
if (!html.includes(anchor)) throw new Error('anchor not found');
html = html.replace(anchor, section + anchor);

const ld = `<script type="application/ld+json" id="faq-ld">\n${JSON.stringify({ '@context': 'https://schema.org', ...faqSchema(items) }, null, 2)}\n</script>\n`;
html = html.replace('</head>', ld + '</head>');
write('contact/index.html', html);
console.log('contact FAQ patched');
