import express from "express"
import { google } from "googleapis";
export const calenderroute = express.Router()

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGDCPFgKNgFAHL\nhC5DiAeFmYOJMA/aA3az4jmo/IiPyPFGwCUWYL5me+e2UXGV5CGDHAC463HpOWPj\nBnT1BHMu4Wk1spHlpxqJVm1JsvI+SufXkR0xrEgmgqy6ggo1BwZH31XPg40Zj2iI\n1HdKhhZBe2sZngmQy8gPwl65QXwTrn5w6L8G1K644eW1mWGJ9w3w1haVbmYZOqqb\ne8Ir9vRwD2cimiq5uzmOrDIgvMpzFb1ouduG84pwat36MhZFzVzR0B0B26yT1l8n\nvy27cwwJ5HYOMwY8tUGLQCRbRVeA7PJPztuIlFYesSbUsNAApgU9rviUdgC+JqtD\nuLGco91HAgMBAAECggEAGShwoNsFpfj/U2A6qkciQXqYps7irJyqXGZ9UaCmzlvF\n0+l+V0M53KCadOK6rZekbthvT7j6Uu4Ak4B9+fld574oVHMXLS0BkMxYUgziez7z\nsu1oX9Iqpi23uHI4JA1SOG4VTf5APdd6/YAT7p/C6FWVFiopEpTjGKa7IV3BX78e\nUHmow7McAqsuTDMSeCbyWE/D0LPWObK0MU1K+jJjm2OwgoGqOzzRkrQOsX+RMhpB\nskHaMVk/GwhRisFjXs+7/DrfSqnnKpsOCw+cOaEDF42Z5JxtXZIIxL9ArZ0dErH4\ngoOrbRqgrYQHGMuLkX0pxRuYTGmgqITXhQGEIJzRvQKBgQDxccrs4hxrLBX4so/y\nnyq/kWcHvw6jMfc+Inq/G4C9uNdy8e2fxpPVljmGi+lzMAw1opS1rA/BmhJmbgY5\niQK6TDwpV64UCIw+A43IWFOpm6j21Jb7YdeHQGFz66lXmG/hl/0PfeAEUn0zXqEd\nP/3k++x64DJGCTNuSjfqb/FVjQKBgQDR/JnVe/JIbPLtpAsejMg4uhzStN37jJap\nnn/CtF/VaziCriOxNgtLu8yt1vtI0cfj4BdzQdfVmarqgoCoMdlVpHXohEhnq+8t\nHXBGwgFN12RVtgEmSg0rfD0S7CoAzkhvbc21h4hrj9bXXbp9G5+313H+xHJQR/9O\ncgRQEKuXIwKBgQCsLRinqmrXpl2Yt0VdoFGswLS3WnDGweftYEsmIyfAo6LIbmuk\n58gepP0qzHVS1i2uxdzEXQnzZrq+XrGDsAfI8HpqhQM3eA0CYChoeUxYBBAOzPVK\nGLDI24ljT+e39pW6S1eEB6CLlIOB8XZ1VF/rPheaXGydcwxBFx4eyWtRNQKBgQDA\nHuW8fheRDiVBKZqGy/WQeS9P1O1YbiuWaw6nXJJl2CCu55Z+V10EYIGG96+W02CY\na/nomPBZXKwUvWvq9xjKk5rRLt50A8njtBB6nJvG1W/WP5xTpOLhy1yxiGNxs0pw\nsLzJ/oPhLYw6JWYveuuprzN8Dc4tB4JeClFJ08a6kwKBgQDfeWK+pBmZWVJzCtlT\npTr2h1j2UxiLob/9ZidlNQmx3zr/wQpp+fOLJEJleEVr7vv8RoHY3zBvRKXmHdzh\nEw/CX9P8xUrRAKwocYOvMb3eTDt5k69f9b370YaS5Jr8ZbrXiPHcE7TEf/BgYgsI\noqpCIWY7fYSDagWfRQ4gwDF3lQ==\n-----END PRIVATE KEY-----\n"
const GOOGLE_CLIENT_EMAIL = "calender-key@meet-c-362811.iam.gserviceaccount.com"
const GOOGLE_CALENDAR_ID = "aarryyyadav@gmail.com"
const GOOGLE_PROJECT_NUMBER = "35126992395"

const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);


const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});

calenderroute.route('/createvent').get((req, res) => {

    console.log("started")

    calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }, (error, result) => {
          if (error) {
              res.send(JSON.stringify({ error: error }));
            } else {
                if (result.data.items.length) {
                    res.send(JSON.stringify({ events: result.data.items }));
          } else {
            res.send(JSON.stringify({ message: 'No upcoming events found.' }));
          }
        }
      });

    
})