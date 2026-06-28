import { useState, useEffect, useRef } from "react";

const SOCOTEC_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABe8AAAWLCAMAAACdpL0iAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTAAAAAAAAABXiACS4gAAAACQ4gCD2QBmrACC3gCp5gCs6AAAAACC3gCs6ABUmcJ46cgAAAAMdFJOUwB6yR5JRXvb0q7grGIwg1wAAEx7SURBVHja7N1bcuJIEAXQiVCFMBAu9r/bMfQL22CErUdV5jmfE/PVNreTmyn1f//B1oahlDKe7c92F6+714/e/tvZ5X86/9+llDIM/vwAGk74S75fsv11Bpe/Ay75L/0Bmhjjf2X866J2v6Jf8gOsP8yfY37hlL+X/IIfYIWcL+MWMX8n9/1AABYZ6FsI+k8tv9gHmC3pGwz6G9O+kgcgcNK/c17q+rEBPKOUvpL+3axv1AeYFPVjt1F/nfpCHyB61F+P+kIf4IOhxIr661Jf6AP8HetfYzt3+n7OgLE+CZkPyPo8rHGBdFk/5sv6q8z3CwCY62U+QAxlTJ/1+nwgQdbvpfzHzFfnA9FKHFmv2gGUOMZ8Yz4QIextZ435gBaH96/b8SsD9Bn2Bvvnmx2RD/TW4gh7ZT4g7BH5gLBH5APCXuQDNMGC1voWEPaI/Pjfbg+jPwQScGcv8sV9rdVPivC/58J++advVfnNzzy11nrwc0KPwwyR75et5c/BsV4c/FEQ9pe8CHu9Dm+fhEP97egPAz0Oep3AH4X6j+9h6HEw5Ic11mt+QBjtMeQHdXwX93a2GO0x5Af9OBzqByp8jPYY8iN+Hj7FvcAnTFNptDfkc/WBqLf4yRDgm6vR3k0+1471Nl++UOQwO7XOlgPQ4U7ce+wKRQ5qnVAT0N24V+HT8xwzitWWax2Jv8kIVL+iakORg2udII71a/4Spse0V+T0UetI/FW/8j6Ke49d0eF3VmmvyOfzFHSoD6nwkfZI/P7jvk6hwqejb6yWtFa33JyD6jR+GPSS9pa0nsHi5kfjODHuVfh08n1V2kt8bsf9oU7msSukPUuT+Mt9OOoz/CCQ9iyf+KqETat7FT7SHonfteOTca/CR9oj8aNX9yp8pD16/H4/H9+IexU+0h6JH766V+HT7ldVaS/xmbO6V+Ej7XGPn6S69yIdmvxd9uaE4ImvUtikulfh02AvKRAlPktU9yp8pD0b8O7MDap7R5m09T3VG4/zJL694ffqzh/HvQofac/qpzoSf+3qXqNDK3OLoxzHmTyK+zoPf9Wyador7i1uebjeminuVfhs+nss+iQ+jxzrbHy1QnGPxW2734EPdUb+nkXao8YPXt1rdNiQNS1KnRWre0eZKO6R+Emqe40OqhzU+Emqe0eZbPFLrMrhasRX49+dixaJe40OqhyUOtGre0eZqHJQ6iSp7jU6qHLYnhF/lereUSYrDvdyjXuljplzhepeo4PhnhbIoKu4rwvzfYpl2dNib7t5da/RYY2BxZ4We9tpX4SXj3tHmahyMOI38GE51DX4k2ap4V6QYcRvpLrX6GC4x962iTVXXYtGB8M9TjM3dKzr0ehguMeIH7y6/9Po2I4z87dT2YURv7HqXqOD4R4jfpLqXqOD4R4jfpLqXqOD4R4jfo7qXqPDzF2kvMKIP/njsknca3Qw3GPED1/da3SYb1rxthxmkeNx22PdjEaHnzLcM1unE79xGDaMe40OhntaGvFV996jQ7NVpITCiD897uvGNDp8/7up4R5r2w42tRodfj6syCasbTup7jU6WNTSopBD6HCoLfAvB2NRi7Vt8Opeo4NFLW2ubaN1OmMrca/R4emvprocrG2fcKzt0Oigy0GnE7y6/8NrFdDl0FqnE6VpLm3FvSN8dDnodKJX91a26HLQ6SSp7r0oE10O7nSSVPcaHZ6gy2FlfXcPpcm41+gwZVbR5aDT6bq6d4TP1FlF9qDT6bu6d4SPLoemA7/P9mFoOO4d4aPLoVE9TqOtVvdWtjz+5RX3KPGf+cTUxlnZcnfvJHFQ4kfY1FrZorqneT3No21X9xodVPco8ef6xBxqD6xsUd2jxA9e3Wt0uPvLK2dQ4oeq7q1ssaml/cDvIKGOtR/yDZtabG2DV/dWttjUYmv7w/azq7jX6KC6x9Y2fHVvwEfcY2ubpLo34GNTi61tjureTSY2tdjaJqnuvRgZm1psbXNU956yRdxja5ukureyxaYWgf/8fNRv3FvZintpgjOd8NW9lS0OcxD4T8Z97ZuVrcMcaD7w22gixto7K1txD81rIfCP3ce9lW1eDnPoyOZVxHCoAVjZ5uQOE4GfqLo34It76Memd5ljDcKAn5A7TAR+rureTaa4h47sVPduMhH3JAn8Te4JS6S4d5OZjaesEPgJq3srW3EPAj9HdW/AF/fQl3XTajiEi3sDfiIeqqVza14UloBx7yZT3IPA/xz3NSQ3meIeBH706t6AL+5B4N+o7sPGvQE/Be9QQOBn3tR66ErcQ38WD6xSQ3OTGZw3pCHwJxtjx70B33QPAj/4ptaAb7oHgZ+luvfQlbgHgZ+kuneTKe5B4Oeo7g344h4EfpLq3oAv7kHg56juPXTlMgcEftD3oxnwxT0I/JzVvQFf3EP2wD/WXAz44h76MldqDYdkcW/AD8cbMRH4qntvVRD3IPD/xn1NyIAv7iFf4B9rSgZ8cQ/JAn9IGvcGfHEP3dn9KPCHQ83KgB/FKAXIE/g/eL9vqYl5L7K4hzyBP2aOewO+uIc8gX+suRnwAyg+/2QLfNW9AV/cg8BX3RvwxT0Eslfdf4N/+KRzXniPwFfdG/DFPQT2TBmtutfgRyDuEfiPS09xb8APwGO1JDb1QVvVvQZf3EOKwFfdG/Aj8JwVyU0Ir0Hca/DFPfTv8YO2qnsDvsN7iBH4jz4l8t2AL+4hhr1NrQE/weG9Tzp8HfiqewN+kLh3eA8Xd+PLQ1Z3yE+XmNCporo34It7SBz4qvu7/Eu2LjGhWzc2kKp7A77THAhop7o34It7yGHvISsDvtMcSBj4qnsDfhjiHj4ZVffPKILUaQ50q6juDfhOcyCHQXVvwLerhRR2qvsn+HdPxD30vbNV3RvwneZAip2tuDfgO82BFIXOaSfGp/NaZKc50KuX0+lkWWvAd5oDKeL+dBLjBny7WkgR96cXMe6lCna1ELq6/x33Av8ZUtWuFjrc1P5jZ2vAV95D9C7nNztbL1VQ3kOKuNfoeOaq+/Lehxomxb3AN+Ar7yF8dS/wDfgetII8w72drWeu7GohT9x77MozV8p7SBL3Gh0nmR60gujVvcD3zJXyHvIM9yp8A77yHvLEvceunGR60AqSxL1Gx0mmy3uIXt0LfCeZynvIM9yr8J1kKu8hT9y7wjfgu7yHJHGv0XGSqbyHrqv7yXEv8J1kKu8h+KbWUaaTTKeYkKfLMeA7yVTeQ6K4F/g2ttocSNDlOMp0kukUExLFvaNMG1ttDsTvcjQ6TjKdYkKiuBf4NrbaHEgS944ynWQ6xYTw1b0B34CvzYE8w73Ad5LpFBPSxL2jTCeZ2hxIEvcGfCeZDZ9ianNglupe4NvYanMgz3Cv0bGx1eZAnrj3mK2NrQdrIUnca3Q8Y6vNgZar+/niXqNjY6vNgeCbWgO+ja3bHMjT5Qh8G1ttDiSKe42Oja02B5LEvRsdG1ttDkSv7jU6NrbaHEg03Gt0bGy1OZAm7g34NrYN0ebAgnEv8G1stTkQvrr3b10pdLQ5kGe4N+ArdLQ5kCbuBb5Cpw3+hXJYPO4d4X/NP3O10um9zzqq+xUY8J3gW9ZCguHeEb6NrWUtpIl7jY6NrWUtJIl7jY6NrTYHtqzu14t7R/gKHctaCL6pNeArdLQ5kKfLsbJV6FjWQqK4t7J1gq/NgSRxr9Fxgu/JWohe3VvZ2tga7yHPcG/AV+i4xYQ0cW9lq9CxrIUkcW9lq9Bxiwnhq3uNjhN8y1rIM9xb2TrBt6zl4US621+M1/bj+T/tdr6q9RT3BnyFjmUttyJ+HEsZppwtDEMpZRz3e9nfetxb2Sp0LGv5m/NvMV/K8P2vbsM5+OX+nT/d7ePegK/QsazlLenHMt8N8lCK2G9qUyvwHxLNxntJ/7PYl/oNdTluMhU6q/PBbyvql1/PC/2W4t6Ar9Bxiynqlw99cd8GN5kKHbeYqbK+bPK6kLyZvzs1xIDvnQpuMWX9On/hZ8z8l1NTDPgKHeO9rF9vzt+JewO+l2Qa71ks7MeW7g+GkmeH21rce+hKoeMWM7RGBvuMY/7u1B4DvkLHo1ZxW5x2+73wbf7L6STwFTrGe7KHfYbIbzPuPXSl0DHeR6xx+tjih438VuPegK/QWZxHrYT9/cgPOAzsTu2S7Qqd/9m7E9y2gSCIogEshLKIUPe/beAlhh07saiN012vr2Dyu/i7ZiTe94F9vS/TXbc8sB8Y9wI+oSPet6leFo0pu0e4d+iK0OkwjlrxOEleZ3DcC/ju0BHvRXsh/zp/h9FxL+B/PS5FFu/rUKbH01o/5E/H8UfAJ3RuN25SIHLWfA2WJv7+WGEEfEJHvK86P5tVyQprnRq4F/AJHfG+qrbvmBFqPjTTscq4No3QEe9p+4FEPtwL+ISOeG9aavv6In9/LDQCPqEj3qM94kfgXsAndMR7tEf8DNwL+F/NAa/Fe7RH/E7qXsAndMR7W9pxiS/cC/juTBPv0R7x4V7AJ3TEe7RvlRse4V7Av8O4BF+8H2pSvzjHJf50LDoCPqEj3o9N++D8sZuEe7foaGSK9zGlnPCvzRGrOoVxL+ATOuI9cW9xm4F7AV8jU7wn7mn8k/8F18a9gE/oBLXoqBwaP3NTK+C7M+36g9JUzi0i/ig5Yl8e9wI+oSPeUzmjE3+C+ysNvmtkXmkmoL5OuKdyRswSLXAv4DtiK94L9/a27dW9gK+RKd7b05bZ2wr3Aj6h43UU7kV8uMd7jUzxXriXKeDerWkameK9cC/iR6l7AV8j81rjKgW1nJ6tgP2x2Qj4hM7FwQuvhfv7PGkT3Av4Gpnifelw75tyzIjfD/cuVdDIvHgQ26L2fruiu0X86dhxBHyNzGpWlcuxthXunbki8LcYZUyL2n4BoyvuBXyNzMs+sEH7Apfj+RnT6bTFvYCvkSneczmczvuvrsa4V8kk8MV7vRxOp/mmltDRyLx8lDH1cprljP2x9wj4Gplnf1njNpezzZM3wb2AT+A37Ep0HA/ZoJ+W7XFvY6uRaVurhilstFf3Aj6Bb1tL3Xv8csI93hP4trVa9yR+Cu5tbDUybWttauOBn4J7AZ/At621qc3+xJyOOeOWTAL/jAFvh6y6hI59EO4FfI1M21rFnGDgR+FeJZPAP2OUMeG+Se4Iw72NLYFvW6uYEwr86Zg2hI47kTfblMG92bKmk4d7G1sC37ZWDzMS+PtA3Av4BP42vQi4N5sCPxL3NrYEvm0t3BcG/iPc29gS+La1TlkJINQ9oUPg0zlwH10g2B9zx8aWwKdz4D4I+Mm4F/AJ/BXjbC3cVwd+NO5tbAn8m347w70Z6bGcjuFjY0vg29bCfQbw9+m4J3QIfNtauM8APtwTOgS+bS3cRwAf7gX8D+MOfNtauG8K/Anr8f6vcXMtnQP3LYEv3KvgE/hrBshdojBwmWCCewGfwKdz4N56Ce5tbAn8W3Qg4N6MlvAnuFfBJ/DpnOuPnzcZD/g2tYSOE1d0DtxHPKPCPaFjYUvn3GAmz8lwwId7QofAX/2tDOYn4J4OHA341D2h48q09aN8f8LA/WjPKXVP6BD4dA7cRzyowj2hQ+DTOY7VRgAf7gkdJ67oHMX7ztFkgntCx8L2onE1piZmsW9R6l7Ad+KKzoH7iJKOcI/3FrZ0jiZmxOMK94SOhS2do5oTAXy4F/AtbOkc1ZwIoXPAe7x34orOUc1JwP2yLJBO6FjYnjkOW9nVFkonT2+xdo4jVwQ+nWNX233ml9cY8AkdAp/OIe97Z5O3n2el8AkdJ67oHPK+uboHfELHwpbOIe8z1P1bcAN1QseJq/WZCdT/I+89H8Op+z9D4RM6FrZ0joNWzdU9o0PoWNieO6BO3lf4DD18fpUBn9CxsKVzyPve6p7CJ3QsbOkczfsQdU/hfz8HpLew/TzuStO8r6fuGR1Cx8KWziHvQ9T9n8F1vLewXeFFcV0Vc3Dc/+9lZnQIHQtbOkcVs7m6Z3QEfAvb1WYU19mcoR/Q+bu3GfDx/v8judE5qpjFN7WMjkamhe3a0cZkc6qqewHfEVu8XzfAzuYM/PV52vsM+ISOgs5J+QnZ2Zyqm1rHbPHewpa+Z3NS1L2Ar5FpYbtitDHZnMrqHvAFfDcqnB6hoN1Jq9LqXkcH7y1s6Xs2J0PdC/gamRa2p442JptTXN27R0cj040K9D2bU/iz84w9I6ND6Cjo0Dnrx3KnlLpndPDewva0FwvcVe/Lq3slfALfwpa+t6wNUfcCPoGP9ycMuFvWNlD3VraEjoIOfW9ZW++RvOSltrLFewUd+t6ytrm6Z3QIfAWdb0cb07J2KHU/X5ri4F3AV9Ch7y1rW29qBXy8x3v6XrxPUfdWtoSOhS19L96XeRqv8loL+J/Gnch4T9/rYrba1AI+oaOgQ9/rYqaoe51MvFfQoe91MUPUvYBP4FvY0vfifYa6F/AJfLz/97g8R7xvpe4FfFfouEGHvhfvM9S9gE/gK+jQ9+L9yI/h9W2DgI/3Cjr0vaNWzdW9WxUsbBV06HvxPkTdC/gE/j8n/Cwlwov3W6v7+Uaf7hBP6CjofHzXIF68b6fuBXy8V9Ch78X7AXF/w90cxhP4Cjr0vXjfelMr4BP4eP/luCxNvG+o7gV8Qkch07pWvB8L97c+4y/g471C5jt5ivGO1nZU9w7ZEvgKmda14n2IuhfwXZmmkGldK96PMvM9Xm4B38JWIdO69qvxs1ad1L2AT+Ar6Pz10oH8uwHhO6r7e6kFvMd7vLeuFe+7q/vXQXkLW4VM69pP8wDDrdS9gG9hq5BJ3ztrFaLuBXwLW4VMvFfGzFD3Aj6Br5BpXauMGaLuVTLxXiHTula8z1D3Ar6FLd5b1ypjbvZFuQHuBXwLW4XMp3G6Vhmztbq3sbWwxXvrWmXMbXC/0QtO6BD4CvjWtcqYvTe1by84zuO9Ar51rW1t702tgG9hq4BvXWtbe/+PyS03hTa2eK+Ab11rW9td3dvYWtjivXUtnZOh7gkdAl8B/2Vw3tna9uqe0MF7hUzrWjonQ90L+HiP93ivfH+352yEM514b2EbXsBXz1G+D1D3KvhuVFDAV8+xrc1Q9wK+go4CvnqO8n2Iusd7Al8hUz2HzslQ9yr4eI/3bs+hc26O+5HecQEf75ML+Oo5dE6GulfBV9DBe/UcOuem34/zYC850ivoBBfw1XPonBB1T+go6MTzXj2HzglR93hP4McfuEJ6Oud2snDEtxzq8T6W9+o5dE6Muhfw8T78gK16Dp1zK9wPuhHEewWd2AO26jl0Toy6f/2Kh3q8Tz1whfeuQs5R9wK+QmY279UxXYV8i5kXvFfIdOBKHXPE8ctWGeqe0LGwzeY91tM511f3g6sCrMf7zANX6pjamEnqntDB+2Teq2NqYyap+5dxZ5qCTuaBK/UcbcwkdU/g4z3e0/cmRN0TOgqZ70YdUxvTXID7Gq853itkRvJeHVMbM0rdE/gWtu8mLemBPX1/PXU/l3nPwR7vn2aH99qYpu2mltDB+2Deq9/T92HqHu/xPpb36vf0/bWaXqXecwJfIfNpwpp56pj0fdamlsDHe7yn702Kuid0FPDfJuxCBfV7+j5N3eO9Aj7e0/cmQ90T+HifynvHrej7OHVP4Cvo/JmwC3TQ3uU5ceqe0MH7TN6r31vXXqruq+788B7vl7ALdPD+l7vv49Q93uN9Ju8dt7KuDVT3L1/ycK+AH3Zhmvq9de0ln4dz5Tcd7fE+7EIFvLeuDVT3hA7e4711rVmF++JvOt47YBvGe8etrGvzNrV478AV3lvXmhR1/zxO2OJ92IVpjtda156H+w4iAO4VMvHeutZ0V/d4j/eJvId769pEdU/g4/3rJF2Y5nity5DPmHnBe7zHe7xXz6HuLWzxHu/H1LBwr56z9pnpU9nGeweu8F49x7RX9xa2eP8ySRciO16rnpOp7vEe7/FePcdkqHsLW7zHe7w3Geoe712g8zpBL7DrFNRzQtU93rtQAe/Vc0yGulfQwXu8x3vzD3XfEPd+4koBP+oHrlyfo44Zqu4VdPAe79UxzZe4b/qu4z3eBzU2rGvxPnNTa2GL93ivjmlC1D3e430a712X5nbME56SxhVtvMd7vFe/N+3VPd7jfRjvXZeG97HqXgEf75/nJ96r35uXmRe8x3u8x3v1e+q+/Dhw5cI0vMd78/x89L9MC+/xHu/V7013dY/3eB/Ge9ch432sulfQwfvnmfHecSvqPuNidLyX7/Ee76n7Be8j5iDf4z3eh+M+5WXHez4H712nQN3jfcZMeJ8yfu4E779S9zm4x3s+B+9dp0Ddh8yjfI/3eI/31H3EuFAB7/He9Tmx83PBe7zHe7zHe+oe7/Ee76vOhPfmA+7jlncuTIu/IPMg37sujbrHe/levpfv8Z66bzTyvXyP93ifN/OC93iP93iP99Q93jedR7zHe7xPU/epxyzle7zHe9ffU/d4j/d4j/d4T93jPd7jPd7zOdQ93uM93uO9fE/d4z3e4z3e4/12uM9+2/Ee7/Ee76n7jNnjPd6HzC+8h/tFvsd7vMd7vFfElO/xHu/5HLyn7+V7vMd7vMd7bUy8x3u8x3u8HxD4M97jPd7jPd6T+HiP93iP987Xkvh4735MvMd7+b4c8A94L9/jPd7L9yQ+3uM93uM93jeaGe/xHu/xHu9tbfGev8d7vMd7Er/2yy7f433KPOK9eS/xD3gfN1M672e8T5kJ48Ml/iTf4z2fg/ckPt7L93yOfI/3JD7e4718j/fVBt/DJf4e7/Ee7/GexMd7vMf7VrI2nvcP6J4t8fH+gPfyPd5nS3y8x3u8l++7zQ7bsyU+3uM93uN9PPBnvM+YBe/x3oXItrZ4j/cJk8OAHd7jerbEP+I93sv3LtAxEUev8B7v5Xu8NxkSH+/xHu/x3kRIfNdj7vEe712gY16VX+933fU5eJ/D+4d43rtQIVvi4z3e7/DeAVvz9pB0Br46Jt4HncHBeweuoiU+3uM93uO9yZD4eI/3eO/Alfko8fEe7/G+/Ex4D+bJEl/9Hu8f8F4B30RIfLzH+yDeuwBfAT9Z4qtj+nkrvFfANxkSH+/xfvmB9wr4JkHiW9fifRLvXZCpkLkG+DPed5sD3uM93psEiY/3rsc84L1CpokAPtzjfRLvXZCpkLn2kTngPd7jPd4rZNraqueo3xebOendxXuFzNXTZmtL3+M93lvYmgyJj/d4H8V7F6bhfbDEx3u8X6IKGy7QUdDJlfhwj/d4r6BjIiS+HyvH+zDeu1BBQSdW4qvnuE4B792gY06T+PQ93tefqP2dA7YWtrESH+9dn4P3FrYmQ+KjveO1Ybx3wNbCNlbioz3eR/3cCd5b2OZKfOta9Zw03jtga2F7IfDLGmD6Hu+XqOvvfzhga2H7m717wU3liIIwHAkEA0jZ/3LjVyLbgWvA8zh96itlBdczlZq/qptfR4YLv+f3/J7fK2y1tvA9vy+tc9a76oAtgJ8J8Z2u5fd5fu/AlSuRMyE+nOO41d9h12PyewB/Hoh/5veOW/H78nLgCsDPhPj83vz+77DrcwzwnbiaLTmoa/k9v+f3AD6I77SVupbfVwCvzN6Jq0SID+fw+1eldXfMHsBPhPj8nt8n+r0BPoCfCPGZPb9/1Y7fA/j0NMQX783v+X1dGeBb4AdCfH7P798U9wXO7AH8PIjP6x23ivR7g0wAPw/iuzzH/P79QeD3AD51h/hwjrr2TZe0d9MAH8Cf3/DP/J7f8/uK4vWAzvwpojjE5/X8PtTvDTJf5Q78pNbWZQr8/l15Qw2DTEAnrbWFc8wx35X32htkWmSmQXxWb47J7wEdmhXiV/UTa0xzzA/l3ZRokOmOzDCID+fA97F+b5AJ6IRBfH7P7z8U+E6yeovMKIgP5/D71OO1BpmAThrEF+/5fbDfG2RaZEZBfH5vnhN73MpAB9DJgvhwjnlOst8b6AA6Cz9h4j2/d7zWQMdCB8Tn9/C941YGOoBOJ8OvA/HhHH6f7fcGOoBODsQX7/l98HErAx1AJwri83u3pSUftzLQcYfOOoZfAuLDOeracL830AF0YiC+eM/vo49bGegAOmupgOHzefg+en5voAPo5LS2ftmK38f7vYGOOxVCID6co67NPm5loGOCvyY83NTwtbVuz0mf3xvoaGxTIL54r67l9wY6GtsMiM/v4fv041YKW43tyvlCW8vvze8VthpbEF+85/fm9wpbjS2Ib3xvnmOOqbDV2IL44r26lt8rbDW2IL54z+/N7z/xVDavsW0P8bW18L05psJWY7uR4a8M8eEcfs/vFbYCfgTEd7ZWXWt+r7AV8DMgvngP35vfK2xNMrd88M7iPZxjfq+wNckE8cV7fm+OqbA1yWyklQyfyfN7c0yFrYAf0dqK9y5D5vcKWwE/A+LzeHWtOSaAf108eN2nb3HDd9YKzjHH/CQeL+A3hvhwDr83xwTwnbmKgPjiPb83xwTwBfw6EF+8V9eaY672uvF4Ab8rxBfv1bXmOQpblypkQHzxHs7h91/lxJWA3xTii/f83hxTYSvgZ0B88R6+N8dU2Ar4ERBfvIfvzTEBfBOdio/hRbyHc8wxlxeHF/A7trbiPb83xwTwBfwMiC/ef5PftjLPAfDdolPH8M/sHr43zwHwBXyt7YPi73COeQ6Af488E8NDfPGe35vnAPh3yS/ZbkcXZ1ph8Hf43jwHwHfoKgLii/fwvXnOjTeMvwv4vSC+eA/nmOcA+AJ+BsQX7/m9eQ6A79BVBMR31Aq+N88B8G0yR0GMtpjwvXnOUsSUvdtkNoL4aA6cY54D4KtsIyC+spbfm+cA+CrbDIgv3sP35jl/xKXcXWXbBeIra+F78xwAX2U7nOGfxXs4h9/PLz9iq7KtmEMu7J7fm+fMz0qZu8q2RWurrL0qP11rngPgq2zbQXzxHr43z/lRvP1qZYvoDAbx2T2cY54D4CM640L8M5pjjamuBfARHRBfvIdz1LUAvhF+pzRieg/nqGsBHUQHxEdz+L269lG5UgHRGR3ioznWmOpaQAfRiYD4aA58r669V5wd0Rka4qM5cM4PMq8GdBCdYT5B0RxrTPOcueITY3ePzsAQn93DOeraB14mvo7oVH9GL2gOnMPvZ5FF5k3p9ctDfPGe36trAR0IPwLis3trTH7/2JvE1o0yB3hMz6aY4r269vdi6xD+mBAfvOf3blN4VBaZiM4QuqA5cI7TtYCOUWZka8vurTHhe0AHwo+A+OA9nON0LaAD4TeG+Gfw3uFadS2gY4UfBvHRHDjHaStAR2cbAfHZPZyjrgV0lkD4CGA5iM/u4Rx1LaAD4UdAfF0tnKOuBXQYfgbEZ+hwjtNWgI7ONkJHOAfOUdcCOjrbkHgC6MA56tqniShD19mOs9B5+4MwdThHXQvoOGcb8jGK6cA5TlsBOjrbkG9Rhg/nqGstdBh+Z7v/9HtsDB/OUdcCOkY6jac5XyAbb4dz1LWAjpFOSC4R8eEcp60AHYYf8hnK8OEcdS2gY5XZUIcrfxOG/11+2Qq+B3QYfku7B/HFe/j+t0UYmeEPE0ncrsDvnbaaJzwRw6//Bcrw4Rz4HtAxww95Phm+eO+0FaDD8LvohyueQHx+D98DOgy/id3/lEZAfON7+H7GBEUMv67dYzrivdNWj8kE380K49o9w3eXAnyvsWX4IXbP8OEcp60eER9n+APbvdYWzoHvNbYMP8TuRXzje/ge0GH4KXafbvjiPXz/gEzwGf7Ydh9u+Pwevgd0zDJz7D4b4jN5p60eebuYOMMvRRif+uKcxHuC7++QCT7DHzvdRxu+8T18r7Fl+HFP4yTew/deII3t3PIDKDXDx5Hfw/eksWX4GY9i4v1pPB6+19gy/MzkMYn38D1pbOeWY9s1n8M0w9fWwvcaW4YfGzuO4r3Lc0hj66htcao400MYBfH5PXyvsbXLzLX7LKbD4uH7Z8S9nzF8caImUpzEe/ieNLZmOhkfmCmG7yZk+F5jq7WNjxtH8R6+J42t1rYgul/i6zIh4htjwvcCvtZ2sEdvmawRYPgs3mUKGlsQX9KIMHw4B76v0pglGb7nrOZSoDvE19Z+lZfpEYjKuEH89Z+6RXuj3kevxHtrzJpByxKf1kT3GUxHWwvfa2wxHQwxwvDFe2tMAR/TGYflrPLAHcV7a0wS8DGd5iynOcTn8PD97+TMFabTcQ82wTnWmLTlK4jp2OUwfPHeGnNLcWxnr1omi6N4D9+TgC/ity1qe0N8Z62sMX//IvJrtW2borYz0xHv4fsZZJI5gzx5JZ+xVoZvjAnnCPgivnAfYfjivTWmgC/iI/cZra14D+fME794tYjfMdy3ivjivcsUZpIzV4Y6LcN9J8MX7+F7Ab/aFt8n5hfVGPu2MHz+bo0p4Iv4UE4ExIdz4BwBX28L5WQcvWLvcI6AXxPqCB5/lTu3PYn31phU8+UcHurEO/6+XIKYxHtrTPoQj4bxe6KcFhBfvHc3poBvqeNhyoD4bkqDcwT82jqFOv6hbhk0ifdwDgn4Czl+IMbfl67+J/HeGpMEfI4f4PajQnzxHs4R8BW35dx+gJv3RoT44r3DtQI+x+f2EUxHvIdzBHyOz+0zDF+8d7h2AfndkwUdf8ftGb54D+cI+Byf22ttxXtrTATfVscmJzzii/dwjoA/puM3TCWHQa/am8R7a0wBn5YFCb0cfzdwQpjEezhHwKeFHb8PyN+P/UP3Y0B83g7nLCf34MM6zUHOJ8OfxHs4R8Cn5UP+6CDn1OLvMIn3cI6AT0J+u0XOkIYv3sM5y77KnBjJ70zth4L47B7OEfCF/A0HOd2ej9IQn9/DOQI+y9+q3Tl1/AtM7H4wcekZdeLBa3OdISx/3/bBKGv4R9YO5wj4LH91jLNvnQIm8R7OEfBpTcsvC3Z2h/ZPxFG8h3NS5V7k7Vj+rp7ZZxT4k3gP5wj4FEx2dvtTzlqrnuG7KA3OWUdsd9uYX2GYvz+ELXMn8R7OyZRbFQrQ/N2WXp/4iXcU7+GcTDl0VcLzt8j5mV7//g8+ifdwjk0mbcl21gv6u8Mp/H/0hQyfsbs7R8BPDfpLm/7ucNDSVzJ8W0w4R8DPNv1Fpju7fXyqLwjx0Rw4xyaTjqfZsv5uz+nLQnzxHs5x6Ir+NaW3tP+c8b/6PKOvzXTE+1s6sGabzGjjf3H+F+vf726b/2734vGvJn9i82MYvi0mnKOypTv8/1Uvvv7y37v8m4wH8cV7OEdlS5QB8fk6nCPgE0UwHWXtTe3YssqWqJHhozlwjk0mUYbhK2vhnG0CPqJDWlvxHs6xySQS8cV7dymobIkYvrLW+N4mk4jhoznPiCGrbIkaQXw0B86xySTayvAn8R7OQXSIMB0na43vVbZEDF9Za3yP6BCB+GiO8b0RPlEyxFfWamsRHaIIpiPea2tVtkQRhs/uje+N8IkyIL6yFs5R2RJFQHzxHs5BdIgymA5LN75X2RJFGD6aY3yP6BBFGD6aY3xvhE+U0dqa3mtrER2iiIiP5mhrER2iCMNHc7S1iA5RhuGjOdpaRIcoAuKL99paRIeoquFP7F5bi+gQYTpojrYW0SFi+LY52lrXKhClQnw0R1uL6BBlQHw0R1uL6BBFMB3xXltro0MUYfjsXluL6BBlQHw0R1tbWX7rimg2iG+bo61FdIgimA6ao601yiSKMHx2r61FdIgyDB/N0dbWJzpGmUQztLbivbYW0SGKiPjsXltrlEmUYfimmHeI2zpmSzS+4Yv34r1RJlEExGf3xpgQPtGwhv9QxOflxphGmUQRTMcU0xgTwieKMHw0xxgT0SGKgPjsXltrlEmUAfFNMY0xIXyiCKYD3mtrxxtlQvhETxg+mmOMCeETRRg+uxfvIXyijNYWvDfGhPCJIiI+eG+MCeETRRg+mmOMCeETRRg+uzfGhPCJMiA+eC/eQ/hEEREfvDfGHFsQPtGdho/mGGOO3tl6rYnuMnx2b4ypsyWKgPjsXrzX2RI1NvxJVyveQ/hEYUxHV+uslWNXRBGGj+YYY0L4RBEQn92L9wyfKALis3vxXmdLlMF0dLWuUugk52yJbmp/4OLivc6WKEAvDrbn465S6GT43mqiqzq9vSCQjrNWOlui7nXtRyK68HLxXmdL1Nru/zMwEF+819kSte5qP30Ds3NXKfSRzpbott2/GD6IL94b6RA11bdxIYgv3hvpEPXU6X/vCMN3lYKRDlHHrvbaroGri/dGOkTt7P7qthDEF+8ZPlE33ZiSO3ol3ltlEvXSbfcC8cV7q0yiCLsH8cV7q0yiRvrzNY+OXon3VplETXT66S0B8b/LRchWmUQd7R7EF+8ZPlELHe/asvF48d4qk2h0u7/vUl8QX7xn+EQRdg/ii/dm+ESD6/5dofvTxHuGTxRh91pb8b6LzPCJ3YP44j3DJ+qqh4Oq+9PE+w5y0JbYvdZWvGf4RC11eupNuYj3NL6cu/qHvXvBaVwJogA6UlCstPe/38lnQAE0EHBs1+ccvRXMi28qt9oN4v6h88vGewQ+dIj77iW+izEFPiQzLXhSOpf4xnuBD43ivnWJb7wX+JAs7g8LH5Wj8Z70XKWDuH9sNjLeI/ChQ9w3LfGN9wIf+sV9zxLfeC/wIZXD056VbnE/y8dyXJaJ6V6Jb7wX+JDdUzOr16tXxnuVDrQsc/5tbTuV+AfZaMKHPGXO8xuJ2XiPwIfiZU63Et94L/Ch83TfqMQ33uvwofd0fy3xWwS+UDThQ/PpvkuJ78+cCHxoP93ffg+7SQGVDgSx8raxeolvvBf4kKXMWf1wSe0S33gv8EHc9yjx3aQg8EHctyjxncUU+CDu35f4xntS8ycOEffdS3zjvcAHcf8p8EuW+G5SEPiQwWnrCtRZTAQ+dIj7iiW+DGzlMIkNxP3DgT+M9wh82Ng+UVWrxPeqlcAHcf9/lQLfWcyGBD7ivuPW1lnMllyXSTK7DqZlSnzjvcAHcf9NBzqM9yTmbgXymPZ/R6hCiT+8aiXwQdy3KPGdxWzMm1fkcIoxlqYv8Z3F7B34jumQIe6jPDDZS3zL2t4cxCe+SCXEbFlLYgIfcd+kxLesxblMQovWQbxY1uKYDqxxMCde5Zy1xLesReATOu4jVhBJ708z3nP7hSpXcDCneIlvvMcxHWxqe5T4zmLyFvi2toj7nwR+thLfWUwc08HBnBYlvotzsLXFpvbXZstabG2h7qY26dbWshZbW1T3PUp8y1psbVHdL3tihmUtSnxYUN0nmkZny1qU+FB3U5utxLesRYmPTe0zRiRtDkp8qFzdJyrxLWtR4qO6b1Hia3NQ4hOxy0m6WIxc4jt6jxKfgPJOoi/aHBJT4qO6r1DiW9ai0yFedZ/7kHjU+9McvUenQ7jqPv0TM1vWotOB2l1O4BLfspaHOZiJLucngT+0OST+/Op00OXk3dpqc/jR51engy4na4mvzUGngy5nxQfG0Xsyj/g6HXQ5GUt8R+/5BZ0Oupx8Jb5b7/ndxCKWWGe4rxlJszYHnQ68U/b4yFGbg7Ut3C1qCw+gAV690uaw4ANsxMeiNk+J7+g91rZY1LYo8bU5GPGxqO1R4mtzWPwb1YiPRW2GEl+bwzM+waKK5YvaLsPnbiW+ixR4zidYp4Ph/uHHZdbmkLuVFFgY7kNvbbU5GPEx3Lco8bU5GPEJMNw3fMd/+/vTtDkY8THc7/O0DG0ORnwM90p8bQ4ZhhZn8THcPzoeaXMw4uNYjhJfm4MRH8O9Et+9OQSaWuxtecBJx7BVie9fGiM+9rQtSnxtDkZ8DPcRnhVtDvnHFpGG4T5Cie8vlKPUwZ42yqOybonvuxWlDqqcFiW+NoeN5halDqqcfUt8L9ai1EGVEyvwhzYHpQ6qHCW+o5godVDlFDJrc1DqoMrp4ejFWpQ6qHKU+NocEo0uAk+Vw7c/hYejmCh1kPZKfC/WIvFR3CvxHcVEjY/ivm2Jr81h7+FF4ndLe0PmTiW+o5gESHwRqLhngxLfzyrU+GyY9or7/Up8//ZIfKxpU5T4ynvqfJolfv201yfsWOI7ikmoxLe4dSiHrwJ/dhQTiY+0V+Ir70n3eZb4jmCyQomvvEfiI+2TBf5wFBOJj7RX4ivvkfhI+0Jm5T0SH2nf5OlwjwISH2mvxFfeI/GR9pVK/KG8p9wYI/Gdt2dpia+8R+Ij7VuU+Mp7EiW+e3XScU/OJk+G8p6KXaXEz8SNx5s9GEN5j8RH2vcwK+8pmfgO6ziSwydH1+ZQtK6U+NKej0+FO++p+tlW61jS8uGX71DeU7bWkatqe949E7PynrqNpVpHkcO9WXmPWgdFTpMnwotWqHXYoMgx2kcI/OFFK0p/wtU6ihzeJqBhV0vtj7haZ+8drQEyjtmuluLsbo32vD4MdrWUr3UM+Y5fcnsWhhetEPk8OeyN9kEbzqG8p8HnXK+jx+HPXYnvfxKGfKxoazsq72nyURf5a79YZWqMP/iIe/Q66HGaPATDrhaRz5Kw1+PkMftmptEvWpGvtAfaRL4qX9gDfSLflC/sAcUOwh4Q+VjQAiJf2ANEdvAqlstxgD5jvv3tI5W9sAc0O1ocgEzNjpP5BnugT+Zr8z829gZ7QLVTv8Qx2AMNqp1JiQMg82U9gMzX4QBkzfwmff4k6wEu53am2lnvHA7A3aB/MtYDCP2cUW+sB/g69CdRDyD0Yx/BUeAAFE99Qz1A8dSfTpIe4JmpHy72p8tIr70BWC/2987960Qv6AG2yv3jaZq2jvlzzqtuAHYL/svIP61W2txSXswDhIn+1+w/h/+0JOHPEX/OeCEPkCX+L18AL9fvgOPp8jXwz3T979XxEu2XcH+R7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/2Tu7LclxFAgbONz5/Z93d6d/TtZsV6fTAhTgiJ7rGiPQRwg7bYqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiwmU/xZWYk0wuBEVRv6jgLqKqen6VqqqIuBMYjQjvIt8nk7mkqOeCXkT1vCBVISkaJPO8lExhMinqr67JRURUVV8kIiLuZi3pcI30X0ExmBM/UqxfrfHvPEMbY3PRk8mkQDfVH3eViLijleBlB9zpsHwLDy+cGIYJ9+uHHDxG2louyXxq++gAoQpvGeAGZ+Ul1v+S+JSivJniQcnUzGjEO/67vPrI/7ZRyOTOaXOn9bDVfYTqm0JgP8Pm32vnQBk2D8tlXv8+O0ovBqfQUXg/cKrWOykLY6KCuWCT6H3R1eVbTIp3JtijYZMTC3n/HN571K6ybiAAZH54ZG0HOx66ErrD5rukYC5ho5H3z+B9LF5qqJmERATm5wDiZ3StYK89OFkdQ9aJbTTvT/I+D5zZ0PTUbr0V+Z5sRLpM8vPWoW6yZZLMOiHv6e8BXHKqj8reRTun3VJQlg2In53ikiWoqNNTyHvyHsNK5gwPvCpxG5AvRbEpNvErUpye3RLaxxKfvB/M+xr3YV1pv2GwUxkbrscv42TqvYyyKCKJz/n9WN73dMle3qTrbu9VxybPpn1u15PiKnXynv4ehC1hxPc9KSuZ65hOqzF82qcRf0OhhhQpeT+S96Idi7GeBYUmX+Z2MvQMy4TWHRMHeT+Q96ItySJ785FKfN9Wi/J02scvgvRlBuf343i/DS1rj4TY/u6cdu/WdrYyGIs/ZBF8Z6GuPnZFfz+M91urccEiC0Zl+bicoFj83YsQ9YCqtMYGeT+K99a0Gg0mVQnEl4lBNUywzIhDyHvyHsYk37JRDlVdNo502y2+DMksRKGudG/O7+fwHsQkS1MahIylYFvZzt/bOozxkgltayUM+vsxvIeh5of+wwDTJOOSshH4SO18ZRWAClXI+4fz3rUpLk0HZ0fnFlzLwlxZhRFDR/J+xvYDG4lcL0dDTVKAH0aLTR5u7pdWQUbgYzTvsaMI5D0gNC9GZ8AJWsWjt904cULs5rc6uczgB/39AN57W1o6dp3ZtKzomC8/FW897brDyPtxvJe2tPQZddYoK6XAF9jMfohK0KGjkPfP4z3sAPz9czo2o8x6sc6I+083H+49JvL+afN717Z5Mux+vGSFZXrdNfYhY3B/A/j09733nTcG5mDc6/jCexDuJ51ByfvW204aAxM7O+dY3JcAH/rOjIzB/cfAJ+8777rOuBfsGhs6zFkPjrjvDPzRvJ/uspD72Tvc+9zkCP4OSgY+9Ap8hnsdQ0P6+968t864t7m5kQ5byIj7Ibj/DPjkfVfet8Y9eGpkOu5Tn8Ofg/tDWyRTyPvxvO+Nez/nMKHVnOreFIC4nwL80bzHjsKfi3vsY/ITcJ8H/EG4lzbJdPJ+tL/HBqa13kgrILRGuyjnbZlznsxphPvrMCHvW/K+tbuf9QuWdrf3UoE/CPfeiolG3s/lfW93j92tpj4gGz1RJO6buSzO77vutt7uvvU7IMYMAD4xhTPGWTL4qHYZivT3/XgvzRGC/IY3m2pu4w8zzRgpo49qVwMk79vxvjvurfflj7hXexOCjfebDD+qXQQKed+N99Au0npnxabSrgT4MidOb8lFezjv+7fjZi7SegfgU2mX1eKm4t7OqVykv+9FF+gRqfXGwhLuezrCwBE+8gLIE45ql+Ik73vhpT3ucSNYGm00dYRxEx1kIyIP6d0XmELet+J9/0+C+kzu6TmXEd0XQB7Tu9+TcTTvx+0zZONh5R1LVX7IxeV/UtUyKIwY3sdNdIAXQB7Uu98GS3/fiffaP5qYAhD/tr2Yu4jWQi/HEaqKiLubm/s/USkGEFsZEcFoXaoi/juZkpZMI+/H8F76B7NORpVLJwnzT3aUgg0zVMS/DWvX0WzjTtN/VIL7+N79rTsxiU+mkvdTeJ9uou7vKi9qWRdh/ykdFcrdvg3SZc9+KjciqiJuL6th9uExR3e3LnmzNSwa+X9vcHJLGlbZ91QzO7h7dRdl243Hi5n84kA+Hol4zW7SO7cWLzB/9WNPkTtW/dLFxCJfoPrd+5ndcfWUI3tjEb9WoaHIT/lyWcQlSvJXk5f2ofoBJslBvS27409OKnsy8vdAVnEfmJgPtkSoMYQbZ3nIAujOWPSDZmMC07yzGqFaOiEVbtGgTNSl4cgF5ntJEIsZ+QsdFgvRdtA+zHQFLK5sKMtf/2sNjioslk/dSSDxk5yqIXahIN7DmftwE/VBPb5Bvpdsp4B6+WZLreZaNtE+lPiG0O+uj0Au9XHdF8uds2gY8bO+VGnguD8m4V52Wah3XPGSKILq5Q9xrOY66Nx197gr2xkRWZm3RrzfFKfui+VmtUb9RjkLXw7XgmIsMd4wJ9RE3bvt+Y2P8mYZ+beL8l1FFnVvIggSvrnfLWX5T9ZYt+2yhUm1727eSbXuyLxXPNxH3ka6v7N1OZEQBfzauZYbScgOXXtyQbYyAuMewv8RX7etpO/f6GgGX6EhCWjvfT/t/0j8T/8aSP3+jkN21VjsSGnjRURV5vLDel/PObcIE2Hvlx9DkZ3NO2n/FhG1/t4Vur1fBqcs/bm7GyqhgWpMHToAIWLqQ3dWZsjTzy9tT3ehFuTdFI7FIUemJOA4x0E81L82RdUvhFPsgeupCKCNKbcAVNm+yoxKsCytqYEEYihFFVZmB3nf6p7gn8vRj868Pw4PWAs41BUzAmzc/KM2ddcSOsx+d/K+7/g+xEQF/r7N75aUQBUvAmUFqEhsT2XG/vDS7xs2IMjKlubdnfdTHs9RKA/100YVfq7FUHFvOLgPYK9sqcxoe2Wyi7EWGQTQxdDft7P34W8Dcj/I+2VECFad7KhMnLObQhFWwNoo5/eN7L1aaz7CznMUa096NSN0EO4dLBKs9kN/32dogNPB5ByRkSBECMr63q2T9coEOrkpWuNStOri/L6HvcfBpczISExmFGeBb+J3deagSIM6uHOK4ZUX/T18IULFI/1tYJi9zYGdVpbKIHe/2LsEr75SVpfze/BCxGpfMiCGqMzkwG7RFJZOvKG6uMJ56dUFFvK+I1wWxzk6gpCQBl8R2/AaI7ywMqHuwhtk55K65s35PYZ8EO7vB6OAwDfMvEhVF7JBuF9btbxQFOyy6O+xhwZgs6mFDybgAV/AvFcII3pPvPcsWmIoBrbEnN9jnlFA5yAL5YsHfAU1t1bkCXWQETHUTQZmKujvocc5aD9UskHBGCztpMQT2iDcLy2ZAzIs68o4v0ceGuA91rI2ArApmUkORCs8oUwyIgrbuhxq/9PfAwNy3oudZUYo2WF4RSvSSUYEuHVBtSLO74HHORO/0yUTEGHAy3x1gW2SEXHgWAyp0OjvnzpX3DCegprqOHLPKuDXqMoUZFMlQAvN+f1T54obziu/I3MiIq9u+o+zKperYJcZ0ErT3z/nLLf9fsRrjrwvIirqy9M94aTKNCAHjd2NOL9HNZGg7xDW85yBfHDcZbcjn1SZjmzvl9qRkfed6lGn2fuIAf7Lbts3yzdsRCyss2bncVJRCjgG/FG8bz/4HmfvYwb4X5Dv1gsRDl46mowgwMpU8N6F04/o7x9ykEMb4O9mvqDbW8ktnUn2/oDvXTCHSc7vMc0wqr0PHui8JE1r5/mKnpn7tXNlHW1SZVrqUo1yFxN5f6rGSurTDGvvwwc6X41+GfTxnz1PJbJPqkxHoSn+ck+c38djqNxE6oGr9NWugL7BI+K+WdDdf7zNkVPwN40/iffanPf4JhJnoFMLfcfnXeol6qTKbBAMyviQvE/c4z7JRAVYY6D7uA0s4X23sPlv9+F93WzKyXvyvuHd2jKD/2L0DSkGG4ExG1WZDWyVgVwj5/eJa34bKg7Neytffw33+bdZ2qGvvi8fn1SZLZoXSMHR3yfyXvF9R5u0BD+u2WHSlng8lAbtLn+dnLwn7wF4L+C8t115iBvtdLCEhsf7We9srXy0FGSASN4nVvnMcU71BD8D+dYiNXl+YZQTaXFYATmEcH6fx3vrUIf3ItvZiCMmOy0sYeI8UCc5kR6HFfJ+ur/3FnVYy0sQl+8tWnEeyEY5kR6HFYwJInmPx3vB5/3Gic6vnDgmSXsMKkY5kR68V/J+OO9lMO8NIDULJr8H79NOIUbelw+nMEqO83s83vvRAfgQifHizSc91tiSGgmmEznJe/p7AN7fvfqjhfxsTPwmz6eg8d5H8d7Ie/J+P++1B+/3j/AXiD+c956Uulm87+GPyHvynsBfJH6T5xEVjPeQX2Uw8p7zewTeD75dC9WObxCfvJ8zaWzCe4zLpL8n7/s7/I+f1SHv55w8mzxsRN6T9915bzjA/2zZHs77UZNGJ+/JewDeWw+mTHH4p1p+YdkM3gt5Xx8NeT97fv8I3iMB/wOL34T3WT8ToL8n7+nvyfvK7bbV4j/c35P35D15T97fi1P7AZ/z+zl3lsh78h6B9/4Q3mPNdDy1sOjvAf0G79dyft+Y99aO94cDWXzZCVLynrwn7znPme3v+z2YSd6T9/y9FXnPec4Aiy/kPXkPx3u+T4H+fhDvoX5sm1ZYQ96XRt6T95zfk/dThjqS1ZuGvA951pv8slYJww7R3w/nvRwHiZ8M/Id/72TU+9L4vRPynrx/OPG9w+bLGgGcx6N4P/t7hvx+bRPeH0/kPQzxjbyPD99G8Z7fK+f8HoD3enSXKHrO0kjaYwQw6/tW5D39PXm/VQBPZ0oK760DItJ4j3n07HFYO8n74byf/b3yt2Od3cnzjDuh3oH3bxHh5H31RnOMiiPv8Xhvxwy54GbtbEA8O9F4r7N4b8+7SM7v8XjvxxhtnetIQmVVEs/TeN/kJ0q9rHOLQwj9fd4mnzUl7efyNaOyOiDiPcfOSVYk7xyEYF3J++m812OYfNMsXxIqq3AGkHiN5ygr0uCwZiDXSN7j8f48BmoL8xNyI/gYO/M2FqYVadC8HaTeOL/Pq/IWc8XKc7dUM1/ic6P4iNBEQs7iveNf4qN439vft5grVjO/1OdrfG7qiCeJ5SqjrEiDw9oJsuDkfaKn6/AQyKbZTlFmHX4DJiBCRhCy4iR04l+hkffveamx/2l1u7JjvKwE+v9p74yy41ZCICrg8Kf9r/fl2XESO44tqQEKGi3AFk1xKZBmhuAHbAdEaAdCwhxV7gRyHjvxvrgH4VYuqiT08SvQ/gYvuAWBJyTMKJR7g7wV7xnijCA3sLPeWcMToRPPFxFnK2kyePNWmIbUkfdUnvdd39D52umHLnQEnHjke3/PDxtx14heaAxzf+Pvt2jrZYx+3ELnxCYe+2qHWklTsZu34Ght9veQM/kOT2xjmC9JQE0j2DVLqA4dNHE6PGEMtK3UzNvR+PvCJq3tbscQ+WTvcCOaMTvzWM5W0mRkg4901rO/x9wr7mvw32y+N+8VmXgLN3cRYGcrgw9daAs3p8P7Sv5ezzH4zw/PxOWzB/EEU/h3hMOtpOnfH1Psvb3QZn+/TaoLXha7/IrEU3/dUC9pnkAe2k5n9r1o/H1xnzYm/ymcgInHHv3NzooAvoPPsNGs9G4a3tciJQP7jiKXLBJf6xGPIhBxtpImwUaDhYDx97DNnYf1Fh5fyzVjCUHx0gNxPFfgMgImN6Lz2Iz35TchSzKcjY6v4SVQRnAIIpaix/MijFloaAAYf48rw9noWMxJVK0ZU8xtLUWPJ03CjAat/md/DyxDnnd01rf4XKwZh3F47bkImjQFMpq1T5Ecw/tq/n5NhrPCXz9I9qpGQdL8g8Jcix7OizBgoenSEdN2vG+w92a4lG+20uFazThOL2vRw3kRwiu0xRPW7Xhf398vynBW+MskZDe4cnG5cCvgA8IVT16zv0e1pUWAr4R+kuyXHEJTC0f2FrThk9EKjQGPd/w9uAyxga/nyeA/4M32f9KtJDX2fs5WwF89PJCvmvd9PjT7e/CFDjTwJfS8Hbo/lsVdJdYZLU2sSmMowGJOT+PvwfeKyMB/e0ky6F0NsleDIBFPo29m+R86lZrkENZUxqA2b/b38LbDKfVihvuoIycHNQBZ3HX6Srw0PVo9Pf2j8Qfopys+hvc1XxxYr2MPnCqTZXYitvgevFeY3GSYbYMflTFP/IuLkBzImjkrUI83+/saBt8+JF3/ox/CItAfASF3i4thCB8h4jzRtPnzy/EeiUlODMwKiqjG32dcFj/Nxx4Pk8g2KoJUg7pPXxa5MfAEnCRNU23S0t8kiO6liAZveB93WRSV5YD3y3+QrXB8lzrqc24MkBvJugk5obT55zlIUjjL3UvPnN49vO9k8A1tlBrYCAra5q6DWQLKc9GO2bjsRGkaaZOW/ySldy+T1u03Knfc3zf77j7X5SItt4wo4j8t5YhVylLYNoR4KA4raRoQ6q81iGSFs9C99Mzr3bv6e7xvGTNyURYwJYuz+lLV7HL86lY6agQ8SdUGJ0tzVZufdT1JC4fsggB6Oacr7+EWOmYuanVwVpPDUi/2OUCZ3FRmAgm1+ueSLk2HGUfSwnkUi5mtO4b3Y/DXiU9soi7xd3t256eRyKMs2i8o3lCaT0e7fx+D5IVzW8F2B6m78h7xxIIjMWOpENuw4urQSmZJWMGixCLvzmRDbPd/BUOaD0Y7+fIY7sfFKXUmlo7u2JX3HIvEGgb/kY9SshLYjR0lmyB/qZQYtRurqSJWBlq1Bf7JdB3S8m0rl9RwLgpY2fKfyvC+vsNn46qiW+aD7XDBN4tfE2l/NTJj5LHKd7C3lQNDSfMq8uXSKWhuON8KWNT4/FyX0W15j2bx9bSvKr1SVZfYwp4p4eePbzXo1wPYnnj/SI5Ys37d3DhI839sfQnKG6dwNzg5SyfT92WTpvv7tzw5X+p/0g+VeFeO7BzFA59vYpzSGPESNBOpqoqIqCoRsQ9aoZaN7wvwoz5FlZhduxl5xUI/c/maTPZJpm7Mez6xL061Hb+pon9X1V22sH8pfVL9Bp3KhoR01r2WHaE41xn/NF7MHIJALpxM51cLh/dhlabeRcVLRcVBVGQiVfmC9GronHQHRqw7Qu0VodTNpfdHh4b3cdnh6sGYYuGtPympki61Kov81GUE5WEAFfh1pzXdmve9urEUj0Zbo1CLEsLEEQr34mDVac39g6Lj7wNrTUuHUxCIsgEjbN7Whk+utrJWSduc4X1sfirHU7CEqJfHdXWE8CsQ7dW/HHv38B6mH9cNqCIN9WjPCN6m1m5ms+IKH/Y3oGd//7DatGxEvAELtX+Ilccb7dW/3Ea18fc45VYV+BV3HYlfrlhxAYDf7bRX//Lr3cN7mBRRSdlVxD01FJzrAqAZ8ItNayzD+4a8x0fKJ8Ir+T7zox+8LgV8woDBAB+vd8/+HoX3Ug/4JXFPTT2u576Xe1Gxkm6Dvt1x/H34yg3/xcYPwC+J+6fbUG0f4UbArzOtRf0i3/A+vuTwkfIO+Ju9ylylu7nse2WA3xr3w/sMi1UK+DVxT+ElUaah7QT8Is9j+Bjed93f10DKL+DX/GQ6J9REB9wP8Hvjfvx9TqLKAL/oF5FIa9mdnp+8L5DxZsAPxP3wPilTVYBf80vEtLnuXN/m6ObwB/fD+/xUFQG+7PJJq1LC8315b4Cfsjkd3rfd31dy+LQh7sGB7/2u9gC/K+7H3+eNYgXe0nm9z2IWn7tLz/+jOfDAv/lN14P74X0+WuB//kTKfWzFsIJoX9zDp1y79C8+juH9LrwHB37Nd/DtDBM1j6/suvHBEYACn47h/S77e/S5mQp+bsUWh7Qx7oGB/+wIeHA//j59HMPl6MeRucYW3xaH2k9w9adPatO/EnA/vM8uP9Ctwd8bUqHdcI/3oC+WEJBmRNtUmh7D+/14j7k1+Nzw7ZAOZORRETqANnRtE8ns7wsDBg+jVPMBM/VGHicYQm2VYaDuzccxvN/S38PNzV86D+CljvZGXo4hRNKmwQmgREPH8H5b3mNRlGo+YfZzvxgRVyME6AlQb60O72tMZTAUvSBFyDW+q/ulnQkBkm+rBANUWtLqfvb3SFs4DBtFhQgQ6H61j86KalP7RKMFUzn+3rwOtZLxwCK+v2HKfRlVj+QrO90kbaLJNPfDeyjflWw87u0MgIhPvZFHcuRf1AqRedFozTwO7z3m7NTdIpW62wTDlAMJ1gPjymKkywEkaTe/dc/+HmqvmuYiHylR9nqQmQEJOmCuFEa65Zd4y9Y9/h7sORpxFdq/Ej83RcEVFN2OIVY5iW7ElZC0H+2H93C8Txic16iSuMiv8/2CFR/tpSfbm5Ch4ynIoDa8h+N9MPHXPWSSyadSFVN3cZ9E/IjZJoz4MIPa7O8BeR+31WEjaGr0UMKJfikiOaC0D4NkFCBbBTP+virvY3yUKVQikZ9NQ2/ikxzQl3P8oen1Jj4TVOaG95i89weoPVSCkI9AQ8d2zOi0d051fPiO7QttThvew/LeVYheOlR364tSQE5PLYAXOREtLym9Tu0Lr3PP/h6Z905U8XWQUq9LoVCihLX/I9PGyE9Nr3n7guzc4++xeW9vmUOY4mDzmRDrxxD5xWBvnGmA9FoaFdQxbXgPz3tLJUYyRYh5BxaaEK8m7K3UCRO9ycSC6UyG93V4b4IVJpX4+lmGPhdAoSwlB5kP15n/9ATgol9rX4StVqVHV1Q3Ar80PFtch/XvRPaI+px72wHMZ2rA+nd57pHeR+2rklrnqsQVrogUecE+XyRBzdqRy8jjXqj/8wi+be9F0quXK40H9XO5g+VrNTJqVYnq61TJHy8iIu1QOPqaHf4sKdwkxu/zLKr6fn+gqiLlKu3Vp+ydzLmA6PmuqvSlquZgYKj365rDaJFMnWTO1fT6D36SAVLolYi6AAAAAElFTkSuQmCC";

