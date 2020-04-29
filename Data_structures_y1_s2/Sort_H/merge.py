def merge(v):
    if len(v) > 1:
        mid = len(v) // 2
        st = v[:mid]
        dr = v[mid:]

        merge(st)
        merge(dr)

        i = j = k = 0

        while i < len(st) and j < len(dr):
            if st[i] < dr[j]:
                v[k] = st[i]
                i += 1
            else:
                v[k] = dr[j]
                j += 1
            k += 1

        while i < len(st):
            v[k] = st[i]
            i += 1
            k += 1

        while j < len(dr):
            v[k] = dr[j]
            j += 1
            k += 1
    return v