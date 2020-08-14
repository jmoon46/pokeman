class Pokeman {
  constructor(name, level, hp, skills = []) {
    this.name = name;
    this.level = level;
    this.hp = hp;
    this.skills = skills;
  }

  useSkill(selectedSkill) {
    return this.name + ' used ' + this.skills[selectedSkill - 1].name;
  }

  learnSkill(newSkill, selectedIndexToReplace = null) {
    if (this.skills.length < 4) {
      this.skills.push(newSkill);
      console.log(this.name + ' learned ' + newSkill.name + '!');
    } else {
      let replacedSkill = this.skills[selectedIndexToReplace - 1];
      this.skills[selectedIndexToReplace - 1] = newSkill;
      console.log(
        this.name +
          ' forgot ' +
          replacedSkill.name +
          ', and learned ' +
          newSkill.name +
          '!'
      );
    }
  }
}

class Skill {
  constructor(name, type, damage, accuracy) {
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.accuracy = accuracy;
  }
}

let vineWhip = new Skill('Vine Whip', 'grass', 35, 100);
let leechSeed = new Skill('Leech Seed', 'grass', 0, 85);
let growl = new Skill('Growl', 'normal', 0, 100);
let razorLeaf = new Skill('Razor Leaf', 'grass', 55, 100);
let solarBeam = new Skill('Solar Beam', 'grass', 150, 100);

let bulbasaur = new Pokeman('Bulbasaur', '5', '100', [vineWhip]);

bulbasaur.learnSkill(leechSeed);
bulbasaur.learnSkill(growl);
console.log(bulbasaur.useSkill(3));
bulbasaur.learnSkill(razorLeaf);
bulbasaur.learnSkill(solarBeam, 3);

console.log(bulbasaur.useSkill(1));
console.log(bulbasaur.useSkill(2));
console.log(bulbasaur.useSkill(3));
console.log(bulbasaur.useSkill(4));