const SUPABASE_URL = "https://ibijrfdhlgfhlgecltuw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaWpyZmRobGdmaGxnZWNsdHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDMxODUsImV4cCI6MjA5ODIxOTE4NX0.nUKeVQ2YiSv7gfeJKfO6bn_AUh4Y7cG5iMKO4cIN5iM";
const MOT_DE_PASSE_COMMUN = "AggloBrive2026#";

async function verifierSalarie(code) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/salaries?code=eq.${encodeURIComponent(code)}&select=code,nom,prenom`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  );
  if (!res.ok) throw new Error("Erreur réseau");
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}

// ─── API Supabase ──────────────────────────────────────────────────────────
const H = { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, Prefer: "return=representation" };

async function api(path, method = "GET", body = null) {
  const opts = { method, headers: H };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(SUPABASE_URL + path, opts);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error ${res.status}: ${errText}`);
  }
  if (method === "DELETE") return null;
  const text = await res.text();
  if (!text || text.trim() === "") return null;
  return JSON.parse(text);
}

// Communes
async function fetchCommunes() {
  return api("/rest/v1/communes?select=id,nom,batiments(count)&order=nom.asc");
}
async function addCommuneDB(nom) { return api("/rest/v1/communes", "POST", { nom }); }
async function deleteCommuneDB(id) { return api(`/rest/v1/communes?id=eq.${id}`, "DELETE"); }

