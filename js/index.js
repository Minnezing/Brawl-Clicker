// Эффекты
let effectsBuffer = [
    {
        description: "",
        start: 0,
        duration: 0,
        id: ""
    }
];

// Переменные
let gemsPerClick = 1;
let gemsPerSecond = 0;

// Клики

function click(e) {
    let { gems, exp } = getData();

    if (isEffectActive("dynamikeGadget")) return;
    
    let earning = gemsPerClick;

    if (isEffectActive("dynamikeStarpower")) {
        earning *= 10;
    }

    setData("gems", gems + earning);
    setData("exp", exp + earning);

    let {brawlers} = getData();
    brawlers.forEach(brawler => {
        let brawlerData = brawlersData.find(brw => brw.id === brawler.id);
        setBrawlerData(brawler.id, "earned", brawler.earned + brawlerData.gemsPerClick);
    });

    createAddingFX("+" + earning, { x: e.clientX - 7, y: e.clientY + 20 }, false);

    setTimeout(render, 0);
}

let everySecondInterval;
function startClickPerSecond() {
    if (gemsPerSecond === 0 || everySecondInterval) return;
    everySecondInterval = setInterval(() => {
        let { gems, exp } = getData();

        let earned = gemsPerSecond;
        if (isEffectActive("el_primo")) {
            earned -= Math.round(earned * 0.2)
        }

        if (isEffectActive("dynamikeGadget")) {
            earned += gemsPerClick * 100;
        }

        setData("gems", gems + earned);
        setData("exp", exp + earned);

        let {brawlers} = getData();
        brawlers.forEach(brawler => {
            let brawlerData = brawlersData.find(brw => brw.id === brawler.id);
            if (isEffectActive("el_primo")) {
                setBrawlerData(brawler.id, "earned", Math.round(brawler.earned + brawlerData.levels[brawler.level - 1].gemsInSecond - brawlerData.levels[brawler.level - 1].gemsInSecond * 0.2));
            } else {
                setBrawlerData(brawler.id, "earned", brawler.earned + brawlerData.levels[brawler.level - 1].gemsInSecond);
            }
        });

        setTimeout(render, 0);
    }, 1000)    
}

const clicker = document.getElementById("click");

clicker.addEventListener("click", click);