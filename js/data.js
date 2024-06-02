// Получение данных о текущем прогрессе пользователя из localstorage
function getData() {
    let brawlers = JSON.parse(localStorage.getItem("brawlers")) || [];
    let effects = JSON.parse(localStorage.getItem("effects")) || [];
    let gems = Number(localStorage.getItem("gems"));
    let exp = Number(localStorage.getItem("exp"));

    return { brawlers, gems, exp, effects };
}


function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function setBrawlerData(brawlerId, key, value) {
    let { brawlers } = getData();
    let brawler = brawlers.splice(brawlers.findIndex(brw => brw.id == brawlerId), 1)[0];
    brawler[key] = value;
    brawlers.push(brawler);
    setData("brawlers", brawlers);
}