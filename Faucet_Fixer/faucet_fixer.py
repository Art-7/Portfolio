#Import dependencies
import parts
import product_types

# from parts2 import part
# from product_types import product_type 
#Class definitions:

class registry:
    # class for managing the customer registry. This is so that we have a registry that models info normally retained for customer products. 
    # this is so that we have a basic test environment to test that the diagnostic features of the code function.
    # an actual implementation of this would likely leverage an actual database system.
    def __init__(self):
        self.registered_products = []

    def __repr__():
        return

    def show_registry(self):
        print("Your Registered Products include:")
        print("ID | Model | Year | 1st Owner? | PoP?")
        for item in test_registry.registered_products:
            print(str(item.reg_ID) + " | " +str(item.model_num) +" | " + str(item.date) +" | " + str(item.original_owner) +" | " + str(item.PoP))# + str(item.product_type.category))
        return

    def add_new_product(self, new_product_ID):
        # print("running product addiotion")
        model = input("What is your model number?")
        date = input("Whate year was the product installed in?")
        owner = input("Are you the original owner? Y or N")
        if owner == "Y":
            owner = True
        else:
            owner = False
        receipt = input("Do you still have your receipt or invoice? Y or N")
        if receipt == "Y":
            receipt = True
        else:
            receipt = False
        self.add_product(model, date, new_product_ID, owner, receipt)
        self.show_registry()
        return


    def add_product(self, model_number, date, ID,  original_owner=True, PoP=False):
        model_number = str(model_number)
        new_product = product(model_number, date, ID, original_owner, PoP)
        self.registered_products.append(new_product)
        print("Registered " + new_product.model_num)
        return

    def service(self):      # this is the primary purpose of this project- an algorithmic approach to troubleshooting and servicing customer faucets.
        # print("run service function")
        product_to_service = None
        parts_needed = []
        product_to_service_sel = input("Which product needs service? Enter ID number from above:")
        for product in current_registry.registered_products:
            if product.reg_ID == product_to_service_sel:
                product_to_service = product
        print("You selected your {} {} in {} installed in {} for service.".format(product_to_service.model_num, product_to_service.product_type.category, product_to_service.finish, product_to_service.date))
        problem_categories = input("What kinds of issues are you experiencing? \n F for flow \n M for Mechanical \n C for Cosmetic")
        # Executes troubleshooting for each category of problems, flow issues, mechanical issues, and cosmetic issues
        if "f" in problem_categories:
            flow_issues = product_to_service.flow_diagnosis()
            for part in flow_issues:
                parts_needed.append(part)
        if "m" in problem_categories:
            mechanical_issues = product_to_service.mech_diagnosis()
            for part in mechanical_issues:
                parts_needed.append(part)
        if "c" in problem_categories:
            cosmetic_issues = product_to_service.cosmetic_diagnosis()
            for part in cosmetic_issues:
                parts_needed.append(part.part_name)
        parts_needed = remove_dupes(parts_needed) #removes parts that may have been added 2x- a cartridge can cause many issues, but 1 or 2 is enough depending on the product
        # print("parts needed to fix:")
        # print(parts_needed)
        parts_needed = product_to_service.get_generic_part_numbers(parts_needed, product_to_service.date)   # converts part names to part number- an orderable repair part
        print("======================================================")
        print("The following parts are needed to repair your faucet:")
        for part in parts_needed:
            print(part)
        print("If a part number is not shown, then the part is model specific, and could not be determined automatically- Contact our customer service team for additional support.")
        # non generic parts would have to be looked up manually.
        print("======================================================")
        # warranty logic for determining if the customer is getting free parts, or has to buy them.
        if product_to_service.original_owner == True and product_to_service.PoP == True:
            print("Your product is under warranty, and Proof of purchase is on file. Parts will be sent at no charge.")
        elif product_to_service.original_owner == True and product_to_service.PoP == False:
            print("Your product may be under warranty and eligible for free replacement parts. Contact our customer service team to verify.")
        else:
            print("Your product is not under warranty at this time. Parts will need to be paid for, contact our customer service team to place an order.")
        return


