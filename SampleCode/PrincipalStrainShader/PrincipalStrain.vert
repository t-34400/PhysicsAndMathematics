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

in vec3 aCurrentPosition;
in vec3 aOriginalPosition;
in vec3 aNormal;

out vec3 vCurrentPosition;
out vec3 vOriginalPosition;
out vec3 vNormal;

uniform mat4 uMvMatrix;
uniform mat4 uProjctionMatrix;

void main() {
    gl_Position = uProjctionMatrix * uMvMatrix * vec4(aCurrentPosition, 1.0);
    vCurrentPosition = aCurrentPosition;
    vOriginalPosition = aOriginalPosition;
    vNormal = uMvMatrix * aNormal;
}