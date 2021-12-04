class creature {
    constructor(name, species, level = 1, KO = false) {
        this.name = name;
        this.KO = KO;
        this.species = species;
        this.speciesName = this.species.speciesName;
        this.coreStats = this.species.baseStats;
        this.maxHP = this.calculateMaxHP(species.baseHP, this.coreStats.vit);
        this.HP = this.maxHP;
        this.level = level;
        
    }

    calculateMaxHP(baseHP, vitality) {
        return baseHP + vitality;
    }

    takeDamage(damage) {
        if (this.HP - damage <= 0) {
            this.HP = 0;
            this.KO = true;
        } else {
            this.HP -= damage;

        }
    }

    restoreHP(heal) {
        if (this.hp + heal >= this.maxHP) {
            this.HP = this.maxHP;
        } else {
            this.HP += heal;
        }
    }

}

class species {
    constructor(speciesName, baseHP, baseAP, type, baseStr, baseDex, baseMag, baseVit) {
        this.speciesName = speciesName
        this.baseHP = baseHP;
        this.baseAP = baseAP;
        this.type = type;
        this.baseStats = new stats(baseStr, baseDex, baseMag, baseVit);
    }
}

class stats {
    constructor(str, dex, mag, vit) {
        this.str = str;
        this.dex = dex;
        this.mag = mag;
        this.vit = vit;
    }
}

class action {
    constructor(name, type) {
        this.name = name;
        this.type = type;

    }
}

export { creature, species, stats };