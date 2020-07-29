# AuthButtons

## About this Component:

This component renders the buttons: Sign in with Google and Continue to Facebook.

## Usage

```javascript
import {AuthButtons} from 'components';
...
// Make a state to tell if the user is trying
// to login and is waiting for the authentication.
const [isLoading, setLoading] = useState(true);
...
return (
    <AuthButtons
        facebookLabel="Sign in to Facebook"
        googleLabel="Sign in to Google"
        loadingState={() => setLoading(true)}
    />
)
```

## API

### Required

#### facebookLabel

> The label for the Facebook Authentication button.

#### googleLabel

> The label for the Google Authentication button

#### loadingState

> The function to pass to tell if the user is trying to authenticate.

### Roadmap

-   [ ] Add a 'loading' feature so that loading state is not required anymore.
