const playAnimation = 0;
let clock;

window.addEventListener("scroll", () => {
    let scroll = this.scrollY;
    let logoYellow = document.querySelectorAll(".logoYellow");
    let desc = document.querySelector('.desc');
    let height = window.innerHeight * 1 / 5;

    let headerLogoRatio = (scroll >= height) ? 0 : Math.abs(Math.round(scroll / height * 1000) / 1000 - 1);
    let contentRatio = (scroll >= height * 10 * 12 / 5) ? 0 : Math.abs(Math.round(scroll / height * 10 * 6 / 5 * 1000) / 100000 - 1);
    if(window.innerWidth <= 768){
        contentRatio = (scroll >= height * 10 * 12 / 5) ? 0 : Math.abs(Math.round(scroll / height * 10 * 5 / 5 * 1000) / 100000 - 1);
    }
    if (window.innerWidth > 768) {
        if (headerLogoRatio === Infinity || headerLogoRatio >= 1 || contentRatio === Infinity || contentRatio >= 1) {
            headerLogoRatio = 1;
        }
        if (scroll === 0) {
            headerLogoRatio = 1;
            contentRatio = 1;
        }

        if (headerLogoRatio < 1 || scroll === 0) {
            logoYellow.forEach(el => {
                el.offset.baseVal = headerLogoRatio;
            })
        }
        

    }
    if (contentRatio <= 0.9) {
        let temp = contentRatio - 0.6;
        if (temp <= 0) {
            temp = 0;
        }
        desc.style.marginLeft = `${-100 *(temp)}%`
    }
    if (headerLogoRatio == 0) {
        if (!document.querySelector(".header").classList.contains("centered")) {
            document.querySelector(".dummy").classList.add("centered");
            document.querySelector(".header_text").classList.add("none");
        }
    } else {
        document.querySelector(".dummy").classList.remove("centered");
        document.querySelector(".header_text").classList.remove("none");
    }

    if (scroll >= height * 5) {
        if (!document.querySelector(".nav").classList.contains("attached")) {
            document.querySelector(".nav").classList.add("attached");
            document.querySelector(".content1").classList.add("afterAttach")
        }
    } else {
        document.querySelector(".nav").classList.remove("attached");
        document.querySelector(".content1").classList.remove("afterAttach")
    }
})

window.addEventListener("resize", () => {
    location.reload();
})

window.addEventListener("load", () => {
    clock = document.querySelector(".clock");

    const DDay = new Date("2022-03-01:20:00:00").getTime();

    var x = setInterval(function() {
        const now = new Date().getTime();
        const gap = DDay - now;
        var days = Math.floor(gap / (1000 * 60 * 60 * 24));
        var hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        hours += days * 24;
        var minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((gap % (1000 * 60)) / 1000);

        let hourText;
        let minuteText;
        let secondText;

        if (hours < 10) {
            hourText = `0${hours}`;
        } else {
            hourText = `${hours}`;
        }
        if (minutes < 10) {
            minuteText = `0${minutes}`;
        } else {
            minuteText = `${minutes}`;
        }
        if (seconds < 10) {
            secondText = `0${seconds}`;
        } else {
            secondText = `${seconds}`;
        }
        if (gap < 0) {
            clearInterval(x);
            document.querySelector(".clockContainer").innerHTML = "<btn class='reqruitForm' title='13기 모집 중' onclick='window.open(`모집링크`)'>지원하러가기!</btn>"
        }
        clock.innerText = `${hourText}:${minuteText}:${secondText}`;
    }, 1000)

    TypeHangul.type('.type', {
        intervalType: 50,
        humanize: 0.3,
    });

    let logoYellow = document.querySelectorAll(".logoYellow");
    if (window.innerWidth <= 768) {
        logoYellow.forEach(el => {
            el.offset.baseVal = 0;
        })
    }

    let typeTarget = document.querySelector(".type");
    typeTarget.addEventListener("th.endType", () => {
        typeTarget.classList.add("typeDone");
        if (playAnimation) {
            setTimeout(() => {
                document.querySelector(".main").style.display = "inline";
            }, 1000);
        }
    });
    typeTarget.addEventListener("th.beforeType", () => {
        if (playAnimation) {
            document.querySelector(".main").style.display = "none";
        }

    });
    let qaArr = document.querySelectorAll(".qaText");
    let qaBoxArr = document.querySelectorAll(".qnaBox");
    qaBoxArr.forEach(el => {
        el.addEventListener("mouseover", () => {
            switch (el.classList[1]) {
                case "qnaBox1":
                    qaArr[0].innerHTML = "현재 .9, .5기 <br>계획은 없습니다."
                    el.classList.add("showAns");
                    break;
                case "qnaBox2":
                    qaArr[1].innerText = "웹을 배우고 싶은 사람이면 모두 환영입니다!"
                    el.classList.add("showAns");
                    break;
                case "qnaBox3":
                    qaArr[2].innerHTML = "선린 1 학년이면 <br>지원이 가능합니다!"
                    el.classList.add("showAns");
                    break;
            }
        })
        el.addEventListener("mouseout", () => {
            switch (el.classList[1]) {
                case "qnaBox1":
                    qaArr[0].innerText = ".9, .5기 계획이 있나요?"
                    el.classList.remove("showAns");
                    break;
                case "qnaBox2":
                    qaArr[1].innerText = "웹이 처음인데 괜찮을까요?"
                    el.classList.remove("showAns");
                    break;
                case "qnaBox3":
                    qaArr[2].innerText = "누구나 지원할 수 있을가요?"
                    el.classList.remove("showAns");
                    break;
            }
        })
    })  
    let switcher = 1;
    let isChanging = true;

    let boxesArr = [htmlJs, ts, nodeJS, linux, mySQL];

    let colorChange = setInterval(function() {
        boxesArr.forEach(el => {
            switcher = Math.round(Math.random())
            if(switcher == 1){
                el.render.fillStyle = "darkgray"
            } else {
                el.render.fillStyle = "rgb(135, 206, 235)"
            }
        })
        if(isChanging === false) {
            clearInterval(colorChange)
        }
    }, 1000);


})