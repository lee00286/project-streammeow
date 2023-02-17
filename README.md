# Proposal

**Team Name**: Sleepless

**Project title**: StreamMeow

## Focus (frontend focused or backend focused)

Our web application will focus on frontend.

## Team Members

Adam Wu 1004266741

Weihang Chen 1004724097

Yena Lee 1004932068

## Description of the web application

A combination of streaming, Patreon, and shopping apps. Users will be able to sign up as creators and stream videos with a live chat. They can also set up different tiers of membership that subscribers can use to access exclusive content. They can also set up their store page to sell products like their own merchandise. The app will allow creators to upload and display the 3D model of the product.

## Complexity Points

What complexity points will this project contain:

- Three.js (2 points): We will allow users (creators) to upload and display the 3D model of their product.
- Unovis/Nivo (both are 1 point): Data visualization to view purchase history, mapping delivery status
- Socket.IO (2 points): Video streaming and real-time chat between creator and subscriber
- SendGrid (2 points): Users will receive email when they subscribe to a creator or buy a product from the website
- Stripe (2 points): Stripe will support subscription to creator and purchasing on the website
- Auth0 (1 point): Users can sign in to the website using Auth0 partners such as Google

Total: 10

(optional) What complexity points will be attempted as bonus for the challenge factor

- Web Audio API (1 point): Sound for buttons ([example](https://css-tricks.com/form-validation-web-audio/))
- PDF Reader (2 points): Creator can upload PDF content
- Push API (3 points): Send notification when a subscribed streamer is live

## Schedule

### Alpha Version

- Home Page
  - Users can view this page when they first visit the website
  - For not logged in users:
    - Website description, sign in/sign up buttons are visible
    - List of creators/artworks/lives are displayed
  - For logged in users:
    - List of creators/artworks/lives are displayed, prioritizing who they follow/are subscribed to
      - When a user clicks on creator’s profile, the user is directed to **Creator Content Page**
    - Can search for the creators/artworks
- Sign in/ sign up page
  - Users will be able to sign in and sign up with conventional email and password or Auth0
- Navigation bar
  - For not logged in users
    - Sign in and sign up buttons are visible
  - For logged in users
    - Logout button is visible (users are directed to the homepage)
    - Other menu buttons are visible
- Creator “Patreon” (subscription/membership) Page
  - Creators can create different levels of membership
  - Creators can edit/delete memberships
  - Users can see and choose the level of membership
    - When user chooses the level of membership, the user is directed to the **Purchase Page**
- Purchase Page
  - User can purchase product from creators
  - User can purchase subscriptions from creators
  - User can see a **Confirmation Page** when the purchase go through successfully

### Beta Version

- Creator Video Stream Ready Page
  - Creator can start the stream (set title, choose to turn on the camera/voice, set thumbnail etc.)
- Creator Video Stream Page
  - Creator can stream video
  - Creator can change information and settings
  - Creator and subscribers can have real time chat while streaming
- Creator Content Page
  - Creator Content Page is created for the user when they click "Become a Creator" button
  - Creator can display all of their uploaded artwork
  - When a user clicks on an artwork, the user is directed to **Creator Artwork Page**
  - Creator modal to create a store page
  - When a user clicks a button, the user is directed to **Creator Store Page**
- Creator Store Page
  - Creator modal to upload product
    - Creator can upload products to the store page and provide detailed information such as description, picture and price.
    - Creator can upload 3D models to store
  - Creator can display all their product
  - When user clicks on the product, the user is directed to the **Creator Product Page**
- Creator Product Page
  - Creator can display product information
  - Creator can edit/delete product
  - When user clicks buy/purchase button, the user is directed to the **Purchase Page**

### Final Version

- Creator Upload Page (this can be changed to modal…)
  - Creator can upload their artworks and provide detailed information about the artwork
- Creator Artwork Page
  - Creator can display artwork information
  - User can click like button to an artwork
  - User can leave comments to the artwork
  - Creator can edit/delete the artwork information
- Email service
  - User will receive email when they first sign up on our website
  - User will receive email when they subscribe to a creator
  - User will receive email when they purchase a membership
  - User will receive email when they purchase a product
- PDF reader
  - Creator can upload PDF as artwork
- User Page
  - User profile page
    - User can view/edit their profile
    - User can change setting for email service
    - User can delete their account
  - User purchase history page
    - User can see their purchase history with our data visualization tool
  - Shopping cart page
    - User can add product to shopping cart and view later
