/* FTR — contact.js
   Enquiry form submission.

   The form posts to Web3Forms. Until the client's own access key is in
   place the form refuses to submit and says so, rather than appearing to
   send and silently dropping the enquiry — which is the worst failure
   mode a contact form has. */

(function () {
  'use strict';

  var form = document.getElementById('enquiry');
  if (!form) return;

  var status = document.getElementById('status');
  var submit = document.getElementById('submit');
  var PLACEHOLDER = 'REPLACE_WITH_CLIENT_WEB3FORMS_KEY';
  var configured = form.getAttribute('data-access-key') !== PLACEHOLDER;

  function say(message, kind) {
    status.textContent = message;
    status.className = 'form__status is-shown ' + kind;
  }

  if (!configured) {
    submit.disabled = true;
    say('This form is not connected yet. Please call +91 95580 62611 in the ' +
        'meantime — a director will answer.', 'is-error');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: a filled hidden field means a bot. Fail quietly.
    if (form.elements.botcheck && form.elements.botcheck.value) return;

    if (!form.checkValidity()) { form.reportValidity(); return; }

    submit.disabled = true;
    say('Sending…', '');

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          form.reset();
          say('Thank you — your enquiry has reached us. A director will reply ' +
              'directly, usually within one working day.', 'is-ok');
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(function () {
        say('That did not send. Please call +91 95580 62611, or try again ' +
            'in a moment.', 'is-error');
      })
      .then(function () { submit.disabled = false; });
  });
})();
