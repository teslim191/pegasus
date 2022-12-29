# pegasus
# A full-server side application built ontop of Node and Express and a Mongo DataBase.
In this web application, users can create account and sign in to their dashboard as merchants and a unique ID get generated for them automatically which they can share
with their customer. on their dashboard, merchants can verify their accounts, add products to their catalogues, view, edit and delete products.
users can purchase a product using the squadco payment gateway.

#purpose of project
The purpose of this project is to learn how to integrate the squadco payment system. it was also meant to solidify my knowledge of node, express and mongodb.

# how to use
1. you can clone the repo or download as a zip file and extract.
2. run npm install in your terminal.
3. create a .env file in the config folder and add a couple of parameters like your mongo uri connection string, port number and secret token for session and your public key for squadco payment integration.
4. run npm run dev and go to  http://localhost:8080
