import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TimerApi from "../apicalls/TimerApi";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderWidth: 0
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        borderSize: 0,
        height: theme.spacing(20),
    },
    smallPaper: {
        borderSize: 0,
    },
    image: {
        textAlign: 'center',
        height: theme.spacing(20),
        backgroundImage: 'url(https://lh3.googleusercontent.com/proxy/bP4tSjZlQg02_qzFIWKGhRUd0nJbfGfXJHitdGCSj-0duOQAGH0WTnxXp3WSj9LqZXnmOafV-4OtHBv8MayUjw)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    btn_spacing: {
        marginRight: theme.spacing(20),
    },

}));

export default function Timer() {
    const classes = useStyles();
    let date = '';
    TimerApi(function (error, data) {
        if (data !== undefined) {
            date = data.responseContent
        }
    })
    const calculateTimeLeft = () => {
        const difference = +new Date(date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });
    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <Grid xl={3} item key={timeLeft[interval] ? timeLeft[interval] + interval : 'grid00' + interval}>
                <Paper key={timeLeft[interval] ? timeLeft[interval] : '00' + interval} className={classes.smallPaper} elevation={0}>{timeLeft[interval] ? timeLeft[interval] : '00'} </Paper>
                <Paper key={interval + timeLeft[interval]} className={classes.smallPaper} elevation={0}> {interval}</Paper>
            </Grid>
        );
    });

    return (timerComponents.length ? timerComponents : <span>Time's up!</span>);
}
