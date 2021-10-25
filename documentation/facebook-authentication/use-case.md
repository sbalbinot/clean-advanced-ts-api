# Facebook Authentication

> ## Data
* Access token

> ## Primary flow
1. Get data (name, email, and Facebook ID) from the Facebook API
2. Check if there is a user with the email received above
3. Create an account for the user with the data received from Facebook
4. Create an access token, from user ID, with expiration of 30 minutes
5. Return the generated access token

> ## Alternative flow: User already exists
3. Update the user's account with the data received from Facebook (Facebook ID and name - only update the name if the user's account does not have a name)

> ## Exception flow: Invalid or expired token
1. Return an authentication error