// Bâtiments
async function fetchBatiments(communeId) {
  return api(`/rest/v1/batiments?commune_id=eq.${communeId}&select=id,nom,expanded,ordre&order=ordre.asc`);
}
async function addBatimentDB(communeId, nom) {
  return api("/rest/v1/batiments", "POST", { commune_id: communeId, nom, expanded: true, ordre: 0 });
}
async function deleteBatimentDB(id) { return api(`/rest/v1/batiments?id=eq.${id}`, "DELETE"); }
async function updateBatimentDB(id, data) { return api(`/rest/v1/batiments?id=eq.${id}`, "PATCH", data); }

// Missions
async function fetchMissions(batimentId) {
  return api(`/rest/v1/missions?batiment_id=eq.${batimentId}&select=*&order=id.asc`);
}
async function addMissionsDB(batimentId, missions) {
  const rows = missions.map(m => ({
    batiment_id: batimentId,
    code: m.code,
    label: m.label,
    un_prevu: "",
    un_propose: "",
    realise: false,
    intervenant: "",
    commentaires: ""
  }));
  return api("/rest/v1/missions", "POST", rows);
}
async function updateMissionDB(id, data) { return api(`/rest/v1/missions?id=eq.${id}`, "PATCH", data); }
async function deleteMissionDB(id) { return api(`/rest/v1/missions?id=eq.${id}`, "DELETE"); }
async function addOneMissionDB(batimentId, m) {
  return api("/rest/v1/missions", "POST", { batiment_id: batimentId, code: m.code, label: m.label, un_prevu: "", un_propose: "", realise: false, intervenant: "", commentaires: "" });
}

