class Pokeman {
  constructor(name, level, skills = [], types = [], attributes = {}, attributesLevelUp = {}) {
    this.name = name;
    this.level = level;
    this.skills = skills;
    this.types = types;
    this.attributes = attributes;
    this.attributesLevelUp = attributesLevelUp;
  }

  useSkill(selectedSkillIndex, target = null) {
    console.log(this.name + ' used ' + this.skills[selectedSkillIndex - 1].name);

    if (target != null) {
      target.takeDamage(this.skills[selectedSkillIndex - 1], this);
    };
  }

  takeDamage(skill, skillUser) {
    let modifier = 1;
    let finalDamage;
    // for each type (of user) check if the target pokemon type is in the strengths or weaknesses array of the skill (then change modifier to 2 or .5)
    if (skill.attributeModifier === 'spec') {
      finalDamage = (((((this.level * 2) + 2) * skill.power * (skillUser.attributes.attack / this.attributes.defense)) / 50) + 2) * modifier;
    } else if (skill.attributeModifier === 'phys') {
      finalDamage = (((((this.level * 2) + 2) * skill.power * (skillUser.attributes.specialAttack / this.attributes.specialDefense)) / 50) + 2) * modifier;
    }
  
    finalDamage = Math.round(finalDamage);
    this.attributes["hp"] -= finalDamage;

    if (this.attributes["hp"] <= 0) {
      console.log(this.name + " fainted!");
      return
    }
    console.log(this.name + " took " + finalDamage.toString() + " damage. " + this.name + " has " + this.attributes["hp"] + " health left.");
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

  setLevel(level) {
    while (this.level < level) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    console.log(this.name + " grew to level " + this.level.toString() + "!");
    this.attributes.hp += this.attributesLevelUp.hp;
    this.attributes.attack += this.attributesLevelUp.attack;
    this.attributes.defense += this.attributesLevelUp.defense;
    this.attributes.specialAttack += this.attributesLevelUp.specialAttack;
    this.attributes.specialDefense += this.attributesLevelUp.specialDefense;
    this.attributes.speed += this.attributesLevelUp.speed;
    console.log(this.attributes);
  }
}

class Skill {
  constructor(name, type, power, accuracy, attributeModifier) {
    this.name = name;
    this.type = type;
    this.power = power;
    this.accuracy = accuracy;
    this.attributeModifier = attributeModifier;
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
fire.strengths.push(grass);
fire.weaknesses.push(water, ground);
water.strengths.push(fire, rock, ground);
water.weaknesses.push(grass);
flying.strengths.push(grass);
flying.weaknesses.push(rock);
normal.strengths.push();
normal.weaknesses.push();
rock.strengths.push(flying);
rock.weaknesses.push(water, ground, grass);
ground.strengths.push(fire, rock);
ground.weaknesses.push(grass, water);


let vineWhip = new Skill('Vine Whip', grass, 35, 100, 'spec');
let leechSeed = new Skill('Leech Seed', grass, 0, 85, 'spec');
let growl = new Skill('Growl', normal, 0, 100);
let razorLeaf = new Skill('Razor Leaf', grass, 55, 100, 'spec');
let solarBeam = new Skill('Solar Beam', grass, 150, 100, 'spec');
let tackle = new Skill('Tackle', normal, 35, 100, 'phys');
let scratch = new Skill('Scratch', normal, 40, 100, 'phys');

let bulbasaur = new Pokeman('Bulbasaur', 1, [vineWhip], grass, {hp: 16, attack: 4, defense: 6, specialAttack: 5, specialDefense: 4, speed: 3}, {hp: 5, attack: 1, defense: 3, specialAttack: 2, specialDefense: 3, speed: 2});
let squirtle = new Pokeman('Squirtle', 1, [tackle], grass, {hp: 17, attack: 2, defense: 6, specialAttack: 4, specialDefense: 5, speed: 5}, {hp: 5, attack: 1, defense: 3, specialAttack: 2, specialDefense: 2, speed: 3});
let charmander = new Pokeman('Charmander', 1, [scratch], fire, {hp: 15, attack: 2, defense: 2, specialAttack: 6, specialDefense: 3, speed: 4});


bulbasaur.learnSkill(leechSeed);
bulbasaur.learnSkill(growl);
bulbasaur.useSkill(3);
bulbasaur.learnSkill(razorLeaf);
bulbasaur.learnSkill(solarBeam, 3);

squirtle.setLevel(6);
bulbasaur.setLevel(10);
bulbasaur.useSkill(4, squirtle);