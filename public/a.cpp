x = int(input())
n = int(input())
arr = list(map(int, input().split()))
mx = 0
for i in range(0, n):
    mn = -1
    if i + x < n :
        mn = min(arr[i:i+x])
    mx = max(mx, mn)
    
print(mx)