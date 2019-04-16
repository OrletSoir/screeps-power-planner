/**
 * All power creep related constants
 */

// max level
const POWER_CREEP_MAX_LEVEL = 25;

// classes
const POWER_CLASS = {
    OPERATOR: 'operator'
};

// powers
const PWR_GENERATE_OPS = 1;
const PWR_OPERATE_SPAWN = 2;
const PWR_OPERATE_TOWER = 3;
const PWR_OPERATE_STORAGE = 4;
const PWR_OPERATE_LAB = 5;
const PWR_OPERATE_EXTENSION = 6;
const PWR_OPERATE_OBSERVER = 7;
const PWR_OPERATE_TERMINAL = 8;
const PWR_DISRUPT_SPAWN = 9;
const PWR_DISRUPT_TOWER = 10;
const PWR_DISRUPT_SOURCE = 11;
const PWR_SHIELD = 12;
const PWR_REGEN_SOURCE = 13;
const PWR_REGEN_MINERAL = 14;
const PWR_DISRUPT_TERMINAL = 15;
const PWR_OPERATE_POWER = 16;
const PWR_FORTIFY = 17;
const PWR_OPERATE_CONTROLLER = 18;
const PWR_OPERATE_FACTORY = 19;

// powers descriptions
const POWER_DESCRIPTIONS = {
	[PWR_GENERATE_OPS]: {
		name: "GENERATE_OPS",
		text: "Generate {0} ops resource units."
	},
	[PWR_OPERATE_SPAWN]: {
		name: "OPERATE_SPAWN",
		text: "Reduce spawn time by {0}."
	},
	[PWR_OPERATE_TOWER]: {
		name: "OPERATE_TOWER",
		text: "Increase damage, repair and heal amount by {0}."
	},
	[PWR_OPERATE_STORAGE]: {
		name: "OPERATE_STORAGE",
		text: "Increase capacity by {0} units."
	},
	[PWR_OPERATE_LAB]: {
		name: "OPERATE_LAB",
		text: "Increase reaction amount by {0} units."
	},
	[PWR_OPERATE_EXTENSION]: {
		name: "OPERATE_EXTENSION",
		text: "Instantly fill {0} of all extensions in the room using energy from the target structure (container, storage, or terminal)."
	},
	[PWR_OPERATE_OBSERVER]: {
		name: "OPERATE_OBSERVER",
		text: "Grant unlimited range."
	},
	[PWR_OPERATE_TERMINAL]: {
		name: "OPERATE_TERMINAL",
		text: "Decrease transfer energy cost and cooldown by {0}."
	},
	[PWR_DISRUPT_SPAWN]: {
		name: "DISRUPT_SPAWN",
		text: "Pause spawning process."
	},
	[PWR_DISRUPT_TOWER]: {
		name: "DISRUPT_TOWER",
		text: "Reduce effectiveness by {0}."
	},
	[PWR_DISRUPT_SOURCE]: {
		name: "DISRUPT_SOURCE",
		text: "Pause energy regeneration."
	},
	[PWR_SHIELD]: {
		name: "SHIELD",
		text: "Create a temporary non-repairable rampart structure on the same square with {0} hits. Cannot be used on top of another rampart."
	},
	[PWR_REGEN_SOURCE]: {
		name: "REGEN_SOURCE",
		text: "Regenerate {0} energy units in a source every 15 ticks."
	},
	[PWR_REGEN_MINERAL]: {
		name: "REGEN_MINERAL",
		text: "Regenerate {0} mineral units in a deposit every 10 ticks."
	},
	[PWR_DISRUPT_TERMINAL]: {
		name: "DISRUPT_TERMINAL",
		text: "Block withdrawing resources from the terminal."
	},
	[PWR_FORTIFY]: {
		name: "FORTIFY",
		text: "Make a wall or rampart tile invulnerable to all creep attacks and powers."
	},
	[PWR_OPERATE_POWER]: {
		name: "OPERATE_POWER",
		text: "Increase power processing speed of a Power Spawn by {0} units per tick."
	},
	[PWR_OPERATE_CONTROLLER]: {
		name: "OPERATE_CONTROLLER",
		text: "Increase max limit of energy that can be used for upgrading a Level 8 Controller each tick by {0} energy units."
	},
	[PWR_OPERATE_FACTORY]: {
		name: "OPERATE_FACTORY",
		text: "An unknown power."
	},
};

