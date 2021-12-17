import * as creatures  from "./modules/creatureClasses.js";

let team1 = [];
let team2 = [];
let space = [team1, team2]

const getTargetID = () => {

}

const openTargetting = () => {
    for (let team of space) {
        for (let creature of team) {
            creature.activateListener();
        }
    }

};

const closeTargetting = () => {
    for (let team of space) {
        for (let creature of team) {
            creature.removeListener();
        }
    }
}



let physicalspecies = new creatures.species('physicalTest', 15, 1, null, 15, 10, 5, 10);
let magicalspecies = new creatures.species('magicalTest', 8, 1, null, 5, 10, 15, 10);

let testcreature1 = new creatures.creature('test1', physicalspecies, 1);
let damageTestButton1 = `<button id="damage" > Damage ${testcreature1.name}</button>`;
let healTestButton1 = `<button> Heal ${testcreature1.name}</button>`;
let attackTestButton1 = `<button id="attacktest"> ${testcreature1.name} attack</button>`
let attackTest = new creatures.action('attack', null, 2);

let testcreature2 = new creatures.creature('test2', magicalspecies, 1);
let testcreature3 = new creatures.creature('test3', magicalspecies, 1);

team1.push(testcreature1);
console.log(team1)
team2.push(testcreature2);
team2.push(testcreature3);

const team1_pane = document.getElementById("team1").addEventListener("mouseover", () => {
    //function returning team list;
    }
)
const team2_pane = document.getElementById("team2");
const team1_render = document.getElementById("team1_list");
const team2_render = document.getElementById("team2_list");
const testButtons = document.getElementById("testButtons");

const renderTeam = (team) => {
    let teamHTML = ""
    console.log(teamHTML)
    for (let i = 0; i < team.length; i++) {
        teamHTML += team[i].renderNameplate();
        console.log(teamHTML)
    }
    return teamHTML
}

team1_render.innerHTML = renderTeam(team1)
team2_render.innerHTML = renderTeam(team2)

testButtons.innerHTML = damageTestButton1 + healTestButton1 + attackTestButton1
document.getElementById('damage').addEventListener("click", () => {
    testcreature1.takeDamage(5);
    team1_render.innerHTML = `<li>${testcreature1.name} is a level ${testcreature1.level} ${testcreature1.species.speciesName} <br> ${testcreature1.HP} / ${testcreature1.maxHP}</li > `;

});
document.getElementById('attacktest').addEventListener("click", () => {
    let target 
    openTargetting()

});


console.log(testcreature1)