
var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-btn")
var video = document.getElementById("video")
var tag = document.createElement('script');
var currentVideoIdForYoutube = '';
var player;
var done = false;

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
    } catch (error) {
        console.error(error);
    }
}

async function getListFromYoutubeAPI(searchTerm) {

    const url = `https://youtube-v2.p.rapidapi.com/search/?query=${searchTerm}&lang=en&order_by=this_month&country=us`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '51473953f5msh4174de0debb5d14p109f1ejsn33be9a535330',
            'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
        }
    };
    let result;
    try {
        const response = await fetch(url, options);
        // const result = await response.text();
        result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
        return null;
    }
    return result;
    // const url = 'https://youtube138.p.rapidapi.com/search/?q=' + searchTerm + '&hl=en&gl=US';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '9acf3b020dmsh9ffaf39590cb994p106be6jsn35f223fe2bbe',
    //         'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    //     }
    // };
    // var result;
    // try {
    //     const response = await fetch(url, options);
    //     result = await response.json();
    //     console.log(result);
    // } catch (error) {
    //     console.error(error);
    //     return null;
    // }
    // return result;
}

function extractFirstVideoFromListOfYoutubeVideos(list) {
    let videoId = '';
    for (let i = 0; i < list.videos.length; i++) {
        const item = list.videos[i];
        if (item && item.video_id) {
            videoId = item.video_id;
            break;
        }
    }
    return videoId;
}

async function displayVideoInIFrame(searchTerm) {

    const listOfVideos = await getListFromYoutubeAPI(searchTerm);

    currentVideoIdForYoutube = extractFirstVideoFromListOfYoutubeVideos(listOfVideos)

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

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



async function searchMusic() {
    const searchTerm = searchInput.value;
    displayVideoInIFrame(search);
    displaySpotify(searchTerm);

    // Save the searched term to local storage
    saveToLocalStorage('searchedMusic', searchTerm);
}