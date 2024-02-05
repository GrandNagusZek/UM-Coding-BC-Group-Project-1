var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-btn")
var video = document.getElementById("video")
var tag = document.createElement('script');
var currentVideoIdForYoutube = '';

async function searchMusic() {
    const searchTerm = searchInput.value;
    displayVideoInIFrame(searchTerm);
    displaySpotify(searchTerm)
}

// function displayResult(data) {
    // if (!data && !data.result && data.result < 1) {
    
    //     return;
    // }
    // var author = data.result[0].author
    // artistEl.textContent = author
    // var title = data.result[0].title
    // titleEl.textContent = title
    // var duration = data.result[0].duration
    // durationEl.textContent = duration

    // displaySpotify()

    

async function displaySpotify(searchTerm) {
    const url = 'https://spotify23.p.rapidapi.com/search/?q=' + searchTerm + '&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9acf3b020dmsh9ffaf39590cb994p106be6jsn35f223fe2bbe',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        var track = result.tracks.items[0].data.albumOfTrack.uri
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                uri: track
            };
            const callback = (EmbedController) => { };
            IFrameAPI.createController(element, options, callback);
        };
    } catch (error) {
        console.error(error);
    }
}

async function displayVideo(searchTerm) {
    const url = 'https://youtube138.p.rapidapi.com/search/?q=' + searchTerm + '&hl=en&gl=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9acf3b020dmsh9ffaf39590cb994p106be6jsn35f223fe2bbe',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        var player;
    } catch (error) {
        console.error(error);
    }
}

async function displayVideoInIFrame(searchTerm) {
    const url = 'https://youtube138.p.rapidapi.com/search/?q=' + searchTerm + '&hl=en&gl=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9acf3b020dmsh9ffaf39590cb994p106be6jsn35f223fe2bbe',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };
    var result;
    try {
        const response = await fetch(url, options);
        result = await response.json();
        console.log(result);
        var player;
    } catch (error) {
        console.error(error);
    }


    for (let i = 0; i < result.contents.length; i++) {
        const item = result.contents[i];
        if (item.video && item.video && item.video.videoId) {
            currentVideoIdForYoutube = item.video.videoId;
            break;
        }
    }

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player-youtube', {
        height: '390',
        width: '640',
        videoId: currentVideoIdForYoutube,
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}
searchButton.addEventListener("click", searchMusic)
