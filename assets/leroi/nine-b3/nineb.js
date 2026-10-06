/* NB9 — بانر NINE الحيّ في رئيسية لوروي: صورة واحدة (القنينة على رخام وقوس النصر خلفها) والضوء وحده يتحرّك */
(function () {
  var BASE = window.NB9_BASE || './';
  var COMPONENT = '1993576326';
  var CSS = `
  .nb9{position:relative;display:block;width:100%;aspect-ratio:4000/1714;overflow:hidden;isolation:isolate;background:#111315;color:#F1ECE2;
    font-family:'Lucidity',ui-sans-serif,system-ui,sans-serif;direction:ltr;text-align:left}
  .nb9 *{box-sizing:border-box}
  .nb9,.nb9 *{text-decoration:none!important;font-weight:400}
  a.nb9-host{display:block;text-decoration:none!important}
  .nb9-stage{position:absolute;inset:0;transform-origin:70% 62%;animation:nb9-push 26s ease-in-out infinite alternate;will-change:transform}
  .nb9-stage>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  /* ظلّ غيمة بعيدة يعبر الشارع والقوس، والقنينة خارجه */
  .nb9-cloud,.nb9-sun,.nb9-glint{position:absolute;inset:0;pointer-events:none;
    -webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
  .nb9-cloud{mix-blend-mode:multiply;opacity:.55;
    background:radial-gradient(ellipse 34% 60% at 50% 45%,rgba(0,0,0,.42),rgba(0,0,0,0) 70%) no-repeat;background-size:100% 100%;
    animation:nb9-cloud 34s linear infinite}
  /* الشمس تخفت وتعود على القوس */
  .nb9-sun{mix-blend-mode:screen;opacity:0;
    background:radial-gradient(ellipse 30% 55% at 46% 40%,rgba(255,244,226,.20),rgba(255,244,226,0) 70%);
    animation:nb9-sun 11s ease-in-out infinite}
  /* لمعة تعبر زجاج القنينة وحده (قناع من نفس الرندر) */
  .nb9-glint{mix-blend-mode:screen;
    background:linear-gradient(105deg,rgba(255,255,255,0) 42%,rgba(255,250,238,.55) 50%,rgba(255,255,255,0) 58%) no-repeat;
    background-size:300% 100%;background-position:120% 0;animation:nb9-glint 9s cubic-bezier(.45,.05,.3,1) infinite 2.4s}
  .nb9-vig{position:absolute;inset:0;pointer-events:none;background:
    linear-gradient(90deg,rgba(8,8,10,.78) 0%,rgba(8,8,10,.52) 22%,rgba(8,8,10,.12) 40%,rgba(8,8,10,0) 55%),
    radial-gradient(ellipse 75% 95% at 62% 55%,rgba(0,0,0,0) 55%,rgba(0,0,0,.45) 100%)}
  .nb9-copy{position:absolute;left:6%;top:50%;transform:translateY(-54%);z-index:2}
  .nb9-brand{font-size:clamp(9px,.72vw,14px);letter-spacing:.55em;color:#D2BE8A;line-height:1}
  .nb9-name{margin:.22em 0 .3em;font-size:clamp(40px,5.3vw,104px);line-height:1;letter-spacing:.05em;color:#F1ECE2;text-shadow:0 2px 24px rgba(0,0,0,.35);white-space:nowrap}
  .nb9-name span{display:inline-block}
  .nb9-meta{font-size:clamp(8px,.62vw,12px);letter-spacing:.42em;color:rgba(241,236,226,.8);line-height:1;white-space:nowrap}
  .nb9-cta{display:inline-block;margin-top:clamp(18px,3vw,58px);font-size:clamp(8px,.62vw,12px);letter-spacing:.34em;color:#D2BE8A;line-height:1;
    padding-bottom:.6em;border-bottom:1px solid currentColor;transition:letter-spacing .5s cubic-bezier(.2,.7,.2,1)}
  a:hover .nb9-cta{letter-spacing:.42em}
  /* دخول النصّ مرّة واحدة */
  .nb9 [data-in]{opacity:0;transform:translateY(12px);filter:blur(6px);transition:opacity 1.3s cubic-bezier(.2,.7,.2,1),transform 1.3s cubic-bezier(.2,.7,.2,1),filter 1.3s cubic-bezier(.2,.7,.2,1)}
  .nb9.nb9-in [data-in]{opacity:1;transform:none;filter:none}
  .nb9.nb9-in .nb9-stage>img{animation:nb9-reveal 2.2s cubic-bezier(.2,.7,.2,1) both}
  .nb9.nb9-paused .nb9-stage,.nb9.nb9-paused .nb9-cloud,.nb9.nb9-paused .nb9-sun,.nb9.nb9-paused .nb9-glint{animation-play-state:paused}
  @keyframes nb9-push{from{transform:scale(1)}to{transform:scale(1.055) translate(-.8%,.4%)}}
  @keyframes nb9-cloud{from{background-position:-70% 0}to{background-position:170% 0}}
  @keyframes nb9-sun{0%,100%{opacity:0}50%{opacity:1}}
  @keyframes nb9-glint{0%{background-position:120% 0}22%{background-position:-20% 0}100%{background-position:-20% 0}}
  @keyframes nb9-reveal{from{filter:brightness(.55)}to{filter:none}}
  @media (max-width:767px){
    .nb9{aspect-ratio:auto;background:#111315}
    .nb9-media{position:relative;aspect-ratio:1/1;overflow:hidden}
    .nb9-media::after{content:"";position:absolute;left:0;right:0;bottom:0;height:26%;background:linear-gradient(0deg,#111315,rgba(17,19,21,0))}
    .nb9-vig{display:none}
    .nb9-copy{position:relative;left:auto;top:auto;transform:none;margin:-10% 7% 0;padding-bottom:9%}
    .nb9-brand{font-size:10px}.nb9-name{font-size:clamp(46px,15vw,84px)}.nb9-meta{font-size:9px;letter-spacing:.26em}.nb9-cta{font-size:10px;margin-top:22px}
  }
  @media (min-width:768px){.nb9-media{position:absolute;inset:0}}
  @media (prefers-reduced-motion:reduce){.nb9 *{animation:none!important;transition:none!important}.nb9 [data-in]{opacity:1;transform:none;filter:none}}
  `;
  function masks(el, mob) {
    var m = BASE + (mob ? 'nine-b3-mask-mob.png' : 'nine-b3-mask.png'), u = BASE + (mob ? 'nine-b3-unmask-mob.png' : 'nine-b3-unmask.png');
    el.querySelector('.nb9-glint').style.cssText = '-webkit-mask-image:url(' + m + ');mask-image:url(' + m + ')';
    ['.nb9-cloud', '.nb9-sun'].forEach(function (s) { el.querySelector(s).style.cssText = '-webkit-mask-image:url(' + u + ');mask-image:url(' + u + ')'; });
  }
  function build(a) {
    if (a.querySelector('.nb9')) return;
    var mob = matchMedia('(max-width:767px)').matches;
    var src = mob ? BASE + 'nine-b3-mob.webp' : (innerWidth * (devicePixelRatio || 1) > 1700 ? BASE + 'nine-b3.webp' : BASE + 'nine-b3-1600.webp');
    var el = document.createElement('div'); el.className = 'nb9';
    el.innerHTML = '<div class="nb9-media"><div class="nb9-stage"><img alt="NINE — LE ROI eau de parfum" decoding="async" src="' + src + '">' +
      '<div class="nb9-cloud"></div><div class="nb9-sun"></div><div class="nb9-glint"></div></div><div class="nb9-vig"></div></div>' +
      '<div class="nb9-copy"><div class="nb9-brand" data-in style="transition-delay:.1s">LE ROI</div>' +
      '<div class="nb9-name" data-in style="transition-delay:.3s"><span>NINE</span></div>' +
      '<div class="nb9-meta" data-in style="transition-delay:.75s">EAU DE PARFUM &nbsp;—&nbsp; 75 ML</div>' +
      '<span class="nb9-cta" data-in style="transition-delay:1s">DISCOVER</span></div>';
    masks(el, mob);
    var img = el.querySelector('img');
    var go = function () {
      var pic = a.querySelector('picture'); if (pic) pic.style.display = 'none';
      a.appendChild(el); a.classList.add('nb9-host');
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) el.classList.add('nb9-in'); el.classList.toggle('nb9-paused', !e.isIntersecting); });
      }, { threshold: .2 });
      io.observe(el);
    };
    // لا نُخفي البانر الثابت قبل أن تجهز الصورة الجديدة — لا ومضة فراغ
    if (img.complete) go(); else { img.addEventListener('load', go, { once: true }); img.addEventListener('error', function () { el.remove(); }, { once: true }); }
  }
  function mount() {
    var sec = document.querySelector('section[component-id="' + COMPONENT + '"]'); if (!sec) return false;
    var a = sec.querySelector('a.banner') || sec.querySelector('a'); if (!a) return false;
    if (!document.getElementById('nb9-css')) { var st = document.createElement('style'); st.id = 'nb9-css'; st.textContent = CSS; document.head.appendChild(st); }
    build(a); return true;
  }
  function start() {
    if (mount()) return;
    var n = 0, t = setInterval(function () { if (mount() || ++n > 40) clearInterval(t); }, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
