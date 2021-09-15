# scratch-rest-api
Rest API to search clinics.

Search is done against https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json and https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json.
Available search parameters are:
- name: partial case insensitive search by clinic name.
- state: partial case insensitive search by state name or code.
- open: returns those clinics that are open at a given time. Parameter must incluse hours and minutes, i.e. 13:00

Sample URL: /clinics?name=cli&open=10:00&state=flo

Next improvements:
- Paging.
- Support for CORS.
- Introduce security with JSON web tokens.
