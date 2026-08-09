/* ==========================================================
   ELEMENTOS
========================================================== */

const opening =
    document.getElementById("opening");

const openInvitation =
    document.getElementById("openInvitation");

const invitation =
    document.getElementById("invitation");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");

const musicMessage =
    document.getElementById("musicMessage");

const audio =
    document.getElementById("backgroundMusic");

const progressFill =
    document.getElementById("progressFill");

const progressThumb =
    document.getElementById("progressThumb");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const toast =
    document.getElementById("toast");



/* ==========================================================
   FECHA DEL EVENTO
========================================================== */

const eventDate =
    new Date(
        "2026-09-12T18:30:00-06:00"
    );



/* ==========================================================
   ABRIR INVITACIÓN
========================================================== */

openInvitation.addEventListener(
    "click",
    openInvitationAnimation
);


function openInvitationAnimation() {

    if (
        opening.classList.contains(
            "is-opening"
        )
    ) {

        return;

    }


    document.body.style.overflow =
        "hidden";


    opening.classList.add(
        "is-opening"
    );


    /*
        Intentamos iniciar la música
        inmediatamente después del toque.

        Esto ayuda especialmente en
        iPhone y Android.
    */

    startMusicOnOpening();


    setTimeout(() => {

        invitation.hidden = false;

        window.scrollTo(
            0,
            0
        );

    }, 550);


    setTimeout(() => {

        opening.classList.add(
            "is-gone"
        );


        document.body.style.overflow =
            "";


        activateScrollAnimations();

        createSparkles();

    }, 1250);

}



/* ==========================================================
   MÚSICA AL ABRIR
========================================================== */

async function startMusicOnOpening() {

    try {

        audio.volume = 0;


        await audio.play();


        setPlayingState(
            true
        );


        fadeMusicIn();

    }

    catch (error) {

        setPlayingState(
            false
        );


        musicMessage.textContent =
            "Toca ▶ para reproducir la música";

    }

}



/* ==========================================================
   FADE IN
========================================================== */

function fadeMusicIn() {

    let volume = 0;

    const targetVolume = 0.75;


    const fade =
        setInterval(
            () => {

                volume += 0.04;


                if (
                    volume >=
                    targetVolume
                ) {

                    volume =
                        targetVolume;


                    clearInterval(
                        fade
                    );

                }


                audio.volume =
                    volume;

            },

            80
        );

}



/* ==========================================================
   PLAY / PAUSA
========================================================== */

musicButton.addEventListener(
    "click",
    toggleMusic
);


async function toggleMusic() {

    if (
        !audio.paused
    ) {

        audio.pause();


        setPlayingState(
            false
        );


        return;

    }


    try {

        await audio.play();


        if (
            audio.volume === 0
        ) {

            audio.volume =
                0.75;

        }


        setPlayingState(
            true
        );

    }

    catch (error) {

        setPlayingState(
            false
        );


        showToast(
            "No se encontró la canción. Revisa assets/audio/cancion-xv.mp3"
        );

    }

}



/* ==========================================================
   ESTADO DEL REPRODUCTOR
========================================================== */

function setPlayingState(
    playing
) {

    if (playing) {

        musicIcon.textContent =
            "Ⅱ";


        musicButton.classList.add(
            "music-playing"
        );


        musicMessage.textContent =
            "La música acompaña esta noche ✦";

    }

    else {

        musicIcon.textContent =
            "▶";


        musicButton.classList.remove(
            "music-playing"
        );


        musicMessage.textContent =
            "Toca ▶ para continuar la música";

    }

}



/* ==========================================================
   METADATOS DEL AUDIO
========================================================== */

audio.addEventListener(
    "loadedmetadata",
    updateDuration
);


function updateDuration() {

    duration.textContent =
        formatTime(
            audio.duration
        );

}



/* ==========================================================
   PROGRESO DEL AUDIO
========================================================== */

audio.addEventListener(
    "timeupdate",
    updateProgress
);


function updateProgress() {

    if (
        !audio.duration
    ) {

        return;

    }


    const progress =
        (
            audio.currentTime /
            audio.duration
        ) * 100;


    progressFill.style.width =
        progress + "%";


    progressThumb.style.left =
        progress + "%";


    currentTime.textContent =
        formatTime(
            audio.currentTime
        );


    duration.textContent =
        formatTime(
            audio.duration
        );

}



/* ==========================================================
   AL TERMINAR LA CANCIÓN
========================================================== */

audio.addEventListener(
    "ended",
    () => {

        setPlayingState(
            false
        );


        progressFill.style.width =
            "0%";


        progressThumb.style.left =
            "0%";


        currentTime.textContent =
            "0:00";

    }
);



/* ==========================================================
   FORMATO DE TIEMPO
========================================================== */

function formatTime(
    seconds
) {

    if (
        !Number.isFinite(
            seconds
        )
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return (
        minutes
        +
        ":"
        +
        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )
    );

}



/* ==========================================================
   CONTADOR
========================================================== */

function updateCountdown() {

    const now =
        new Date();


    const difference =
        eventDate - now;


    if (
        difference <= 0
    ) {

        setCountdown(
            0,
            0,
            0,
            0
        );


        return;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds /
            86400
        );


    const hours =
        Math.floor(
            (
                totalSeconds %
                86400
            ) /
            3600
        );


    const minutes =
        Math.floor(
            (
                totalSeconds %
                3600
            ) /
            60
        );


    const seconds =
        totalSeconds %
        60;


    setCountdown(
        days,
        hours,
        minutes,
        seconds
    );

}



/* ==========================================================
   MOSTRAR CONTADOR
========================================================== */

function setCountdown(
    days,
    hours,
    minutes,
    seconds
) {

    document.getElementById(
        "days"
    ).textContent =
        numberFormat(
            days
        );


    document.getElementById(
        "hours"
    ).textContent =
        numberFormat(
            hours
        );


    document.getElementById(
        "minutes"
    ).textContent =
        numberFormat(
            minutes
        );


    document.getElementById(
        "seconds"
    ).textContent =
        numberFormat(
            seconds
        );

}


function numberFormat(
    number
) {

    return String(
        number
    ).padStart(
        2,
        "0"
    );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* ==========================================================
   ANIMACIONES AL SCROLL
========================================================== */

function activateScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            observer
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {

                threshold: .12,

                rootMargin:
                    "0px 0px -3% 0px"

            }

        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}



/* ==========================================================
   DESTELLOS
========================================================== */

function createSparkles() {

    const container =
        document.getElementById(
            "sparkles"
        );


    if (
        !container ||
        container.children.length > 0
    ) {

        return;

    }


    const amount =
        window.innerWidth < 500
            ? 60
            : 80;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const sparkle =
            document.createElement(
                "span"
            );


        sparkle.classList.add(
            "sparkle"
        );


        sparkle.style.left =
            Math.random() *
            100
            +
            "%";


        sparkle.style.top =
            Math.random() *
            100
            +
            "%";


        sparkle.style.setProperty(

            "--duration",

            (
                2
                +
                Math.random() * 4
            )
            +
            "s"

        );


        sparkle.style.animationDelay =
            (
                -Math.random() * 6
            )
            +
            "s";


        container.appendChild(
            sparkle
        );

    }

}



/* ==========================================================
   MENSAJE EMERGENTE
========================================================== */

function showToast(
    message
) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        showToast.timer
    );


    showToast.timer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },

            3400
        );

}
