<h1>Others<h1>

# Principal strain
The infinitesimal triangular surface $OAB$ is deformed into an infinitesimal triangular surface $OA^\prime B^\prime$ where $O$, $A$ and $A^\prime$ are colinear and $OAB$ and $OA^\prime B^\prime$ are in the same plane. In this case, the normal strains are described as follows:
$$
  \begin{aligned}
    \varepsilon_x &= \frac{OA^\prime - OA}{OA}\\
    \varepsilon_y &= \frac{OB^\prime - OB}{OB}
  \end{aligned}
$$ and the shear strain is described as follows:
$$
  \gamma_{xy} = \gamma_{yx} = \frac{1}{2}\tan\left(\angle AOB - \angle A^\prime OB^\prime\right)
$$ The principal strains are defined as the eigenvalues of the strain tensor:
$$
  \begin{pmatrix}
    \varepsilon_x && \gamma_{xy} \\
    \gamma_{yx} && \varepsilon_y
  \end{pmatrix}
$$ so the principal strains are as follows:
$$
  \varepsilon_{\mathrm{max}}, \varepsilon_{\mathrm{min}} = \frac{1}{2}\left(\varepsilon_x + \varepsilon_y \pm \sqrt{(\varepsilon_x + \varepsilon_y)^2 + 4(\varepsilon_x\varepsilon_y-\gamma_{xy}\gamma_{yx})}\right)
$$
## Shader program
A shader that calculates the principal strains from the original and current vertex positions, and colors them based on their magnitude.
- Vertex shader
    ```kotlin
    #version 300 es

    in vec3 aCurrentPosition;
    in vec3 aOriginalPosition;

    out vec3 vCurrentPosition;
    out vec3 vOriginalPosition;

    uniform mat4 uMvpMatrix;

    void main() {
        gl_Position = modelViewProjectionMatrix * vec4(aCurrentPosition, 1.0);
        vCurrentPosition = aCurrentPosition;
        vOriginalPosition = aOriginalPosition;
    }
    ```

- Fragment shader
    ```kotlin
    #version 300 es

    precision mediump float;

    out vec3 vCurrentPosition;
    out vec3 vOriginalPosition;

    out vec4 fragColor;

    uniform vec3 lightPosition;
    uniform vec3 lightColor;

    float strainNormalizationFactor = 10.0;

    void main() {
        vec3 originalEdgeX = dFdx(vOriginalPosition);
        vec3 originalEdgeY = dFdy(vOriginalPosition);
        float originalAngle = acos(dot(normalize(originalEdgeX), normalize(originalEdgeY)));
        float originalEdgeLengthX = length(originalEdgeX);
        float originalEdgeLengthY = length(originalEdgeY);

        vec3 currentEdgeX = dFdx(vCurrentPosition);
        vec3 currentEdgeY = dFdy(vCurrentPosition);
        float currentAngle = acos(dot(normalize(currentEdgeX), normalize(currentEdgeY)));
        float currentEdgeLengthX = length(currentEdgeX);
        float currentEdgeLengthY = length(currentEdgeY);

        float epsilonX = (currentEdgeLengthX - originalEdgeLengthX) / originalEdgeLengthX;
        float epsilonY = (currentEdgeLengthY - originalEdgeLengthY) / originalEdgeLengthY;
        float gamma = 0.5 * tan(originalAngle - currentAngle);

        float b = epsilonX + epsilonY;
        float c = epsilonX * epsilonY - gamma * gamma;
        float D = b * b - 4.0 * c;
        float principalStrain = 0.5 * (-b + sqrt(D)); // 0.5 * (-b - sqrt(D));

        float normalizedStrain = clamp(abs(principalStrain) / strainNormalizationFactor, 1.0e-4, 0.9999);

        vec3 color = vec3(normalizedStrain, 1 - normalizedStrain, 0.0);
        vec3 ambient = color * 0.1;
        vec3 diffuse = max(dot(normal, normalize(lightPosition)), 0.0) * lightColor * color;
        // vec3 specular = pow(max(dot(reflect(-normalize(lightPosition), normal), normalize(-vec3(0.0, 0.0, 1.0))), 0.0), 16.0) * lightColor;

        fragColor = vec4(ambient + diffuse + specular, 1.0);
    }
    ```