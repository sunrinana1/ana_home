window.addEventListener("scroll", () => {
    
    
    let scroll = this.scrollY;
    

    let height = window.innerHeight * 1/5;
    let ratio = (scroll >= height) ? 0 : Math.abs(Math.round(scroll / height * 1000) / 1000 - 1);
    if (ratio === Infinity || ratio >= 1) {
        ratio = 1;
    }
    if (scroll === 0) {
        ratio = 1;
    }

    if (ratio < 1 || scroll === 0) {
        logoYellow.forEach(el => {
            el.offset.baseVal = ratio;
        })
    }
    console.log(ratio)
    if (ratio == 0) {
        if (!document.querySelector(".start").classList.contains("centered")) {
            document.querySelector(".dummy").classList.add("centered");
            document.querySelector(".start_text").classList.add("none");
        }
    } else {
        document.querySelector(".dummy").classList.remove("centered");
        document.querySelector(".start_text").classList.remove("none");
    }
})



window.addEventListener("load", () => {
    TypeHangul.type('.type', {
        intervalType: 50,
        humanize: 0.3,
    });

    let logoYellow = document.querySelectorAll(".logoYellow");
    if(window.innerWidth <= 800){
        logoYellow.forEach(el => {
            el.offset.baseVal = 0;
        })
        return;
    }

    let typeTarget = document.querySelector(".type");
    typeTarget.addEventListener("th.endType", () => {
        typeTarget.classList.add("typeDone");
    });
    typeTarget.addEventListener("th.beforeType", () => {
        console.log(typeTarget.style.width);
    });
})