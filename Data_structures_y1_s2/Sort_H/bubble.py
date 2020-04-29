import time

def bubble(v):
    t1 = time.time()
    usu = v
    n = len(v)
    for i in range(0,n):
        for j in range(i+1,n):
            if time.time() - t1 > 5.0:
                usu[0] = -10e100
                return usu
            if usu[i] > usu[j]:
                aux = usu[i]
                usu[i] = usu[j]
                usu[j] = aux
    return usu