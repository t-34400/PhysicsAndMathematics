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