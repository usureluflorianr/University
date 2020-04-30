#include "transform.h"

vector <vector <int> > frt;

set <int> vis;

vector <int> rad;


void usu::upgradeNFA()
{
    tip = "NFA";

    bool caut_tranzitie = true;

    while(caut_tranzitie) //cat timp am tranzitii de schimbat
    {
        caut_tranzitie = false; //presupun ca nu mai am tranzitie de schimbat

        for(int i = 0; i < stari; ++i) //merg in toate starile din starea actuala
        {
            for(auto& urm:v[i].am_litera[Alpha - 1])
            {
                for(auto& it:v[urm].am_litera[Alpha - 1])
                {
                    if(v[i].am_litera[Alpha - 1].find(it) == v[i].am_litera[Alpha - 1].end())
                    {
                        caut_tranzitie = true;

                        v[i].am_litera[Alpha - 1].emplace(it);
                    }
                }
            }
        }
    }


    for(int i = 0; i < stari; ++i)
    {
        for(auto& urm :v[i].am_litera[Alpha - 1])
        {
            for(int litera = 0; litera < Alpha - 1; ++litera)
            {
                for(auto& it :v[urm].am_litera[litera]) v[i].am_litera[litera].emplace(it);
            }

            if(stari_finale.find(urm) != stari_finale.end()) stari_finale.emplace(i);
        }

       v[i].am_litera[Alpha - 1].clear();
    }

    nr_stari_finale = stari_finale.size();

    tranzitii = 0;

    for(int i = 0; i < stari; ++i)
    {
        for(int j = 0; j < Alpha; ++j) tranzitii += v[i].am_litera[j].size();
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


void usu::upgradeDFA() //din NFA in DFA
{
    int stari_noi = 0;

    int tranzitii_noi = 0;

    map <vector <int>, int> stari_generate;

    vector <Nod> actual;

    set <int> stari_noi_finale;

    stari_generate[{stare_initiala}] = stari_noi++;

    if(stari_finale.find(stare_initiala) != stari_finale.end()) stari_noi_finale.emplace(stari_noi - 1);

    queue <vector <int> > q;

    vector <int> top, Act;

    set <int> Act_set;

    q.push({stare_initiala});

    while(!q.empty())
    {
        top = q.front();
        q.pop();

        for(int litera = 0; litera < Alpha; ++litera)
        {
            Act.clear();
            Act_set.clear();

            for(auto& iter : top)
            {
                for(auto& urm :v[iter].am_litera[litera])
                {
                    if(Act_set.find(urm) == Act_set.end())
                    {
                        Act_set.emplace(urm);
                        Act.push_back(urm);
                    }
                }
            }

            if (Act.empty()) continue;

            sort(Act.begin(), Act.end());

            if(stari_generate.find(Act) == stari_generate.end())
            {
                stari_generate[Act] = stari_noi++;

                bool final = false;

                for(auto& iter : Act)
                {
                    if (stari_finale.find(iter) != stari_finale.end())
                    {
                        final = true;
                        break;
                    }
                }

                if(final) stari_noi_finale.emplace(stari_noi - 1);

                q.push(Act);
            }

            ++tranzitii_noi;

            int pos = stari_generate[top];

            if(pos >= actual.size()) actual.resize(pos + 1);

            actual[pos].am_litera[litera].emplace(stari_generate[Act]);
        }
    }

    tip = "DFA";

    stari = stari_noi;

    tranzitii = tranzitii_noi;


    stare_initiala = 0;

    stari_finale.clear();

    stari_finale = stari_noi_finale;


    stari_noi_finale.clear();

    nr_stari_finale = stari_finale.size();

    v.clear();

    v = actual;

    actual.clear();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


bool Parcurgere(const int &crt_Nod, int &stari_noi, const set <int> &stari_finale)
{
    if(vis.find(crt_Nod) != vis.end()) return 0;

    ++stari_noi;

    bool sol = false;

    queue <int> q;

    q.push(crt_Nod);

    vis.emplace(crt_Nod);

    while(!q.empty())
    {
        int top = q.front();

        q.pop();

        rad[top] = stari_noi - 1;

        if(stari_finale.find(top) != stari_finale.end()) sol = true;

        for(auto& urm : frt[top])
        {
            if(vis.find(urm) == vis.end())
            {
                vis.emplace(urm);
                q.push(urm);
            }
        }
    }

    return sol;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//eliminam starile inutile
void usu::simpleDFA()
{
    int stari_noi = 0, tranzitii_noi = 0;

    set <int> stari_noi_finale;

    vector <Nod> actual;

    vector <Nod> transpus(stari);

    for(int i = 0; i < stari; ++i)
    {
        for(int litera = 0; litera < Alpha; ++litera)
        {
            for(auto& urm :v[i].am_litera[litera]) transpus[urm].am_litera[litera].emplace(i);
        }
    }

    set <int> vis1, vis2;

    queue <int> q;


    q.push(stare_initiala);

    vis1.emplace(stare_initiala);

    while (!q.empty())
    {
        int top = q.front();
        q.pop();

        for(int litera = 0; litera < Alpha; ++litera)
        {
            for(auto& urm :v[top].am_litera[litera])
            {
                if(vis1.find(urm) == vis1.end())
                {
                    vis1.emplace(urm);
                    q.push(urm);
                }
            }
        }
    }

    //eliminam starile care nu duc la stari finale
    for(auto& st : stari_finale)
    {
        q.push(st);
        vis2.emplace(st);
    }

    while(!q.empty())
    {
        int top = q.front();

        q.pop();

        for(int litera = 0; litera < Alpha; ++litera)
        {
            for(auto& urm : transpus[top].am_litera[litera])
            {
                if(vis2.find(urm) == vis2.end())
                {
                    vis2.emplace(urm);
                    q.push(urm);
                }
            }
        }
    }


    //verific daca DFA-ul e null
    bool DFA_N = false;

    if(vis2.find(stare_initiala) == vis2.end()) DFA_N = true;

    int nr = 0;

    for(auto& st : stari_finale) if (vis1.find(st) != vis1.end()) ++nr;

    if(!nr) DFA_N = true;

    if(DFA_N)
    {
        stari = 0;
        tranzitii = 0;
        nr_stari_finale = 0;

        stare_initiala = -1;

        stari_finale.clear();

        v.clear();

        tip = "DFA-MINIM";

        transpus.clear();
        vis1.clear();
        vis2.clear();

        return;
    }


    //eliminari
    vector <int> starile_noi(stari, 0);

    for(int i = 0; i < stari; ++i) if(vis1.find(i) == vis1.end() || vis2.find(i) == vis2.end()) starile_noi[i] = -1; // to be eliminated

    transpus.clear();
    vis1.clear();
    vis2.clear();

    stari_noi = stari;

    int acum_cop = -1;

    for(int i = 0; i < stari; ++i)
    {
        if(starile_noi[i] != -1) starile_noi[i] = ++acum_cop;

        else --stari_noi;
    }

    actual.resize(stari_noi);

    for(int i = 0; i < stari; ++i)
    {
        if(starile_noi[i] == -1) continue; // eliminated

        if(stari_finale.find(i) != stari_finale.end()) stari_noi_finale.emplace(i);

        for(int litera = 0; litera < Alpha; ++litera)
        {
            for(auto& urm :v[i].am_litera[litera])
            {
                if(starile_noi[urm] == -1) continue; // eliminated

                ++tranzitii_noi;

                actual[starile_noi[i]].am_litera[litera].emplace(starile_noi[urm]); // add new trsolition
            }
        }
    }

    stari = stari_noi;

    tranzitii = tranzitii_noi;

    stare_initiala = starile_noi[stare_initiala];


    stari_finale.clear();

    stari_finale = stari_noi_finale;

    stari_noi_finale.clear();

    nr_stari_finale = stari_finale.size();


    v.clear();

    v = actual;

    actual.clear();

    starile_noi.clear();

    tranzitii_noi = stari_noi = 0;


    set <pair <int, int> > pereche;
    for(int i = 0; i < stari; ++i)
    {
        for(int j = i + 1; j < stari; ++j)
        {
            bool t1 = (bool)(stari_finale.find(i) != stari_finale.end());

            bool t2 = (bool)(stari_finale.find(j) != stari_finale.end());

            if (!(t1 ^ t2)) pereche.emplace(make_pair(i, j));
        }
    }

    bool caut = true;

    while(caut)
    {
        caut = false;

        vector <pair <int, int> > Act;

        for(auto& p : pereche)
        {
            for(int litera = 0; litera < Alpha; ++litera)
            {
                if(v[p.first].am_litera[litera].empty() || v[p.second].am_litera[litera].empty()) continue;

                int x = *v[p.first].am_litera[litera].begin();
                int y = *v[p.second].am_litera[litera].begin();

                if(x > y) swap(x, y);

                if(pereche.find(make_pair(x, y)) == pereche.end())
                {
                    Act.push_back(p);
                    break;
                }
            }
        }

        if(!Act.empty()) caut = true;

        for(auto& it : Act) pereche.erase(it);

        Act.clear();
    }

    //combinam starile
    frt.resize(stari);

    for(auto& it : pereche)
    {
        frt[it.first].push_back(it.second);

        frt[it.second].push_back(it.first);
    }

    rad.resize(stari);

    for(int i = 0; i < stari; ++i) rad[i] = i;

    for(int i = 0; i < stari; ++i)
    {
        bool final = Parcurgere(i, stari_noi, stari_finale);

        if(final) stari_noi_finale.emplace(stari_noi - 1);
    }


    //cream DFA-ul
    actual.resize(stari_noi);

    for(int i = 0; i < stari; ++i)
    {
        for(int litera = 0; litera < Alpha; ++litera)
        {
            if(v[i].am_litera[litera].empty()) continue;

            int from = rad[i], to = rad[*v[i].am_litera[litera].begin()];

            if(!actual[from].am_litera[litera].empty()) continue;

            ++tranzitii_noi;

            actual[from].am_litera[litera].emplace(to);
        }
    }

    tip = "DFA-MINIM";

    stari = stari_noi;

    tranzitii = tranzitii_noi;

    stare_initiala = rad[stare_initiala];


    stari_finale.clear();

    stari_finale = stari_noi_finale;

    stari_noi_finale.clear();

    nr_stari_finale = stari_finale.size();


    v.clear();

    v = actual;

    actual.clear();


    frt.clear();

    rad.clear();

    pereche.clear();

    vis.clear();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


istream& operator >> (std::istream &input, usu &act)
{
    input >> act.tip;

    input >> act.stari >> act.tranzitii;

    act.v.resize(act.stari);

    for(int iter = 0; iter < act.tranzitii; ++iter)
    {
        int x, y;

        string str;

        input >> x >> y >> str;

        act.baga_muchie(x, y, str);
    }

    input >> act.stare_initiala;

    input >> act.nr_stari_finale;

    for(int iter = 0; iter < act.nr_stari_finale; ++iter)
    {
        int x;

        input >> x;

        act.stari_finale.emplace(x);
    }

    return input;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


ostream& operator << (ostream &output, const usu &act)
{
    output << "tip = " << act.tip << '\n';

    output << "Numarul de stari este " << act.stari <<'\n';

    output << "Numarul de tranzitii este " << act.tranzitii << '\n';

    output << '\n';

    output << "Tranzitiile sunt:\n";

    for(int iter = 0; iter < act.stari; ++iter)
    {
        for(int trsol = 0; trsol < Alpha; ++trsol)
        {
            for(auto& it : act.v[iter].am_litera[trsol]) output << iter << ' ' << it << ' ' << usu::get_str(trsol) << '\n';
        }
    }

    output << "Starea initiala este: " << act.stare_initiala << "\n\n";

    output << "Avem " << act.nr_stari_finale << " stari finale:\n";

    for(auto& it : act.stari_finale) output << it << ' ';

    return output;
}
