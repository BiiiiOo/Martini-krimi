
let musicPlaying = false;

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

// Musik ein- und ausschalten
async function toggleMusic() {

    console.log("Musikbutton wurde geklickt");

    if (!music) {
        alert("FEHLER: Audioelement wurde nicht gefunden!");
        return;
    }

    try {

        if (!musicPlaying) {

            music.volume = 0.5;

            await music.play();

            musicPlaying = true;
            musicButton.textContent = "♫ Musik ausschalten";

            console.log("Musik läuft!");

        } else {

            music.pause();

            musicPlaying = false;
            musicButton.textContent = "♫ Musik einschalten";

        }

    } catch (error) {

        console.error("Audiofehler:", error);

        alert("Musik konnte nicht gestartet werden: " + error.message);

    }
}


// Soundeffekte
function playAudio(id, volume = 0.5) {

    const sound = document.getElementById(id);

    if (!sound) {
        console.error("Sound nicht gefunden:", id);
        return;
    }

    sound.volume = volume;
    sound.currentTime = 0;

    sound.play().catch(error => {
        console.error("Soundfehler:", error);
    });

}


// Brief öffnen
function openLetter() {

    const envelope = document.getElementById("envelope");
    const desk = document.getElementById("desk");
    const header = document.getElementById("header");
    const letter = document.getElementById("letter");

    if (envelope.classList.contains("open")) return;

    if (!musicPlaying && music) {

        music.volume = 0.2;

        music.play().then(() => {

            musicPlaying = true;
            musicButton.textContent = "♫ Musik ausschalten";

        }).catch(error => {
            console.log("Musikstart nicht möglich:", error);
        });

    }

    playAudio("sealSound", 0.65);

    envelope.classList.add("open");

    setTimeout(() => {

        desk.classList.add("disappearing");
        header.classList.add("disappearing");

    }, 700);

    setTimeout(() => {

        playAudio("paperSound", 0.45);

    }, 1000);

    setTimeout(() => {

        desk.style.display = "none";
        header.style.display = "none";

        letter.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 1400);

}



// DAS BÖSE - Video abspielen

function playEvil() {

    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("evilVideo");

    overlay.classList.add("active");

    // Hintergrundmusik während des Videos pausieren
    const music = document.getElementById("backgroundMusic");

    if (music) {
        music.pause();

        musicPlaying = false;

        const button = document.getElementById("musicButton");

        if (button) {
            button.textContent = "♫ Musik einschalten";
        }
    }

    // Video starten
    video.currentTime = 0;

    video.play().catch(error => {
        console.error("Video konnte nicht gestartet werden:", error);
    });

}


// Video schließen

function closeEvil() {

    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("evilVideo");

    video.pause();

    video.currentTime = 0;

    overlay.classList.remove("active");

}

// MARTIN NIMMT DEN FALL AN

function acceptCase() {

    const decision = document.getElementById("decisionSection");
    const message = document.getElementById("acceptanceMessage");

    decision.style.display = "none";

    message.classList.add("show");

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}



// BEDENKZEIT WIRD ABGELEHNT

function delayCase() {

    const overlay = document.getElementById("rejectionOverlay");

    overlay.classList.add("active");

}


// BEDENKZEIT-FENSTER SCHLIESSEN

function closeRejection() {

    const overlay = document.getElementById("rejectionOverlay");

    overlay.classList.remove("active");

}

