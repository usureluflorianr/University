from random import seed
from random import randint
import time
import bubble
import merge
import count
import quick
import radix
seed(1)

g = open("file.out","w")

def generate(n, low = -1000, up = 1000): #acesta este generatorul de numere random
    v = []
    for _ in range(n):
        value = randint(low, up) #schimbam in parametrii de la cat la cat generam numerele
        v += [value]
    return v

print("Cate teste doriti?")
t = (int)(input())

while t > 0:
    t -= 1
    print("Introduceti marimea vectorului:")
    n = (int)(input())
    v = generate(n)

    # merge ######################################################################################
    t1 = time.time()
    usu = v.copy()
    usu = merge.merge(usu)
    for i in usu:
        g.write(str(i)+' ')
    g.write('\n')
    t2 = time.time()
    g.write("Merge a durat: " + str(t2 - t1) + '\n')
    ##############################################################################################

    # bubble #####################################################################################
    t1 = time.time()
    usu = v.copy()
    usu = bubble.bubble(usu)
    t2 = time.time()
    if(usu[0] == -10e100):
        g.write("Bubble a durat peste 5 secunda; am intrerupt sortarea\n")
    else:
        g.write("Bubble a durat: " + str(t2-t1) + '\n')
    ##############################################################################################

    # count ######################################################################################
    t1 = time.time()
    usu = v.copy()
    usu = count.count(usu)
    t2 = time.time()
    g.write("Count a durat: " + str(t2 - t1) + '\n')
    ##############################################################################################

    # quick ######################################################################################
    t1 = time.time()
    usu = v.copy()
    usu = quick.quick(usu)
    t2 = time.time()
    g.write("Quick a durat: " + str(t2 - t1) + '\n')
    ##############################################################################################

    # radix ######################################################################################
    t1 = time.time()
    usu = v.copy()
    usu = radix.radix(usu)
    t2 = time.time()
    g.write("Radix a durat: " + str(t2 - t1) + '\n')
    ##############################################################################################





