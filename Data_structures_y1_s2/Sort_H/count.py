def count(v):
    st = 10e20
    dr = -10e20
    for i in v:
        st = min(st, i)
        dr = max(dr, i)
    nr = dr + 1
    if st < 0:
        nr -= st
        for i in range(len(v)):
            v[i] -= st

    ap = [0] * (nr)
    for i in v:
        ap[i] += 1

    sol = []
    for i in range(nr):
        while ap[i] > 0:
            ap[i] -= 1
            sol += [i]

    if st < 0:
        for i in range(len(v)):
            sol[i] += st

    return sol
