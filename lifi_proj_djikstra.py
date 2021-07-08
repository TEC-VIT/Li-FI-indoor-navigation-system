from dijkstar import Graph, find_path
import numpy as np

# architecture=[[0,1,0,0,0,0,1],
#          [1,0,1,0,0,0,0],
#          [0,1,0,1,0,0,0],
#          [0,0,1,0,1,0,0],
#          [0,0,0,1,0,1,0],
#          [0,0,0,0,1,0,1],
#          [1,0,0,0,0,1,0]]


'''
Tested architecture - 


            0 ------------ 6
            |              |
            |              |
            1              5
            |              |
            |              | 
            2------3-------4


'''



architecture=[[0,1,0,0,0,0,0,0,0,0,0,1,0,0,], #0
            [1,0,1,0,0,0,0,0,0,0,0,0,1,0],  #1
            [0,1,0,1,0,0,0,0,0,0,0,0,1,1],  #2
            [0,0,1,0,1,0,0,0,0,0,0,0,0,1],  #3
            [0,0,0,1,0,1,0,0,0,0,0,0,0,0],  #4
            [0,0,0,0,1,0,1,0,0,0,0,0,0,0],  #5
            [0,0,0,0,0,1,0,1,0,0,0,0,0,0],  #6
            [0,0,0,0,0,0,1,0,1,0,0,0,0,1],  #7
            [0,0,0,0,0,0,0,1,0,1,0,0,1,1],  #8
            [0,0,0,0,0,0,0,0,1,0,1,0,1,0],  #9
            [0,0,0,0,0,0,0,0,0,1,0,1,0,0], #10
            [1,0,0,0,0,0,0,0,0,0,1,0,0,0], #11
            [0,1,1,0,0,0,0,0,1,1,0,0,0,0], #12
            [0,0,1,1,0,0,0,1,1,0,0,0,0,0,]] #13

'''
Tested architecture -


10----9----------8--------------7------6       
|           |           |              |
|           |           |              |
11          12         13              |
|           |           |              |
|           |           |              |
0--------1----------2--------3---------4

'''



arc=np.array(architecture)
graph=Graph()
(r,c)=arc.shape

i=0
j=0
while(i<=r-1):
    while(j<=c-1):
        if(architecture[i][j]!=0):
            graph.add_edge(i,j,100)
            print('edge created between',i,' ',j)
        j=j+1
    j=0
    i=i+1


i=r-1
j=c-1
while(i>=0):
    while(j>=0):
        if(architecture[i][j]!=0):
            graph.add_edge(j,i,100)
            print('edge created between',i,' ',j)
        j=j-1
    j=c-1
    i=i-1

#path=r"C:/Users/arindam bhattacharya/Documents/pythonProject/a/lifi"
start=int(input('enter the starting point: ')) #should be taken from DB
end=int(input('enter ending point: '))  #should be taken from user
#graph.dump(path) 
print(list(find_path(graph,start,end))[0]) #returned to the user

    