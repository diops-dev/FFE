// FFE — interactions légères
document.addEventListener('click', function(e){
  // nav mobile toggle
  var t = e.target.closest('[data-nav-toggle]');
  if(t){ document.querySelector('.nav')?.classList.toggle('open'); }

  // dropdown toggle
  var dd = e.target.closest('[data-dropdown-toggle]');
  if(dd){
    var parent = dd.closest('.nav-dropdown');
    // close others
    document.querySelectorAll('.nav-dropdown.open').forEach(function(el){
      if(el !== parent) el.classList.remove('open');
    });
    if(parent) parent.classList.toggle('open');
    return;
  }

  // close dropdown on outside click
  if(!e.target.closest('.nav-dropdown')){
    document.querySelectorAll('.nav-dropdown.open').forEach(function(el){
      el.classList.remove('open');
    });
  }
});
// année dynamique
document.querySelectorAll('[data-year]').forEach(function(el){
  el.textContent = new Date().getFullYear();
});
// formulaire contact — ouvre le logiciel mail (mailto:) vers FFE
var form = document.getElementById('contact-form');
if(form){
  var DEST = 'ffexpert16@gmail.com';
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = function(id){ var el=document.getElementById(id); return el ? el.value.trim() : ''; };
    var nom = v('nom'), tel = v('tel'), email = v('email'), sujet = v('sujet'), msg = v('msg');

    // validation minimale
    if(!nom || !tel){
      alert('Merci d\'indiquer au moins votre nom et votre téléphone.');
      return;
    }

    var objet = 'Demande de contact — ' + (sujet || 'Site FFE') + (nom ? ' (' + nom + ')' : '');
    var corps =
      'Nom : ' + nom + '\n' +
      'Téléphone : ' + tel + '\n' +
      'Email : ' + (email || '—') + '\n' +
      'Type de demande : ' + (sujet || '—') + '\n\n' +
      'Message :\n' + (msg || '—') + '\n';

    var lien = 'mailto:' + DEST +
      '?subject=' + encodeURIComponent(objet) +
      '&body=' + encodeURIComponent(corps);

    // ouvre le client mail pré-rempli
    window.location.href = lien;

    // message de confirmation à l'écran
    var ok = document.getElementById('form-success');
    if(ok){ ok.style.display='flex'; ok.scrollIntoView({behavior:'smooth',block:'center'}); }
  });
}
