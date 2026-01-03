(function(){
    function getQueryParam(param){ return new URLSearchParams(window.location.search).get(param); }
    var stored = {};
    try{ stored = JSON.parse(localStorage.getItem('selectedSubscriber') || '{}'); }catch(e){}
    var codeParam = getQueryParam('code');
    var themeParam = getQueryParam('theme');
    var name = stored.name || 'اسواق تجربة';
    if (getQueryParam('sub')) name = getQueryParam('sub').replace(/-/g, ' ');
    var imageEl = document.getElementById('subscriberImage');
    if (imageEl && stored.image) imageEl.src = stored.image;
    document.getElementById('subscriberName').textContent = name;
    document.getElementById('subscriberCode').textContent = stored.code || codeParam || 'DC1001';
    document.getElementById('subscriberTheme').textContent = stored.theme || themeParam || 'default';

    var themeToLoad = stored.theme || themeParam || 'default';
    if (themeToLoad && themeToLoad !== 'default'){
        var l = document.createElement('link'); l.rel='stylesheet'; l.href = '../themes/'+encodeURIComponent(themeToLoad)+'.css';
        document.head.appendChild(l);
    }

    var copyBtn = document.getElementById('copyCodeBtn');
    if (copyBtn) copyBtn.addEventListener('click', function(){
        var code = document.getElementById('subscriberCode').textContent || '';
        if (!code) return;
        navigator.clipboard && navigator.clipboard.writeText(code).then(function(){
            copyBtn.textContent='تم النسخ'; setTimeout(function(){ copyBtn.textContent='نسخ'; }, 1500);
        }).catch(function(){
            var ta = document.createElement('textarea'); ta.value = code; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); copyBtn.textContent='تم النسخ'; } catch(e){}
            ta.remove();
        });
    });

    try{ localStorage.setItem('selectedSubscriber', JSON.stringify(Object.assign({}, stored, { name: name, code: (stored.code||codeParam||'DC1001'), theme: (stored.theme||themeParam||'default') }))); }catch(e){}
})();
