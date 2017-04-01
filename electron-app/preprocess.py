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
        for i in r:
            finS.append(i)
                    
    return finS
    
if(len(sys.argv) is not 3):
	print 'Enter username'
	username = stdin.readline().rstrip()
	print 'Enter password'
	password = stdin.readline().rstrip()
else:
	username = sys.argv[1]
	password = sys.argv[2]

with open('./data/data-' + username + '.txt') as fS:
    raw = '[' + fS.read()[:-1] + ']'
    dataS = (json.loads(raw))

finS = formatData(dataS, password)
dfS = pd.DataFrame(finS)

# drop unnecessary columns
dfS.fillna(dfS.mean(), inplace=True)

if not os.path.exists('./output/csv/'):
    os.makedirs('./output/csv/')

if not os.path.exists('./output/pickle/'):
    os.makedirs('./output/pickle/')

with open('./output/csv/' + username + '.csv', 'w+') as fscv:
    fscv.write(dfS.to_csv())

with open('./output/pickle/' + username + '.pkl', 'w+') as fpickle:
    fpickle.write(dfS.as_matrix())
