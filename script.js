// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'e3Tn_qlz2RA',
    playerVars: {
        'controls':0,
        'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 100000000);
        done = true;
    }
}
function stopVideo() {
  player.stopVideo();
}

function queueSong(){
    let songUrl = document.getElementById('urlInput')['value']
    document.getElementById('urlInput')['value'] = '';
    let songId = extractVideoId(songUrl);

    if (songId) {

        player.cueVideoById({videoId:songId});

        // Add the video to the queue-list dynamically
        var queueList = document.getElementById('queue-list');
        var listItem = document.createElement('li');
        listItem.textContent = songId;
        queueList.appendChild(listItem);

        // Clear the input field
        linkInput.value = '';
      } else {
        // Handle invalid video link (optional)
        alert('Invalid YouTube video link. Please enter a valid link.');
      }
    
}

function extractVideoId(url) {
    // Regular expression to match YouTube video URLs
    var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regex);

    // Check if there's a match and return the video ID
    return match ? match[1] : null;
  }

document.addEventListener('DOMContentLoaded', stopVideo)