// ─── Notification ─────────────────────────────────────────────────────────
const CODES_EXCLUS = ["11630"]; // codes qui ne déclenchent pas de notification

async function envoyerNotification(user, actions) {
  if (CODES_EXCLUS.includes(String(user.code))) return;
  if (!actions || actions.length === 0) return;
  try {
    const actionsHtml = actions.map(a => `<li style="margin-bottom:6px;color:#475569">${a}</li>`).join("");
    const body = {
      p_user_code: String(user.code),
      p_user_nom: user.nom,
      p_user_prenom: user.prenom,
      p_actions: `<ul style="padding-left:20px;margin:0">${actionsHtml}</ul>`
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/notify_activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Notification error:", err);
    }
  } catch(e) { console.error("Notification error:", e); }
}

const MISSIONS_DEF = [
  { code: "HGAB", label: "VP Elec" },
  { code: "HKDB", label: "GAZ ERP" },
  { code: "HKDC", label: "GC ERP" },
  { code: "HBBC", label: "TR SSI" },
  { code: "HHCB", label: "ASCENSEUR" },
  { code: "HHCE+HHCF", label: "ASCENSEUR QUINQUÉNAL" },
  { code: "HHCH", label: "PORTES" },
];

const missionColors = {
  "HGAB":"#dbeafe","HKDB":"#fef9c3","HKDC":"#fef9c3",
  "HBBC":"#fef9c3","HHCB":"#dbeafe","HHCE+HHCF":"#dbeafe","HHCH":"#dbeafe",
};

