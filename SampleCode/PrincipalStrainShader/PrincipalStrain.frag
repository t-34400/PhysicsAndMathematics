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

in vec3 vCurrentPosition;
in vec3 vOriginalPosition;
in vec3 vNormal;

out vec4 fragColor;

uniform vec3 lightPosition;
uniform vec3 lightColor;

float strainNormalizationFactor = 10.0;

vec3 hsv2rgb(vec3 c)
{
    return mix(vec3(1.),clamp((abs(fract(c.x+vec3(3,2,1)/3.)*6.-3.)-1.),0.,1.),c.y)*c.z;
}

void main() {
    vec3 originalEdgeA = dFdx(vOriginalPosition);
    vec3 originalEdgeB = dFdy(vOriginalPosition);
    float originalAngle = acos(dot(normalize(originalEdgeA), normalize(originalEdgeB)));
    float originalEdgeLengthA = length(originalEdgeA);
    float originalEdgeLengthB = length(originalEdgeB);
    float originalEdgeBX = originalEdgeLengthB * cos(originalAngle);
    float originalEdgeBY = originalEdgeLengthB * sin(originalAngle);

    vec3 currentEdgeA = dFdx(vCurrentPosition);
    vec3 currentEdgeB = dFdy(vCurrentPosition);
    float currentAngle = acos(dot(normalize(currentEdgeA), normalize(currentEdgeB)));
    float currentEdgeLengthA = length(currentEdgeA);
    float currentEdgeLengthB = length(currentEdgeB);
    float currentEdgeBX = currentEdgeLengthB * cos(currentAngle);
    float currentEdgeBY = currentEdgeLengthB * sin(currentAngle);

    float epsilon00 = (currentEdgeLengthA - originalEdgeLengthA) / originalEdgeLengthA;
    float epsilon11 = (currentEdgeBY - originalEdgeBY) / originalEdgeBY;
    float epsilon10 = 0.5 * (currentEdgeBX - (1.0 + epsilon00) * originalEdgeBX) / originalEdgeBY;

    float b = epsilon00 + epsilon11;
    float c = epsilon00 * epsilon11 -epsilon10 * epsilon10;
    float D = b * b - 4.0 * c;
    float principalStrain = 0.5 * (-b + sqrt(D)); // 0.5 * (-b - sqrt(D));

    float normalizedStrain = clamp(abs(principalStrain) / strainNormalizationFactor, 1.0e-4, 0.9999);

    vec3 color = vec3(normalizedStrain, 1 - normalizedStrain, 0.0);
    vec3 ambient = color * 0.1;
    vec3 diffuse = max(dot(vNormal, normalize(lightPosition)), 0.0) * lightColor * color;

    fragColor = vec4(ambient + diffuse, 1.0);
}