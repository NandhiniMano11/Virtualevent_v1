import React, { useState } from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PostReg from '../apicalls/RegApi';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
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
}));

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [opensuccess, setOpensuccess] = useState(false);
    const [openerror, setOpenerror] = useState(false);
    const [message, setMsg] = useState('');
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [emailId, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [jobtitle, setJobtitle] = useState("");
    const [phone, setPhone] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const handleSubmit = (evt) => {
       if (!loading) {
            setLoading(true);
        } 
        evt.preventDefault();
        let postData = {
            "emailId": emailId,
            "jobtitle": jobtitle,
            "company": company,
            "phone": phone,
            "last_name": lname,
            "first_name": fname,
            "address1": address1,
            "address2": address2,
            "country": country,
            "state": state,
            "zipcode": zipcode,
            "city": city
        }
        PostReg(postData, function (error, data) {
            setLoading(false);
            if (data !== undefined) {
                if (data.statusCode === 200) {
                    setMsg(data.msg);
                    setOpensuccess(true);
                    setFirstName(''); setLastName('');
                    setEmail(''); setCompany('');
                    setJobtitle(''); setPhone('');
                    setAddress1(''); setAddress2('');
                    setCountry(''); setState('');
                    setZipcode(''); setCity('');
                    return <Redirect to='/dashboard'/>
                } else {
                    setMsg(data.msg);
                    setOpenerror(true);
                }
            }
        })

    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        opensuccess ? setOpensuccess(false) : setOpenerror(false);
    };

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Register</Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setFirstName(e.target.value)} variant="outlined" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="fname" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setLastName(e.target.value)} variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setEmail(e.target.value)} variant="outlined" required fullWidth id="workmail" label="Work-Email Address" name="workemail" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setPhone(e.target.value)} variant="outlined" required fullWidth id="workphone" label="Work Phone" name="workphone" autoComplete="phone" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setCompany(e.target.value)} variant="outlined" required fullWidth id="company" label="Company" name="company" autoComplete="company" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setJobtitle(e.target.value)} variant="outlined" required fullWidth id="jobtitle" label="Job title" name="jobtitle" autoComplete="jobtitle" />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField onChange={e => setAddress1(e.target.value)} variant="outlined" required fullWidth id="address1" label="Address 1" name="address1" autoComplete="address1" />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField onChange={e => setAddress2(e.target.value)} variant="outlined" required fullWidth id="address2" label="Address 2" name="address2" autoComplete="address2" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setCountry(e.target.value)} variant="outlined" required fullWidth id="country" label="Country" name="country" autoComplete="country" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setState(e.target.value)} variant="outlined" required fullWidth id="state" label="State" name="state" autoComplete="state" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setCity(e.target.value)} variant="outlined" required fullWidth id="city" label="City" name="city" autoComplete="city" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => setZipcode(e.target.value)} variant="outlined" required fullWidth id="zipcode" label="Zip code" name="zipcode" autoComplete="zipcode" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="gdprconsenttext" color="primary" />}
                                    label="GDPR consent Text" />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit} className={classes.submit}>Register</Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">Already have an account? Login</Link>
                            </Grid>
                        </Grid>
                        <Snackbar open={opensuccess} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">{message}</Alert>
                        </Snackbar>
                        <Snackbar open={openerror} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">{message}</Alert>
                        </Snackbar>
                    </form>
                </div>

            </Grid>
        </Grid>
    );
}
