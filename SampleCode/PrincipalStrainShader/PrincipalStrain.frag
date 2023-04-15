/* A sample code of shaders that calculates the 2D principal strains from the original and current vertex positions, 
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

    fragColor = vec4(ambient + diffuse + specular, 1.0);
}