/* Justified gallery script
   - Scans images inside .snow-gallery
   - Builds rows where images preserve aspect ratio and rows fill container width
   - Minimal, dependency-free
*/
(function(){
  function runJustified(containerSelector, opts){
    var container = document.querySelector(containerSelector);
    if(!container) return;
    var imgs = Array.from(container.querySelectorAll('img'));
    if(!imgs.length) return;

    // Wait for all images to be loaded (natural sizes available)
    var loaded = 0; imgs.forEach(function(img){
      if(img.complete && img.naturalWidth) { loaded++; return; }
      img.addEventListener('load', function(){ loaded++; if(loaded===imgs.length) layout(); });
      img.addEventListener('error', function(){ loaded++; if(loaded===imgs.length) layout(); });
    });
    if(loaded===imgs.length) layout();

    function layout(){
      // clear container and rebuild rows
      var items = imgs.map(function(img){ return { el: img, w: img.naturalWidth || 1, h: img.naturalHeight || 1, ratio: (img.naturalWidth||1)/(img.naturalHeight||1), src: img.getAttribute('src') }; });
      // remove existing children
      container.innerHTML = '';

      var containerWidth = container.clientWidth;
      var targetRowHeight = opts && opts.targetRowHeight ? opts.targetRowHeight : 180;
      var spacing = (opts && typeof opts.spacing === 'number') ? opts.spacing : 10; // px gap between items
      var row = [], rowRatios = 0;

      function cleanName(name){
        name = (name||'').split('?')[0].split('#')[0];
        var base = name.split('/').pop() || name;
        base = base.replace(/\.[a-zA-Z0-9]{1,6}$/, '');
        base = base.replace(/[_\-]+/g, ' ');
        try { base = decodeURIComponent(base); } catch(e){}
        base = base.trim();
        base = base.split(' ').map(function(w){ return w ? (w.charAt(0).toUpperCase() + w.slice(1)) : ''; }).join(' ');
        return base;
      }

      function flushRow(isLast){
        if(row.length===0) return;
        var rowDiv = document.createElement('div'); rowDiv.className='justified-row';
        var rowHeight = isLast ? Math.min(targetRowHeight, (containerWidth - spacing*(row.length-1)) / rowRatios) : Math.max( (containerWidth - spacing*(row.length-1)) / rowRatios, 60 );
        row.forEach(function(item){
          var w = Math.round(rowHeight * item.ratio);
          var a = document.createElement('a');
          a.href = item.src; a.className = 'glightbox'; a.setAttribute('data-gallery','snow'); a.setAttribute('data-type','image');
          a.style.flex = '0 0 ' + w + 'px';
          a.style.height = rowHeight + 'px';
          a.style.marginRight = '0';
          var img = document.createElement('img'); img.src = item.src; img.alt = item.el.alt || '';
          img.style.width = '100%'; img.style.height = '100%'; img.loading = 'lazy';
          // when image loads, add class for transition
          img.addEventListener('load', function(){ img.classList.add('loaded'); });
          img.addEventListener('error', function(){ img.classList.add('loaded'); });
          var overlay = document.createElement('div'); overlay.className = 'snow-overlay';
          var cap = document.createElement('span'); cap.className = 'caption'; cap.textContent = cleanName(item.el.alt || item.src);
          overlay.appendChild(cap);
          a.appendChild(img); a.appendChild(overlay); rowDiv.appendChild(a);
        });
        container.appendChild(rowDiv);
        // animate row entrance
        setTimeout(function(){ rowDiv.classList.add('visible'); }, 25);
      }

      for(var i=0;i<items.length;i++){
        var it = items[i];
        row.push(it); rowRatios += it.ratio;
        var expectedWidth = rowRatios * targetRowHeight + spacing * (row.length - 1);
        if(expectedWidth >= containerWidth - 0.5){
          flushRow(false);
          row = []; rowRatios = 0;
        }
      }
      if(row.length>0) flushRow(true);

      // Re-init glightbox if available
      if(window.GLightbox) { try { window._gSnow = window._gSnow || GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true }); } catch(e){} }
    }

    // Re-layout on resize
    var resizeTimer;
    window.addEventListener('resize', function(){ clearTimeout(resizeTimer); resizeTimer = setTimeout(function(){ runJustified(containerSelector, opts); }, 180); });
  }

  // Auto-run for our container
  document.addEventListener('DOMContentLoaded', function(){ runJustified('.snow-gallery'); });
})();
