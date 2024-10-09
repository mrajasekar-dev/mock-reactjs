# MOCK-REACTJS: Opportunities, Quotes, and Quote Line Items Application

## Overview
This project is a React application designed to display opportunities, quotes, and quote line items in a structured and visually appealing way. It uses Material-UI components for a modern and responsive UI, making it easy to navigate and view details about each account, opportunity, and related quotes.

### Key Features:
- **Account Information:** Displays account details like name, industry, owner, and location.
- **Opportunities Management:** Opportunities are categorized into **Open**, **In-Progress**, and **Closed** stages.
- **Expandable Cards:** Users can expand/collapse each opportunity to view related information, including quotes and line items.
- **Material-UI Integration:** Uses Material-UI components such as **Card**, **Accordion**, **Button**, and **Typography** to create a modern UI.

## Getting Started

### Prerequisites
- **Node.js** (v14 or above recommended)
- **npm** or **yarn** (for dependency management)

### Installation
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory**:
   ```bash
   cd MOCK-REACTJS
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
   or if you prefer yarn:
   ```bash
   yarn install
   ```

### Running the Application
To start the application in development mode:
```bash
npm start
```
or
```bash
yarn start
```

The application will be available at **http://localhost:3000**.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: For modern and responsive UI components.
- **JavaScript (ES6+)**: The primary language used for logic.
- **HTML/CSS**: For structuring and styling the components.

## Project Structure
- **src/index.js**: Entry point of the React application, rendering the main component.
- **src/App.js**: Main application file, responsible for rendering account details, opportunities, and their details.
- **src/components/Opportunities.js**: A reusable component to display detailed opportunities information.
- **src/components/Quotes.js**: Component responsible for displaying quotes related to opportunities.
- **src/components/QuoteLineItems.js**: Component responsible for displaying quote line items.
- **src/index.css**: General styles applied to the application.
- **src/App.css**: Custom styles for the main application.
- **public/**: Contains the HTML template for the application.

## Deployment

### Salesforce LWC Integration
To embed this React app into **Salesforce Lightning Experience** using **Lightning Web Components (LWC)**, you can follow these steps:

1. **Build the React App**
   - Run the following command to create a production-ready build:
     ```bash
     npm run build
     ```
   - This will generate a **build/** folder with all the assets required for deployment.

2. **Host the Built App**
   - Upload the build files to a **static resource** in Salesforce. This allows the application assets to be accessed by Salesforce components.

3. **Create LWC Component**
   - Create an LWC component to embed the React app:
   ```xml
   <!-- opportunitiesQuotes.html -->
   <template>
     <div class="opportunities-quotes-app">
       <lightning-container src="/resource/build/index.html" class="container"></lightning-container>
     </div>
   </template>
   ```
   - The `lightning-container` tag can be used to display third-party content or hosted HTML/JavaScript apps.

4. **Deploy to Salesforce**
   - Deploy the LWC component to Salesforce and add it to an account page.

### Additional Notes
- Ensure that the Salesforce **Content Security Policy (CSP)** allows for third-party resources, or use **Lightning Out** if direct embedding faces issues.
- React apps are typically embedded using **iframes** or **containers** in Salesforce for compatibility.

## Folder Structure
```
.
├── public
│   └── index.html
├── src
│   ├── App.js
│   ├── App.css
│   ├── components
│   │   ├── Opportunities.js
│   │   ├── Quotes.js
│   │   ├── QuoteLineItems.js
│   │   └── Quotes.css
│   ├── index.js
│   ├── index.css
└── README.md
```

## Customization
- **UI Customization**: You can customize the UI by modifying **App.css** or adding your own Material-UI styles using the `sx` prop.
- **Opportunities Data**: Currently, the data is hardcoded in `App.js`. Replace it with an API call or Salesforce backend to dynamically retrieve data.

## License
This project is licensed under the MIT License. See the **LICENSE** file for more information.

## Acknowledgments
- **Material-UI** for the modern UI components.
- **Salesforce** for providing powerful integration capabilities.

---
Thank you for using the **MOCK-REACTJS: Opportunities, Quotes, and Quote Line Items Application**. Feel free to contribute or suggest any enhancements!