// powers info
const POWER_INFO = {"1":{"className":"operator","level":[0,2,7,14,22],"cooldown":50,"effect":[1,2,4,6,8]},"2":{"className":"operator","level":[0,2,7,14,22],"cooldown":300,"duration":1000,"range":3,"ops":100,"effect":[0.9,0.7,0.5,0.35,0.2]},"3":{"className":"operator","level":[0,2,7,14,22],"cooldown":10,"duration":100,"range":3,"ops":10,"effect":[1.1,1.2,1.3,1.4,1.5]},"4":{"className":"operator","level":[0,2,7,14,22],"cooldown":800,"duration":1000,"range":3,"ops":100,"effect":[500000,1000000,2000000,4000000,7000000]},"5":{"className":"operator","level":[0,2,7,14,22],"cooldown":50,"duration":1000,"range":3,"ops":10,"effect":[2,4,6,8,10]},"6":{"className":"operator","level":[0,2,7,14,22],"cooldown":50,"range":3,"ops":2,"effect":[0.2,0.4,0.6,0.8,1]},"7":{"className":"operator","level":[0,2,7,14,22],"cooldown":400,"duration":[200,400,600,800,1000],"range":3,"ops":10},"8":{"className":"operator","level":[0,2,7,14,22],"cooldown":500,"duration":1000,"range":3,"ops":100,"effect":[0.9,0.8,0.7,0.6,0.5]},"9":{"className":"operator","level":[0,2,7,14,22],"cooldown":5,"range":20,"ops":10,"duration":[1,2,3,4,5]},"10":{"className":"operator","level":[0,2,7,14,22],"cooldown":0,"duration":5,"range":50,"ops":10,"effect":[0.9,0.8,0.7,0.6,0.5]},"11":{"className":"operator","level":[0,2,7,14,22],"cooldown":100,"range":3,"ops":100,"duration":[100,200,300,400,500]},"12":{"className":"operator","level":[0,2,7,14,22],"effect":[5000,10000,15000,20000,25000],"duration":50,"cooldown":20,"energy":100},"13":{"className":"operator","level":[10,11,12,14,22],"cooldown":100,"duration":300,"range":3,"effect":[50,100,150,200,250],"period":15},"14":{"className":"operator","level":[10,11,12,14,22],"cooldown":100,"duration":100,"range":3,"effect":[2,4,6,8,10],"period":10},"15":{"className":"operator","level":[20,21,22,23,24],"cooldown":8,"duration":10,"range":50,"ops":[50,40,30,20,10]},"16":{"className":"operator","level":[10,11,12,14,22],"cooldown":800,"range":3,"duration":1000,"ops":200,"effect":[1,2,3,4,5]},"17":{"className":"operator","level":[0,2,7,14,22],"cooldown":5,"range":3,"ops":5,"duration":[1,2,3,4,5]},"18":{"className":"operator","level":[20,21,22,23,24],"cooldown":800,"range":3,"duration":1000,"ops":200,"effect":[10,20,30,40,50]},"19":{"className":"operator","level":[0,2,7,14,22],"cooldown":1000,"range":3,"duration":800,"ops":100}};
/*{
    [PWR_GENERATE_OPS]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 50,
        effect: [1, 2, 4, 6, 8]
    },
    [PWR_OPERATE_SPAWN]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 300,
        duration: 1000,
        range: 3,
        ops: 100,
        effect: [0.9, 0.7, 0.5, 0.35, 0.2]
    },
    [PWR_OPERATE_TOWER]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 10,
        duration: 100,
        range: 3,
        ops: 10,
        effect: [1.1, 1.2, 1.3, 1.4, 1.5]
    },
    [PWR_OPERATE_STORAGE]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 800,
        duration: 1000,
        range: 3,
        ops: 100,
        effect: [500000,1000000,2000000,4000000,7000000]
    },
    [PWR_OPERATE_LAB]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 50,
        duration: 1000,
        range: 3,
        ops: 10,
        effect: [2,4,6,8,10]
    },
    [PWR_OPERATE_EXTENSION]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 50,
        range: 3,
        ops: 2,
        effect: [0.2, 0.4, 0.6, 0.8, 1.0]
    },
    [PWR_OPERATE_OBSERVER]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 400,
        duration: [200,400,600,800,1000],
        range: 3,
        ops: 10,
    },
    [PWR_OPERATE_TERMINAL]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 500,
        duration: 1000,
        range: 3,
        ops: 100,
        effect: [0.9, 0.8, 0.7, 0.6, 0.5]
    },
    [PWR_DISRUPT_SPAWN]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 5,
        range: 20,
        ops: 10,
        duration: [1,2,3,4,5]
    },
    [PWR_DISRUPT_TOWER]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 0,
        duration: 5,
        range: 3,
        ops: 10,
        effect: [0.9, 0.8, 0.7, 0.6, 0.5],
    },
    [PWR_DISRUPT_SOURCE]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 100,
        range: 3,
        ops: 100,
        duration: [100, 200, 300, 400, 500]
    },
    [PWR_SHIELD]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        effect: [5000, 10000, 15000, 20000, 25000],
        duration: 50,
        cooldown: 20,
        energy: 100,
    },
    [PWR_REGEN_SOURCE]: {
        className: POWER_CLASS.OPERATOR,
        level: [10, 11, 12, 14, 22],
        cooldown: 100,
        duration: 300,
        range: 3,
        effect: [50,100,150,200,250],
        period: 15
    },
    [PWR_REGEN_MINERAL]: {
        className: POWER_CLASS.OPERATOR,
        level: [10, 11, 12, 14, 22],
        cooldown: 100,
        duration: 100,
        range: 3,
        effect: [2,4,6,8,10],
        period: 10
    },
    [PWR_DISRUPT_TERMINAL]: {
        className: POWER_CLASS.OPERATOR,
        level: [20, 21, 22, 23, 24],
        cooldown: 8,
        duration: 10,
        range: 50,
        ops: [50,40,30,20,10]

    },
    [PWR_FORTIFY]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 5,
        range: 3,
        ops: 5,
        duration: [1, 2, 3, 4, 5]
    },
    [PWR_OPERATE_POWER]: {
        className: POWER_CLASS.OPERATOR,
        level: [10, 11, 12, 14, 22],
        cooldown: 1000,
        range: 3,
        duration: 800,
        ops: 200,
        effect: [1, 2, 3, 4, 5]
    },
    [PWR_OPERATE_CONTROLLER]: {
        className: POWER_CLASS.OPERATOR,
        level: [20, 21, 22, 23, 24],
        cooldown: 1000,
        range: 3,
        duration: 800,
        ops: 200,
        effect: [10, 20, 30, 40, 50]
    },
    [PWR_OPERATE_FACTORY]: {
        className: POWER_CLASS.OPERATOR,
        level: [0, 2, 7, 14, 22],
        cooldown: 1000,
        range: 3,
        duration: 800,
        ops: 100
    }
};*/