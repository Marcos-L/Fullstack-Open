:::mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS Styles
    deactivate server

    browser->>server: https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: spa.js defines functions to redraw the notes before requesting the data

    browser->>server: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file
    deactivate server
    
    Note right of browser: spa.js now defines the function to send data to server

    Note right of browser: Finally, the script remakes the form to update the list and send the data<br> to the server without reloading the page
:::