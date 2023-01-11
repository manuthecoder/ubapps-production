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
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 0px; margin: 0px; width: 100vw; height: 100vh; background-color: white!important; z-index: 10000;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 0px; margin: 0px; z-index: 20000">
                <center>
                   <svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <animateTransform attributeName="transform" type="rotate" values="0 33 33;270 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
                        <circle fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" stroke-dasharray="187" stroke-dashoffset="610">
                          <animate attributeName="stroke" values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4" begin="0s" dur="5.6s" fill="freeze" repeatCount="indefinite"/>
                          <animateTransform attributeName="transform" type="rotate" values="0 33 33;135 33 33;450 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
                          <animate attributeName="stroke-dashoffset" values="187;46.75;187" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
                        </circle>
                       </g>
                    </svg>
                    <p>Synthesizing <span id="url" style="font-weight: bold;">%s</span></p>
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
