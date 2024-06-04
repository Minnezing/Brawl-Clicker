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
                        createAddingFX(earnCount, { x: Math.round(Math.random() * 350), y: Math.round(Math.random() * 350) }, true);
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
                createAddingFX(earned, { x: 350/2, y: 350/2 }, true);

                let brawlerUserData = brawlers.find(brw => brw.id === "el_primo");

                setBrawlerData("el_primo", "earned", brawlerUserData.earned + earned);

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
    },
    {
        id: "rico",
        name: "Рико",
        description: "Робот, которого вы нашли на своём пути. Каким то образом Диномайк починил его. Он не испытывает эмоций, он просто бесчувственный помощник с бластерем!",
        portrait: "Rico.webp",
        rarity: "superrare",
        gadget: {
            description: "Каждый клик в течении 5 минут будет удвоен/утроен/учетверен.",
            cost: 2_500_000_000,
            cooldownInSeconds: 10 * 60 * 60,
            icon: "Rico.png",
            execute: () => {
                if (!isEffectActive("rico")) setEffect("./assets/gadgets/Rico.png", "rico", "Каждый клик будет удвоен/утроен/учетверен.", 5 * 60 * 1000);
            }
        },
        starpower: {
            description: "Во время игры может сработать способность гаджета.",
            cost: 10_000_000_000,
            icon: "Rico.png"
        },
        expToOpen: 250000000,
        gemsPerClick: 10,
        levels: [
            {
                cost: 130000000,
                gemsInSecond: 125000
            },
            {
                cost: 200000000,
                gemsInSecond: 150000
            },
            {
                cost: 250000000,
                gemsInSecond: 175000
            },
            {
                cost: 300000000,
                gemsInSecond: 200000
            },
            {
                cost: 400000000,
                gemsInSecond: 225000
            },
            {
                cost: 500000000,
                gemsInSecond: 250000
            },
            {
                cost: 600000000,
                gemsInSecond: 275000
            },
            {
                cost: 750000000,
                gemsInSecond: 300000
            },
            {
                cost: 900000000,
                gemsInSecond: 320000
            },
            {
                cost: 1000000000,
                gemsInSecond: 340000
            },
            {
                cost: 1500000000,
                gemsInSecond: 400000
            }
        ]
    },
    {
        id: "hank",
        name: "Хэнк",
        description: "Вы нашли этого чудика и он говорит что знает будущее! Но на самом деле это бездомный инженер создавший чудо техники в которой сидит. Вы убедили пойти его с собой.",
        portrait: "Hank.webp",
        rarity: "epic",
        gadget: {
            description: "В течении минуты с шансом 20% при нажатии на иконку будет попадаться пузырь который даёт минуту П.Д",
            cost: 30_000_000_000,
            cooldownInSeconds: 10 * 60 * 60,
            icon: "Hank.png",
            execute: () => {
                if (!isEffectActive("hank")) setEffect("./assets/gadgets/Hank.png", "hank", "При нажатии на иконку будет попадаться пузырь.", 60 * 1000);
            }
        },
        starpower: {
            description: "Пузыри могут появлятся во время игры.",
            cost: 100_000_000_000,
            icon: "Hank.png"
        },
        expToOpen: 2 * 10 ** 9,
        gemsPerClick: 100,
        levels: [
            {
                cost: 2_000_000_000,
                gemsInSecond: 500000
            },
            {
                cost: 2_500_000_000,
                gemsInSecond: 700000
            },
            {
                cost: 3_000_000_000,
                gemsInSecond: 900000
            },
            {
                cost: 4_000_000_000,
                gemsInSecond: 1100000
            },
            {
                cost: 5_000_000_000,
                gemsInSecond: 1300000
            },
            {
                cost: 6_000_000_000,
                gemsInSecond: 1500000
            },
            {
                cost: 8_000_000_000,
                gemsInSecond: 2000000
            },
            {
                cost: 12_000_000_000,
                gemsInSecond: 2200000
            },
            {
                cost: 15_000_000_000,
                gemsInSecond: 2500000
            },
            {
                cost: 17_500_000_000,
                gemsInSecond: 2750000
            },
            {
                cost: 17_500_000_000,
                gemsInSecond: 3000000
            }
        ]
    },
    {
        id: "bibi",
        name: "Биби",
        description: "Идя возле небольшого города, ваша большая команда нашли эту девочку. Шелли нашла с ней общий язык, и теперь её бита и бесконечно жующиеся жвачка тоже! ",
        portrait: "Bibi.webp",
        rarity: "epic",
        gadget: {
            description: "В 4 раза увеличивает П.д КАЖДОГО БРАВЛЕРА на 30 секунд.",
            cost: 150_000_000_000,
            cooldownInSeconds: 10 * 60 * 60,
            icon: "Bibi.png",
            execute: () => {
                if (!isEffectActive("bibiGadget")) setEffect("./assets/gadgets/Bibi.png", "bibiGadget", "В 4 раза увеличивает П.д КАЖДОГО БРАВЛЕРА.", 30 * 1000);
            }
        },
        starpower: {
            description: "Увеличивает доход каждого бравлера в 2 раза.",
            cost: 500_000_000_000,
            icon: "Bibi.png",
            execute: () => {
                if (!isEffectActive("bibiStarpower")) setEffect("./assets/starpowers/Bibi.png", "bibiStarpower", "Увеличивает доход каждого бравлера в 2 раза.", 0);
            }
        },
        expToOpen: 55 * 10 ** 9,
        gemsPerClick: 100,
        levels: [
            {
                cost: 50_000_000_000,
                gemsInSecond: 6000000
            },
            {
                cost: 75_000_000_000,
                gemsInSecond: 8000000
            },
            {
                cost: 100_000_000_000,
                gemsInSecond: 12000000
            },
            {
                cost: 125_000_000_000,
                gemsInSecond: 16000000
            },
            {
                cost: 175_000_000_000,
                gemsInSecond: 20000000
            },
            {
                cost: 225_000_000_000,
                gemsInSecond: 22000000
            },
            {
                cost: 250_000_000_000,
                gemsInSecond: 24000000
            },
            {
                cost: 275_000_000_000,
                gemsInSecond: 28000000
            },
            {
                cost: 300_000_000_000,
                gemsInSecond: 30000000
            },
            {
                cost: 350_000_000_000,
                gemsInSecond: 40000000
            },
            {
                cost: 500_000_000_000,
                gemsInSecond: 50000000
            }
        ]
    },
    {
        id: "piper",
        name: "Пайпер",
        description: "Девушка вдова, которая решила присоединиться к вам. Её недолюбливают в вашей команде, но её пирожки очень вкусные, поэтому все просто смирились.",
        portrait: "Piper.webp",
        rarity: "epic",
        gadget: {
            description: "Активирует 1 рандомный гаджет",
            cost: 70_000_000_000_000,
            cooldownInSeconds: 60 * 60,
            icon: "Piper.png",
            execute: () => {
                let { brawlers } = getData();

                let repeats = 1
                if (brawlers.find(brw => brw.id === "piper")?.starpower) repeats = 2;

                for (let i = 0; i < repeats; i++) {
                    let brawlerUserData = brawlers.filter(brw => brw?.gadget && brw.id !== "piper")[Math.floor(Math.random()*brawlers.length)];
    
                    let brawlerData = brawlersData.find(brw => brw.id === brawlerUserData.id);
    
                    brawlerData.gadget.execute();
                }
            }
        },
        starpower: {
            description: " Гаджет активирует 2 рандомных гаджета. ( сам он выпасть не может )",
            cost: 300_000_000_000_000,
            icon: "Piper.png"
        },
        expToOpen: 2.1 * 10 ** 12,
        gemsPerClick: 100,
        levels: [
            {
                cost: 1_500_000_000_000,
                gemsInSecond: 100_000_000
            },
            {
                cost: 2_000_000_000_000,
                gemsInSecond: 200_000_000
            },
            {
                cost: 2_500_000_000_000,
                gemsInSecond: 250_000_000
            },
            {
                cost: 3_500_000_000_000,
                gemsInSecond: 300_000_000 
            },
            {
                cost: 5_000_000_000_000,
                gemsInSecond: 400_000_000
            },
            {
                cost: 7_500_000_000_000,
                gemsInSecond: 500_000_000
            },
            {
                cost: 9_000_000_000_000,
                gemsInSecond: 600_000_000
            },
            {
                cost: 10_000_000_000_000,
                gemsInSecond: 700_000_000 
            },
            {
                cost: 12_000_000_000_000,
                gemsInSecond: 800_000_000
            },
            {
                cost: 15_000_000_000_000,
                gemsInSecond: 900_000_000
            },
            {
                cost: 20_000_000_000_000,
                gemsInSecond: 1_200_000_000
            }
        ]
    }
]