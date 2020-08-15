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
  constructor(name, type, damage, accuracy, attributeModifier) {
    this.name = name;
    this.type = type;
    this.damage = damage;
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

let bulbasaur = new Pokeman('Bulbasaur', 1, [vineWhip], grass, {hp: 100, attack: 20, defense: 35, specialAttack: 30, specialDefense: 25, speed: 25}, {hp: 2, attack: 1, defense: 4, specialAttack: 3, specialDefense: 2, speed: 2});
let squirtle = new Pokeman('Squirtle', 1, [tackle], grass, {hp: 100, attack: 20, defense: 35, specialAttack: 20, specialDefense: 30, speed: 35});
let charmander = new Pokeman('Charmander', 1, [scratch], fire, {hp: 100, attack: 20, defense: 20, specialAttack: 40, specialDefense: 25, speed: 30});


bulbasaur.learnSkill(leechSeed);
bulbasaur.learnSkill(growl);
bulbasaur.useSkill(3);
bulbasaur.learnSkill(razorLeaf);
bulbasaur.learnSkill(solarBeam, 3);

bulbasaur.useSkill(1, squirtle);
bulbasaur.setLevel(6);