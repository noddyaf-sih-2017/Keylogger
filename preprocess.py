import numpy as np
import pickle
import json 

f = open('./electron-app/data/tmp.txt')
arr = f.read().replace(']', '').split('[')
arr = filter(lambda x: not x == '[' or len(x) > 0, arr)
arr = arr[1:]
res = []

for v in arr:
    v = '['+v +']'
    try:
        res.append(np.array(json.loads(v)).ravel())

    except ValueError:
    	print 'Invalid JSON'
        continue

res = np.array(res)
res = res.ravel()
fin = []

for r in res:
    for k in r:
        fin.append(k)
        
fin = np.array(fin)

print fin
print fin.shape

with open('processed.pkl', 'w') as f:
	pickle.dump(fin, f)