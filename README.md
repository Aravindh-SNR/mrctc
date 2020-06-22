MRCTC - a (dummy) subset of IRCTC for Metropolitan cities of India

To run the server locally,

1. Clone the repository
2. Install the dependencies - npm install
3. Install mongodb on your machine if necessary
4. Create a .env file with the variables given at the end. Enter values of your choice in place of empty quotes.
5. Seed the database - npm run seed
6. Start the server - npm run dev

PORT=3001
MONGODB_DEV_URI=mongodb://localhost/mrctc
TOKEN_SECRET=''
ADMIN_PASSCODE=''

To register as an admin from the front-end, use the same admin passcode value that you add here.