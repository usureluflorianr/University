def quick(v):
    def budau(v, low, high):
        i = (low - 1)
        pivot = v[high]

        for j in range(low, high):

            if v[j] < pivot:
                i = i + 1
                v[i], v[j] = v[j], v[i]

        v[i + 1], v[high] = v[high], v[i + 1]
        return (i + 1)

    def quickSort(v, low, high):
        if low < high:
            pi = budau(v, low, high)

            quickSort(v, low, pi - 1)
            quickSort(v, pi + 1, high)

    quickSort(v,0,len(v)-1)
    return v