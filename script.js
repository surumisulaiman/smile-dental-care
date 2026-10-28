const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => { const expanded = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!expanded)); menu.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu'); nav.classList.toggle('open', !expanded); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); }));
document.querySelector('#year').textContent = new Date().getFullYear();

const originalContacts = document.querySelector('#clinic-contact-links').innerHTML;
const originalDirections = document.querySelector('#clinic-directions').href;
const clinicSelector = document.querySelector('#clinic-selector');
const bookingLinks = [...document.querySelectorAll('a[href="https://www.gonimo.in/smile-dental-care"]')].filter(link => !link.closest('.dentist, .booking-dropdown'));
function selectBranch(branch) {
  const isChittoor = branch === 'chittoor';
  clinicSelector.value = branch;
  document.querySelector('#clinic-eyebrow').textContent = isChittoor ? 'SMILE DENTAL CARE · SOUTH CHITTOOR' : 'YOUR DENTAL CLINIC · CHERANALLOOR';
  document.querySelector('#announcement-location').textContent = isChittoor ? 'Your neighbourhood dental clinic in South Chittoor, Kochi' : 'Your Dental Clinic · Cheranalloor, Kochi';
  document.querySelector('.announcement-call').hidden = !isChittoor;
  document.querySelector('#clinic-intro').textContent = isChittoor ? 'From a routine check-up to a new beginning for your smile. Meet Dr. Jesbin Assisi and Dr. Anna Thomas at Smile Dental Care, South Chittoor, Kochi.' : 'A new beginning for your smile, closer to home. Discover Your Dental Clinic in Cheranalloor — the second clinic run by Dr. Jesbin Assisi.';
  document.querySelector('#clinic-note').innerHTML = isChittoor ? 'Find us on Chittoor Road.<br><strong>Near Sree Krishnaswamy Temple.</strong>' : 'Your neighbourhood. Your smile.<br><strong>Cheranalloor, Kochi.</strong>';
  document.querySelector('#contact-eyebrow').textContent = isChittoor ? 'YOUR SELECTED CLINIC · SOUTH CHITTOOR' : 'YOUR SELECTED CLINIC · CHERANALLOOR';
  document.querySelector('#contact-address').innerHTML = isChittoor ? 'Smile Dental Care<br>Chittoor Rd, South Chittoor<br>Kochi, Ernakulam, Kerala 682027' : 'Your Dental Clinic<br>Cheranalloor, Kochi, Kerala';
  document.querySelector('#contact-landmark').textContent = isChittoor ? 'Near Chittoor Sree Krishnaswamy Temple' : 'Exact address and direct contact details will be added shortly.';
  const directions = document.querySelector('#clinic-directions');
  directions.hidden = !isChittoor;
  directions.href = isChittoor ? originalDirections : '#contact';
  document.querySelector('#clinic-contact-links').innerHTML = isChittoor ? originalContacts : '<div class="branch-pending"><span class="eyebrow">CHERANALLOOR BRANCH</span><h3>Let’s find the right clinic for you.</h3><p>Online booking for this branch will be available once its contact details are confirmed.</p><button class="button" type="button" id="choose-chittoor">View South Chittoor clinic <span>↗</span></button></div>';
  document.querySelector('#choose-chittoor')?.addEventListener('click', () => selectBranch('chittoor'));
  bookingLinks.forEach(link => { link.href = isChittoor ? 'https://www.gonimo.in/smile-dental-care' : '#contact'; if (isChittoor) { link.target = '_blank'; } else { link.removeAttribute('target'); } });
  const brand = document.querySelector('header .brand');
  brand.querySelector(':scope > span').innerHTML = isChittoor ? 'smile<span class="brand-small">DENTAL CARE</span>' : 'your<span class="brand-small">DENTAL CLINIC</span>';
  brand.setAttribute('aria-label', isChittoor ? 'Smile Dental Care home' : 'Your Dental Clinic home');
  document.title = isChittoor ? 'Smile Dental Care | South Chittoor, Kochi' : 'Your Dental Clinic | Cheranalloor, Kochi';
  try { sessionStorage.setItem('smile-clinic', branch); } catch {}
}
clinicSelector.addEventListener('change', () => selectBranch(clinicSelector.value));
try { if (sessionStorage.getItem('smile-clinic') === 'cheranalloor') selectBranch('cheranalloor'); } catch {}

const bookingDropdowns = [...document.querySelectorAll('.booking-dropdown')];
bookingDropdowns.forEach(dropdown => {
  dropdown.addEventListener('toggle', () => {
    if (dropdown.open) bookingDropdowns.forEach(other => { if (other !== dropdown) other.open = false; });
  });
  dropdown.querySelector('a').addEventListener('click', () => { dropdown.open = false; });
});
document.addEventListener('click', event => {
  bookingDropdowns.forEach(dropdown => { if (!dropdown.contains(event.target)) dropdown.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') bookingDropdowns.forEach(dropdown => {
    if (dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
  });
});
