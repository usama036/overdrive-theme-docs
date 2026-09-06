const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

if (navToggle && navigation) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
  });
}

for (const year of document.querySelectorAll('[data-current-year]')) year.textContent = new Date().getFullYear();

const search = document.querySelector('#docs-search');
const searchableSections = [...document.querySelectorAll('.searchable-section')];
const noResults = document.querySelector('#no-results');

if (search && searchableSections.length) {
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    let matches = 0;
    for (const section of searchableSections) {
      const visible = !query || section.textContent.toLocaleLowerCase().includes(query);
      section.hidden = !visible;
      if (visible) matches += 1;
    }
    if (noResults) noResults.hidden = matches !== 0;
  });
}

const supportForm = document.querySelector('[data-support-form]');
if (supportForm) {
  supportForm.addEventListener('submit', async event => {
    if (supportForm.action.includes('REPLACE_WITH_FORM_ID')) {
      event.preventDefault();
      const status = supportForm.querySelector('[data-form-status]');
      if (status) status.textContent = 'Support form setup is not complete. Please connect the approved Formspree endpoint before publishing this site.';
      return;
    }

    event.preventDefault();
    const status = supportForm.querySelector('[data-form-status]');
    const submitButton = supportForm.querySelector('button[type="submit"]');
    const originalLabel = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    if (status) {
      status.textContent = '';
      status.classList.remove('is-error', 'is-success');
    }

    try {
      const response = await fetch(supportForm.action, {
        method: 'POST',
        body: new FormData(supportForm),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      supportForm.reset();
      if (status) {
        status.textContent = 'Thank you. Your support request has been received.';
        status.classList.add('is-success');
      }
    } catch (error) {
      if (status) {
        status.textContent = 'We could not send your request. Please check your connection and try again.';
        status.classList.add('is-error');
      }
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalLabel;
    }
  });
}
