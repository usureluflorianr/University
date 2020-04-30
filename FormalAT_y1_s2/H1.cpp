#include <bits/stdc++.h>
using namespace std;
ifstream f ("nfa.in");
ofstream g ("nfa.out");
const int nmax=1e3+3;
int ok,nr,dr[nmax],n,m,a,b,st,t,x,q,caz,act;
char c,sol[nmax];
vector < pair<int,char> > v[nmax];
string sup;
map <string,int> mp;
map <pair <string,int> , int > mp2;
char s[nmax];
bool viz[nmax][nmax];
void solve(int k,int nod)
{
    if(ok) return;
    if(k==nr+1)
    {
        if(dr[nod]) ok=1;
        return;
    }
    for(int i=0;i<v[nod].size();++i)
    {
        if(s[k]==v[nod][i].second&&!viz[v[nod][i].first][k])
        {
            viz[v[nod][i].first][k]=1;
            solve(k+1,v[nod][i].first);
        }
    }
}
void solve1()
{
    f>>q;
    while(q--)
    {
        memset(viz,0,sizeof(viz));
        f>>(s+1);
        nr=strlen(s+1);
        ok=0;
        solve(1,st);
        g<<ok<<'\n';
    }
}
int main()
{
    f>>n>>m;
    f>>t;
    f>>st;
    for(int i=1;i<=t;++i)
    {
        f>>x;
        dr[x]=1;
    }
    for(int i=1;i<=m;++i)
    {
        f>>a>>b>>c;
        v[a].push_back(make_pair(b,c));
    }
    solve1();
    return 0;
}