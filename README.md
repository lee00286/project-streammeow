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

A combination of Twitch and Patreon. Users will be able to sign up as creators and stream videos with interactions. The creators can set up different tiers of membership that subscribers can use to access exclusive content.

## Complexity Points

What complexity points will this project contain:

- Sentry (1 point): Monitor performance and track errors in frontend and backend
- Nivo (1 point): Data visualization to view subscription and purchase history
- Pion WebRTC (2 points): Video streaming (one-to-many) with Selective Forwarding Unit (SFU)
- Stripe (2 points): Use Pricing model and Stripe Checkout to implement membership subscription feature
- Auth0 (1 point): Users can sign in to the website using Auth0 partners such as Google
- Web Audio API (1 point): Sound for buttons ([example](https://css-tricks.com/form-validation-web-audio/))

Total: 8

(optional) What complexity points will be attempted as bonus for the challenge factor

- SendGrid (2 points): Users will receive email when they subscribe to a creator or buy a product from the website
- Socket.io (2 points): Real-time many-to-many chat between creator and subscriber
- Push API (3 points): Send notification when a subscribed streamer is live

## Schedule

### Alpha Version

- Set up project
  - Set up routers to allow navigations within page components
  - Set up CORS and proxy
- Home Page
  - Users can view this page when they first visit the website
  - For not logged in users:
    - Website description, sign in/sign up buttons are visible
    - List of creators/artworks/lives are displayed
  - For logged in users:
    - List of creators/artworks/lives are displayed, prioritizing who they follow/are subscribed to
      - When a user clicks on creator's profile, the user is directed to **Creator Content Page**
    - Can search for the creators/artworks
- Navigation bar
  - For not logged in users
    - Sign in and sign up buttons are visible
  - For logged in users
    - Logout button is visible (users are directed to the homepage)
    - Other menu buttons are visible
- Sign in/Sign up page
  - Users will be able to sign in and sign up with conventional email and password or Auth0
- Creator "Patreon" (subscription/membership) Page
  - Implement UI of the Subscription Page
- Purchase Page
  - Implement UI of the Subscription Page
  - User can select the membership tier of the creator to subscribe
  - User can view the description and benefits of each membership tier
  - User can purchase for the membership (i.e. subscribe) using credit card information
  - User can see a **Confirmation Page** when the purchase go through successfully
  - User can download an invoice of the purchasement

### Beta Version

- Creator "Patreon" (subscription/membership) Page
  - Creators can create different levels of membership
  - Creators can edit/delete memberships
  - Users can see and choose the level of membership
    - When user chooses the level of membership, the user is directed to the **Purchase Page**
- Creator Video Stream Ready Page
  - Creator can start the stream (set title, choose to turn on the camera/voice, set thumbnail etc.)
  - If record option is checked, the creator can save one's video stream to their page
- Creator Video Stream Page
  - Creator can stream video to users (one-to-many)
  - Creator can change information and settings
  - Subscribers can give emoji reactions to the streaming video
- Creator Content Page
  - Creator Content Page is created for the user when they click "Become a Creator" button
  - Creator can display all of their streaming or streamed lives
  - When a user clicks on the live, the user is directed to **Creator Video Stream Page**
  - Creator can display all of their posts on separate tab from lives
  - When a user clicks on the post, the user is directed to **Creator Post Page**
- Creator Post Page
  - Creator can display the post with text and image(s)
  - Users can leave comment to the post

### Final Version

- Creator Video Stream Page
  - Creator can create a live poll and users can participate in the poll
  - Creator and subscribers can have real time chat while streaming
- Creator Upload Page (this can be changed to modal)
  - Creator can upload their posts
- Email service
  - User will receive email when they first sign up on our website
  - User will receive email when they subscribe to a creator
  - User will receive email when they purchase a membership
  - User will receive email when they purchase a product
- User Page
  - User profile page
    - User can view/edit their profile
    - User can change setting for email service
    - User can delete their account
  - User purchase history page
    - User can see their purchase history with our data visualization tool
