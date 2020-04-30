#ifndef NOD_H_INCLUDED
#define NOD_H_INCLUDED

#include "include.h"

class Nod
{
public:
    set <int> am_litera[Alpha]; //in ce stari ma duc cu litera actuala

    ~Nod() //in destructor eliberez memoria de starile memorate
    {
        for(int i = 0; i < Alpha; ++i) am_litera[i].clear();
    }

    void operator = (const Nod& actual) //definesc operatorul de copiere
    {
        for(int i = 0; i < Alpha; ++i) am_litera[i] = actual.am_litera[i];
    }
};

#endif // NOD_H_INCLUDED
