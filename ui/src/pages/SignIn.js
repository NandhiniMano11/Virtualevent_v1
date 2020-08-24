import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import FormLabel from '@material-ui/core/FormLabel';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostSendotp from '../apicalls/PostSendotp';
import PostVerifyotp from '../apicalls/PostVerifyotp';
import {
    Redirect
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    image: {
        backgroundImage: 'url(https://miro.medium.com/max/7200/1*XN_4_niZfzyiKEiR0Qw6LA.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function SignIn() {
    let textInput = useRef(null);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [opensuccess, setOpensuccess] = useState(false);
    const [openerror, setOpenerror] = useState(false);
    const [message, setMsg] = useState('');
    const [emailId, setEmail] = useState('');
    const [otpDes, setOtpDes] = useState(false);
    const [otp, setOtp] = useState('');
    const [txt_name, setTxtname] = useState('email');
    const [txt_label, setTxtlable] = useState('Email Id');
    const [btn_text, setBtntext] = useState('Send Otp');
    const [btn_flag, setBtnflag] = useState(true);
    const renderOTPtext = () => {
        if (otpDes) {
            return <FormLabel>One Time Password(OTP) has been send to your mailId.<br /> Please enter the same here to login </FormLabel>
        }
    }
    const handleSubmit = (evt) => {
        if (!loading) {
            setLoading(true);
        }
        if (btn_flag) {
            let postData = { 'emailId': emailId }
            PostSendotp(postData, function (error, data) {
                setLoading(false);
                if (data !== undefined) {
                    if (data.statusCode === 200) {
                        setMsg(data.msg); setOpensuccess(true);
                        setBtnflag(false); setBtntext('Verify OTP');
                        setTxtlable('OTP'); setTxtname('otp');
                        setOtpDes(true);
                        textInput.current.value = "";

                    }
                    else { setMsg(data.msg); setOpenerror(true); }
                }
                else { setMsg(error); setOpenerror(true); }
            })
        } else {
            let postData = { 'otp': otp, 'emailId': emailId }
            PostVerifyotp(postData, function (error, data) {
                setLoading(false);
                if (data !== undefined) {
                    if (data.statusCode === 200) {
                        setMsg(data.msg); setOpensuccess(true);
                    }
                    else { setMsg(data.msg); setOpenerror(true); setBtnflag(false); }
                }
                else { setMsg(error); setOpenerror(true); }
            })
        }
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant='filled' {...props} />;
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        opensuccess ? setOpensuccess(false) : setOpenerror(false);
    };
    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>Sign in</Typography>
                    <form className={classes.form} noValidate>
                        {renderOTPtext()}
                        <TextField inputRef={textInput}
                            onChange={e => txt_name === 'otp' ? setOtp(e.target.value) : setEmail(e.target.value)} variant='outlined' margin='normal' required fullWidth id={txt_name} label={txt_label} name={txt_name} autoFocus />
                        <div className={classes.wrapper}>
                            <Button disabled={loading} onClick={handleSubmit} fullWidth variant='contained' color='primary' className={classes.submit}>{btn_text}</Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}</div>
                        <Grid container>
                            <Grid item>
                                <Link href='/signup' variant='body2'>{"Don't have an account? Register"}</Link>
                            </Grid>
                        </Grid>

                        <Snackbar open={opensuccess} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity='success'>{message}</Alert>
                        </Snackbar>
                        <Snackbar open={openerror} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity='error'>{message}</Alert>
                        </Snackbar>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