class product:
    # class used for customer products, collecting model number and warranty information
    def __init__(self, model_number, date, reg_ID, original_owner=True, PoP=False):
        self.model_num = model_number
        self.finish = "FINISH"
        self.product_type = get_type(model_number)
        self.date = int(date)
        self.original_owner = original_owner
        self.PoP = PoP          #Proof of Purchase, true if customer has submitted
        self.reg_ID = str(reg_ID)

    def __repr__(self):
        return "Model = " + str(self.model_num) + "\n Date = " + str(self.date)


    def get_generic_part_numbers(self, list_of_parts, date):    #fetches generic part numbers for a product- these are parts that are universal to all models
        for index in range(len(list_of_parts)):
            if list_of_parts[index] in self.product_type.generic_parts_dict:
                if len(self.product_type.generic_parts_dict[list_of_parts[index]]) == 1:
                    list_of_parts[index] =  self.product_type.generic_parts_dict[list_of_parts[index]][0][0]
                else:
                    for i in range(len(self.product_type.generic_parts_dict[list_of_parts[index]])):
                        # print(part)
                        if date >= self.product_type.generic_parts_dict[list_of_parts[index]][i][1]:
                            list_of_parts[index] = self.product_type.generic_parts_dict[list_of_parts[index]][i][0]
                            break
        return list_of_parts

    def generate_list_of_locations(self, part_list_options):    # Function for determining what parts a customer is having issues with.
        for i in range(len(part_list_options)):
            print(str(part_list_options[i][0]) + " : " + part_list_options[i][1].part_name)
        return input("Which parts are failing? \n Enter number for each.")

    def diagnosis(self, problem_part):  # Function for taking an identified problem part and determining the part(s) needed to fix
            part_option = 1
            for i in range(len(problem_part.symptoms_cause_f)):
                print(str(part_option) + " : " + problem_part.symptoms_cause_f[i][0])
                part_option += 1
            symptom_selection = int(input("What is the issue with " + str(problem_part.part_name) +"?")) - 1
            # gets list of possible parts to fix problem, if only 1 possible, returns that solution
            possible_solution_parts = problem_part.symptoms_cause_f[symptom_selection][1]
            if len(possible_solution_parts) == 1:
                return possible_solution_parts[0]
            # goes through filtering step to determine what part is the actual solution- some issues have multiple causes that need to be checked
            # This requires additional questioning to determine the actual solution
            elif len(possible_solution_parts) > 1:
                part_option = 1
                for part in possible_solution_parts:
                    print(str(part_option) + " : " + part)
                    part_option += 1
                part_needed = int(input("Which part is the problem?"))-1
                return possible_solution_parts[part_needed]
            else:
            # if it cannot be fixed, it must be replaced - "FAUCET" indicates an issue that cannot be fixed
                return "FAUCET"

    # runs diagnostic logic for different types of symptoms, seperated due to different troubleshooting logic
    # flow_diagnosis has comments on logic, steps vary slightly for mechanical issues

    def flow_diagnosis(self):
        # print("fixing flow on a" + str(self.product_type) + "installed"+ str(self.date))

        # initializing variables
        possible_problem_parts = []
        part_option = 1
        check_parts = []
        return_parts = []
        # check for drip- this is most common issue, dripping is found here
        # This is presented differently from other issues due to the sheer number of ways a customer might word this complaint
        # this 1 question cuts directly to the solution on this type of problem.
        constant_leak = input("Is there a leaking issue that occurs even when unit is not in use? Y/N")
        if constant_leak == "y":
            return_parts.append("cartridge")
        # get list of all parts that relate to water flow and print a list of them
        for part in self.product_type.parts_list:
            if part.flow == True:
                possible_problem_parts.append((part_option, part))
                part_option += 1
        # customer inputs list of parts where there are issues
        problem_part_selections = self.generate_list_of_locations(possible_problem_parts)
        for part in possible_problem_parts:
            if str(part[0]) in problem_part_selections:
                check_parts.append(part[1])
        # iterates through parts with issues, running the diagnostic process on each part
        for part in check_parts:
            return_parts.append(self.diagnosis(part))
        return return_parts # Should return a list of all parts that need to be replaced.

    def mech_diagnosis(self):
        # print("fixing Mechanical on a" + str(self.product_type) + "installed"+ str(self.date))
        possible_problem_parts = []
        part_option = 1
        check_parts = []
        return_parts = []
        for part in self.product_type.parts_list:
            if part.mechanical == True:
                possible_problem_parts.append((part_option, part))
                part_option += 1
        problem_part_selections = self.generate_list_of_locations(possible_problem_parts)
        for part in possible_problem_parts:
            if str(part[0]) in problem_part_selections:
                check_parts.append(part[1])
        for part in check_parts:
            return_parts.append(self.diagnosis(part))
        return return_parts

    def cosmetic_diagnosis(self):
        # print("fixing finish issue on a" + str(self.product_type.category) + " installed in "+ str(self.date))
        possible_problem_parts = []
        part_option = 1
        return_parts = []
        for part in self.product_type.parts_list:
            if part.finished == True:
                possible_problem_parts.append((part_option, part))
                part_option += 1
        problem_part_selections = self.generate_list_of_locations(possible_problem_parts)
        # Since this function is checking cosmetic issues, there is no need for further investigation.
        for part in possible_problem_parts:
            if str(part[0]) in problem_part_selections:
                return_parts.append(part[1])
        return return_parts





# Function defs
#-------------------------------------------
def get_type(model_number):
    for i in range(len(product_types.product_type_list)):
        if model_number in product_types.product_type_list[i].models:
            return product_types.product_type_list[i]
    return "not found"

def remove_dupes(list_to_clean):
    return list(dict.fromkeys(list_to_clean))





#Run section
test_registry = registry()
test_registry.add_product("7560", 2010,1, True, True)
test_registry.add_product("6610", 2008 ,2, False, False)
test_registry.add_product("t2449", 2010, 3)

print("Welcome to The Faucet Company!")
current_registry = test_registry
running = True
while running:
    current_registry.show_registry()
    action = input("How can we help you today?  A for Add product  S for Service product E to quit")
    print(action)
    if action == "a":
        new_registered_product_ID = len(current_registry.registered_products)+1
        current_registry.add_new_product(new_registered_product_ID)
    elif action == "s":
        current_registry.service()
    elif action == "e":
        running = False
    else:
        print("invalid input, try again")
