class trainer:
    def __init__(self, name):
        self.name = name
        self.potion_count = 5
        self.pokemon_list = []
        self.active_pokemon = 0

    def use_potion(self):
        self.pokemon_list[self.active_pokemon].heal(15)
        self.potion_count-=1

    def change_active_pokemon(self, idx):
        if idx > len(self.pokemon_list)-1:
            print("wait, thats illegal.")
        else:
            self.active_pokemon = idx
            print("Switching active pokemon to " + self.pokemon_list[self.active_pokemon])

    def attack_trainer(self, target_trainer):
        self.pokemon_list[self.active_pokemon].attack(target_trainer.pokemon_list[target_trainer.active_pokemon])





class pokemon:
    def __init__(self, name, level,  type, current_hp, knocked_out=False):
        self.name = name
        self.level = level
        self.type = type
        self.current_hp = current_hp
        self.max_hp = level *5
        self.knocked_out = knocked_out

    def check_KO(self, current_hp):
        if current_hp <= 0:
            self.knocked_out = True
            self.current_hp = 0
            print(self.name + " is Knocked Out!!!")
        elif current_hp <= self.max_hp/3:
            print(self.name + " is getting weak!")


    def take_damage(self, damage_taken):
        print(self.name + "has taken " + damage_taken + " points of damage!")
        self.current_hp = self.current_hp - damage_taken
        self.check_KO()

    def heal(self, heal):
        print(self.name + "has healed " + heal + " HP!")
        self.current_hp = self.current_hp + heal
        if self.knocked_out == True:
            self.knocked_out = False
            print(self.name + "has revived!")

    def attack(self, target_pokemon):
        print(self.name + " attacks " + target_pokemon.name)
        advantage_mod = self.type.check_advantage(target_pokemon.type)
        damage = self.level*advantage_mod
        target_pokemon.take_damage(damage)
        if advantage_mod == 1.5:
            print(target_pokemon.name + " is weak to " + self.type)
        elif advantage_mod == 0.5:
            print(target_pokemon.name + " is resistant to " + self.type)




class type:
    def __init__(self, name, strong_against=[], weak_against=[]):
        self.name = name
        self.strong_against = strong_against
        self.weak_against = weak_against

    def check_advantage(self, type_target):
        if type_target.name in self.strong_against:
            return 1.5
        elif type_target.name in self.weak_against:
            return 0.5
        else:
            return 1

type_fire = type("Fire", ["Grass"], ["Water"])
type_grass = type("Grass", ["Water"], ["Fire"])
type_water = type("Water", ["Fire"], ["Grass"])
