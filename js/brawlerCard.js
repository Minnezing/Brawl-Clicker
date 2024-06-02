function setBrawlerEvents() {
    const brawlers = document.querySelectorAll(".brawler");
    brawlers.forEach(brawler => {
        // Октрытие / закрытие карточки бравлера
        if (brawler.classList.contains("open")) {
            document.addEventListener('click', (e) => outsideClickListener(e, brawler));
        }
        brawler.addEventListener("click", (e) => openAndClose(e, brawler))
        // Покупка улучшений
        let upgradeButton = brawler.querySelector(".stats__upgrade");
        upgradeButton.addEventListener("click", (e) => upgrade(brawler.getAttribute("brawlerid")));

        // Покупка и активация гаджета
        let gadgetButton = brawler.querySelector(".gadget__icon");
        gadgetButton.addEventListener("click", (e) => activateGadget(brawler.getAttribute("brawlerid")))

        // Покупка и активация пасивки
        let starpowerButton = brawler.querySelector(".starpower__icon");
        starpowerButton.addEventListener("click", (e) => activateStarpower(brawler.getAttribute("brawlerid")))
    })
}

function openAndClose(e, brawler) {
    brawler.classList.add("open");

    document.addEventListener('click', (event) => outsideClickListener(event, brawler));
}

const outsideClickListener = (event, brawler) => {
    if (event.target.closest(`.brawler[brawlerid="${brawler.getAttribute("brawlerid")}"]`) === null) {
        brawler.classList.remove("open");
        removeClickListener();
    }
}

const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
}

function upgrade(brawlerId) {
    let { gems, exp, brawlers } = getData();
    let brawler = brawlers.find(brw => brw.id === brawlerId);
    let brawlerData = brawlersData.find(brw => brw.id === brawlerId);
    if (!brawler) {
        if (exp < brawlerData.expToOpen) return;
        brawlers.push({
            id: brawlerId,
            level: 1,
            earned: 0,
            starpower: false,
            gadget: false
        })
        setData("brawlers", brawlers);
    } else {
        if (brawler.level === brawlerData.levels.length) return;
        if (gems < brawlerData.levels[brawler.level].cost) return;
        setData("gems", gems - brawlerData.levels[brawler.level].cost);
        setBrawlerData(brawlerId, "level", brawler.level + 1);
    }
    setTimeout(render, 0);
}

function activateGadget(brawlerId) {
    let { brawlers, gems } = getData();
    let brawlerUserData = brawlers.find(brw => brw.id === brawlerId);
    let brawlerData = brawlersData.find(brw => brw.id === brawlerId);

    if (!brawlerUserData) return;

    if (!brawlerUserData?.gadget) {
        if (gems < brawlerData.gadget.cost) return;
        setData("gems", gems - brawlerData.gadget.cost);
        setBrawlerData(brawlerId, "gadget", true);
    } else {
        if (brawlerUserData?.gadget === true || (Number(brawlerUserData?.gadget) + brawlerData.gadget.cooldownInSeconds * 1000) < Date.now()) {
            brawlerData.gadget.execute();
            let startTime = Date.now();
            if (isEffectActive("colt")) startTime -= brawlerData.gadget.cooldownInSeconds * 1000 * 0.1;
            setBrawlerData(brawlerId, "gadget", startTime);
        }
    }
    setTimeout(render, 0);
}

function activateStarpower(brawlerId) {
    let { brawlers, gems } = getData();
    let brawlerUserData = brawlers.find(brw => brw.id === brawlerId);
    let brawlerData = brawlersData.find(brw => brw.id === brawlerId);

    if (!brawlerUserData) return;
    
    if (!brawlerUserData?.starpower) {
        if (gems < brawlerData.starpower.cost) return;
        setData("gems", gems - brawlerData.starpower.cost);
        setBrawlerData(brawlerId, "starpower", true);
    }
}