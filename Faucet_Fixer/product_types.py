# from parts import part
import parts

# module for managing types of products. Types have similar construction, shape, and parts. 
# product types also have models which are specific products ( models here are base model numbers w/o finish suffix

class product_type:
    def __init__(self, category, handles=1):
        self.parts_list = []            # holds list of all parts that are used in a given product type
        self.category = category        
        self.handles = handles          # number of handles - used to double certain parts, also a key identifying trait
        self.models = []                #holds specific model numbers of product, base numbers without suffix or prefix
        self.generic_parts_dict = {}    # holds exact part numbers. multiple numbers may be present if multiple versions exist based on design revisions



    def add_parts(self, parts_list):
        for part_to_add in parts_list:
            # self.parts_list[part.part_name] = part
            self.parts_list.append(part_to_add)
        return

    def add_model(self, model_list):
        for model in model_list:
            self.models.append(str(model))
        return

    def add_generic_part(self, key, part_data):     #key is to be generic part name, part data is list of tuples with part number as string, date for when part was first used. 
        self.generic_parts_dict[key] = part_data
        return



    # section for initializing product types

centerset_2h = product_type("lavatory", 2)
centerset_2h.add_parts([parts.cartridge, parts.aerator, parts.body, parts.handle, parts.handle_connection, parts.mounting_hardware])
centerset_2h.add_model([6610, 6410, 4920, 4551])
centerset_2h.add_generic_part(parts.cartridge.part_name, [("1234", 2014), ("1224b", 1985)])
centerset_2h.add_generic_part(parts.aerator.part_name, [("aerator", 2005), ("3919", 2014)])
centerset_2h.add_generic_part(parts.mounting_hardware.part_name, [("13678", 1985)])




pullout = product_type("kitchen")
pullout.add_parts([parts.cartridge, parts.receptor, parts.handle, parts.handle_connection, parts.mounting_hardware, parts.hose, parts.screenwasher, parts.wand, parts.receptor, parts.dome, parts.escutcheon])
pullout.add_model([7560, 7575, 7545, 87017])
pullout.add_generic_part(parts.cartridge.part_name, [("1255", 2009), ("1225b", 1985)])
pullout.add_generic_part(parts.handle_connection.part_name, [("155023", 2009), ("100429", 1985)])
pullout.add_generic_part(parts.hose.part_name, [("150259", 2013), ("137028", 1985)])
pullout.add_generic_part(parts.screenwasher.part_name, [("158550", 2015), ("141025", 2013), ("101199", 1985)])


positemp = product_type("shower")
positemp.add_parts([parts.cartridge, parts.handle, parts.handle_connection, parts.escutcheon, parts.stop_tube, parts.tub_spout, parts.shower_arm, parts.showerhead])
positemp.add_model(["t2449", 2353, "t2153"])
positemp.add_generic_part(parts.cartridge.part_name, [("1222b", 1985)])
positemp.add_generic_part(parts.handle_connection.part_name, [("116653", 1985)])



product_type_list = [positemp, pullout, centerset_2h]

# for part in centerset_2h.parts_list:
#     if part.finished == True:
#         print(str(part.part_name))
#
# for model in centerset_2h.models:
#     print(model)
#
#
# print(positemp.generic_parts_dict["cartridge"])
