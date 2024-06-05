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

function setBrawlerEarned(brawlerId, earned) {
    if (!brawlersData.some(brw => brw.id === brawlerId)) return console.error("Нет бойца с id = "+ brawlerId);
    setBrawlerData(brawlerId, "earned", earned);
    return "Done";
}

function resetAll() {
    localStorage.clear();
    gemsPerSecond = 0;
    gemsPerClick = 0;
    return "Done";
}