const gemsField = document.getElementById("gems"); 
const expField = document.getElementById("exp");

const brawlersList = document.getElementById("brawlers");
const effectsList = document.getElementById("effects");

const brawlersCount = document.getElementById("brawlers_count");
const brawlersAllCount = document.getElementById("brawlers_all_count");

function render() {
    // Получение данных
    let { brawlers, gems, exp, effects } = getData();

    // Установка эффектов
    effectsBuffer = effects;

    // Рендер эффектов
    let effectHTMLs = ``;
    effectsBuffer.forEach(effect => {
        if (!isEffectActive(effect.name)) {
            clearEffect(effect.name);
            return;
        };
        let effectHTML = `
        <div class="effect">
            <img src="${effect.icon}" class="effect__icon">
            <p class="float">${effect.description}
            ${
                effect.duration ? 
                `<br><br>
                <span class="number">${getRemainingTime(Number(effect.start) + Number(effect.duration))}</span>` : ""
            }</p>
        </div>\n`
        effectHTMLs += effectHTML;
    })
    effectsList.innerHTML = effectHTMLs;

    // Установка кол-ва бравлеров
    gemsPerClick = brawlers.reduce(
        (accumulator, brawler) => accumulator + brawlersData.find(brw => brw.id === brawler.id).gemsPerClick,
        1,
    );

    gemsPerSecond = brawlers.reduce(
        (accumulator, brawler) => accumulator + brawlersData.find(brw => brw.id === brawler.id).levels[brawler.level - 1].gemsInSecond,
        0,
    );

    // Установка данных о добытых кристаллах и опыте.
    gemsField.innerHTML = gems;
    expField.innerHTML = exp;

    // Установка данных о бравлерах
    brawlersCount.innerHTML = brawlers.length;
    brawlersAllCount.innerHTML = brawlersData.length;

    // Рендер бравлеров

    let brawlersHTMLs = "";
    for (let index = 0; index < brawlersData.length; index++) {
        const brawlerData = brawlersData[index];

        let brawlerUserData = brawlers.find(brw => brw.id == brawlerData.id);
        
        // Бравлер недоступен для использования
        const unavailable = !brawlerUserData;

        // Использование пассивки
        if (!unavailable && brawlerUserData.starpower && brawlerData.starpower?.execute) {
            brawlerData.starpower?.execute();
        }

        // Информация о ранге
        let rankNumber = 1;
        let rankColor = "bronze";

        let isOpen = document.querySelector(`.brawler[brawlerid="${brawlerData.id}"]`)?.classList?.contains("open");

        let brawlerElement = `
            <div class="brawler ${isOpen ? "open" : ""}" brawlerId="${brawlerData.id}">
                <div class="brawler__info">
                    <div class="brawler__main_info_wrapper">
                        <div class="brawler__earned" ${unavailable ? 'style="display: none"' : ''}>
                            <img src="./assets/ranks/${rankColor}.svg" draggable="false" class="rank__icon">
                            <p class="rank__number number">${rankNumber}</p>
                            <img src="./assets/icons/gem.png" draggable="false" alt="gems" class="earned__icon">
                            <p class="earned__number number">${brawlerUserData?.earned}</p>
                        </div>
                        <div class="brawler__introducing ${unavailable ? "locked" : ""} ${brawlerData.rarity}">
                            <img src="./assets/brawlers/${brawlerData.portrait}" draggable="false" class="brawler__portrait" ${unavailable ? 'style="height:208px"' : ""}>
                            <p class="brawler__name">${brawlerData.name}</p>
                        </div>
                        <div class="brawler__buy ${brawlerUserData?.level === brawlerData.levels.length ? "max" : ""}">
                            <img ${unavailable ? 'src="./assets/icons/locked.png"' : 'src="./assets/icons/level.svg"'} draggable="false" class="level__icon">
                            <p class="level__number number" ${unavailable ? 'style="display: none"' : ''}>${brawlerUserData?.level}</p>
                            <img ${unavailable ? 'src="./assets/icons/exp.png"' : 'src="./assets/icons/gem.png"'} draggable="false"  alt="gems" class="buy__icon" ${brawlerUserData?.level === brawlerData.levels.length ? 'style="display: none"' : ''}>
                            <p 
                                class="buy__number 
                                    ${brawlerUserData?.level === brawlerData.levels.length ? "max" : (
                                        unavailable ? (exp < brawlerData.expToOpen ? "inactive" : "") : (gems < brawlerData.levels[brawlerUserData?.level].cost ? "inactive" : "")
                                    )}
                                    number"
                            >
                                ${unavailable ? brawlerData.expToOpen : (brawlerUserData?.level === brawlerData.levels.length ? "MAX LEVEL" : brawlerData.levels[brawlerUserData?.level].cost)}
                            </p>
                        </div>
                    </div>
                    <p class="brawler__description">${brawlerData.description}</p>
                </div>
                <div class="brawler__stats">
                    <div class="brawler__abilities">
                        <div class="gadget ${!brawlerUserData?.gadget ? "inactive" : ""}">
                            <img src="./assets/gadgets/${brawlerData.starpower.icon}" alt="Gadget" class="gadget__icon">
                            <p class="gedget__info float">
                                ${brawlerData.gadget.description}
                                <br><br>
                                <span class="abilities__cost">
                                ${
                                    !brawlerUserData?.gadget ?
                                    `<img src="./assets/icons/gem.png" draggable="false"  alt="gems" class="abilities__cost__icon">
                                    ${brawlerData.gadget.cost}`
                                    :
                                    (Number(brawlerUserData?.gadget) + brawlerData.gadget.cooldownInSeconds * 1000 < Date.now()) ?
                                    `Нажмите для активации` :
                                    `Подождите<span class="number">${getRemainingTime(Number(brawlerUserData?.gadget) + brawlerData.gadget.cooldownInSeconds * 1000)}</span>`
                                }
                                </span>
                            </p>
                        </div>
                        <div class="starpower ${!brawlerUserData?.starpower ? "inactive" : ""}">
                            <img src="./assets/starpowers/${brawlerData.starpower.icon}" alt="Starpower" class="starpower__icon">
                            <p class="starpower__info float">
                                ${brawlerData.starpower.description}
                                <span class="abilities__cost">
                                ${
                                    !brawlerUserData?.starpower ?
                                        `
                                        <br><br>
                                        <img src="./assets/icons/gem.png" draggable="false"  alt="gems" class="abilities__cost__icon">
                                        ${brawlerData.starpower.cost}`
                                        : ""
                                    }
                                    
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="stats__list">
                        <div class="brawler__stat">
                            <p class="stat__title">кристаллов за клик</p>
                            <p class="stat__number number">${brawlerData.gemsPerClick}</p>
                        </div>
                        <div class="brawler__stat">
                            <p class="stat__title">кристаллов в секунду</p>
                            <p class="stat__number number">${brawlerData.levels[brawlerUserData?.level - 1 || 0].gemsInSecond} ${(brawlerUserData && brawlerUserData?.level !== brawlerData.levels.length) ? `<span class="add">+${brawlerData.levels[brawlerUserData?.level].gemsInSecond - brawlerData.levels[brawlerUserData?.level-1].gemsInSecond}</span>` : ""}</p>
                        </div>
                    </div>
                    <button class="stats__upgrade ${brawlerUserData?.level === brawlerData.levels.length ? "max" : (unavailable ? (exp < brawlerData.expToOpen ? "inactive" : "") : (gems < brawlerData.levels[brawlerUserData?.level || 1].cost ? "inactive" : ""))}">
                        <img ${unavailable ? 'src="./assets/icons/exp.png"' : 'src="./assets/icons/gem.png"'} ${brawlerUserData?.level === brawlerData.levels.length ? 'style="display: none"' : ''} draggable="false"  alt="gems" class="upgrade__icon">
                        <p class="upgrade__number number">${unavailable ? brawlerData.expToOpen : (brawlerUserData?.level === brawlerData.levels.length ? "MAX LEVEL" : brawlerData.levels[brawlerUserData?.level].cost)}</p>
                    </button>
                </div>
            </div>\n
        `
        brawlersHTMLs += brawlerElement;
    }
    brawlersList.innerHTML = brawlersHTMLs;
    setBrawlerEvents();
    startClickPerSecond();
}

function getRemainingTime(timestamp) {
    let now = Date.now();
    let duration = timestamp - now;
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
}

// Первый рендер
render();