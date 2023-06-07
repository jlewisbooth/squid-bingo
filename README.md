# Squid Bingo - Focusrite coding challenge

You are the captain of submarine on a long journey. A giant squid has stopped you in your tracks
and challenged you to a bingo game. If you win, the squid will let you continue on your journey.

## Part 1 - Determining a winning bingo game
Your input will look like this as raw text. The first line being the called numbers in order followed
by a bingo card.

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
22 13 17 11 0
8 2 23 4 24
21 9 14 16 7
6 10 3 18 5
1 12 20 15 19
From this input, write a program that will determine whether this card will ever get Bingo.

## Part 2 - Determining a winning bingo game
You have an advantage over the squid, you know all the cards and the order the numbers will be

called in advance. You also have first choice on which board will be yours. This means that you
should be able to pick the board to ensure a win.
Your input will look the same as above, with the additional boards listed below.

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
22 13 17 11 0
8 2 23 4 24
21 9 14 16 7
6 10 3 18 5
1 12 20 15 19
3 15 0 2 22
9 18 13 17 5
19 8 7 25 23
20 11 10 24 4
14 21 16 12 6
14 21 17 24 4
10 16 15 9 19
18 8 23 26 20
22 11 13 6 5
2 0 12 3 7
Can you write a program that will take this input and tell you which board to pick to guarantee a
win against the giant squid?

## Rules of bingo
`***`
Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen
at random, and the chosen number is marked on all boards on which it appears. (Numbers may
not appear on all boards.) If all numbers in any row or any column of a board are marked, that
board wins. (Diagonals don't count.)