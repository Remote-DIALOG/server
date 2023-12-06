import requests
import random
import string
import pandas as pd
def generate_password(password):
    if password == "":
        characters = string.ascii_letters + string.digits 
        return ''.join(random.choice(characters) for i in range(8))
    return password

urls = {
    "prod": {
                'addClinician': 'http://35.178.194.72:8080/users/addClinician', 
                'addClient': 'http://35.178.194.72:8080/clinician/addClient'
            },

    "dev": {
            'addClinician':"http://localhost:443/users/addClinician",
            "addClient": "http://localhost:443/clinician/addClient"
        }
}
clinician_name = [
    {
        "username":'remotedialogC2', 
        "name" :"remotedialogC2",
         "password":"", 
         "client": [
                 {"username":"remotedialogS3", "name":"remotedialogS3", "password":""},
                 {"username":"remotedialogS4", "name":"remotedialogS4", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC3', 
        "name" :"remotedialogC3",
         "password":"", 
         "client": [
                 {"username":"remotedialogS5", "name":"remotedialogS5", "password":""},
                 {"username":"remotedialogS6", "name":"remotedialogS6", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC4', 
        "name" :"remotedialogC4",
         "password":"", 
         "client": [
                 {"username":"remotedialogS7", "name":"remotedialogS7", "password":""},
                 {"username":"remotedialogS8", "name":"remotedialogS8", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC5', 
        "name" :"remotedialogC5",
         "password":"", 
         "client": [
                 {"username":"remotedialogS9", "name":"remotedialogS8", "password":""},
                 {"username":"remotedialogS10", "name":"remotedialogS9", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC6', 
        "name" :"remotedialogC6",
         "password":"", 
         "client": [
                 {"username":"remotedialogS11", "name":"remotedialogS10", "password":""},
                 {"username":"remotedialogS12", "name":"remotedialogS11", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC7', 
        "name" :"remotedialogC7",
         "password":"", 
         "client": [
                 {"username":"remotedialogS13", "name":"remotedialogS12", "password":""},
                 {"username":"remotedialogS14", "name":"remotedialogS13", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC8', 
        "name" :"remotedialogC8",
         "password":"", 
         "client": [
                 {"username":"remotedialogS14", "name":"remotedialogS15", "password":""},
                 {"username":"remotedialogS16", "name":"remotedialogS15", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC9', 
        "name" :"remotedialogC9",
         "password":"", 
         "client": [
                 {"username":"remotedialogS17", "name":"remotedialogS16", "password":""},
                 {"username":"remotedialogS18", "name":"remotedialogS17", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC10', 
        "name" :"remotedialogC10",
         "password":"", 
         "client": [
                 {"username":"remotedialogS19", "name":"remotedialogS18", "password":""},
                 {"username":"remotedialogS20", "name":"remotedialogS19", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC11', 
        "name" :"remotedialogC11",
         "password":"", 
         "client": [
                 {"username":"remotedialog21", "name":"remotedialogS20", "password":""},
                 {"username":"remotedialog22", "name":"remotedialogS21", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC12', 
        "name" :"remotedialogC12",
         "password":"", 
         "client": [
                 {"username":"remotedialogS23", "name":"remotedialogS22", "password":""},
                 {"username":"remotedialogS24", "name":"remotedialogS23", "password":""}
            ]
    }, 
    {
        "username":'remotedialogC13', 
        "name" :"remotedialogC13",
         "password":"", 
         "client": [
                 {"username":"remotedialogS25", "name":"remotedialogS24", "password":""},
                 {"username":"remotedialogS26", "name":"remotedialogS25", "password":""}
            ]
    }, 
]
userinfo = []
for names in clinician_name:
    username = names['username']
    password = names['password']
    password = generate_password(password)
    name = names['name']
    print("making request to server {}".format(urls['prod']['addClinician']))
    response = requests.post(urls['prod']['addClinician'], json =  {"username":username,"password":password,"full_name":name})
    print(response.json())
    clinician_id = response.json()['clinicianId']
    userinfo.append((username, password, name, 'clinician', None))
    if len(names['client']) > 0:
        for clients in names['client']:
            fullname = clients['name']
            email = clients['username']
            password = clients['password']
            password = generate_password(password)
            response = requests.post(urls['prod']['addClient'], json =  {"clinicianId": clinician_id,"fullname": fullname,"email": email,"password": password})
            print(response.json())
            userinfo.append((email, password, fullname, 'client', username))
print(userinfo)
dataframe = pd.DataFrame (userinfo, columns = ['username', 'password','fullname', 'type', 'clinician_name'])
dataframe.to_csv('./usernames.csv')
