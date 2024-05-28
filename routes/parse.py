import sys
logfile = sys.argv[1]
with open(logfile,  'r') as f:
    for line in f:
        line = line.split('$')
        print("*"*10)
        print(line)
        print("-"*50)
