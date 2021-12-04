import * as creatures  from "./modules/creatureClasses.js";

let team1 = [];
let team2 = [];

let physicalspecies = new creatures.species('physicalTest', 15, 1, null, 15, 10, 5, 10);
let magicalspecies = new creatures.species('magicalTest', 8, 1, null, 5, 10, 15, 10);

let testcreature1 = new creatures.creature('test1', physicalspecies, 1);
let damageTestButton1 = `<button id="damage" > Damage ${testcreature1.name}</button>`;
let healTestButton1 = `<button> Heal ${testcreature1.name}</button>`;

let testcreature2 = new creatures.creature('test2', magicalspecies, 1);


const team1_render = document.getElementById("team1_list");
const team2_render = document.getElementById("team2_list");
const testButtons = document.getElementById("testButtons");


team1_render.innerHTML = `<li>${testcreature1.name} is a level ${testcreature1.level} ${testcreature1.species.speciesName} <br> ${ testcreature1.HP } / ${testcreature1.maxHP}</li > `;
team2_render.innerHTML = `<li>${testcreature2.name} is a level ${testcreature2.level} ${testcreature2.species.speciesName} <br> ${testcreature2.HP} / ${testcreature2.maxHP}</li > `;

testButtons.innerHTML = damageTestButton1 + healTestButton1
document.getElementById('damage').addEventListener("click", () => {
    testcreature1.takeDamage(5);
    team1_render.innerHTML = `<li>${testcreature1.name} is a level ${testcreature1.level} ${testcreature1.species.speciesName} <br> ${testcreature1.HP} / ${testcreature1.maxHP}</li > `;

});