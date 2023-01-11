const form = document.querySelector('form');
const input = document.querySelector('input');

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let url = params.dest;
url = url.replace(/\|/g, '');
if (url) {
    const newDiv = document.createElement("div");
    document.body.appendChild(newDiv, document.body);
    newDiv.style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100vw',
        height: '100vh',
        padding: '0px',
        overflow: 'hidden',
        margin: '0px',
        transform: 'translate(-50%, -50%)',
        background: '#fff!important',
        backgroundColor: '#fff!important',
        color: 'black',
        zIndex: '10000',
        fontWeight: 'bold'
    };
    newDiv.innerHTML = /*html*/`
        <div class="synth">
  <div class="animate-announcement"></div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 0px; margin: 0px; z-index: 20000">
                <center style="font-size:30px">
                    <p>Synthesizing <u id="url" style="font-weight: bold;">%s</u></p>
                </center>
            </div>

</div>
    `;
    document.getElementById('url').innerText = url;
    setTimeout(() => {
        window.navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
            else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        });    
    }, 10);
}


form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
