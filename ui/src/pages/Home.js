import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Timer from "../component/Timer";
import logo from '../images/logo.png';
import bg from '../images/events_banner.svg'
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderWidth: 0,

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderSize: 0,
  },
  smallPaper: {
    textAlign: 'center',
    borderSize: 0,color:'white',borderColor:'white'

  },
  image: {
    textAlign: 'center',
    height: theme.spacing(20),
    padding: theme.spacing(2),

  },
  btn_spacing: {
    marginRight: theme.spacing(20),
    borderRadius: 13,
    fontSize: '1rem',color:'white',borderColor:'white'
  },
  btn_spacing1: {
    borderRadius: 13,
    fontSize: '1rem',color:'white',borderColor:'white'
  },
  fullheight: {
    height: '100%',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
  },

}));
const styles = {
  paperContainer: {
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

  },
  opacitycontainer: {
    background: 'rgba(1, 1, 1	,0.3)', height: '100vh',

  }
};

export default function App() {
  const classes = useStyles();
  function handleOnloginclick() {
  }
  function handleOnloginregclick() {

  }
  return (
    <div style={styles.paperContainer}>
      <div style={styles.opacitycontainer}> 
   <div className={classes.root}>
          <Grid container spacing={10} >
            <Grid item xs={12} key='0' >
              <div className={classes.paper}><img src={logo} className={classes.image} alt="logo" /></div>
            </Grid>
            <Grid item xs={12} key='1' >
              <div className={classes.paper}>
                <Link to='/signin' style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" className={classes.btn_spacing} onClick={handleOnloginclick}>Login</Button></Link>
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" className={classes.btn_spacing1} onClick={handleOnloginregclick}>Register</Button></Link>
              </div>
            </Grid>
            <Grid xl={3} item key='3'>
              <div className={classes.smallPaper} >Event Starts in</div>
            </Grid>
            <Timer></Timer>
          </Grid>
        </div>
    
</div></div>
  );
}
