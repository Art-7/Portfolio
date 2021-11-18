class part:
    def __init__(self, name, flow, symptoms_cause_f, finished, mechanical, symptoms_cause_m): #symptoms& causes should be a list providing tuples with first the symptom, then a list of parts that may cause said symptom
        self.part_name = name
        self.symptoms_cause_f = symptoms_cause_f
        self.symptoms_cause_m = symptoms_cause_m
        self.finished = finished
        self.mechanical = mechanical
        self.flow = flow
        



#part instantiation

cartridge = part("cartridge", True, [("drip", ["cartridge", "valve"])], False, True, [("stiff", ["cartridge"]), ("broken", ["cartridge"])])
aerator = part("aerator", True, [("wild_spray", ["aerator"]), ("low_flow", ["aerator", "cartridge"] ), ("drip", ["cartridge", "valve"])], True, False, [])
body =  part("body", True, ["seep", ["cartridge", "valve"]], True, False, [("loose", ["mounting hardware"])])
handle = part("handle", True, [("drip", ["cartridge", "valve"]), ("seep", ["cartridge", "valve"])], True, True, [("loose" , ["handle connection"]), ("stiff", ["cartridge"]), ("broken_off", ["handle connection"])])
handle_connection   = part("handle connection", False, [], False, True, [("broken", ["handle connection"]), ("loose", ["handle connection"])])
mounting_hardware = part("mounting hardware", False, [], False, True, [("loose", ["mounting hardware"]), ("broken", ["mounting hardware"])])
hose = part("hose", True, [("drip", ["hose"])], False, True, [("broken", ["hose"])])
wand = part("wand", True, [("drip", ["cartridge"]), ("wild_spray", ["wand"]), ("low_flow", ["wand"])], True, True, [("broken", ["wand"]), ("droops", ["wand", "receptor"])])
receptor = part("receptor", True, [("seep", ["cartridge", "hose"])], True, True, [("stiff", ["lower_bearing"]), ("loose", ["mounting hardware"])])
dome = part("dome", False, [], True, False, [])
screenwasher = part("screenwasher", True, [("low_flow", ["screenwasher"])], False, False, [])
tub_spout = part("tub spout", True, [("drip", ["cartridge"]), ("shared_flow", ["tub spout"]), ("low_flow", ["tub spout", "cartridge"]), ("unstable_temp", ["balancing_spool"])], True, True, [("broken", ["tub spout"])])
showerhead = part("showerhead", True, [("drip", ["cartridge"]), ("shared_flow", ["tub spout"]), ("low_flow", ["showerhead", "cartridge"]), ("unstable_temp", ["balancing_spool"])], True, True, [("broken", ["showerhead"])])
shower_arm = part("shower arm", False, [], True, False, [])
escutcheon = part("escutcheon", False, [], True, False, [])
stop_tube = part("stop tube", False, [], True, False, [])

# print(cartridge.symptoms_cause_m)
