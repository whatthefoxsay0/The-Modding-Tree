addLayer("p", {
    name: "monkey", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#964B00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "monkeys", // Name of prestige currency
    baseResource: "bananas", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("p", 11)) mult = mult.add(upgradeEffect("p", 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for monkeys", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "More Monkeys!",
            description: "increase monkey gain multiplier",
            cost: new Decimal(5),
            effect() {
                eff = new Decimal(1)
                if (hasUpgrade(this.layer, 12)) eff = eff.times(upgradeEffect(this.layer, 12))
                if (hasUpgrade(this.layer, 13)) eff = eff.times(upgradeEffect(this.layer, 13))
                return eff
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))}
        },
        12: {
            title: "Even More Monkeys!",
            description: "boost More Monkeys! based on monkeys",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Much More Monkeys!",
            description: "boost More Monkeys! based on bananas",
            cost: new Decimal(30),
            effect() {
                return player.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "More Bananas!",
            description: "boost bananas based on monkeys",
            cost: new Decimal(100),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "Even More Bananas!",
            description: "boost bananas based on bananas",
            cost: new Decimal(500),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
    layerShown(){return true}
})
