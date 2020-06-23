Back end of MRCTC - a dummy rail e-ticketing app for Metropolitan cities of India, built using Node, Express and MongoDB.

To run the server locally:

1. Clone the repository
2. Install the dependencies: npm install
3. Install mongodb on your machine if necessary
4. Create a .env file at the root of the project with the following variables. Enter values of your choice in place of empty quotes.

PORT=3001   
MONGODB_DEV_URI=mongodb://localhost/mrctc   
TOKEN_SECRET=''   
ADMIN_PASSCODE=''   

To register as an admin from the local front-end, use the same admin passcode value that you add here.

5. Seed the database: npm run seed
6. Start the server: npm run dev