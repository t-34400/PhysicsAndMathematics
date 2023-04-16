/* A sample code of shaders that calculates the 3D principal strains from the original and current vertex positions, 
 * and color meshes based on their principal strains.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

#version 300 es

precision mediump float;

in vec3 vCurrentPosition;
in vec3 vOriginalPosition;
in vec3 vModelNormal;
in vec3 vViewNormal;

out vec4 fragColor;

uniform vec3 lightPosition;
uniform vec3 lightColor;

const float strainNormalizationFactor = 10.0;
const float jacobiThreshold = 0.01;
const int jacobiMaxIter = 10;

vec3 hsv2rgb(vec3 c)
{
    return mix(vec3(1.),clamp((abs(fract(c.x+vec3(3,2,1)/3.)*6.-3.)-1.),0.,1.),c.y)*c.z;
}

vec3 jacobi(mat3 a) {
  for (int i = 0; i < jacobiMaxIter; i++) {
    loat maxval = abs(A[0][1]);
    int p = 0;
    int q = 1;
    float absval = abs(A[0][2]);
    if (absval > maxval) {
        maxval = absval;
        p = 0;
        q = 2;
    }
    absval = abs(A[1][2]);
    if (absval > maxval) {
        maxval = absval;
        p = 1;
        q = 2;
    }

    if(maxval < jacobiThreshold) {
        break;
    }

    float t = (2.0 * a[p][q]) / (a[p][p] - a[q][q]);
    float cos = 1.0 / sqrt(1.0 + t*t);
    float sin = t * cos;
    
  }

  return vec3(a[0][0], a[1][1], a[2][2]);
}

void main() {
    vec3 vecA = dFdx(vOriginalPosition);
    vec3 vecB = dFdy(vOriginalPosition);
    float theta = acos(dot(normalize(vecA), normalize(vecB)));
    float a0= length(vecA);
    float absVecB = length(vecB);
    float b0 = absVecB * cos(theta);
    float b1 = absVecB * sin(theta);

    vec3 normal = normalize(vModelNormal);
    vec3 vecAp = dFdx(vCurrentPosition); // vec{a}^\prime
    vec3 vecBp = dFdy(vCurrentPosition); // vec{b}^\prime
    float absVecAp = length(vecAp);
    float absVecBp = length(vecBp);
    float ap2 = dot(normal, vecAp);
    float bp2 = dot(normal, vecBp);
    vec3 vecApp = vecAp - (ap2/absVecAp) * vecAp; // the projections of the edges onto the x_0x_0-plane
    vec3 vecBpp = vecBp - (bp2/absVecBp) * vecBp;
    float thetaPp = acos(dot(normalize(vecA), normalize(vecB)));
    float ap0 = length(vecApp);
    float absVecBpp = length(vecBpp);
    float bp0 = absVecBpp * cos(thetaPp);
    float bp1 = absVecBpp * sin(thetaPp);

    float epsilon00 = (ap0 - a0) / a0;
    float epsilon01 = (bp0 - (1 + epsilon00) * b0) / (2.0 * b0), ap2 / (2.0 * a0);
    float epsilon02 = ap2 / (2.0 * a0);
    float epsilon12 = (bp2 - epsilon02 * b0) / (2.0 * b1);
    mat3 epsilonMat = mat3(
        epsilon00, epsilon01, epsilon02,
        epsilon01, (bp1 - b1) / b1, epsilon12,
        epsilon02, epsilon12, 0.0
    );

    float principalStrains = jacobi(epsilonMat);
    float maxPrincipalStrain = max(max(principalStrains.x, principalStrains.y), principalStrains.z);

    float normalizedStrain = clamp(abs(maxPrincipalStrain) / strainNormalizationFactor, 1.0e-4, 0.9999);

    vec3 color = vec3(normalizedStrain, 1 - normalizedStrain, 0.0);
    vec3 ambient = color * 0.1;
    vec3 diffuse = max(dot(vViewNormal, normalize(lightPosition)), 0.0) * lightColor * color;

    fragColor = vec4(ambient + diffuse, 1.0);
}