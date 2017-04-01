import numpy as np
import pickle
import json
import pandas as pd
import sys
from sys import stdin
import os

def formatData(dataS, password):
    finS = []
    ind = 0
    passwordarr = list(password)
    for r in dataS:
        curr = 0
        finS.append({})
        for i in r:
            if curr == len(passwordarr):
                break
                
            if i['key'] == passwordarr[curr]:
                keyVal = i['key'] + '-' +str(curr) + '-'
                finS[ind][keyVal+'kftime'] = i['kftime']
                finS[ind][keyVal+'ftime'] = i['ftime']
                finS[ind][keyVal+'time'] = i['time']
                curr+=1
            else:
                try:
                    finS[ind]['m'] += 1
                except:
                    finS[ind]['m'] = 1
            
        finS[ind]['totaltime'] = sum([x['time'] for x in r])

        ind += 1
        
    return finS
    
if(len(sys.argv) is not 3):
	print 'Enter username'
	username = stdin.readline().rstrip()
	print 'Enter password'
	password = stdin.readline().rstrip()
else:
	username = sys.argv[1]
	password = sys.argv[2]

print 'here'
with open('./data/data-' + username + '.txt') as fS:
    raw = '[' + fS.read()[:-1] + ']'
    dataS = (json.loads(raw))
print 'also here'
finS = formatData(dataS, password)
dfS = pd.DataFrame(finS)

if not os.path.exists('./output/csv/'):
    os.makedirs('./output/csv/')

if not os.path.exists('./output/pickle/'):
    os.makedirs('./output/pickle/')

with open('./output/csv/' + username + '.csv', 'w+') as fscv:
    fscv.write(dfS.to_csv())

with open('./output/pickle/' + username + '.pkl', 'w+') as fpickle:
    fpickle.write(dfS.as_matrix())
