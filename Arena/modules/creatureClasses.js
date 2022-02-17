
        // class controlling all things regarding creatures: stat management, action usage and targetting logic
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
        this.actionTimer = 0;
    }

    //Methods used for managing HP
        // returns MaxHP 
    calculateMaxHP(baseHP, vitality) {
        return baseHP + vitality;
    }
        // applies damage to creature, marks KO if depleted
    takeDamage(damage) {
        if (this.HP - damage <= 0) {
            this.HP = 0;
            this.KO = true;
            this.actionTimer = 0;
        } else {
            this.HP -= damage;

        }
        document.getElementById(this.name).innerHTML = `${this.name} is a level ${this.level} ${this.species.speciesName} <br> HP: ${this.HP} / ${this.maxHP}`
    }
        // applies healing to creature
    restoreHP(heal) {
        if (this.hp + heal >= this.maxHP) {
            this.HP = this.maxHP;
        } else {
            this.HP += heal;
        }
    }

    //Methods used to handle actionTimer
        //increments action timer
    incrementActionTimer() {
        if (this.KO == false) {
            this.actionTimer += 1 + this.coreStats.dex;
            if (this.actionTimer >= 50) {
                this.actionTimer = 50;
            }
        }

    }

    resetActionTimer() {
        this.actionTimer = 0;
    }

    // Methods used for interface control
        // generates name plate for creature
    renderNameplate() {
        return `<li id="${this.name}" class="namePlate">${this.name} is a level ${this.level} ${this.species.speciesName} <br> HP: ${this.HP} / ${this.maxHP} actionTimer: ${this.actionTimer}/50</li>`
    }
        // activates listener for nameplate, sets up execution logic when targetted by action
    activateListener(caster, action, callBack, creature, handler) {        
        console.log(handler)
        document.getElementById(this.name).classList.add("option")
        document.getElementById(this.name).addEventListener("click", handler(caster, action, callBack, creature));
    }
        // supposed to remove the listener, not used currently, now just regenerating creature nameplates
    removeListener(handler) {
        document.getElementById(this.name).removeEventListener("click", handler())
    }
        // opens the action Menu for creatures when it is their turn to act
    openActionMenu(caster, callBack, handler) {
        console.log(`${this.name} is ready!`)
        let actionMenuHTML = ""
        for (let i = 0; i < this.actionsList.length; i++) {
            actionMenuHTML += this.actionsList[i].renderButton();
            //console.log('html for action list ' + actionMenuHTML);
        }
        actionMenu.innerHTML = actionMenuHTML
        for (let action of this.actionsList) {
            console.log(action);
            action.activateButton(caster, callBack, handler);
        }

    }
        // closes action menu when done with action sequence
    closeActionMenu() {
        actionMenu.innerHTML = ""
    }
}
        //class used to control species which determine basic creature traits
class species {
    constructor(speciesName, baseHP, baseAP, type, baseStr, baseDex, baseMag, baseVit) {
        this.speciesName = speciesName
        this.baseHP = baseHP;
        this.baseAP = baseAP;
        this.type = type;
        this.baseStats = new stats(baseStr, baseDex, baseMag, baseVit);
    }
}
        //class used to hold main stats of creatures
class stats {
    constructor(str, dex, mag, vit) {
        this.str = str;
        this.dex = dex;
        this.mag = mag;
        this.vit = vit;
    }
}
        //Class governing actions and methods used to build Action menu and execute actions
class action {
    constructor(name, type, baseMagnitude, heal=false) {
        this.name = name;
        this.type = type;
        this.baseMagnitude = baseMagnitude;
        this.heal = heal;

    }
            // carries out action against target
    execute(caster, target) {
        const magnitude = this.calculateMagnitude(caster);
        if (this.heal == true) {
            target.restoreHP(magnitude);
        } else {
            target.takeDamage(magnitude);
        }


    }
            // Calculates strength of action
    calculateMagnitude(caster) {
        let modMag = 10;
        return this.baseMagnitude + modMag;
         

    }
            //Attaches handlers to each button, callBack is openTargetting function, which carries caster, and passes handler to each possible target
    activateButton(caster, callBack, handler) {
        const action = this
        document.getElementById(this.name).addEventListener("click", () => {
            callBack(caster, action, handler);
            //this.openTargetting(caster);
        })
  
    }

        //creates button for action in Menu
    renderButton() {
        return `<button id="${this.name}">${this.name}</button>`
    }

 
}

export { creature, species, stats, action };