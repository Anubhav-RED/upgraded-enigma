(function () {

  // ✅ Your Apps Script Web App URL
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbwcXcImes-UPcPgTO4iZNp_8zDHueqdJ3dWKvuRoFKIWMBtOGjNm_dDWJ2nnAAYR3NLng/exec';

  function submitToSheet(data, onSuccess, onError) {
    if (!SHEET_URL) {
      console.warn('[Redcrown] Google Sheet not connected.');
      onSuccess();
      return;
    }

    fetch(SHEET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        return res.json();
      })
      .then(function () {
        onSuccess();
      })
      .catch(function (err) {
        console.error('[Redcrown] Sheet error:', err);
        onError();
      });
  }

  /* ── WAITLIST FORM ── */
  var wlForm = document.getElementById('waitlist-form');
  if (wlForm) {
    wlForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('wl-name');
      var phone = document.getElementById('wl-phone');
      var email = document.getElementById('wl-email');
      var program = document.getElementById('wl-program');
      var slot = document.getElementById('wl-slot');
      var btn = document.getElementById('wl-submit');
      var successEl = document.getElementById('form-success');
      var errorEl = document.getElementById('form-error');

      // Reset states
      [name, phone].forEach(function (el) { if (el) el.style.borderColor = ''; });
      if (successEl) successEl.classList.add('hidden');
      if (errorEl) errorEl.classList.add('hidden');

      // Validate
      var valid = true;
      if (!name || !name.value.trim()) { if (name) name.style.borderColor = '#fb3640'; valid = false; }
      if (!phone || !phone.value.trim()) { if (phone) phone.style.borderColor = '#fb3640'; valid = false; }
      if (!valid) return;

      // Loading state
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

      var payload = {
        name: name ? name.value.trim() : '',
        phone: phone ? phone.value.trim() : '',
        email: email ? email.value.trim() : '',
        program: program ? program.value : '',
        slot: slot ? slot.value : '',
        source: 'Waitlist'
      };

      submitToSheet(payload,
        function () {
          if (btn) { btn.textContent = 'Enter The Hunt →'; btn.disabled = false; }
          wlForm.querySelectorAll('input, select').forEach(function (el) { el.value = ''; });
          if (successEl) successEl.classList.remove('hidden');
        },
        function () {
          if (btn) { btn.textContent = 'Enter The Hunt →'; btn.disabled = false; }
          if (errorEl) errorEl.classList.remove('hidden');
        }
      );
    });
  }

  /* ── CONTACT FORM ── */
  var cForm = document.getElementById('contact-form');
  if (cForm) {
    cForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('c-name');
      var phone = document.getElementById('c-phone');
      var email = document.getElementById('c-email');
      var program = document.getElementById('c-program');
      var slot = document.getElementById('c-slot');
      var btn = cForm.querySelector('.form-submit');
      var successEl = document.getElementById('contact-success');

      [name, phone].forEach(function (el) { if (el) el.style.borderColor = ''; });

      var valid = true;
      if (!name || !name.value.trim()) { if (name) name.style.borderColor = '#fb3640'; valid = false; }
      if (!phone || !phone.value.trim()) { if (phone) phone.style.borderColor = '#fb3640'; valid = false; }
      if (!valid) return;

      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

      var payload = {
        name: name ? name.value.trim() : '',
        phone: phone ? phone.value.trim() : '',
        email: email ? email.value.trim() : '',
        program: program ? program.value : '',
        slot: slot ? slot.value : '',
        source: 'Contact Form'
      };

      submitToSheet(payload,
        function () {
          if (btn) { btn.textContent = 'Send Message →'; btn.disabled = false; }
          cForm.querySelectorAll('input, select, textarea').forEach(function (el) { el.value = ''; });
          if (successEl) successEl.classList.remove('hidden');
        },
        function () {
          if (btn) { btn.textContent = 'Send Message →'; btn.disabled = false; }
          alert('Something went wrong. Please call us directly: +91 99106 04536');
        }
      );
    });
  }

})();