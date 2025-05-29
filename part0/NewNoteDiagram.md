:::mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST: https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: new_note gets added to the array of Notes
    server -->> browser:Status Code: 302 (Redirect)
    deactivate server
    
    
    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser:HTML document
    deactivate server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS style
    deactivate server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server
    Note right of browser: The script requires a JSON file

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "", date: "2025-05-29T08:48:39.067Z"},…]
    deactivate server
    Note right of browser: main.js Creates an unordered list element with each note being a list item
:::