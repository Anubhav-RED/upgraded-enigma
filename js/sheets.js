/* ============================================
   REDCROWN MMA — SHEETS.JS
   Waitlist & Contact → Google Sheets via
   Apps Script Web App
   ============================================
   
   HOW TO CONNECT YOUR GOOGLE SHEET:
   1. Open your Google Sheet:
      https://docs.google.com/spreadsheets/d/1ltnIqRDXo-Ub4TEj1Kh3BpwBB4lhGxw4dM4RkZl3NJU/
   2. Click Extensions → Apps Script
   3. Paste the Apps Script code below into the editor
   4. Click Deploy → New Deployment → Web App
      - Execute as: Me
      - Who has access: Anyone
   5. Copy the Web App URL and paste it as SHEET_URL below
   
   ── APPS SCRIPT CODE TO PASTE ──────────────
   
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     
     // Add header row if sheet is empty
     if (sheet.getLastRow() === 0) {
       sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Program', 'Slot', 'Source']);
     }
     
     sheet.appendRow([
       new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}),
       data.name || '',
       data.phone || '',
       data.email || '',
       data.program || '',
       data.slot || '',
       data.source || 'Waitlist'
     ]);
     
     return ContentService
       .createTextOutput(JSON.stringify({status: 'success'}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   
   function doGet(e) {
     return ContentService.createTextOutput('Redcrown MMA Sheet OK');
   }
   
   ─────────────────────────────────────────── */

(function () {

  // ← PASTE YOUR APPS SCRIPT WEB APP URL HERE after deploying
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbxdN3SLqB_FHJtcYZ_CzOjQtvtN7Nr1GYtvrCQWQLV3bny2hZMbvdgBuKZCsasYrKNq/exec';

  function submitToSheet(data, onSuccess, onError) {
    if (!SHEET_URL || SHEET_URL === 'https://script.google.com/macros/s/AKfycbxdN3SLqB_FHJtcYZ_CzOjQtvtN7Nr1GYtvrCQWQLV3bny2hZMbvdgBuKZCsasYrKNq/exec') {
      console.warn('[Redcrown] Google Sheet not connected.');
      onSuccess();
      return;
    }

    var params = new URLSearchParams();
    params.append('name', data.name || '');
    params.append('phone', data.phone || '');
    params.append('email', data.email || '');
    params.append('program', data.program || '');
    params.append('slot', data.slot || '');
    params.append('source', data.source || 'Waitlist');

    fetch('https://docs.google.com/spreadsheets/d/1ltnIqRDXo-Ub4TEj1Kh3BpwBB4lhGxw4dM4RkZl3NJU', {
      method: 'POST',
      body: params
    })
      .then(function () { onSuccess(); })
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
      [name, phone].forEach(function (el) { el.style.borderColor = ''; });
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
          // Success
          if (btn) { btn.textContent = 'Enter The Hunt →'; btn.disabled = false; }
          wlForm.querySelectorAll('input, select').forEach(function (el) { el.value = ''; });
          if (successEl) successEl.classList.remove('hidden');
        },
        function () {
          // Error
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
      var msg = document.getElementById('c-msg');
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
