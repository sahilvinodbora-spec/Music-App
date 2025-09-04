// let currentSong = new Audio();
// let songs;

// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }

//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;
// }

// // to get songs from songs folder 

// async function getSongs() {
//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let res = await a.text()
//     console.log(res)
//     let div = document.createElement("div")
//     div.innerHTML = res;
//     let as = div.getElementsByTagName("a")
//     let songs = []
//     for (i = 0; i < as.length; i++) {
//         const element = as[i];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split("/songs/")[1])
//         }
//     }

//     return songs
// }



// const playMusic = (track, pause = false) => {

//     // var audio = new Audio("/songs/" + track);
//     currentSong.src = "/songs/" + track
//     if (!pause) {
//         currentSong.play();
//         play.src = "pause.svg"
//     }

//     document.querySelector(".songinfo").innerHTML = decodeURI(track)
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
// }

// async function main(params) {


//     // get list all the songs

//     songs = await getSongs()
//     playMusic(songs[0], true)
//     console.log(songs)

//     // show all the songs in playlist 

//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li>
//                             <img class="invert" src="music.svg" alt="">
//                             <div class="info">
//                                 <div>${song}</div>
//                                 <div>harry</div>
//                             </div>
//                             <div class="playnow">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="play.svg" alt="">
//                             </div>

//                         </li>`
//     }
//     // //  play the first song 
//     // var audio = new Audio(songs[0]);
//     // // audio.play();

//     // audio.addEventListener("loadeddata", () => {
//     //     let duration = (audio.duration, audio.currentSrc, audio.currentTime);
//     //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
//     // })


//     // attach an event listner to each song

//     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             console.log(e.querySelector(".info").firstElementChild.innerHTML)

//             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//         })

//     })

//     // attach an event listner to play , next and previous

//     play.addEventListener("click", () => {
//         if (currentSong.paused) {
//             currentSong.play()
//             play.src = "pause.svg"
//         }
//         else {
//             currentSong.pause()
//             play.src = "play.svg"
//         }
//     })

//     // listen for time update event 

//     currentSong.addEventListener("timeupdate", () => {
//         // console.log(currentSong.currentTime, currentSong.duration)
//         document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
//         document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
//     })

//     // add event lsitner to seek bar 

//     document.querySelector(".seekbar").addEventListener("click", (e) => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
//         document.querySelector(".circle").style.left = percent + "%"
//         currentSong.currentTime = ((currentSong.duration) * percent) / 100
//     })

//     // add event listner to hamburger

//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "0";
//     })

//     // add event listner to close

//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-120" + "%"
//     })

//     // add event listner to previous 

//     previous.addEventListener("click", () => {
//         console.log("previous clicked")
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//         if((index-1) >= 0 ){
//             playMusic(songs[index+-1])
//         }
//     })

//     // add event listner  next 

//     next.addEventListener("click", () => {
//         console.log("next clicked")
//         // console.log(currentSong.src.split("/").slice(-1))
//         // console.log(songs)
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//         if((index+1) <= songs.length - 1){
//             playMusic(songs[index+1])
//         }
//     })

//     // add event to volume 
//      document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
//         // console.log(e.target,e.target.value)
//         // console.log("setting volume to ",e.target.value,"/100")
//         currentSong.volume =parseInt(e.target.value)/100
//      })
// }
// main()




// //********************* */ To get songs from different albumbs:- ****************

let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// to get songs from songs folder 

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = [];
    for (i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }


    // show all the songs in playlist 

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div></div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>

                        </li>`
    }
    // //  play the first song 
    // var audio = new Audio(songs[0]);
    // // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = (audio.duration, audio.currentSrc, audio.currentTime);
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // })


    // attach an event listner to each song

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)

            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })

    return songs


}



const playMusic = (track, pause = false) => {

    // var audio = new Aud"/songs/"io("/songs/" + track);
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    console.log("displaying albums")
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json();
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder=${folder} class="card">
                        <div class="play">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <!-- Light green circular background -->
                                <circle cx="24" cy="24" r="24" fill="#00FF00" />

                                <!-- Play icon filled -->
                                <path d="M17 34V14L33 24L17 34Z" fill="black" />
                            </svg>

                        </div>
                        <img src="/songs/${folder}/cover.jpg"
                            alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("Fetching Songs")
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0], true)

        })
    })
}

async function main() {


    // get list all the songs
    await getSongs("songs/ncs")
    playMusic(songs[0], true)

    // display all the albums on the page

    displayAlbums()


    // attach an event listner to play , next and previous

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    // listen for time update event 

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    // add event lsitner to seek bar 

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // add event listner to hamburger

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    // add event listner to close

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120" + "%"
    })

    // add event listner to previous 

    previous.addEventListener("click", () => {
        console.log("previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index + -1])
        }
    })

    // add event listner  next 

    next.addEventListener("click", () => {
        console.log("next clicked")
        // console.log(currentSong.src.split("/").slice(-1))
        // console.log(songs)
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) <= songs.length - 1) {
            playMusic(songs[index + 1])
        }
    })

    // add event to volume 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e.target,e.target.value)
        // console.log("setting volume to ",e.target.value,"/100")
        currentSong.volume = parseInt(e.target.value) / 100

        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
        else {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("volume.svg", "mute.svg")
        }


    })

    // add event for mute 

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }

        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }



    })


}
main()

