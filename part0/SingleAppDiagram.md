:::mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: A new note is submitted by the browser
    Note right of browser: The new note is added to the list of notes and the list element is reloaded
    Note right of browser: The new note is sent to the server
    browser->>server: POST: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server:server sends back the message "note created"
    server-->>browser:Status Code 201 (Success+Return Body)
    deactivate server
    Note right of browser: Console logs package from server
:::