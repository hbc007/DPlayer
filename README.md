## Open-Source Code Used
* Dplayer https://github.com/MoePlayer/DPlayer
* JavascriptSubtitlesOctopus https://github.com/Dador/JavascriptSubtitlesOctopus
## How to Use(Example)
1. Download all files in this page https://github.com/Dador/JavascriptSubtitlesOctopus/tree/master/dist/js, and put these files into ```wwwroot/js```.
2. Init DPlayer like this:
```
window.dplayer = new DPlayer({  
    container: document.querySelector("#dplayer"),  
    screenshot:true,  
    video: {  
        url: videourl,  
        type: videotype,  
    },  
    subtitle: {  
        url: videourl.substring(0,videourl.lastIndexOf('.') + 1) + 'ass',  
        type: 'webvtt',  
        fonts:["//gapis.geekzu.org/g-fonts/ea/notosanssc/v1/NotoSansSC-Regular.otf", "//gapis.geekzu.org/g-fonts/ea/notosanstc/v1/NotoSansTC-Regular.otf", "//gapis.geekzu.org/g-fonts/ea/notosansjapanese/v6/NotoSansJP-Regular.otf"],  
        workerUrl: '/js/subtitles-octopus-worker.js',  
        legacyWorkerUrl: '/js/subtitles-octopus-worker-legacy.js'  
       }  
});  
```
