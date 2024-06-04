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
    let { gems, exp, brawlers } = getData();

    if (isEffectActive("dynamikeGadget")) return;
    
    let earning = gemsPerClick;

    if (isEffectActive("dynamikeStarpower")) {
        earning *= 10;
    }

    if (isEffectActive("rico")) {
        const min = 2;
        const max = 4;
        let ratio = Math.floor(Math.random() * (max - min + 1) + min);
        earning *= ratio;
    }

    if (isEffectActive("hank")) {
        let random = Math.random() < 1/20;
        if (random) {
            spawnBubble();
        }
    }

    let rico = brawlers.find(brw => brw.id === "rico");

    if (rico?.starpower) {
        let random = Math.random() < 1/20;
        if (random && !isEffectActive("rico")) {
            const min = 2;
            const max = 4;
            let ratio = Math.floor(Math.random() * (max - min + 1) + min);
            earning *= ratio;
        }
    }

    setData("gems", gems + earning);
    setData("exp", exp + earning);

    brawlers.forEach(brawler => {
        let brawlerData = brawlersData.find(brw => brw.id === brawler.id);
        setBrawlerData(brawler.id, "earned", brawler.earned + brawlerData.gemsPerClick);
    });

    createAddingFX(earning, { x: e.clientX - 7, y: e.clientY + 20 }, false);

    setTimeout(render, 0);
}

let everySecondInterval;
let dynamikeGadgetEffectInterval;
let hankGadgetInterval;
function startClickPerSecond() {
    if (gemsPerSecond === 0 || everySecondInterval) return;
    everySecondInterval = setInterval(() => {
        let { gems, exp, brawlers } = getData();

        let earned = gemsPerSecond;
        if (isEffectActive("el_primo")) {
            earned -= Math.round(earned * 0.2)
        }

        if (isEffectActive("bibiGadget")) {
            earned *= 4;
        }

        if (isEffectActive("bibiStarpower")) {
            earned *= 2;
        }

        if (isEffectActive("dynamikeGadget")) {
            const clicks = 100;
            earned += gemsPerClick * clicks;

            if (!dynamikeGadgetEffectInterval){
                dynamikeGadgetEffectInterval = setInterval(() => {
                    createAddingFX(gemsPerClick * 100, { x: Math.round(Math.random() * 350), y: Math.round(Math.random() * 350) }, true);
                }, clicks / 1000);
            }
        } else if (dynamikeGadgetEffectInterval) {
            clearInterval(dynamikeGadgetEffectInterval);
            dynamikeGadgetEffectInterval = false;
        }

        let hank = brawlers.find(brw => brw.id === "hank");

        if (hank?.starpower && !hankGadgetInterval) {
            hankGadgetInterval = setInterval(() => {
                spawnBubble();
            }, 5 * 60 * 1000);
        }

        setData("gems", gems + earned);
        setData("exp", exp + earned);

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