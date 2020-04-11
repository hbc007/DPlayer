import SubtitlesOctopus from '../js/subtitles-octopus.js';

class Subtitle {
    constructor(container, video, options, events) {
        this.container = container;
        this.video = video;
        this.options = options;
        this.events = events;

        this.subInstance = null;
        this.subOptions = {
            video: video, // HTML5 video element
            subUrl: this.options.url, /*this.video.src.substring(0, this.video.src.lastIndexOf('.') + 1) + 'ass',*/
            fonts: this.options.fonts,
            workerUrl: this.options.workerUrl, // Link to WebAssembly-based file "libassjs-worker.js"
            legacyWorkerUrl: this.options.legacyWorkerUrl, // Link to non-WebAssembly worker
        };
        //console.log(this.subOptions)
        this.init();
    }

    init() {
        this.container.style.fontSize = this.options.fontSize;
        this.container.style.bottom = this.options.bottom;
        this.container.style.color = this.options.color;
        this.subInstance = new SubtitlesOctopus(this.subOptions);

        if (this.video.textTracks && this.video.textTracks[0]) {
            const track = this.video.textTracks[0];

            track.oncuechange = () => {
                const cue = track.activeCues[0];
                this.container.innerHTML = '';
                if (cue) {
                    const template = document.createElement('div');
                    template.appendChild(cue.getCueAsHTML());
                    const trackHtml = template.innerHTML
                        .split(/\r?\n/)
                        .map((item) => `<p>${item}</p>`)
                        .join('');
                    this.container.innerHTML = trackHtml;
                }
                this.events.trigger('subtitle_change');
            };
        }
    }

    show() {
        this.container.classList.remove('dplayer-subtitle-hide');
        this.subInstance = new SubtitlesOctopus(this.subOptions);
        this.events.trigger('subtitle_show');
    }

    hide() {
        this.container.classList.add('dplayer-subtitle-hide');
        this.subInstance.dispose();
        this.events.trigger('subtitle_hide');
    }

    toggle() {
        if (this.container.classList.contains('dplayer-subtitle-hide')) {
            this.show();
        } else {
            this.hide();
        }
    }
}

export default Subtitle;
