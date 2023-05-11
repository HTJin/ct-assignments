import React, { useState } from "react";
import firebase from "firebase/app";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
    getAuth,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Input, Input2 } from "../shared";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";

const signinStyles = {
    googleButton: {
        backgroundColor: "rgb(66, 133, 244)",
        margin: "2em",
        padding: 0,
        color: "white",
        height: "50px",
        width: "240px",
        border: "none",
        textAlign: "center",
        boxShadow: "rgb(0 0 0 / 25%) 0px 2px 4px 0px",
        fontSize: "16px",
        lineHeight: "48px",
        display: "block",
        borderRadius: "1px",
        fontFamily: "Roboto, arial, sans-serif",
        cursor: "pointer",
    },
    googleLogo: {
        width: "48px",
        height: "48px",
        display: "block",
    },
    typographyStyle: {
        fontFamily: "Roboto, arial, sans-serif;",
        textAlign: "center",
        fontSize: "2em",
    },
    containerStyle: {
        marginTop: "2em",
    },
    snackBar: {
        color: "white",
        backgroundColor: "#4caf50",
    },
};

const NavA = styled(Link)({
    display: "block",
    color: "black",
    fontFamily: "sans-serif",
    marginBottom: "20px",
});

// functional component to be used inside of SiginIn component
const Alert = (props: AlertProps) => {
    return <MUIAlert elevation={6} variant="filled" />;
};

interface buttonProps {
    open?: boolean;
    onClick?: () => void;
}

const GoogleButton = (props: buttonProps) => {
    const navigate = useNavigate();
    // const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const signIn = async () => {
        await signInWithGoogle();
        console.log(user);
        console.log(auth);
        if (auth.currentUser) {
            // storing authenticated user in a local variable
            localStorage.setItem("myAuth", "true");
            // navigate to dashboard after successful signin
            navigate("/dashboard");
        } else {
            console.log("Boooo");
            navigate("/signin");
        }
    };
    const signUsOut = async () => {
        await signOut(auth);
        // setting our localStorage to false for signout
        localStorage.setItem("myAuth", "false");
        navigate("/signin");
    };

    if (loading) {
        return <CircularProgress />;
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email);
            console.log(user.uid);
            localStorage.setItem("user_token", user.uid);
        }
    });

    const MyAuth = localStorage.getItem("myAuth"); // == 'true'
    console.log(MyAuth);

    if (MyAuth == "true") {
        return (
            <Button variant="contained" color="secondary" onClick={signUsOut}>
                Sign Out
            </Button>
        );
    } else {
        return (
            <Button sx={signinStyles.googleButton} onClick={signIn}>
                Sign In With Google
            </Button>
        );
    }
};

interface userProps {
    email?: void | string;
    password?: void | string;
}

export const SignIn = (props: userProps) => {
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();

    const handleSnackOpen = () => {
        setOpen(true);
    };

    const handleSnackClose = () => {
        setOpen(false);
        setAlertOpen(true);
    };

    const navToDash = () => {
        navigate("/dashboard");
    };

    // onSubmit to grab user information from the form
    const onSubmit = async (data: any, event: any) => {
        //Add option to sign in with a form
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                //Sign In
                //Store authenticated user in localStorage variable
                localStorage.setItem("myAuth", "true");
                const user = userCredential.user;
                navigate("/dashboard");
                window.location.reload()
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email);
            console.log(user.uid);
            localStorage.setItem("user_token", user.uid);
        }
    });

    return (
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input
                        {...register("email")}
                        name="email"
                        placeholder="Place Email Here"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input2
                        {...register("password")}
                        name="password"
                        placeholder="Place Password Here"
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            <NavA to="/signup">Don't Have an account? Register Now!</NavA>
            <GoogleButton open={open} onClick={handleSnackClose} />
            <Snackbar
                message="success"
                open={alertOpen}
                autoHideDuration={3000}
                onClose={navToDash}>
                <div>
                    <Alert severity="success">
                        <AlertTitle>
                            Successful Sign In --- Redirect in 3 seconds
                        </AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
    );
};

export const SignUp = (props: userProps) => {
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();

    const handleSnackOpen = () => {
        setOpen(true);
    };

    const handleSnackClose = () => {
        setOpen(false);
        setAlertOpen(true);
    };

    const navToSignIn = () => {
        navigate("/signin");
    };

    // onSubmit to grab user information from the form
    const onSubmit = async (data: any, event: any) => {
        //Add option to sign in with a form
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/signin");
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    };

    return (
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign Up Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input
                        {...register("email")}
                        name="email"
                        placeholder="Place Email Here"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input2
                        {...register("password")}
                        name="password"
                        placeholder="Place Password Here"
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSnackClose}>
                    Submit
                </Button>
            </form>
            <Snackbar
                message="success"
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleSnackClose}>
                <div>
                    <Alert severity="success">
                        <AlertTitle>
                            Successful Sign Up --- Redirect in 3 seconds
                        </AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
    );
};