const th = { padding:"10px 14px", textAlign:"left", fontWeight:600, fontSize:12, color:"#475569", borderBottom:"1px solid #e2e8f0", whiteSpace:"nowrap" };
const td = { padding:"8px 14px", borderBottom:"1px solid #f1f5f9", verticalAlign:"middle" };
const inputStyle = { padding:"6px 10px", borderRadius:6, border:"1px solid #e2e8f0", fontSize:13, width:70, outline:"none", textAlign:"center", background:"#f8fafc" };

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DE CONNEXION
// ══════════════════════════════════════════════════════════════════════════════
function LoginPage({ onLogin }) {
  const [code, setCode] = useState("");
  const [mdp, setMdp] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [showMdp, setShowMdp] = useState(false);
  const handleLogin = async () => {
    setErreur("");
    if (!code.trim() || !mdp.trim()) { setErreur("Veuillez remplir les deux champs."); return; }
    if (mdp !== MOT_DE_PASSE_COMMUN) { setErreur("Mot de passe incorrect."); return; }
    setLoading(true);
    try {
      const salarie = await verifierSalarie(code.trim());
      if (!salarie) setErreur("Code salarié non reconnu.");
      else onLogin(salarie);
    } catch { setErreur("Erreur de connexion. Vérifiez votre réseau."); }
    finally { setLoading(false); }
  };
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg, #0f2240 0%, #1e3a5f 60%, #2563eb 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ width:"100%", maxWidth:420, padding:"0 20px" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <img src={SOCOTEC_LOGO} alt="Socotec" style={{ width:140, margin:"0 auto 16px", display:"block" }} />
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12, letterSpacing:3, textTransform:"uppercase", marginBottom:6 }}>Agglomération de Brive</div>
          <h1 style={{ color:"white", margin:0, fontSize:24, fontWeight:700 }}>MISSION AGGLO 2026 - 2029</h1>
          <div style={{ color:"#60a5fa", fontSize:14, marginTop:4 }}>SOCOTEC BRIVE</div>
        </div>
        <div style={{ background:"white", borderRadius:16, padding:"32px 28px", boxShadow:"0 24px 64px rgba(0,0,0,0.35)" }}>
          <h2 style={{ margin:"0 0 24px", fontSize:17, color:"#1e3a5f", fontWeight:700, textAlign:"center" }}>Connexion</h2>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#475569", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Code salarié</label>
            <input type="text" value={code} onChange={(e)=>setCode(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&handleLogin()} placeholder="Ex : 11630"
              style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:"1.5px solid #e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box" }}
              onFocus={(e)=>e.target.style.borderColor="#2563eb"} onBlur={(e)=>e.target.style.borderColor="#e2e8f0"} />
          </div>
          <div style={{ marginBottom:24 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#475569", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Mot de passe</label>
            <div style={{ position:"relative" }}>
              <input type={showMdp?"text":"password"} value={mdp} onChange={(e)=>setMdp(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&handleLogin()} placeholder="Mot de passe commun"
                style={{ width:"100%", padding:"11px 44px 11px 14px", borderRadius:8, border:"1.5px solid #e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box" }}
                onFocus={(e)=>e.target.style.borderColor="#2563eb"} onBlur={(e)=>e.target.style.borderColor="#e2e8f0"} />
              <button onClick={()=>setShowMdp(!showMdp)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:16 }}>{showMdp?"🙈":"👁️"}</button>
            </div>
          </div>
          {erreur && <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", marginBottom:16, color:"#dc2626", fontSize:13, display:"flex", alignItems:"center", gap:8 }}>⚠️ {erreur}</div>}
          <button onClick={handleLogin} disabled={loading}
            style={{ width:"100%", padding:"13px", borderRadius:8, border:"none", background:loading?"#93c5fd":"linear-gradient(135deg, #1e3a5f, #2563eb)", color:"white", fontWeight:700, fontSize:15, cursor:loading?"not-allowed":"pointer" }}>
            {loading?"Vérification...":"Se connecter →"}
          </button>
        </div>
        <div style={{ textAlign:"center", marginTop:20, color:"rgba(255,255,255,0.35)", fontSize:12 }}>Accès réservé au personnel autorisé</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE CHOIX DE LA COMMUNE
// ══════════════════════════════════════════════════════════════════════════════
function CommunePage({ user, onSelectCommune, onLogout, logAction }) {
  const [communes, setCommunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCommune, setNewCommune] = useState("");
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCommunes()
      .then(data => { setCommunes(data); setLoading(false); })
      .catch(()=>setLoading(false));
  }, []);

  const addCommune = async () => {
    if (!newCommune.trim()) return;
    try {
      const res = await addCommuneDB(newCommune.trim());
      const created = Array.isArray(res) ? res[0] : res;
      setCommunes(prev => [...prev, created].sort((a,b)=>a.nom.localeCompare(b.nom,"fr")));
      setNewCommune("");
      logAction(`Ajout de la commune : <strong>${newCommune.trim()}</strong>`);
    } catch(e) { alert("Erreur lors de l'ajout : " + e.message); }
  };

  const deleteCommune = async (id) => {
    try {
      await deleteCommuneDB(id);
      const nomCommune = confirmDelete?.nom || id;
      setCommunes(prev => prev.filter(c => c.id !== id));
      setConfirmDelete(null);
      logAction(`Suppression de la commune : <strong>${nomCommune}</strong>`);
    } catch(e) { alert("Erreur lors de la suppression : " + e.message); }
  };

  const filtered = search.trim() ? communes.filter(c => c.nom.toLowerCase().includes(search.trim().toLowerCase())) : communes;

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background:"linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding:"20px 32px", color:"white", boxShadow:"0 4px 20px rgba(37,99,235,0.3)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <img src={SOCOTEC_LOGO} alt="Socotec" style={{ height:48 }} />
            <div>
              <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", opacity:0.7, marginBottom:4 }}>Agglomération de Brive</div>
              <h1 style={{ margin:0, fontSize:22, fontWeight:700 }}>MISSION AGGLO – BRIVE 2026</h1>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"6px 14px", fontSize:13, color:"white", display:"flex", alignItems:"center", gap:8 }}>
              <span>👤</span><span style={{ fontWeight:600 }}>{user.prenom} {user.nom}</span>
              <span style={{ color:"rgba(255,255,255,0.45)", fontSize:11 }}>#{user.code}</span>
            </div>
            <button onClick={onLogout} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.25)", background:"transparent", color:"rgba(255,255,255,0.7)", fontSize:12, cursor:"pointer", fontWeight:600 }}>Déconnexion</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px" }}>
        <h2 style={{ color:"#1e3a5f", fontSize:20, fontWeight:700, marginBottom:8 }}>Choisir une commune</h2>
        <p style={{ color:"#64748b", fontSize:14, marginBottom:24 }}>Sélectionnez la commune pour accéder à la saisie des bâtiments.</p>
        {loading ? (
          <div style={{ textAlign:"center", padding:48, color:"#64748b" }}>⏳ Chargement des communes...</div>
        ) : (<>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, background:"white", borderRadius:10, padding:"10px 16px", border:"1px solid #e2e8f0", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", maxWidth:500 }}>
            <span style={{ fontSize:18, color:"#94a3b8" }}>🔍</span>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Rechercher une commune..."
              style={{ flex:1, border:"none", outline:"none", fontSize:14, color:"#1e3a5f", background:"transparent" }} />
            {search && <button onClick={()=>setSearch("")} style={{ background:"#f1f5f9", border:"none", borderRadius:6, padding:"4px 10px", cursor:"pointer", color:"#64748b", fontSize:12, fontWeight:600 }}>✕</button>}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16, marginBottom:32 }}>
            {filtered.map((commune) => (
              <div key={commune.id} style={{ position:"relative" }}>
                <button onClick={()=>onSelectCommune(commune)}
                  style={{ width:"100%", background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:"20px 16px 16px", cursor:"pointer", textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", transition:"all 0.2s", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.boxShadow="0 4px 16px rgba(37,99,235,0.2)"; e.currentTarget.style.borderColor="#2563eb"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.transform="translateY(0)"; }}>
                  <span style={{ fontSize:32 }}>🏘️</span>
                  <span style={{ fontWeight:700, color:"#1e3a5f", fontSize:14, lineHeight:1.3 }}>{commune.nom}</span>
                  <span style={{
                    background: commune.batiments?.[0]?.count > 0 ? "#dbeafe" : "#f1f5f9",
                    color: commune.batiments?.[0]?.count > 0 ? "#1e3a5f" : "#94a3b8",
                    fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, marginTop:2
                  }}>
                    {commune.batiments?.[0]?.count || 0} bâtiment{(commune.batiments?.[0]?.count || 0) !== 1 ? "s" : ""}
                  </span>
                </button>
                <button onClick={()=>setConfirmDelete(commune)} title="Supprimer cette commune"
                  style={{ position:"absolute", top:8, right:8, background:"rgba(239,68,68,0.1)", border:"none", borderRadius:6, color:"#ef4444", fontSize:13, fontWeight:700, cursor:"pointer", padding:"3px 7px", lineHeight:1 }}
                  onMouseEnter={(e)=>e.currentTarget.style.background="rgba(239,68,68,0.25)"}
                  onMouseLeave={(e)=>e.currentTarget.style.background="rgba(239,68,68,0.1)"}>✕</button>
              </div>
            ))}
          </div>
          <div style={{ background:"white", borderRadius:12, padding:"16px 20px", border:"2px dashed #cbd5e1", display:"flex", gap:12, alignItems:"center", maxWidth:500 }}>
            <input type="text" value={newCommune} onChange={(e)=>setNewCommune(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&addCommune()} placeholder="Nom de la nouvelle commune..."
              style={{ flex:1, padding:"10px 14px", borderRadius:8, border:"1px solid #cbd5e1", fontSize:14, outline:"none" }} />
            <button onClick={addCommune} style={{ background:"#2563eb", color:"white", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, fontSize:14, cursor:"pointer", whiteSpace:"nowrap" }}>+ Ajouter</button>
          </div>
        </>)}
      </div>
      {confirmDelete && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(2px)" }}>
          <div style={{ background:"white", borderRadius:14, padding:"28px 32px", maxWidth:420, width:"90%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🗑️</div>
            <h2 style={{ margin:"0 0 8px", fontSize:18, color:"#1e3a5f", fontWeight:700 }}>Supprimer la commune ?</h2>
            <p style={{ color:"#64748b", fontSize:14, margin:"0 0 24px", lineHeight:1.5 }}>Vous allez supprimer <strong style={{ color:"#1e3a5f" }}>{confirmDelete.nom}</strong> et tous ses bâtiments. Cette action est irréversible.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button onClick={()=>setConfirmDelete(null)} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", color:"#475569", fontWeight:600, fontSize:14, cursor:"pointer" }}>Annuler</button>
              <button onClick={()=>deleteCommune(confirmDelete.id)} style={{ padding:"10px 24px", borderRadius:8, border:"none", background:"#ef4444", color:"white", fontWeight:700, fontSize:14, cursor:"pointer" }}>Oui, supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APPLICATION PRINCIPALE (SAISIE)
// ══════════════════════════════════════════════════════════════════════════════
function MainApp({ user, commune, onBack, onLogout, logAction }) {
  const [batiments, setBatiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBatiment, setNewBatiment] = useState("");
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmDeleteMission, setConfirmDeleteMission] = useState(null);
  const [addMissionOpen, setAddMissionOpen] = useState({});
  const [missionPicker, setMissionPicker] = useState(null);
  const [pickerSelections, setPickerSelections] = useState([]);
  const [renameBatiment, setRenameBatiment] = useState(null); // {id, nom}
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    loadAll();
  }, [commune.id]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const bats = await fetchBatiments(commune.id);
      const batsWithMissions = await Promise.all(bats.map(async b => {
        const missions = await fetchMissions(b.id);
        return { ...b, expanded: b.expanded ?? true, missions: missions.map(m => ({ ...m, unPrevu: m.un_prevu, unPropose: m.un_propose })) };
      }));
      setBatiments(batsWithMissions);
    } catch(e) { alert("Erreur de chargement : " + e.message); }
    finally { setLoading(false); }
  };

  const updateMission = async (batId, missionId, field, value) => {
    const dbField = field === "unPrevu" ? "un_prevu" : field === "unPropose" ? "un_propose" : field;
    setBatiments(prev => prev.map(b => b.id === batId ? { ...b, missions: b.missions.map(m => m.id === missionId ? { ...m, [field]: value } : m) } : b));
    try {
      await updateMissionDB(missionId, { [dbField]: value });
      const bat = batiments.find(b => b.id === batId);
      const mission = bat?.missions.find(m => m.id === missionId);
      const fieldLabel = field === "unPrevu" ? "UM Prévu" : field === "unPropose" ? "UM Proposé" : field === "realise" ? "Réalisé" : field === "intervenant" ? "Intervenant" : "Commentaire";
      logAction(`[${commune.nom}] <strong>${bat?.nom}</strong> — ${mission?.code} : ${fieldLabel} = "${value}"`);
    } catch(e) { console.error(e); }
  };

  const removeMission = async (batId, missionId) => {
    const bat = batiments.find(b => b.id === batId);
    const mission = bat?.missions.find(m => m.id === missionId);
    setBatiments(prev => prev.map(b => b.id === batId ? { ...b, missions: b.missions.filter(m => m.id !== missionId) } : b));
    try {
      await deleteMissionDB(missionId);
      logAction(`[${commune.nom}] <strong>${bat?.nom}</strong> — Suppression mission : ${mission?.code}`);
    } catch(e) { console.error(e); }
  };

  const addMissionToBat = async (batId, mCode) => {
    const def = MISSIONS_DEF.find(m => m.code === mCode);
    if (!def) return;
    try {
      const [created] = await addOneMissionDB(batId, def);
      const newM = { ...created, unPrevu: "", unPropose: "" };
      setBatiments(prev => prev.map(b => b.id === batId ? { ...b, missions: [...b.missions, newM] } : b));
      setAddMissionOpen(o => ({ ...o, [batId]: false }));
    } catch(e) { console.error(e); }
  };

  const renameBatimentFn = async () => {
    if (!renameValue.trim() || !renameBatiment) return;
    const oldNom = renameBatiment.nom;
    setBatiments(prev => prev.map(b => b.id === renameBatiment.id ? { ...b, nom: renameValue.trim() } : b));
    try {
      await updateBatimentDB(renameBatiment.id, { nom: renameValue.trim() });
      logAction(`[${commune.nom}] Bâtiment renommé : <strong>${oldNom}</strong> → <strong>${renameValue.trim()}</strong>`);
    } catch(e) { alert("Erreur : " + e.message); }
    setRenameBatiment(null);
    setRenameValue("");
  };

  const toggleExpand = async (batId, current) => {
    setBatiments(prev => prev.map(b => b.id === batId ? { ...b, expanded: !b.expanded } : b));
    try { await updateBatimentDB(batId, { expanded: !current }); } catch(e) { console.error(e); }
  };

  const addBatiment = async () => {
    if (!newBatiment.trim()) return;
    try {
      const batData = await addBatimentDB(commune.id, newBatiment.trim());
      const bat = Array.isArray(batData) ? batData[0] : batData;
      // Insert missions one by one to avoid bulk insert issues
      const createdMissions = [];
      for (const m of MISSIONS_DEF) {
        const res = await api("/rest/v1/missions", "POST", {
          batiment_id: bat.id, code: m.code, label: m.label,
          un_prevu: "", un_propose: "", realise: false, intervenant: "", commentaires: ""
        });
        const mission = Array.isArray(res) ? res[0] : res;
        if (mission) createdMissions.push({ ...mission, unPrevu: "", unPropose: "" });
      }
      setBatiments(prev => [...prev, { ...bat, expanded: true, missions: createdMissions }]);
      setNewBatiment("");
    } catch(e) { alert("Erreur : " + e.message); }
  };

  const removeBatiment = async (batId) => {
    const bat = batiments.find(b => b.id === batId);
    setBatiments(prev => prev.filter(b => b.id !== batId));
    setConfirmDelete(null);
    try {
      await deleteBatimentDB(batId);
      logAction(`[${commune.nom}] Suppression du bâtiment : <strong>${bat?.nom}</strong>`);
    } catch(e) { console.error(e); }
  };

  const totalPrevu = batiments.reduce((s,b) => s + b.missions.reduce((ss,m) => ss + (parseFloat(m.unPrevu)||0), 0), 0);
  const totalPropose = batiments.reduce((s,b) => s + b.missions.reduce((ss,m) => ss + (parseFloat(m.unPropose)||0), 0), 0);
  const totalRealise = batiments.reduce((s,b) => s + b.missions.filter(m => m.realise).length, 0);
  const filteredBatiments = search.trim() ? batiments.filter(b => b.nom.toLowerCase().includes(search.trim().toLowerCase())) : batiments;

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background:"linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding:"20px 32px", color:"white", boxShadow:"0 4px 20px rgba(37,99,235,0.3)" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <img src={SOCOTEC_LOGO} alt="Socotec" style={{ height:48 }} />
            <div>
              <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", opacity:0.7, marginBottom:4 }}>Agglomération de Brive — {commune.nom}</div>
              <h1 style={{ margin:0, fontSize:22, fontWeight:700 }}>MISSION AGGLO – BRIVE 2026</h1>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"6px 14px", fontSize:13, color:"white", display:"flex", alignItems:"center", gap:8 }}>
              <span>👤</span><span style={{ fontWeight:600 }}>{user.prenom} {user.nom}</span>
              <span style={{ color:"rgba(255,255,255,0.45)", fontSize:11 }}>#{user.code}</span>
            </div>
            <button onClick={onBack} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.25)", background:"transparent", color:"rgba(255,255,255,0.7)", fontSize:12, cursor:"pointer", fontWeight:600 }}>← Communes</button>
            <button onClick={onLogout} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.25)", background:"transparent", color:"rgba(255,255,255,0.7)", fontSize:12, cursor:"pointer", fontWeight:600 }}>Déconnexion</button>
            <div style={{ width:1, height:28, background:"rgba(255,255,255,0.2)" }} />
            <button onClick={()=>setView("table")} style={{ padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background:view==="table"?"white":"rgba(255,255,255,0.15)", color:view==="table"?"#1e3a5f":"white" }}>📋 Saisie</button>
            <button onClick={()=>setView("summary")} style={{ padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background:view==="summary"?"white":"rgba(255,255,255,0.15)", color:view==="summary"?"#1e3a5f":"white" }}>📊 Récapitulatif</button>
          </div>
        </div>
      </div>
      <div style={{ background:"#1e3a5f", paddingBottom:20 }}>
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 32px", display:"flex", gap:16, flexWrap:"wrap" }}>
          {[
            { label:"Bâtiments", value:batiments.length, unit:"", color:"#60a5fa" },
            { label:"Total UM Prévus", value:totalPrevu.toFixed(1), unit:"UM", color:"#34d399" },
            { label:"Total UM Proposés", value:totalPropose.toFixed(1), unit:"UM", color:"#fbbf24" },
            { label:"Missions réalisées", value:totalRealise, unit:`/ ${batiments.reduce((s,b)=>s+b.missions.length,0)}`, color:"#a78bfa" },
          ].map(kpi => (
            <div key={kpi.label} style={{ background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 20px", flex:"1 1 160px", borderTop:`3px solid ${kpi.color}` }}>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, textTransform:"uppercase", letterSpacing:1 }}>{kpi.label}</div>
              <div style={{ color:"white", fontSize:22, fontWeight:700, marginTop:2 }}>{kpi.value} <span style={{ fontSize:13, fontWeight:400, color:kpi.color }}>{kpi.unit}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"24px 32px" }}>
        <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, flex:"1 1 220px", background:"white", borderRadius:10, padding:"10px 16px", border:"1px solid #e2e8f0", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize:18, color:"#94a3b8" }}>🔍</span>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Rechercher un bâtiment..."
              style={{ flex:1, border:"none", outline:"none", fontSize:14, color:"#1e3a5f", background:"transparent" }} />
            {search && (<><button onClick={()=>setSearch("")} style={{ background:"#f1f5f9", border:"none", borderRadius:6, padding:"4px 10px", cursor:"pointer", color:"#64748b", fontSize:12, fontWeight:600 }}>✕ Effacer</button><span style={{ fontSize:12, color:"#94a3b8", whiteSpace:"nowrap" }}>{filteredBatiments.length} résultat{filteredBatiments.length!==1?"s":""}</span></>)}
          </div>
          <button onClick={()=>batiments.forEach(b=>{ if(!b.expanded){toggleExpand(b.id,false);} })} style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, border:"1px solid #e2e8f0", background:"white", color:"#1e3a5f", fontWeight:600, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>⊞ Tout déployer</button>
          <button onClick={()=>batiments.forEach(b=>{ if(b.expanded){toggleExpand(b.id,true);} })} style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, border:"1px solid #e2e8f0", background:"white", color:"#1e3a5f", fontWeight:600, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>⊟ Tout réduire</button>
        </div>

        {loading ? <div style={{ textAlign:"center", padding:48, color:"#64748b" }}>⏳ Chargement...</div> : view === "table" ? (
          <>
            {batiments.length === 0 && <div style={{ textAlign:"center", padding:"48px 24px", background:"white", borderRadius:12, border:"1px solid #e2e8f0", color:"#94a3b8", marginBottom:16 }}><div style={{ fontSize:32, marginBottom:8 }}>🏢</div><div style={{ fontWeight:600, fontSize:15, color:"#64748b" }}>Aucun bâtiment pour {commune.nom}</div><div style={{ fontSize:13, marginTop:4 }}>Ajoutez un bâtiment ci-dessous.</div></div>}
            {filteredBatiments.map((bat, batIdx) => {
              const batPrevu = bat.missions.reduce((s,m)=>s+(parseFloat(m.unPrevu)||0),0);
              const batPropose = bat.missions.reduce((s,m)=>s+(parseFloat(m.unPropose)||0),0);
              const usedCodes = bat.missions.map(m=>m.code);
              const availableMissions = MISSIONS_DEF.filter(m=>!usedCodes.includes(m.code));
              return (
                <div key={bat.id} style={{ background:"white", borderRadius:12, marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", overflow:"hidden", border:"1px solid #e2e8f0" }}>
                  <div onClick={()=>toggleExpand(bat.id, bat.expanded)} style={{ display:"flex", alignItems:"center", padding:"14px 20px", background:"linear-gradient(90deg,#1e3a5f,#2a4a7f)", cursor:"pointer", userSelect:"none" }}>
                    <span style={{ color:"#60a5fa", fontSize:11, fontWeight:700, marginRight:12, letterSpacing:1 }}>#{String(batIdx+1).padStart(2,"0")}</span>
                    <span style={{ color:"white", fontWeight:700, fontSize:14, flex:1 }}>{bat.nom}</span>
                    <span style={{ color:"#93c5fd", fontSize:12, marginRight:16 }}>
                      Prévu: <b>{batPrevu.toFixed(1)}</b> UM &nbsp;|&nbsp; Proposé: <b>{batPropose.toFixed(1)}</b> UM &nbsp;|&nbsp;
                      <span style={{ color:"#a5b4fc" }}>{bat.missions.length} mission{bat.missions.length !== 1 ? "s" : ""}</span>
                    </span>
                    <button onClick={(e)=>{e.stopPropagation();setRenameBatiment(bat);setRenameValue(bat.nom);}} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"white", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12, marginRight:6 }}>✏️ Renommer</button>
                    <button onClick={(e)=>{e.stopPropagation();setConfirmDelete(bat);}} style={{ background:"rgba(255,100,100,0.2)", border:"none", color:"#fca5a5", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12, marginRight:10 }}>✕ Supprimer</button>
                    <span style={{ color:"white", fontSize:18, display:"inline-block", transform:bat.expanded?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s" }}>⌄</span>
                  </div>
                  {bat.expanded && (
                    <div style={{ overflowX:"auto" }}>
                      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                        <thead><tr style={{ background:"#f1f5f9" }}>
                          <th style={th}>Code</th><th style={th}>Mission</th>
                          <th style={{...th,width:90}}>UM Prévu</th><th style={{...th,width:90}}>UM Proposé</th>
                          <th style={{...th,width:80}}>Réalisé</th><th style={{...th,minWidth:140}}>Intervenant</th>
                          <th style={{...th,minWidth:200}}>Commentaires</th><th style={{...th,width:40}}></th>
                        </tr></thead>
                        <tbody>
                          {bat.missions.map((mission,i)=>(
                            <tr key={mission.id} style={{ background:i%2===0?"#f8fafc":"white" }}>
                              <td style={{...td,fontWeight:700,color:"#1e3a5f",whiteSpace:"nowrap"}}><span style={{ background:missionColors[mission.code]||"#f0f9ff", padding:"3px 8px", borderRadius:5, fontSize:11 }}>{mission.code}</span></td>
                              <td style={{...td,color:"#475569"}}>{mission.label}</td>
                              <td style={td}><input type="number" step="0.5" value={mission.unPrevu} onChange={(e)=>updateMission(bat.id,mission.id,"unPrevu",e.target.value)} placeholder="—" style={inputStyle}/></td>
                              <td style={td}><input type="number" step="0.5" value={mission.unPropose} onChange={(e)=>updateMission(bat.id,mission.id,"unPropose",e.target.value)} placeholder="—" style={inputStyle}/></td>
                              <td style={{...td,textAlign:"center"}}><input type="checkbox" checked={mission.realise} onChange={(e)=>updateMission(bat.id,mission.id,"realise",e.target.checked)} style={{ width:18,height:18,cursor:"pointer",accentColor:"#2563eb" }}/></td>
                              <td style={td}><input type="text" value={mission.intervenant} onChange={(e)=>updateMission(bat.id,mission.id,"intervenant",e.target.value)} placeholder="Nom..." style={{...inputStyle,width:"100%"}}/></td>
                              <td style={td}><input type="text" value={mission.commentaires} onChange={(e)=>updateMission(bat.id,mission.id,"commentaires",e.target.value)} placeholder="Commentaire..." style={{...inputStyle,width:"100%"}}/></td>
                              <td style={{...td,textAlign:"center"}}><button onClick={()=>setConfirmDeleteMission({batId:bat.id, missionId:mission.id, code:mission.code, label:mission.label})} title="Supprimer cette mission" style={{ background:"none", border:"none", cursor:"pointer", color:"#fca5a5", fontSize:16, padding:"2px 6px", borderRadius:4 }} onMouseEnter={(e)=>e.currentTarget.style.background="#fee2e2"} onMouseLeave={(e)=>e.currentTarget.style.background="none"}>✕</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {availableMissions.length > 0 && (
                        <div style={{ padding:"10px 16px", borderTop:"1px dashed #e2e8f0", display:"flex", alignItems:"center", gap:10 }}>
                          {addMissionOpen[bat.id] ? (<>
                            <span style={{ fontSize:12, color:"#64748b", fontWeight:600 }}>Ajouter une mission :</span>
                            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                              {availableMissions.map(m=>(<button key={m.code} onClick={()=>addMissionToBat(bat.id,m.code)} style={{ padding:"4px 12px", borderRadius:6, border:"1px solid #2563eb", background:"#eff6ff", color:"#2563eb", fontWeight:600, fontSize:12, cursor:"pointer" }} onMouseEnter={(e)=>{e.currentTarget.style.background="#2563eb";e.currentTarget.style.color="white";}} onMouseLeave={(e)=>{e.currentTarget.style.background="#eff6ff";e.currentTarget.style.color="#2563eb";}}>{m.code} – {m.label}</button>))}
                            </div>
                            <button onClick={()=>setAddMissionOpen(o=>({...o,[bat.id]:false}))} style={{ marginLeft:"auto", background:"none", border:"none", color:"#94a3b8", fontSize:18, cursor:"pointer" }}>✕</button>
                          </>) : (
                            <button onClick={()=>setAddMissionOpen(o=>({...o,[bat.id]:true}))} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:8, border:"1px dashed #cbd5e1", background:"transparent", color:"#64748b", fontWeight:600, fontSize:12, cursor:"pointer" }}>+ Ajouter une mission</button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{ background:"white", borderRadius:12, padding:"16px 20px", border:"2px dashed #cbd5e1", display:"flex", gap:12, alignItems:"center" }}>
              <input type="text" value={newBatiment} onChange={(e)=>setNewBatiment(e.target.value)}
                onKeyDown={(e)=>e.key==="Enter"&&newBatiment.trim()&&(setMissionPicker(newBatiment.trim()),setPickerSelections([]))}
                placeholder="Nom du nouveau bâtiment..." style={{ flex:1, padding:"10px 14px", borderRadius:8, border:"1px solid #cbd5e1", fontSize:14, outline:"none" }}/>
              <button onClick={()=>{ if(newBatiment.trim()){ setMissionPicker(newBatiment.trim()); setPickerSelections([]); }}}
                style={{ background:"#2563eb", color:"white", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, fontSize:14, cursor:"pointer" }}>+ Ajouter bâtiment</button>
            </div>
          </>
        ) : (
          <div style={{ background:"white", borderRadius:12, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #e2e8f0", fontWeight:700, color:"#1e3a5f", fontSize:15 }}>Récapitulatif — {commune.nom}</div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead><tr style={{ background:"#1e3a5f", color:"white" }}>
                  <th style={{...th,color:"white",background:"transparent"}}>Bâtiment</th>
                  {MISSIONS_DEF.map(m=>(<th key={m.code} style={{...th,color:"#93c5fd",background:"transparent",fontSize:11}}>{m.code}</th>))}
                  <th style={{...th,color:"#34d399",background:"transparent"}}>Total UM Prévu</th>
                  <th style={{...th,color:"#fbbf24",background:"transparent"}}>Total UM Proposé</th>
                  <th style={{...th,color:"#a78bfa",background:"transparent"}}>Réalisé</th>
                </tr></thead>
                <tbody>
                  {filteredBatiments.map((bat,i)=>{
                    const batPrevu=bat.missions.reduce((s,m)=>s+(parseFloat(m.unPrevu)||0),0);
                    const batPropose=bat.missions.reduce((s,m)=>s+(parseFloat(m.unPropose)||0),0);
                    const batRealise=bat.missions.filter(m=>m.realise).length;
                    return (<tr key={bat.id} style={{ background:i%2===0?"#f8fafc":"white" }}>
                      <td style={{...td,fontWeight:700,color:"#1e3a5f",whiteSpace:"nowrap"}}>{bat.nom}</td>
                      {MISSIONS_DEF.map(m=>{ const miss=bat.missions.find(x=>x.code===m.code); return (<td key={m.code} style={{...td,textAlign:"center"}}>{!miss?<span style={{color:"#e2e8f0"}}>–</span>:miss.realise?<span style={{color:"#059669",fontWeight:700}}>✓</span>:(miss.unPropose||miss.unPrevu)?<span style={{color:"#2563eb"}}>{miss.unPropose||miss.unPrevu}</span>:<span style={{color:"#cbd5e1"}}>—</span>}</td>); })}
                      <td style={{...td,textAlign:"center",fontWeight:700,color:"#059669"}}>{batPrevu>0?batPrevu.toFixed(1):"—"}</td>
                      <td style={{...td,textAlign:"center",fontWeight:700,color:"#d97706"}}>{batPropose>0?batPropose.toFixed(1):"—"}</td>
                      <td style={{...td,textAlign:"center"}}><span style={{ background:batRealise===bat.missions.length?"#d1fae5":batRealise>0?"#fef3c7":"#f1f5f9", color:batRealise===bat.missions.length?"#059669":batRealise>0?"#d97706":"#94a3b8", padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:700 }}>{batRealise}/{bat.missions.length}</span></td>
                    </tr>);
                  })}
                  <tr style={{ background:"#1e3a5f", fontWeight:700 }}>
                    <td style={{...td,color:"white"}}>TOTAL</td>
                    {MISSIONS_DEF.map(m=>{ const tot=batiments.reduce((s,b)=>{ const miss=b.missions.find(x=>x.code===m.code); return s+(parseFloat(miss?.unPropose)||0); },0); return <td key={m.code} style={{...td,textAlign:"center",color:"#93c5fd"}}>{tot>0?tot.toFixed(1):"—"}</td>; })}
                    <td style={{...td,textAlign:"center",color:"#34d399"}}>{totalPrevu.toFixed(1)}</td>
                    <td style={{...td,textAlign:"center",color:"#fbbf24"}}>{totalPropose.toFixed(1)}</td>
                    <td style={{...td,textAlign:"center",color:"#a78bfa"}}>{totalRealise}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Modale renommage bâtiment */}
      {renameBatiment && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1001, backdropFilter:"blur(2px)" }}>
          <div style={{ background:"white", borderRadius:14, padding:"28px 32px", maxWidth:420, width:"90%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ fontSize:32, textAlign:"center", marginBottom:12 }}>✏️</div>
            <h2 style={{ margin:"0 0 8px", fontSize:18, color:"#1e3a5f", fontWeight:700, textAlign:"center" }}>Renommer le bâtiment</h2>
            <p style={{ color:"#64748b", fontSize:13, margin:"0 0 20px", textAlign:"center" }}>Nom actuel : <strong>{renameBatiment.nom}</strong></p>
            <input
              type="text"
              value={renameValue}
              onChange={(e)=>setRenameValue(e.target.value)}
              onKeyDown={(e)=>e.key==="Enter"&&renameBatimentFn()}
              autoFocus
              style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:"1.5px solid #2563eb", fontSize:15, outline:"none", boxSizing:"border-box", marginBottom:20 }}
            />
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button onClick={()=>{ setRenameBatiment(null); setRenameValue(""); }} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", color:"#475569", fontWeight:600, fontSize:14, cursor:"pointer" }}>Annuler</button>
              <button onClick={renameBatimentFn} disabled={!renameValue.trim()} style={{ padding:"10px 24px", borderRadius:8, border:"none", background:renameValue.trim()?"#2563eb":"#93c5fd", color:"white", fontWeight:700, fontSize:14, cursor:renameValue.trim()?"pointer":"not-allowed" }}>Renommer</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression bâtiment */}
      {confirmDelete && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(2px)" }}>
          <div style={{ background:"white", borderRadius:14, padding:"28px 32px", maxWidth:420, width:"90%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🗑️</div>
            <h2 style={{ margin:"0 0 8px", fontSize:18, color:"#1e3a5f", fontWeight:700 }}>Supprimer le bâtiment ?</h2>
            <p style={{ color:"#64748b", fontSize:14, margin:"0 0 24px", lineHeight:1.5 }}>Vous allez supprimer <strong style={{ color:"#1e3a5f" }}>{confirmDelete.nom}</strong> et toutes ses données. Cette action est irréversible.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button onClick={()=>setConfirmDelete(null)} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", color:"#475569", fontWeight:600, fontSize:14, cursor:"pointer" }}>Annuler</button>
              <button onClick={()=>removeBatiment(confirmDelete.id)} style={{ padding:"10px 24px", borderRadius:8, border:"none", background:"#ef4444", color:"white", fontWeight:700, fontSize:14, cursor:"pointer" }}>Oui, supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression mission */}
      {confirmDeleteMission && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1001, backdropFilter:"blur(2px)" }}>
          <div style={{ background:"white", borderRadius:14, padding:"28px 32px", maxWidth:420, width:"90%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>⚠️</div>
            <h2 style={{ margin:"0 0 8px", fontSize:18, color:"#1e3a5f", fontWeight:700 }}>Supprimer la mission ?</h2>
            <p style={{ color:"#64748b", fontSize:14, margin:"0 0 8px", lineHeight:1.5 }}>
              Vous allez supprimer la mission <strong style={{ color:"#1e3a5f" }}>{confirmDeleteMission.code} — {confirmDeleteMission.label}</strong>.
            </p>
            <p style={{ color:"#ef4444", fontSize:13, margin:"0 0 24px" }}>Toutes les données saisies pour cette mission seront perdues.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button onClick={()=>setConfirmDeleteMission(null)} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", color:"#475569", fontWeight:600, fontSize:14, cursor:"pointer" }}>Annuler</button>
              <button onClick={()=>{ removeMission(confirmDeleteMission.batId, confirmDeleteMission.missionId); setConfirmDeleteMission(null); }} style={{ padding:"10px 24px", borderRadius:8, border:"none", background:"#ef4444", color:"white", fontWeight:700, fontSize:14, cursor:"pointer" }}>Oui, supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* Sélecteur de missions à l'ajout d'un bâtiment */}
      {missionPicker && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1001, backdropFilter:"blur(2px)" }}>
          <div style={{ background:"white", borderRadius:16, padding:"32px", maxWidth:500, width:"90%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
            <h2 style={{ margin:"0 0 4px", fontSize:18, color:"#1e3a5f", fontWeight:700 }}>Choisir les missions</h2>
            <p style={{ color:"#64748b", fontSize:13, margin:"0 0 12px" }}>Bâtiment : <strong>{missionPicker}</strong></p>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <button onClick={()=>setPickerSelections(MISSIONS_DEF.map(m=>m.code))}
                style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #2563eb", background:"#eff6ff", color:"#2563eb", fontWeight:600, fontSize:12, cursor:"pointer" }}>
                ✓ Tout sélectionner
              </button>
              <button onClick={()=>setPickerSelections([])}
                style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", color:"#64748b", fontWeight:600, fontSize:12, cursor:"pointer" }}>
                ✕ Tout décocher
              </button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
              {MISSIONS_DEF.map(m => {
                const selected = pickerSelections.includes(m.code);
                return (
                  <label key={m.code} onClick={()=>setPickerSelections(prev => selected ? prev.filter(c=>c!==m.code) : [...prev, m.code])}
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:8, border:`1.5px solid ${selected?"#2563eb":"#e2e8f0"}`, background:selected?"#eff6ff":"white", cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${selected?"#2563eb":"#cbd5e1"}`, background:selected?"#2563eb":"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {selected && <span style={{ color:"white", fontSize:13, fontWeight:700 }}>✓</span>}
                    </div>
                    <span style={{ background:missionColors[m.code]||"#f0f9ff", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:700, color:"#1e3a5f" }}>{m.code}</span>
                    <span style={{ fontSize:13, color:"#475569", fontWeight:500 }}>{m.label}</span>
                  </label>
                );
              })}
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={()=>{ setMissionPicker(null); setNewBatiment(""); }} style={{ padding:"10px 20px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", color:"#475569", fontWeight:600, fontSize:14, cursor:"pointer" }}>Annuler</button>
              <button disabled={pickerSelections.length===0}
                onClick={async ()=>{
                  try {
                    const batData = await addBatimentDB(commune.id, missionPicker);
                    const bat = Array.isArray(batData) ? batData[0] : batData;
                    const selectedDefs = MISSIONS_DEF.filter(m => pickerSelections.includes(m.code));
                    const createdMissions = [];
                    for (const m of selectedDefs) {
                      const res = await api("/rest/v1/missions", "POST", { batiment_id: bat.id, code: m.code, label: m.label, un_prevu:"", un_propose:"", realise:false, intervenant:"", commentaires:"" });
                      const mission = Array.isArray(res) ? res[0] : res;
                      if (mission) createdMissions.push({ ...mission, unPrevu:"", unPropose:"" });
                    }
                    setBatiments(prev => [...prev, { ...bat, expanded:true, missions:createdMissions }]);
                    setNewBatiment("");
                    setMissionPicker(null);
                  } catch(e) { alert("Erreur : " + e.message); }
                }}
                style={{ padding:"10px 24px", borderRadius:8, border:"none", background:pickerSelections.length===0?"#93c5fd":"#2563eb", color:"white", fontWeight:700, fontSize:14, cursor:pickerSelections.length===0?"not-allowed":"pointer" }}>
                Créer le bâtiment ({pickerSelections.length} mission{pickerSelections.length!==1?"s":""})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [commune, setCommune] = useState(null);
  const actionsLog = useRef([]);
  const inactivityTimer = useRef(null);

  const logAction = (action) => {
    if (!user || CODES_EXCLUS.includes(String(user.code))) return;
    actionsLog.current.push(action);
    // Reset inactivity timer
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (actionsLog.current.length > 0) {
        envoyerNotification(user, [...actionsLog.current]);
        actionsLog.current = [];
      }
    }, 1 * 60 * 1000); // 5 minutes
  };

  const handleLogout = () => {
    // Envoyer le mail si des actions sont en attente
    if (actionsLog.current.length > 0) {
      envoyerNotification(user, [...actionsLog.current]);
      actionsLog.current = [];
    }
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setUser(null);
    setCommune(null);
  };

  if (!user) return <LoginPage onLogin={setUser} />;
  if (!commune) return <CommunePage user={user} onSelectCommune={setCommune} onLogout={handleLogout} logAction={logAction} />;
  return <MainApp user={user} commune={commune} onBack={()=>setCommune(null)} onLogout={handleLogout} logAction={logAction} />;
}
