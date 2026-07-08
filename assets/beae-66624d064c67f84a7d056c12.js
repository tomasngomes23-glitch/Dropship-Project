window.BEAEPAGEJS = () => { let BeaeUseHooks = {};
      try {
        let argid = 'beae-nol8rac5section-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-nol8rac5',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-nol8rac5');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var n,l;let s=a.target;if(!s.classList.contains("beae-grid-carousel"))return;let r=Math.round((s.scrollLeft+s.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(s.offsetWidth*.8))+1;(n=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||n.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+r+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),s=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),r=[];if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(window.innerWidth>=768){if(a){const n=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);n&&(a.innerHTML=n.html,r.push("desktop"))}}else if(s){const n=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,s);n&&(s.innerHTML=n.html,r.push("mobile"))}}(a||s)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!r.includes("desktop")&&window.innerWidth>=768&&a){const n=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);n&&(a.innerHTML=n.html,r.push("desktop"))}if(!r.includes("mobile")&&window.innerWidth<768&&s){const n=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,s);n&&(s.innerHTML=n.html,r.push("mobile"))}}})} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-nol8rac5: ', ex)
      };
    

      try {
        let argid = 'beae-dvwgo13cblock-form',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-dvwgo13c',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-dvwgo13c');
        args.el = args.els[0];
        ((u) => { const m=window.location.href.indexOf("contact_posted=true")!==-1,b=u.el.querySelector("form");u.el.querySelector(".beae-btn-pr");const f=u.el.querySelectorAll("input","select","button","textarea","checkbox","radio"),h=u.el.querySelector(".btn-lightbox-form > a");!m&&u.mode.value!=="builder"&&(u.el.querySelector(".beae-form-success-message").style="display: none"),m&&u.afterSubmitting=="redirect"&&u.redirect&&(window.location.href=u.redirect);const _=[];b&&b.addEventListener("submit",x=>{x.preventDefault();for(let g=0;g<f.length;g++)_.push({fieldKey:f[g].name,fieldType:f[g].type,fieldValue:f[g].value})}),h&&(h.onclick=()=>{const x=document.createElement("div");x.innerHTML=b.outerHTML||"",window.BeaePopupLibrary.createPopup(x,{layout:"center",layoutMobile:"bottom",width:"500px"})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-dvwgo13c: ', ex)
      };
    }; if (window.BEAEBASE) {window.BEAEPAGEJS()} 