<h1>Mathematics for physics<h1>

# Differentiation and partial differentiation
## Lagrange multiplier
1. If there is a condition 
    $$
      g(\bm{x})=c\mathrm{\quad where\quad}c\mathrm{\ \ is\ constant}
    $$ on a variable $\bm{x} = (x_1,\ldots, x_n)$, find the extrema of $f(\bm{x})$. Here, assume that both functions $f, g$ belong to $C^1$. 
    <details>
      <summary>Answer</summary>
      
      Under the condition $g(\bm{x})$, a infinitely small variations in variables $\dif \bm{x}$ satisfies equation:
      $$
        \nabla g(\bm{x})\cdot\dif\bm{x} = \sum_{i=1}^n\pardif{g}{x_i}\dif x_i = 0
      $$ so the change in $f$ with respect to these variations in variables can be describe as follows:
      $$
        \begin{aligned}
          \dif f &= \nabla f\cdot\dif\bm{x}\\
          &=\sum_{i=1}^{n}\pardif{f}{x_i}\dif x_i\\
          &=\sum_{i=1}^{n-1}\pardif{f}{x_i}\dif x_i + \pardif{f}{x_n}\left(\pardif{g}{x_n}\right)^{-1}\sum_{i=1}^{n-1}\pardif{g}{x_i}\dif x_i\\
          &=\sum_{i=1}^{n-1}\left(\pardif{f}{x_i} + \lambda\pardif{g}{x_i}\right)\dif x_i
        \end{aligned}
      $$ where $\lambda = \pardif{f}{x_n}\left(\pardif{g}{x_n}\right)^{-1}$. Since $\dif f=0$ on the constrained extrema of $f$ for the arbitrary infinitesimal variations $\dif x_1,\ldots ,\dif x_{n-1}$, the coefficients of $\dif x_i (i=1,\ldots, n-1)$ must be zero:
      $$
        \pardif{f}{x_i} + \lambda\pardif{g}{x_i} = 0\mathrm{\quad for\quad}x=1,\ldots,n-1
      $$ From the definition of $\lambda$, this equation holds for all $i$ between $1$ and $n$ inclusive.

      Therefore, the extrema of a function $f(\bm{x})$ subject to constraints $g(\bm{x}) = c$ can be obtained by solving the extrema problem for $\tilde{f} = f - \lambda g$.
    </details>





<!--
<details open>
  <summary>Answer</summary>
  
</details>
-->