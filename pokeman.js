class Pokeman {
  constructor(name, level, skills = [], types = [], attributes = {}) {
    this.name = name;
    this.level = level;
    this.skills = skills;
    this.types = types;
    this.attributes = attributes;
  }

  useSkill(selectedSkillIndex, target = null) {
    console.log(this.name + ' used ' + this.skills[selectedSkillIndex - 1].name);

    if (target != null) {
      target.takeDamage(this.skills[selectedSkillIndex - 1]);
    };
  }

  takeDamage(skill) {
    this.attributes["hp"] -= skill.damage;
    if (this.attributes["hp"] <= 0) {
      console.log(this.name + " fainted!");
      return
    }
    console.log(this.name + " took " + skill.damage.toString() + " damage. " + this.name + " has " + this.attributes["hp"] + " health left.");
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

class Type {
  constructor(name, strengths = [], weaknesses = []) {
    this.name = name;
    this.strengths = strengths;
    this.weaknesses = weaknesses;
  }
}

let grass = new Type('grass');
let fire = new Type('fire');
let water = new Type('water');
let flying = new Type('flying');
let normal = new Type('normal');
let rock = new Type('rock');
let ground = new Type('ground');

grass.strengths.push(water, ground, rock);
grass.weaknesses.push(fire, flying);

let vineWhip = new Skill('Vine Whip', grass, 35, 100);
let leechSeed = new Skill('Leech Seed', grass, 0, 85);
let growl = new Skill('Growl', normal, 0, 100);
let razorLeaf = new Skill('Razor Leaf', grass, 55, 100);
let solarBeam = new Skill('Solar Beam', grass, 150, 100);
let tackle = new Skill('Tackle', normal, 35, 100);
let scratch = new Skill('Scratch', normal, 40, 100);

let bulbasaur = new Pokeman('Bulbasaur', '5', [vineWhip], grass, {hp: 100, attack: 20, defense: 35, specialAttack: 30, specialDefense: 25, speed: 25});
let squirtle = new Pokeman('Squirtle', '5', [tackle], grass, {hp: 100, attack: 20, defense: 35, specialAttack: 20, specialDefense: 30, speed: 35});
let charmander = new Pokeman('Charmander', '5', [scratch], fire, {hp: 100, attack: 20, defense: 20, specialAttack: 40, specialDefense: 25, speed: 30});


bulbasaur.learnSkill(leechSeed);
bulbasaur.learnSkill(growl);
bulbasaur.useSkill(3);
bulbasaur.learnSkill(razorLeaf);
bulbasaur.learnSkill(solarBeam, 3);

bulbasaur.useSkill(1, squirtle);
