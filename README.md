# Account Overview React App

A React application that displays account details, opportunities, and quotes. It's designed to work with Salesforce data but also includes dummy data for development.

## Quick Start

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/account-overview-react-app.git
   ```

2. Install dependencies:
   ```bash
   cd account-overview-react-app
   npm install
   ```

3. Start the app:
   ```bash
   npm start
   ```

   Visit `http://localhost:3000` in your browser.

## Features

- Account details display
- Opportunities list with associated quotes
- Responsive design using Material-UI

## Salesforce Integration

The app receives data from a Salesforce LWC via `postMessage`. Expected data structure:

```
{
  type: 'SALESFORCE_DATA',
  payload: {
    Account: { ... },
    Opportunities: [ ... ],
    Quotes: [ ... ]
  }
}
```

If no Salesforce data is received, the app uses dummy data.

## Key Components

- `App.js`: Main component, handles data processing
- `AccountDetails`: Displays account information
- `OpportunityAccordion`: Shows opportunities and quotes

## Development

Dummy data in `App.js` allows for development without a Salesforce connection.

## Contributing

Contributions are welcome! Please submit a Pull Request.

## Screenshots
Accordion from External React Site<br>
![Accordion from External React Site](https://github.com/mrajasekar-dev/exp-comm/blob/main/screenshots/Accordion%20from%20External%20React%20Site.png)
<br><br>Quote Line Item Card from External React Site<br>
![Quote Line Item Card from External React Site](https://github.com/mrajasekar-dev/exp-comm/blob/main/screenshots/Quote%20Line%20Item%20Card%20from%20External%20React%20Site.png)

## License

MIT License
