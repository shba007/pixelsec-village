# Affinidi Dataville

> Affinidi Dataville Game

| Screen   | Scene   | Describtion                               |
| -------- | ------- | ----------------------------------------- |
| 0        | 0       | Welcome To DataVille                      |
| 0        | 1       | Flouris Shop (No Popup)                   |
| 0        | 2       | Let the Adventure Begin                   |
| 0        | 3       | Select Your Avatar                        |
| 0        | 4       | Read Terms and Conditions                 |
| 0        | 5       | (Conditional) Terms and Conditions        |
| 0        | 6       | (Need Transition)                         |
| 1        | 7       | (Need Pause)                              |
| 1        | 8       | Verify age                                |
| 1        | 9       | Spend Your Time                           |
| 2        | 10      | Need Transition                           |
| 2        | 10      | Need Transition                           |

### Instructions

1. Change the following files

    - In .env file change the followings

        VITE_BASE_URL=<the offical url>
        VITE_API_BASE_URL=<the api endpoint>
        VITE_API_KEY=<if any api key required else empty>

    - In public/html change the followings
        
        - In strawhut.html change the followings

            - in meta property="canonical_url" change the content attribute from https://affinididataville.webspiders.com -> <the offical url>
            - in meta property="og:image" change the content attribute from https://affinididataville.webspiders.com/images/strawhut.jpg -> <the offical url>/images/strawhut.jpg
            - in meta property="og:url" change the content attribute from https://affinididataville.webspiders.com -> <the offical url>
            - in meta property="twitter:image" change the content attribute from https://affinididataville.webspiders.com/images/strawhut.jpg -> <the offical url>/images/strawhut.jpg
            - in meta property="twitter:url" change the content attribute from https://affinididataville.webspiders.com -> <the offical url>
        
        - In loghouse.html change the followings

            - Do the above steps in strawhut.html

        - In townhouse.html change the followings

            - Do the above steps in strawhut.html

        - In mansion.html change the followings

            - Do the above steps in strawhut.html

2. Run the commend `npm run build-only`

3. Upload the dist