#include "transform.cpp"

using namespace std;

ifstream f ("file.in");
ofstream g ("file.out");

int main()
{
    usu x;

    f >> x;

    g << x << "\n\n\n\n";

    x.upgradeNFA();

    g << x << "\n\n\n\n";

    x.upgradeDFA();

    g << x << "\n\n\n\n";

    x.simpleDFA();

    g << x << "\n\n\n\n";

    return 0;
}
