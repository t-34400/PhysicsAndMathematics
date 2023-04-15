Get-ChildItem -Path ./.latex -Filter "*.pdf" | ForEach-Object {
    Move-Item -Path $_.FullName -Destination ./
}