```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: New JSON file
    deactivate server

    Note left of server: Server responds with 201, Created. No further requests from client

```