const region=document.body.dataset.region;
const languageButtons=document.querySelectorAll('[data-language]');
const defaults=region==='gulf'?'ar':'en';
async function changeLanguage(language){
 try{
 const response=await fetch('/international/copy.json');if(!response.ok)throw new Error('Translation unavailable');const dictionary=await response.json();const copy={...dictionary[language]};
 if(region==='maldives'){
 copy.eyebrow=language==='ar'?'المرضى الدوليون · جزر المالديف':'INTERNATIONAL PATIENTS · MALDIVES';
 copy.intro=language==='ar'?'هل تزورنا من جزر المالديف؟ تواصل مع فريقنا قبل السفر لتخطيط زيارتك لعيادة الأسنان خلال إقامتك في كوتشي.':'Visiting from the Maldives? Speak with our team before you travel, and plan your dental visit around your time in Kochi.';
 copy.other=language==='ar'?'هل تزورنا من دول الخليج؟ ↗':'Visiting from the Gulf? ↗';
 }
 document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-copy]').forEach(element=>{const value=copy[element.dataset.copy];if(value)element.innerHTML=value;});
 languageButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
 document.title=(region==='gulf'?(language==='ar'?'مرضى دول الخليج':'Patients from the Gulf'):(language==='ar'?'مرضى جزر المالديف':'Patients from the Maldives'))+' | Your Smile';
 }catch{document.querySelector('#language-status').textContent='Language could not be loaded. Please try again.';}
}
const status=document.createElement('p');status.id='language-status';status.setAttribute('role','status');document.querySelector('.international-header').after(status);
languageButtons.forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.language===defaults));button.addEventListener('click',()=>changeLanguage(button.dataset.language));});
