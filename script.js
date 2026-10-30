const bookingMarkup = label => `<details class="booking-dropdown"><summary class="button">${label}<svg class="booking-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="booking-options"><span class="eyebrow">CHOOSE YOUR CLINIC</span><a href="https://www.gonimo.in/smile-dental-care" target="_blank" rel="noopener"><strong>Smile Dental Care <span>↗</span></strong><small>South Chittoor · Book online</small></a><a href="tel:+917558803737"><strong>Your Dental Clinic <span>↗</span></strong><small>Cheranalloor · Call to book</small></a></div></details>`;
document.querySelectorAll('.booking-slot').forEach(slot => { slot.innerHTML = bookingMarkup(slot.dataset.label); });
const icons = {
 smile:'<path d="M5 13c4 12 18 12 22 0"/><path d="M9 8h.01M23 8h.01"/>',
 brush:'<path d="m6 27 13-13 5 5L11 32M19 14l6-6 5 5-6 6M23 7l3-3m0 6 3-3m0 6 3-3"/>',
 restore:'<path d="M9 4c4-2 5 1 8 1s5-3 9-1c6 4-1 25-5 26-3 0-1-12-5-12S14 30 11 30C7 29 2 8 9 4Z"/>',
 care:'<path d="M17 28S3 19 3 11c0-7 10-10 14-3 4-7 14-4 14 3 0 8-14 17-14 17Z"/><path d="M11 16h12m-6-6v12"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = `<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[el.dataset.icon] || icons.smile}</svg>`; });
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open menu'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('open',open); menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
const dropdowns = [...document.querySelectorAll('.booking-dropdown')];
dropdowns.forEach(dropdown => {
 dropdown.addEventListener('toggle', () => { if(dropdown.open) dropdowns.forEach(other => {if(other !== dropdown) other.open = false;}); });
 dropdown.querySelectorAll('a').forEach(link=>link.addEventListener('click', () => {dropdown.open = false;}));
});
document.addEventListener('click', event => {dropdowns.forEach(dropdown => {if(!dropdown.contains(event.target)) dropdown.open = false;});});
document.addEventListener('keydown', event => {if(event.key === 'Escape'){closeMenu();dropdowns.forEach(dropdown => {if(dropdown.open){dropdown.open=false;dropdown.querySelector('summary').focus();}});}});
const clinicData = {
 chittoor:{label:'SOUTH CHITTOOR',html:'<p class="contact-address"><strong>Smile Dental Care</strong><br>Chittoor Road, South Chittoor<br>Kochi, Ernakulam, Kerala 682027</p><p class="contact-landmark">Near Chittoor Sree Krishnaswamy Temple</p><a class="contact-detail" href="tel:+917558803737">+91 75588 03737 ↗</a><a class="contact-detail" href="mailto:ajsmiledentalcare@gmail.com">ajsmiledentalcare@gmail.com ↗</a><a class="button" href="https://www.google.com/maps/search/?api=1&query=SMILE%20DENTAL%20CARE%2C%20Chittoor%20Rd%2C%20South%20Chittoor%2C%20Kochi%2C%20Ernakulam%20682027" target="_blank" rel="noopener">Get directions <span>↗</span></a>'},
 cheranalloor:{label:'CHERANALLOOR',html:'<p class="contact-address"><strong>Your Dental Clinic</strong><br>Cheranalloor, Kochi, Kerala</p><p class="contact-landmark">Please call to confirm the exact address and current opening hours.</p><a class="contact-detail" href="tel:+917558803737">+91 75588 03737 ↗</a><a class="button" href="tel:+917558803737">Call Cheranalloor clinic <span>↗</span></a>'}
};
const selector = document.querySelector('#clinic-selector');
function selectClinic(value){document.body.classList.toggle('anna-first',value==='cheranalloor');const approach=document.querySelector('#approach-image');if(approach){approach.src=value==='cheranalloor'?'assets/reception-your-dental-clinic-natural.png':'assets/reception-your-smile-natural.png';approach.alt=value==='cheranalloor'?'Illustrative Your Dental Clinic reception':'Illustrative Your Smile reception';}const reception=document.querySelector('#reception-image');if(reception){reception.src=value==='cheranalloor'?'assets/reception-your-dental-clinic-natural.png':'assets/reception-your-smile-natural.png';reception.alt=value==='cheranalloor'?'Illustrative reception concept with Your Dental Clinic logo':'Illustrative reception concept with Your Smile logo';}const data=clinicData[value] || clinicData.chittoor;document.querySelector('#selected-clinic-label').textContent=value==='cheranalloor'?'Cheranalloor':'South Chittoor';document.querySelectorAll('[data-clinic-option]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.clinicOption===value)));document.querySelector('#contact-eyebrow').textContent=`YOUR CLINIC · ${data.label}`;document.querySelector('#contact-content').innerHTML=data.html;document.querySelector('#contact-content').classList.add('contact-content');document.querySelectorAll('[data-clinic]').forEach(card=>card.classList.toggle('selected',card.dataset.clinic===value));try{sessionStorage.setItem('smile-clinic',value);}catch{}}
const clinicPopover=document.querySelector('#clinic-popover');
function closeClinicPopover(returnFocus=false){clinicPopover.hidden=true;selector.setAttribute('aria-expanded','false');if(returnFocus)selector.focus();}
selector.addEventListener('click',()=>{const open=selector.getAttribute('aria-expanded')!=='true';clinicPopover.hidden=!open;selector.setAttribute('aria-expanded',String(open));if(open)dropdowns.forEach(dropdown=>dropdown.open=false);});
document.querySelectorAll('[data-clinic-option]').forEach(button=>button.addEventListener('click',()=>{selectClinic(button.dataset.clinicOption);closeClinicPopover(true);}));
document.addEventListener('click',event=>{if(!event.target.closest('.clinic-select'))closeClinicPopover();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!clinicPopover.hidden)closeClinicPopover(true);});
selector.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();clinicPopover.hidden=false;selector.setAttribute('aria-expanded','true');clinicPopover.querySelector('[data-clinic-option]').focus();}});
clinicPopover.addEventListener('keydown',event=>{const options=[...clinicPopover.querySelectorAll('[data-clinic-option]')];const index=options.indexOf(document.activeElement);if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();options[(index+(event.key==='ArrowDown'?1:-1)+options.length)%options.length].focus();}});
document.addEventListener('focusin',event=>{if(!event.target.closest('.clinic-select'))closeClinicPopover();});
document.querySelectorAll('[data-select]').forEach(button=>button.addEventListener('click',()=>{selectClinic(button.dataset.select);document.querySelector('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
let initialClinic='chittoor';try{if(sessionStorage.getItem('smile-clinic')==='cheranalloor')initialClinic='cheranalloor';}catch{}selectClinic(initialClinic);
const infoDialog=document.querySelector('#info-dialog');
const info={privacy:['Privacy information','This website does not collect appointment requests or medical information. Booking links take you to Gonimo, an external booking provider whose privacy terms apply. Google Fonts and Unsplash images load from external services. For clinic enquiries, use the listed phone or email.'],accessibility:['Accessibility','This website supports keyboard navigation, visible focus indicators, reduced motion preferences and responsive text. If you need assistance accessing clinic information or arranging your visit, call Smile Dental Care on +91 75588 03737.']};
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>{const [title,body]=info[button.dataset.info];infoDialog.querySelector('h2').textContent=title;infoDialog.querySelector('p').textContent=body;infoDialog.showModal();}));
infoDialog.querySelector('.dialog-close').addEventListener('click',()=>infoDialog.close());
document.querySelector('#year').textContent=new Date().getFullYear();
