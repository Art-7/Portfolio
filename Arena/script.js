import * as creatures  from "./modules/creatureClasses.js";

let team1 = [];
let team2 = [];
let space = [team1, team2]



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
    renderInterface()
}

        //starts action sequence by opening Action menu for caster, will likely get phased out later once turn control is in place
const takeAction = (caster, action= null, target= null) => {
        caster.openActionMenu(caster, openTargetting, handler)
        }


// instantiate test actions
let attackTest = new creatures.action('attack', null, 2);
let healTest = new creatures.action('heal', null, 2, true);
console.log(attackTest)
console.log(healTest)

//instantiate test species
let physicalspecies = new creatures.species('physicalTest', 15, 1, null, 15, 10, 5, 10);
let magicalspecies = new creatures.species('magicalTest', 8, 1, null, 5, 10, 15, 10);

//instantiate test creatures
let testcreature1 = new creatures.creature('test1', physicalspecies, [attackTest, healTest], 1);
let testcreature2 = new creatures.creature('test2', magicalspecies, [attackTest, healTest], 1);
let testcreature3 = new creatures.creature('test3', magicalspecies, [attackTest, healTest], 1);

//instantiate test buttons- as if it is test creature1's turn
let damageTestButton1 = `<button id="damage" > Damage ${testcreature1.name}</button>`;
let healTestButton1 = `<button> Heal ${testcreature1.name}</button>`;
let attackTestButton1 = `<button id="actiontest"> ${testcreature1.name} action</button>`

//set up teams
team1.push(testcreature1);
team2.push(testcreature2);
team2.push(testcreature3);

//likely to cut some of these, get team lists and buttons linked to HTML

const team1_render = document.getElementById("team1_list");
const team2_render = document.getElementById("team2_list");
const testButtons = document.getElementById("testButtons");
const actionMenu = document.getElementById("actionMenu");       // might use this later

// render function for teams and creature name plates
const renderTeam = (team) => {
    let teamHTML = ""
    console.log(teamHTML)
    for (let i = 0; i < team.length; i++) {
        teamHTML += team[i].renderNameplate();
        console.log(teamHTML)
    }
    return teamHTML
}

// render teams and buttons 
const renderInterface = () => {
    team1_render.innerHTML = renderTeam(team1)
    team2_render.innerHTML = renderTeam(team2)
    testButtons.innerHTML = damageTestButton1 + healTestButton1 + attackTestButton1
}


// Execution section

renderInterface()

// button scripting  for test buttons
document.getElementById('damage').addEventListener("click", () => {
    testcreature1.takeDamage(5);
    //team1_render.innerHTML = `<li>${testcreature1.name} is a level ${testcreature1.level} ${testcreature1.species.speciesName} <br> ${testcreature1.HP} / ${testcreature1.maxHP}</li > `;

});
document.getElementById('actiontest').addEventListener("click", () => {
    let target
    openTargetting()

});

console.log(testcreature1)
let actingCreature = testcreature1;
let state = 'ready';
takeAction(actingCreature);
//actingCreature.openActionMenu();