#ifndef TRANSFORM_H_INCLUDED
#define TRANSFORM_H_INCLUDED

#include "nod.h"

class usu
{
    string tip;

    int stari, tranzitii, nr_stari_finale, stare_initiala;

    set <int> stari_finale;

    vector <Nod> v;

    static char litera(const string &s)
    {
        return (s == "lambda" ? char('z' + 1) : s[0]);
    }

    static string get_str(const int &x)
    {
        return (x == 26 ? "lambda" : string(1, char(x + 'a')));
    }

public:

    void baga_muchie(const int &t1, const int &t2, const string &ch)
    {
        v[t1].am_litera[litera(ch) - 'a'].emplace(t2);
    }

    void upgradeNFA();

    void upgradeDFA();

    void simpleDFA();

    friend istream& operator >> (istream &in, usu &act);

    friend ostream& operator << (ostream &out, const usu &act);
};

#endif //TRANSORM_H_INCLUDED
