const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');
  const btn = form.querySelector('button[type=submit]');
  const show = (cls, msg) => {
    status.className = 'status ' + cls;
    status.textContent = msg;
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.botcheck.checked) return; // honeypot
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    btn.disabled = true;
    show('', '');
    status.className = 'status';
    try {
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        form.reset();
        show('ok', 'Thank you — your message has been sent. ' + (form.dataset.reply || ''));
      } else {
        throw new Error(json.message || 'Request failed');
      }
    } catch {
      show('err', 'Sorry, the message could not be sent. Please call, WhatsApp or email us using the details beside this form.');
    } finally {
      btn.disabled = false;
    }
  });
}
