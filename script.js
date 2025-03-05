

document.getElementsByClassName("search-img")[0].addEventListener("click", function () {
    document.getElementsByClassName("search-bar")[0].focus();
})

let currentsong = new Audio()


function formatTime(seconds) {
    seconds = Math.floor(seconds); // Eliminate milliseconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}


async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/Songs")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let i = 0; i < as.length; i++) {
        let a = as[i]
        if (a.href.endsWith(".mp3")) {
            songs.push(a.href)
        }
    }
    return songs
}

const playMusic = (track) => {
    currentsong.src = `http://127.0.0.1:3000/Songs/${track}`
    document.querySelector(".controls").classList.add("show")
    currentsong.play()
    play.src = "pause.png"
    document.querySelector(".song-name").innerHTML = track
    document.querySelector(".song-time").innerHTML = currentsong.duration
    currentsong.addEventListener("timeupdate", function () {
        document.querySelector(".song-time").innerHTML = formatTime(currentsong.currentTime) + " / " + formatTime(currentsong.duration)
        document.querySelector(".circle").style.left = `${(currentsong.currentTime / currentsong.duration) * 100}%`
    })
}



async function main() {
    let songs = await getsongs()
    console.log(songs)

    let songul = document.getElementsByClassName("songul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li class="left-songss font flex text">
                       <div class=" left-song-list flex">
                        <img src="Music.png" class="music flex" alt="">
                        <div class="song-info flex">${song.replaceAll("http://127.0.0.1:3000/Songs/", "")}</div>
                       </div>
                        <div class="play-now flex">
                            <span>Play Now</span>
                            <img src="play.png" class="invert flex play-img" alt="">
                        </div>
                    </li>`
    }

    Array.from(document.getElementsByClassName("left-song-list")).forEach((element) => {
        element.addEventListener("click", function () {
            playMusic((element.getElementsByClassName("song-info")[0].innerText))
        })

    })
}


main()



let play = document.querySelector(".play")

play.addEventListener("click", function () {
    if (currentsong.paused) {
        currentsong.play()
        play.src = "pause.png"
    } else {
        currentsong.pause()
        play.src = "play.png"
    }
})

let next = document.querySelector(".next")

next.addEventListener("click", function () {
    let songs = document.getElementsByClassName("song-info")
    let current = currentsong.src.replaceAll("http://127.0.0.1:3000/Songs/", "")
    for (let i = 0; i < songs.length; i++) {
        if (songs[i].innerText == current) {
            if (i == songs.length - 1) {
                playMusic(songs[0].innerText)
            } else {
                playMusic(songs[i + 1].innerText)
            }
        }
    }
})

let previous = document.querySelector(".previous")

previous.addEventListener("click", function () {
    let songs = document.getElementsByClassName("song-info")
    let current = currentsong.src.replaceAll("http://127.0.0.1:3000/Songs/", "")
    for (let i = 0; i < songs.length; i++) {
        if (songs[i].innerText == current) {
            if (i == 0) {
                playMusic(songs[songs.length - 1].innerText)
            } else {
                playMusic(songs[i - 1].innerText)
            }
        }
    }
})

