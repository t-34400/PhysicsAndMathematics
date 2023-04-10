$$\gdef\dif{\mathrm{d}}$$
$$\gdef\pardif#1#2{\frac{\partial #1}{\partial #2}}$$

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


2. If there are two conditions:
    $$
      \begin{aligned}
        \sum_{i=1}^Np_i&=1\\
        \sum_{i=1}^Np_i\epsilon_i&=E\ (\mathrm{constant})
      \end{aligned}
    $$ on the variables $p_i \{i=1,\ldots,N\}$, find the stationary points of the following value:
    $$
      S=-\sum_{i=1}^Np_i\log p_i
    $$
    <details>
      <summary>Answer</summary>

      Let $\tilde{f}$ be 
      $$
        \tilde{f} = -\sum_{i=1}^Np_i\log p_i-\alpha\sum_{i=1}^Np_i -\beta\sum_{i=1}^Np_i\epsilon_i
      $$ where $\alpha, \beta$ are the Lagrange multipliers. At the stationary points,
      $$
        \pardif{\tilde{f}}{p_i} = 0
      $$ and then
      $$
        -\log p_i - 1 - \alpha -\beta\epsilon_i = 0
      $$ threfore
      $$
        p_i = e^{-\alpha - 1} e^{-\beta\epsilon_i}
      $$
      By determining $\alpha$ based on the first condition, we obtain
      $$
        p_i = \frac{e^{-\beta\epsilon_i}}{\sum_{i=1}^Ne^{-\beta\epsilon_i}}
      $$ $\beta$ can be determined based on the second condition
      $$
        \frac{\sum_{i=1}^N\epsilon_ie^{-\beta\epsilon}}{\sum_{i=1}^Ne^{-\beta\epsilon}} = E
      $$
    </details>



<!--
<details open>
  <summary>Answer</summary>
  
</details>
-->