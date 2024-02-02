var searchInput=document.getElementById("search-input")
var searchButton=document.getElementById("search-btn")
var video=document.getElementById("video")
var artistEl=document.getElementById("artist")
var titleEl=document.getElementById("title")
var durationEl=document.getElementById("duration")
async function searchMusic(){
    const searchTerm=searchInput.value
    const url = 'https://youtube-music-api3.p.rapidapi.com/search?q='+searchTerm+'&type=song';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9acf3b020dmsh9ffaf39590cb994p106be6jsn35f223fe2bbe',
            'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        displayResult(data)
    } catch (error) {
        console.error(error);
    }
}
function displayResult(data){
   var author=data.result[0].author
   artistEl.textContent=author
   var title=data.result[0].title
   titleEl.textContent=title
   var duration=data.result[0].duration
   durationEl.textContent=duration

   displaySpotify()   
    
}
async function displaySpotify(){
    var searchTerm=searchInput.value
    const url = 'https://spotify23.p.rapidapi.com/search/?q='+searchTerm+'&type=multi&offset=0&limit=10&numberOfTopResults=5';
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
        var track=result.tracks.items[0].data.albumOfTrack.uri
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                uri:track
              };
            const callback = (EmbedController) => {};
            IFrameAPI.createController(element, options, callback);
          };
    } catch (error) {
        console.error(error);
    }
}
async function displayVideo(videoId){
    const url = 'https://youtube-music-api3.p.rapidapi.com/music/info?id='+videoId;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9acf3b020dmsh9ffaf39590cb994p106be6jsn35f223fe2bbe',
		'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    video.src=result.basic_info.url_canonical

} catch (error) {
	console.error(error);
}
}
searchButton.addEventListener("click", searchMusic)
