import * as creatures  from "./modules/creatureClasses.js";

let team1 = [];
let team2 = [];
let space = [team1, team2]
let readyCreatures = []

const canvas = document.getElementById("battlefield");
const ctx = canvas.getContext("2d");
const spriteSheet = new Image()
spriteSheet.src = 'assets/rpgcritters2.png'
const background = new Image()
background.src = 'assets/backgrounds/battleback_arena.png'

const sprites = {
    spider: {
        sx: 15,
        sy: 12,
        sw: 33,
        sh: 30
    },

    //draw: function (sprite, draw_x, draw_y) {
    //    ctx.drawImage(spriteSheet, sprites.sprite.sx, sprites.sprite.sy, sprites.sprite.sw, sprites.sprite.sh, draw_x, draw_y, 33, 30)
   // }
}
const drawSprite = (sprite, draw_x, draw_y) => {
    const target = sprite
    ctx.drawImage(spriteSheet, sprites[sprite].sx, sprites[sprite].sy, sprites[sprite].sw, sprites[sprite].sh, draw_x, draw_y, 33, 30)
}


const renderFrame = () => {
    //const background = new Image()
    //background.src = 'assets/backgrounds/battleback_arena.png'
    ctx.drawImage(background, 0, 0, 300, 150)
    drawSprite('spider',50, 10)
    //sprites.draw(sprites.spider, 50, 10)
    //ctx.drawImage(spriteSheet, sprites.spider.sx, sprites.spider.sy, sprites.spider.sw, sprites.spider.sh, 10,10, 33, 30)
}

//ctx.fillStyle = 'rgb(200, 0, 0)'
//ctx.fillRect(10,10,50,50)

const checkVictory = () => {
    const checkKO = (creature) => {
        return creature.KO
    }

    if (team1.every(checkKO)) {
        console.log('Team 2 has won!')
        updateBanner('Game over <br> Team 2 Wins!')
        return true
    }
    if (team2.every(checkKO)) {
        console.log('Team 1 has won!')
        updateBanner('Game over <br> Team 1 Wins!')
        return true
    }
    return false
    
}

        // used to apply targetting listeners to each creature
const openTargetting = (caster, action) => {
    console.log('at open target'    )
    //console.log(caster)
    for (let team of space) {
        for (let creature of team) {
            creature.activateListener(caster, action, confirmAction, creature, handler);
        }
    }

};
        // handler function passed to creature name plates during action sequence
const handler = (caster, action, callBack, creature) => {
    return () => {
        //console.log(`selected ${this.name}`)
        console.log('this is ' + this)
        document.getElementById(creature.name).classList.add("selected")
        //this.removeEventListener("click", handler)
        callBack(caster, action, creature)
    }
}

        // confirms player choice on action to take, cleans up action sequence after executing action
const confirmAction = (caster, action, target) => {
    // prompt to verify action, reset take action cycle if not confirmed
    // confirmation logic, for now skip to execution
    caster.closeActionMenu()
    action.execute(caster, target)
    caster.resetActionTimer()
    renderInterface()
    if (checkVictory()) {
        //end game
    } else {
        checkReadyCreatures()
    }
   
}

// checks for any Creatures awaiting action
const checkReadyCreatures = () => {
    if (readyCreatures.length > 0) {
        takeAction(readyCreatures.pop())
    } else {
        tick()
    }
}

        //starts action sequence by opening Action menu for caster, will likely get phased out later once turn control is in place
const takeAction = (caster, action= null, target= null) => {
        caster.openActionMenu(caster, openTargetting, handler)
        }

const renderTeam = (team) => {
    let teamHTML = ""
    //console.log(teamHTML)
    for (let i = 0; i < team.length; i++) {
        teamHTML += team[i].renderNameplate();
        //console.log(teamHTML)
    }
    return teamHTML
}

// instantiate test actions
let attackTest = new creatures.action('attack', null, 2);
let healTest = new creatures.action('heal', null, 2, true);
console.log(attackTest)
console.log(healTest)

//instantiate test species
let physicalspecies = new creatures.species('physicalTest', 15, 1, null, 15, 10, 5, 10);
let magicalspecies = new creatures.species('magicalTest', 8, 1, null, 5, 8, 15, 10);

//instantiate test creatures
let testcreature1a = new creatures.creature('test1a', physicalspecies, [attackTest, healTest], 1);
let testcreature1b = new creatures.creature('test1b', magicalspecies, [attackTest, healTest], 1);
let testcreature1c = new creatures.creature('test1c', magicalspecies, [attackTest, healTest], 1);

let testcreature2a = new creatures.creature('test2a', magicalspecies, [attackTest, healTest], 1);
let testcreature2b = new creatures.creature('test2b', physicalspecies, [attackTest, healTest], 1);
let testcreature2c = new creatures.creature('test2c', physicalspecies, [attackTest, healTest], 1);


//instantiate test buttons- as if it is test creature1's turn
let damageTestButton1 = `<button id="damage" > Damage ${testcreature1a.name}</button>`;
let healTestButton1 = `<button> Heal ${testcreature1a.name}</button>`;
let attackTestButton1 = `<button id="actiontest"> ${testcreature1a.name} action</button>`

//set up teams
team1.push(testcreature1a);
team1.push(testcreature1b);
team1.push(testcreature1c);

team2.push(testcreature2a);
team2.push(testcreature2b);
team2.push(testcreature2c);


//likely to cut some of these, get team lists and buttons linked to HTML

const team1_render = document.getElementById("team1_list");
const team2_render = document.getElementById("team2_list");
const testButtons = document.getElementById("testButtons");
const announcementBanner = document.getElementById("announcementBanner")
const actionMenu = document.getElementById("actionMenu");       // might use this later

// render function for teams and creature name plates


// render teams and buttons 
const renderInterface = () => {
    team1_render.innerHTML = renderTeam(team1)
    team2_render.innerHTML = renderTeam(team2)
}

// increment timers and cycle to check for ready creatures
const tick = () => {
    console.log("tick")
    let id = setInterval(increment, 1000)

    function  increment() {
        if (readyCreatures.length > 0) {
            console.log('at clear')
            clearInterval(id)
            checkReadyCreatures()
        } else {
            console.log('incrementing timers')
            for (let team of space) {
                for (let creature of team) {
                    creature.incrementActionTimer()
                    if (creature.actionTimer == 50) {
                        readyCreatures.push(creature)

                    }
                }
            }
        }
        
        renderInterface()
    }

}


const updateBanner = (bannerText) => {
    announcementBanner.innerHTML = `${bannerText}`
}
// Execution section

renderInterface()

// rendering and  button scripting  for test buttons
testButtons.innerHTML = damageTestButton1 + healTestButton1 + attackTestButton1

document.getElementById('damage').addEventListener("click", tick());
document.getElementById('actiontest').addEventListener("click", () => {
    updateBanner('banner updated')
    let grab = document.getElementById("test1a")
    grab.classList.add("option")
    console.log(grab)
    renderFrame()
    //ctx.drawImage(spriteSheet,50, 50)
    //Will need a break here when this becomes a while loop
});




//console.log(testcreature1a)
let actingCreature = testcreature1a;
let state = 'ready';
//takeAction(actingCreature);
//actingCreature.openActionMenu();