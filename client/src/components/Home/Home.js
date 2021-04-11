import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Radio,
     Container, FormLabel, FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import axios from 'axios';
import AfterLogin from '../AfterLogin';


const initialState = { firstname: '', lastname: '', username: '', password: '', confirmPassword: '', role: '' };

const Home = (props) => {
    const [form, setForm] = useState(initialState);
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [value, setValue] = React.useState();
    const apiURL = "http://localhost:5000/project";
    
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
    
    const updateRadiotValue = (e) => {
        form.role=e.target.value;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isSignup) {
            if(form.password !== form.confirmPassword) {
                alert("Passwords don't match");}
            else{
                delete form.confirmPassword;
                axios.post(apiURL+"/signup",form);
            } 
        } else {
            let username = form.username;
            let password = form.password
            const loginData = { username, password };
            axios.post(apiURL+"/signin", loginData).then(res =>{
                localStorage.setItem('token', res.data.token)
                props.history.push('/afterlogin')
            }).catch(error => {
                console.log(error);
            });
        }
      };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    { isSignup && (
                        <>
                        <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus />
                        <Input name="lastname" label="Last Name" handleChange={handleChange}  />
                        <div>
                        <FormControl component="fieldset">
                          <FormLabel row component="legend">Role: </FormLabel>
                          <RadioGroup row aria-label="role" name="role" value={value} onChange={updateRadiotValue}>
                              <FormControlLabel value="nurse" control ={<Radio />} label="Nurse" />
                              <FormControlLabel value="patient" control ={<Radio />} label="Patient" />
                          </RadioGroup> 
                        </FormControl>
                        </div>
                    </>)}
                        <Input name="username" label="Username" handleChange={handleChange} autoFocus />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>{ isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Home;
