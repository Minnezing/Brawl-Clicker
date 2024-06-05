function setGems(gems) {
    setData("gems", gems);
    return "Done";
}

function setExp(exp) {
    setData("exp", exp);
    return "Done";
}

function resetBrawlerGadget(brawlerId) {
    if (!brawlersData.some(brw => brw.id === brawlerId)) return console.error("Нет бойца с id = "+ brawlerId);
    setBrawlerData(brawlerId, "gadget", true);
    return "Done";
}

function setBrawlerEarnedGems(brawlerId, earned) {
    if (!brawlersData.some(brw => brw.id === brawlerId)) return console.error("Нет бойца с id = "+ brawlerId);
    setBrawlerData(brawlerId, "earned", earned);
    return "Done";
}

function setBrawlerEarnedInSeconds(brawlerId, earnedInSeconds) {
    let brawlerData = brawlersData.find(brw => brw.id === brawlerId);
    if (!brawlerData) return console.error("Нет бойца с id = "+ brawlerId);
    setBrawlerData(brawlerId, "earned", earnedInSeconds * brawlerData.levels.at(-1).gemsInSecond);
    return "Done";
}

function resetAll() {
    localStorage.clear();
    gemsPerSecond = 0;
    gemsPerClick = 0;
    return "Done";
}