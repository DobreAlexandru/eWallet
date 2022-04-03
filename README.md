
# eWallet

![Logo](https://firebasestorage.googleapis.com/v0/b/digitalizing-public-services.appspot.com/o/icon.svg?alt=media&token=93b43e86-ae94-4bbe-a972-9432ed93f73c)

After being a part of Softbinator Labs 2022, my project is an attempt to showcase the digitalization of a physical wallet.\
You can view the app live at https://digitalwallet.netlify.app/


## About The Project
My main idea while building this project was to prove that most of our important data can be moved from pieces of paper or plastic to the screens of our mobile phones and laptops.\
Considering that, my thought process started with creating an interface that can hold a digital ID card and important documents such as a birth certificate or a university degree.\
In the end, I can split my application into 4 main functionalities:
- **Identification**: a digital version of the usual plastic identity card
- **Documents**: cloud storage for important documents
- **Finance**: keeping track of expenses and income, basically offering the user the capability to keep a better track of their cash
- **Transportation**: simplifying bus and subway tickets

![Menu Showcase](https://firebasestorage.googleapis.com/v0/b/digitalizing-public-services.appspot.com/o/InstallShowcase.webp?alt=media&token=83112b19-b439-4c50-af1a-2f2d6c365db1)
## Run Locally

Clone the project

```bash
  git clone https://github.com/DobreAlexandru/eWallet.git
```

Go to the project directory

```bash
  cd eWallet
```

Install dependencies

```bash
  npm install
```
To run this project, you will need to add the following environment variables to your .env.local file

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`

`VITE_STRIPE_PUBLIC_KEY`

\
Start the server

```bash
  npm run dev
```
Visit http://localhost:3000/

## Built With
- **React** 
- **TypeScript** I was looking forward to learn more about TypeScript and felt that this project would be a good start.
- **Material UI** My preferred UI component library for this project. 
- **Framer Motion** Framer helped me create most of this app's animations. Reordering the items in the dashboard is a good use case for Framer Motion.
- **Firebase** I use Firebase as my go-to BaaS. In this project I've used features such as Authentication, Cloud Storage and Firestore. Firebase is at the core of this app, allowing me to be able to store users and their data.
- **Stripe** Implemented a working payment functionality so the user could purchase transportation tickets within the app, while also following the rules and regulations of online payments, thus, keeping the app PCI compliant.
- **Vite** I chose Vite as my preferred build tool because of its Hot Module Replacement feature and quick build times
## Thought process

### Auth Context
My entire app is wrapped by a context hook which, with the help of Firebase, provides a user variable.\
Alongside the user, the context holds useful functions for logging in, logging out, creating an account and initialising its database and an observer for whenever the user state changes.

### Menu
The app's main navigation menu has been made in such a way that it could be reusable in different parts of the app.\
I have also added hover animations and the ability to reorder the menu by dragging the icons using Framer Motion.

### Identification 
The Identification component is where the user can visualize their personal information.\
Although the component does not hold much functionality, the visual card has two sides that can be turned with the press of a button, showcasing different kinds of data.\
The back piece contains a QR code which can be scanned by any camera and will lead to a link that showcases the user's data by whoever scans it.\
This idea's main use would help police identifying citizens easier, but also medics discovering critical data in case of emergencies.\
The QR code is generated when the account is first created and never changes. On account creation, two new database entries will be made available, one storing the user data, and one pointing the unique QR code to the correct user.

### User
User is only accessible whenever a QR code is scanned.\
The QR code points to a link where I've made use of the useParams hook from React Router. The link holds a code that points to the user's account.\
The user page holds 3 categories: personal data, legal data and health data.

### Documents
The Documents component is a cloud storage split into 4 categories:
- identification: for example a birth certificate
- health: GreenPass, a medical consultation, a perscription
- finance: bills
- educations: university degrees
On the page the user can interact with 3 different components: the bottom navigation, an upload button and the documents.\
The documents dynamically render based on the selected category. I've approached this by passing a value to each of the buttons in the navigation menu. That value leads to a database, so whenever the value changes, the selected database will also change. \
All available documents are rendered on the main window, where the user can either click the icon to preview the document (using the react-pdf external library) or an options menu, which opens a popover that offers the user the possibility to delete, share or download the selected document.\
Finally, the upload button is a custom hook I built, which takes a file and a file type as arguments and attempts to upload the file to the Firebase Cloud Storage. If successful, the hook returns a download url which is afterwards added to the user's database, alongside the file name. On this page, the only accepted file type is .pdf.

### Travel
This component offers the user the possibility to purchase different types of transportation tickets, while also viewing their tickets in an elegant manner.\
As mentioned before, this tab uses the icons already built for the main menu, while each of them are redirecting to a checkout link depending on the type of ticket the user wishes to purchase.\

### Checkout
The checkout page stores the different types of tickets that can be purchased, alongside their price.\
The useParams hook allows the component to render the ticket type and price the user wishes to purchase.\
On load, the page generates an expiry date depending on the ticket type. Monthly passes expire after one month, while single passes expire after a full year.\
Stripe offers the user the possibility to pay. When the payment is successful, the QR code is generated, using the uuid library, then the ticket is added to the user database, so they can view it in the ticket panel, the ticket database, where it points to the user that made the purchase and to the finance tab as an expense.\

### Tickets
Similar to the User component, all transportation QR codes can be scanned.\
My idea was that this component would help ticket inspectors check passenger tickets more easly.\
On scan, the ticket code points to the user that made the purchase.\
The ticket inspector is now able to view if the ticket is either expired or not, and if the ticket is a one time pass, they can also validate it, removing it from the database.

### Finance
The Finance route is split into 4 smaller components:
- A text line which calculates the user's total balance based on each transaction type
- Add Transaction, a small form where the user can choose details about a transaction
- Two pie charts that show details about all incomes and spendings
- A scrollable transactions list, where the user could preview and delete past transactions

On mobile phones, because of the small screen width, only one pie chart is displayed. To see different data, the user has to tap the chart to turn it around.\
Here I've had to make use of a couple of helper functions to rearrange the transactions in the database depending on different needs.\
One such function takes all the data and splits it into two objects, effectively sorting them by the transaction type (income or expense).\
Another one takes the data and sorts it by categories, then assigns each category a different color, for it to be later displayed on the pie charts.\

### Settings
The settings tab offers the user the possibility to modify personal data, such as the picture they desire to use on their ID card, the signature or basic information.\
The signature canvas has been made possible using the react-signature-canvas library.\
The picture upload button is the beforementioned useUpload custom hook I've built, but this time it accepts .png format types.
## Limitations
## What I'd change
- I've built the app before React 18.0 released. Probably one of the first things I'd change if I were to update would be to switch from using uuid to generate unique codes to the useID hook that's included in this new version.\
