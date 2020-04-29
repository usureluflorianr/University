def radix(v):
    st = (int)(10e20)
    for i in v:
        st = min(st, i)
    if st < 0:
        for i in range(len(v)):
            v[i] -= st

    def countingSort(v, put1):

        n = len(v)
        output = [0] * (n)

        count = [0] * (10)

        for i in range(0, n):
            t = (v[i] // put1)
            count[t % 10] += 1

        for i in range(1, 10):
            count[i] += count[i - 1]

        i = n - 1
        while i >= 0:
            t = (v[i] // put1)
            output[count[t % 10] - 1] = v[i]
            count[t % 10] -= 1
            i -= 1

        for i in range(0, len(v)):
            v[i] = output[i]


    def radixSort(v):

        max1 = max(v)

        put = 1
        while max1 // put > 0:
            countingSort(v, put)
            put *= 10
    
    radixSort(v)
    if st < 0:
        for i in range(len(v)):
            v[i] += st
    return v