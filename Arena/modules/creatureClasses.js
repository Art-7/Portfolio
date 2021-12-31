class creature {
    constructor(name, species, actionsList, level = 1, KO = false) {
        this.name = name;
        this.KO = KO;
        this.species = species;
        this.speciesName = this.species.speciesName;
        this.coreStats = this.species.baseStats;
        this.maxHP = this.calculateMaxHP(species.baseHP, this.coreStats.vit);
        this.HP = this.maxHP;
        this.level = level;
        this.actionsList = actionsList;
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
        document.getElementById(this.name).innerHTML = `${this.name} is a level ${this.level} ${this.species.speciesName} <br> HP: ${this.HP} / ${this.maxHP}`
    }

    restoreHP(heal) {
        if (this.hp + heal >= this.maxHP) {
            this.HP = this.maxHP;
        } else {
            this.HP += heal;
        }
    }



    renderNameplate() {
        return `<li id="${this.name}">${this.name} is a level ${this.level} ${this.species.speciesName} <br> HP: ${this.HP} / ${this.maxHP}</li>`
    }

    activateListener(caster, action, callBack, creature) {        // the function should be the action that we are executing, with the caster passed in as one param
        document.getElementById(this.name).addEventListener("click", function handler() {
            //console.log(`selected ${this.name}`)
            console.log('this is ' + this)
            this.removeEventListener("click", handler)
            callBack(caster, action, creature)
        });
    }

    removeListener() {
        document.getElementById(this.name).removeEventListener("click");
    }

    openActionMenu(caster, callBack) {
        console.log(`${this.name} is ready!`)
        let actionMenuHTML = ""
        for (let i = 0; i < this.actionsList.length; i++) {
            actionMenuHTML += this.actionsList[i].renderButton();
            //console.log('html for action list ' + actionMenuHTML);
        }
        actionMenu.innerHTML = actionMenuHTML
        for (let action of this.actionsList) {
            console.log(action);
            action.activateButton(caster, callBack);
        }

    }

    closeActionMenu() {
        actionMenu.innerHTML = ""
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
    constructor(name, type, baseMagnitude, heal=false) {
        this.name = name;
        this.type = type;
        this.baseMagnitude = baseMagnitude;
        this.heal = heal;

    }

    execute(caster, target) {
        const magnitude = this.calculateMagnitude(caster);
        if (this.heal == true) {
            target.restoreHP(magnitude);
        } else {
            target.takeDamage(magnitude);
        }


    }

    calculateMagnitude(caster) {
        let modMag = 2;
        return this.baseMagnitude + modMag;
         

    }
      
    activateButton(caster, callBack) {
        const action = this
        document.getElementById(this.name).addEventListener("click", () => {
            callBack(caster, action);
            //this.openTargetting(caster);
        })
  
    }

    openTargetting = (caster) => {
        console.log(`${caster.name} is using ${this.name}, awaiting target `)
        console.log(this)
        for (let team of space) {
            for (let creature of team) {
                creature.activateListener(caster);
            }
        }

    }

    renderButton() {
        return `<button id="${this.name}">${this.name}</button>`
    }

 
}

export { creature, species, stats, action };