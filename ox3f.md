#### 寻找x的所有互质因子，以及出现的次数

```c++
for (int i = 2; i <= x / i; i ++ )
{
    while (x % i == 0)
    {
        primes[i] ++ ;
        x /= i;
    }
}
```

#### 差分数组的使用

```c++
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll N = 1e5 + 9;
vector<ll> a(N), differ(N);
void show(const vector<ll> &arr, int n)
{
    for (int i = 1; i <= n; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}
void func()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    show(a, n);
    for (int i = 1; i <= n; i++)
        differ[i] = a[i] - a[i - 1];
    show(differ, n);
    int m;
    cin >> m;
    int l, r, x;
    for (int i = 0; i < m; i++)
    {
        cin >> l >> r >> x;
        differ[l] += x;
        differ[r + 1] -= x;
    }
    for (int i = 1; i <= n; i++)
    {
        a[i] = a[i - 1] + differ[i];
    }
    show(a, n);
}
int main()
{
    ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    func();
    return 0;
}
```

####  判断一个数是不是可以由连续多个数相加

```c++
#include <iostream>
using namespace std;
int main()
{
    // 请在此输入您的代码
    long long n;
    cin >> n;
    long long num = 0;
    while (n--)
    {
        long long a;
        cin >> a;
        if ((a & (a - 1)) == 0)
            ++num;
    }
    cout << num;
    return 0;
}
```

#### 线段树

```c++
#include <bits/stdc++.h>
#include <algorithm>
#include <cmath>
#include <bit>
using namespace std;
class xianduanTree
{
    vector<int> mx;

    void maintain(int o)
    {
        mx[o] = max(mx[o * 2], mx[o * 2 + 1]);
    }

    void buildTree(vector<int> &a, int o, int l, int r)
    {
        if (l == r)
        {
            mx[o] = a[l];
            return;
        }
        int m = (l + r) / 2;
        buildTree(a, o * 2, l, m);
        buildTree(a, o * 2 + 1, m + 1, r);
        maintain(o);
    }

public:
    xianduanTree(vector<int> &a)
    {
        size_t n = a.size();
        mx.resize(2 * n);
        buildTree(a, 1, 0, n - 1);
    }
    void show()
    {
        for (auto &x : mx)
        {
            cout << x << " \n"[&x == &mx.back()];
        }
    }
    int findFirstAndUpdate(int o, int l, int r, int x)
    {
        if (x > mx[o])
        {
            return -1;
        }
        if (l == r)
        {
            mx[o] = -1;
            return l;
        }

        int m = (r + l) / 2;
        int i = findFirstAndUpdate(o * 2, l, m, x);
        if (i < 0)
        {
            i = findFirstAndUpdate(o * 2 + 1, m + 1, r, x);
        }
        maintain(o);
        return i;
    }
};
class Solution
{
public:
    int num(vector<int> &fruits, vector<int> &baskets)
    {
        int ans = 0;
        int n = fruits.size();
        xianduanTree tree(baskets);
        for (auto &x : fruits)
        {
            if (tree.findFirstAndUpdate(1, 0, n - 1, x) < 0)
            {
                ans++;
            }
        }
        return ans;
    }
};
int main()
{
    ios::sync_with_stdio(0);
    Solution s;
    int n;
    cin >> n;
    vector<int> fruits(n);
    vector<int> baskets(n);
    for (int i = 0; i < n; i++)
        cin >> fruits[i];
    for (int i = 0; i < n; i++)
        cin >> baskets[i];
    int x = s.num(fruits, baskets);
    cout << x << endl;
    // xianduanTree tree(baskets);
    // tree.show();

    return 0;
}

```

#### 归并排序求逆序对

```c++
#include <bits/stdc++.h>
#include <cstdio>
using namespace std;
int a[50005];
int c[50005];
int n;
int res = 0;
void momsort(int b,int e)
{
    if (b == e) return ;
    int mid = (b + e) / 2;
    int i = b,j = mid + 1,k = b;
    momsort(b,mid),momsort(mid+1,e);
    while(i <= mid && j <= e)
    {
        if(a[i] <= a[j])
        {
            c[k++] = a[i++];
        }
        else
        {
            c[k++] = a[j++];
            res += mid - i + 1;
        }
    }
    while(i <= mid)
    {
        c[k++] = a[i++];
    }
    while(j <= e)
    {
        c[k++] = a[j++];
    }
    for(int d = b;d <= e;d++)
    {
        a[d] = c[d];
    }
}

void _print()
{
    for(int i = 1;i <= n;i++)
    {
        cout << a[i] << " \n"[i == n];
    }
}

void solve()
{
    cin >> n;
    for(int i = 1;i <= n;i++)
    {
        cin >> a[i];
    }
    momsort(1,n);
    cout << res << endl;
    _print();
}
int main()
{
    ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    solve();
    return 0;
}
```

