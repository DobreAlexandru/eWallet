
# eWallet

![Logo](https://firebasestorage.googleapis.com/v0/b/digitalizing-public-services.appspot.com/o/icon.svg?alt=media&token=93b43e86-ae94-4bbe-a972-9432ed93f73c)

After being a part of Softbinator Labs 2022, my project is an attempt to showcase the digitalization of a physical wallet.

## Description

My main idea while building this project was to prove that most of our important data can be moved from pieces of paper or plastic to the screens of our mobile phones and laptops.\
Considering that, my thought process started with creating an interface that can hold a digital ID card and important documents such as a birth certificate or a university degree.\
In the end, I can split my application into 4 main functionalities:
- **Identification**: a digital version of the usual plastic identity card
- **Documents**: cloud storage for important documents
- **Finance**: keeping track of expenses and income, basically offering the user the capability to keep a better track of their cash
- **Transportation**: simplifying bus and subway tickets

## Thought process


### Tech Stack
- **React** 
- **TypeScript** I was looking forward to learn more about TypeScript and felt that this project would be a good start.
- **Material UI** My preferred UI component library for this project. 
- **Framer Motion** Framer helped me create most of this app's animations. Reordering the items in the dashboard is a good use case for Framer Motion.
- **Firebase** I use Firebase as my go-to BaaS. In this project I've used features such as Authentication, cloud Storage and Firestore. Firebase is at the core of this app, allowing me to be able to store users and their data.
- **Stripe** Implemented a working payment functionality so the user could purchase transportation tickets within the app, while also following the rules and regulations of online payments, thus, keeping the app PCI compliant.
- **Vite** I chose Vite as my preferred build tool because of its Hot Module Replacement feature and quick build times
- **NodeJS** I've used Node.JS to be able to correctly implement Stripe's functionality. The server app is hosted on Heroku.

### Components 

#### Auth Context
My entire app is wrapped by a context hook which, with the help of Firebase, provides me a value for the user whenever I switch between routes.\
Alongside the user, the context holds useful functions for logging in, logging out, creating an account and initialising its database and an observer for whenever the user state changes.

#### Dashboard
The app's main navigation menu has been made in such a way that it could be reusable in different parts of the app.\
I have also added hover animations and the ability to reorder the menu by using Framer Motion.

#### Identification 
The Identification component is where the user can visualize their personal information.\
Although the component does not hold much functionality, the visual card has two sides that can be turned with the press of a button, showcasing different kinds of data.\
The back piece contains a QR code which can be scanned by any camera and will lead to a link that showcases the user's data by whoever scans it.\
This idea's main use would help police identifying citizens easier, but also medics discovering critical data in case of emergencies.\
The QR code is generated when the account is first created and never changes. On account creation, two new database entries will be made available, one storing the user data, and one pointing the unique QR code to the correct user.

#### User
User is only accessible whenever a QR code is scanned.\
The QR code points to a link where I've made use of the useParams function from React Router. The link holds a code that points to the user's account.\
The user page holds 3 categories: personal data, legal data and health data.

#### Documents
The Documents component is a cloud storage split into 4 categories:
- identification: for example a birth certificate
- health: GreenPass, a medical consultation, a perscription
- finance: bills
- educations: university degrees
All of those categories could be changed without drastically changing the source code, all we need is an idea, an icon and a name.\
On the page the user has access to 3 different things: the bottom navigation, an upload button and the documents.\
The documents dynamically render based on the selected category. I've approached this by passing a value to each of the buttons in the navigation menu. That value leads to a database, so whenever the value changes, the selected database will also change. \
All available documents are rendered on the main window, where the user can either click the icon to preview the document (using the react-pdf external library) or an options menu, which opens a popover that offers the user the possibility to delete, share or download the selected document.\
Finally, the upload button is a custom hook I built that takes a file and a file type as an argument and attempts to upload the file to the Firebase Cloud Storage. If successful, the hook returns a download url which is afterwards added to the user's database, alongside the file name. On this page, the only accepted file type is pdf.

#### Travel
This component offers the user the possibility to purchase different types of transportation tickets, while also viewing their tickets in an elegant manner.\
As mentioned before, this tab uses the icons already built for the main menu, while each of them redirecting to a checkout link depending on the type of ticket the user wishes to purchase.\
