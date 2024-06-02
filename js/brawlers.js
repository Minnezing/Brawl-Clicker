let brawlersData = [
    {
        id: "shelly",
        name: "Шелли",
        description: "Шелли - начальный помощник. Девушка из дикого запада которая не боиться преград. Её дробовик поможет добывать вам множество поинтов на вашем пути. Она готова биться с вами до самого конца.",
        portrait: "Shelly.webp",
        rarity: "start",
        gadget: {
            description: "Выстреливает дробью из 20 дробинок, у каждой шанс попасть 50%. 1 дробинка даёт 1 минуту П.Д.",
            cost: 500_000,
            cooldownInSeconds: 2 * 60 * 60,
            execute: () => {
                let { gems, exp, brawlers } = getData();

                let earned = 0;

                let brawlerUserData = brawlers.find(brw => brw.id === "shelly");

                let pelletsCount = 20;

                if (brawlerUserData?.starpower) {
                    let earnCount = gemsPerSecond * 60 * 10; 
                    earned += earnCount;
                }

                for (let i = 1; i <= pelletsCount; i++) {
                    if (Math.random() > 0.5) {
                        let earnCount = gemsPerSecond * 60; 
                        earned += earnCount;
                        createAddingFX("+" + earnCount, { x: Math.round(Math.random() * 350), y: Math.round(Math.random() * 350) }, true);
                    }
                }
                setData("gems", gems + earned);
                setData("exp", exp + earned);
                setBrawlerData("shelly", "earned", brawlerUserData.earned + earned);
            },
            icon: "Shelly.png"
        },
        starpower: {
            description: "Увеличивает количество дробинок при гаджете до 30. Всегда минимум 10 попадает",
            cost: 10_000_000,
            icon: "Shelly.png"
        },
        expToOpen: 10,
        gemsPerClick: 2,
        levels: [
            {
                cost: 10,
                gemsInSecond: 2
            },
            {
                cost: 200,
                gemsInSecond: 4
            },
            {
                cost: 500,
                gemsInSecond: 15
            },
            {
                cost: 1_500,
                gemsInSecond: 30
            },
            {
                cost: 4_000,
                gemsInSecond: 80
            },
            {
                cost: 8_500,
                gemsInSecond: 140
            },
            {
                cost: 15_000,
                gemsInSecond: 210
            },
            {
                cost: 40_000,
                gemsInSecond: 270
            },
            {
                cost: 50_000,
                gemsInSecond: 320
            },
            {
                cost: 100_000,
                gemsInSecond: 440
            },
            {
                cost: 200_000,
                gemsInSecond: 500
            },
        ]
    },
    {
        id: "colt",
        name: "Кольт",
        description: "Кольт очень высокомерный, но первоклассный стрелок. Его способности помогут вам в пути, хоть он и надоедливый красавчик.",
        portrait: "Colt.webp",
        rarity: "rare",
        gadget: {
            description: "Перезаряжает все гаджеты на 20%",
            cost: 2_000_000,
            cooldownInSeconds: 60 * 60,
            icon: "Colt.png",
            execute: () => {
                let { brawlers } = getData();
                for (let i = 0; i < brawlers.length; i++) {
                    let brawlerUserData = brawlers[i];
                    let brawlerData = brawlersData.find(brw => brw.id == brawlerUserData.id);

                    if (brawlerData.id === "colt") return;
                    if (!brawlerUserData?.gadget || Number(brawlerUserData?.gadget) + brawlerData.gadget.cooldownInSeconds * 1000 < Date.now()) return;

                    let newTime = Number(brawlerUserData?.gadget) - brawlerData.gadget.cooldownInSeconds * 1000 * 0.2;
                    setBrawlerData(brawlerUserData.id, "gadget", newTime);
                }
            }
        },
        starpower: {
            description: "У каждого гаджета перезарядка на 10% меньше",
            cost: 50_000_000,
            icon: "Colt.png",
            execute: () => {
                if (!isEffectActive("colt")) setEffect("./assets/starpowers/Colt.png", "colt", "Перезарядка каждого гаджета на 10% быстрее", 0)
            }
        },
        expToOpen: 10_000,
        gemsPerClick: 10,
        levels: [
            {
                cost: 10_000,
                gemsInSecond: 10
            },
            {
                cost: 16000,
                gemsInSecond: 20
            },
            {
                cost: 34000,
                gemsInSecond: 40
            },
            {
                cost: 66000,
                gemsInSecond: 80
            },
            {
                cost: 100000,
                gemsInSecond: 200
            },
            {
                cost: 175000,
                gemsInSecond: 320
            },
            {
                cost: 220000,
                gemsInSecond: 500
            },
            {
                cost: 290000,
                gemsInSecond: 750
            },
            {
                cost: 400000,
                gemsInSecond: 1200
            },
            {
                cost: 600000,
                gemsInSecond: 1500
            },
            {
                cost: 800000,
                gemsInSecond: 2000
            }
        ]
    },
    {
        id: "el_primo",
        name: "Эль Примо",
        description: "Сильный боец, он очень добрый и готов идти в любое приключение! Ваш мозг и его мускулы явно сделают это приключение незабываемым.",
        portrait: "El_Primo.webp",
        rarity: "rare",
        gadget: {
            description: "100% даёт 30 минут П.Д. но при этом следующие 10 минут ваш пассивный доход уменьшен на 20%",
            cost: 80_000_000,
            cooldownInSeconds: 8 * 60 * 60,
            icon: "El_Primo.png",
            execute: () => {
                let { gems, brawlers } = getData();
                let earned = gemsPerSecond * 30 * 60;
                gems += earned;
                setData("gems", gems);

                let brawlerUserData = brawlers.find(brw => brw.id === "el_primo");

                if (brawlerUserData.starpower) return;
                setEffect("el_primo", "el_primo", "Пассивный доход уменьшен на 20%", 10 * 60 * 1000);
            }
        },
        starpower: {
            description: "Убирает дебаф гаджета",
            cost: 400_000_000,
            icon: "El_Primo.png"
        },
        expToOpen: 400_000,
        gemsPerClick: 10,
        levels: [
            {
                cost: 200_000,
                gemsInSecond: 125
            },
            {
                cost: 320_000,
                gemsInSecond: 350
            },
            {
                cost: 680000,
                gemsInSecond: 580
            },
            {
                cost: 1100000,
                gemsInSecond: 900
            },
            {
                cost: 1600000,
                gemsInSecond: 1400
            },
            {
                cost: 2500000,
                gemsInSecond: 1600
            },
            {
                cost: 3250000,
                gemsInSecond: 2200
            },
            {
                cost: 4000000,
                gemsInSecond: 2800
            },
            {
                cost: 5000000,
                gemsInSecond: 4000
            },
            {
                cost: 7000000,
                gemsInSecond: 6000
            },
            {
                cost: 9000000,
                gemsInSecond: 10000
            }
        ]
    },
    {
        id: "dynamike",
        name: "Динамайк",
        description: "Шахтёр, который давно сошёл с ума. В вас он увидел своего бога и теперь он и его динамит, полностью под вашим контролем! ( Аккуратнее ведь он может подумать в будущем иначе )",
        portrait: "Dynamike.webp",
        rarity: "superrare",
        gadget: {
            description: "Cтанет кнопку на 2-10 сек при которой у вас активируется легальный кликер.",
            cost: 750_000_000,
            cooldownInSeconds: 30 * 60,
            icon: "Dynamike.png",
            execute: () => {
                const min = 2;
                const max = 10;
                let duration = Math.floor(Math.random() * (max - min + 1) + min);
                console.log(duration)
                setEffect("./assets/gadgets/Dynamike.png", "dynamikeGadget", "Легальный кликер", duration * 1000)
            }
        },
        starpower: {
            description: "x10 к кликам",
            cost: 1250000000,
            icon: "Dynamike.png",
            execute: () => {
                if (!isEffectActive("dynamikeStarpower")) setEffect("./assets/starpowers/Dynamike.png", "dynamikeStarpower", "x10 к кликам", 0)
            }
        },
        expToOpen: 20000000,
        gemsPerClick: 10,
        levels: [
            {
                cost: 12000000,
                gemsInSecond: 15000
            },
            {
                cost: 15000000,
                gemsInSecond: 20000
            },
            {
                cost: 18000000,
                gemsInSecond: 25000
            },
            {
                cost: 20000000,
                gemsInSecond: 30000
            },
            {
                cost: 30000000,
                gemsInSecond: 35000
            },
            {
                cost: 50000000,
                gemsInSecond: 40000
            },
            {
                cost: 65000000,
                gemsInSecond: 45000
            },
            {
                cost: 80000000,
                gemsInSecond: 50000
            },
            {
                cost: 100000000,
                gemsInSecond: 55000
            },
            {
                cost: 120000000,
                gemsInSecond: 60000
            },
            {
                cost: 150000000,
                gemsInSecond: 65000
            }
        ]
    }
]