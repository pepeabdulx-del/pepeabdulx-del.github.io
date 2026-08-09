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

const audio =
    document.getElementById("backgroundMusic");

const progressFill =
    document.getElementById("progressFill");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const toast =
    document.getElementById("toast");


const eventDate =
    new Date(
        "2026-09-12T18:30:00-06:00"
    );



/* ============================================
   ABRIR INVITACIÓN
============================================ */

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


    setTimeout(() => {

        invitation.hidden = false;

        window.scrollTo(
            0,
            0
        );

    }, 600);


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



/* ============================================
   REPRODUCTOR
============================================ */

musicButton.addEventListener(
    "click",
    toggleMusic
);


async function toggleMusic() {

    if (!audio.paused) {

        audio.pause();

        musicIcon.textContent =
            "▶";

        return;

    }


    try {

        await audio.play();

        musicIcon.textContent =
            "Ⅱ";

    }

    catch (error) {

        showToast(
            "Agrega cancion-xv.mp3 dentro de assets/audio/"
        );

    }

}



audio.addEventListener(
    "loadedmetadata",
    updateDuration
);


audio.addEventListener(
    "timeupdate",
    updateProgress
);


audio.addEventListener(
    "ended",
    () => {

        musicIcon.textContent =
            "▶";

    }
);


function updateDuration() {

    duration.textContent =
        formatTime(
            audio.duration
        );

}


function updateProgress() {

    if (!audio.duration) {

        return;

    }


    const progress =
        (
            audio.currentTime /
            audio.duration
        ) * 100;


    progressFill.style.width =
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


function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
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
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )
    );

}



/* ============================================
   CONTADOR
============================================ */

function updateCountdown() {

    const now =
        new Date();


    const difference =
        eventDate - now;


    if (difference <= 0) {

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


function setCountdown(
    days,
    hours,
    minutes,
    seconds
) {

    document.getElementById(
        "days"
    ).textContent =
        numberFormat(days);


    document.getElementById(
        "hours"
    ).textContent =
        numberFormat(hours);


    document.getElementById(
        "minutes"
    ).textContent =
        numberFormat(minutes);


    document.getElementById(
        "seconds"
    ).textContent =
        numberFormat(seconds);

}


function numberFormat(number) {

    return String(number)
        .padStart(
            2,
            "0"
        );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* ============================================
   SCROLL
============================================ */

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
            element =>
                element.classList.add(
                    "visible"
                )
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
        element =>
            observer.observe(
                element
            )
    );

}



/* ============================================
   BRILLOS
============================================ */

function createSparkles() {

    const container =
        document.getElementById(
            "sparkles"
        );


    if (
        !container ||
        container.children.length
    ) {

        return;

    }


    const amount =
        window.innerWidth < 500
            ? 55
            : 75;


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
            Math.random() * 100 +
            "%";


        sparkle.style.top =
            Math.random() * 100 +
            "%";


        sparkle.style.setProperty(

            "--duration",

            (
                2 +
                Math.random() * 4
            ) + "s"

        );


        sparkle.style.animationDelay =
            (
                -Math.random() * 6
            ) + "s";


        container.appendChild(
            sparkle
        );

    }

}



/* ============================================
   TOAST
============================================ */

function showToast(message) {

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
