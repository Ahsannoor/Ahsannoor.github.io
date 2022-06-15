// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink, withRouter } from 'react-router-dom';
// //import PropTypes from 'prop-types';
// import validate from 'validate.js';
// import { makeStyles } from '@material-ui/styles';
// import {
//   //Grid,
//   Button,
//   TextField,
//   //Typography,
//   CircularProgress
// } from '@material-ui/core';
// import { NotificationManager } from 'react-notifications';
// //import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// //import firebase from '../../Firebase'
// //import {auth} from '../../Firebase'
// // import clsx from 'clsx';
// // import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// // import ErrorIcon from '@material-ui/icons/Error';
// // import InfoIcon from '@material-ui/icons/Info';
// // import CloseIcon from '@material-ui/icons/Close';
// // import { amber, green } from '@material-ui/core/colors';
// // import IconButton from '@material-ui/core/IconButton';
// // import Snackbar from '@material-ui/core/Snackbar';
// // import SnackbarContent from '@material-ui/core/SnackbarContent';
// // import WarningIcon from '@material-ui/icons/Warning';

// const schema = {
//     email: {
//       presence: { allowEmpty: false, message: 'is required' },
//       email: true,
//       length: {
//         maximum: 64
//       }
//     },
//     password: {
//       presence: { allowEmpty: false, message: 'is required' },
//       length: {
//         maximum: 128
//       }
//     },
//     repassword: {
//       presence: { allowEmpty: false, message: 'is required' },
//       length: {
//         maximum: 128
//       }
//     }
//   };

//   const useStyles = makeStyles(theme => ({
//     root: {
//     //   backgroundColor: theme.palette.background.default,
//       height: '100%'
//     },
//     grid: {
//       height: '100%'
//     },
//     quoteContainer: {
//       [theme.breakpoints.down('md')]: {
//         display: 'none'
//       }
//     },
//     quote: {
//       backgroundColor: theme.palette.neutral,
//       height: '100%',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundImage: 'url(/images/auth.jpg)',
//       backgroundSize: 'cover',
//       backgroundRepeat: 'no-repeat',
//       backgroundPosition: 'center'
//     },
//     quoteInner: {
//       textAlign: 'center',
//       flexBasis: '600px'
//     },
//     quoteText: {
//       color: theme.palette.white,
//       fontWeight: 300
//     },
//     name: {
//       marginTop: theme.spacing(3),
//       color: theme.palette.white
//     },
//     bio: {
//       color: theme.palette.white
//     },
//     contentContainer: {},
//     content: {
//       height: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     contentHeader: {
//       display: 'flex',
//       alignItems: 'center',
//       paddingTop: theme.spacing(5),
//       paddingBototm: theme.spacing(2),
//       paddingLeft: theme.spacing(2),
//       paddingRight: theme.spacing(2)
//     },
//     logoImage: {
//       marginLeft: theme.spacing(4)
//     },
//     contentBody: {
//       flexGrow: 1,
//       display: 'flex',
//       alignItems: 'center',
//       [theme.breakpoints.down('md')]: {
//         justifyContent: 'center'
//       }
//     },
//     form: {
//       paddingLeft: 100,
//       paddingRight: 100,
//       paddingBottom: 125,
//       flexBasis: 700,
//       [theme.breakpoints.down('sm')]: {
//         paddingLeft: theme.spacing(2),
//         paddingRight: theme.spacing(2)
//       }
//     },
//     title: {
//       marginTop: theme.spacing(3)
//     },
//     socialButtons: {
//       marginTop: theme.spacing(3)
//     },
//     socialIcon: {
//       marginRight: theme.spacing(1)
//     },
//     sugestion: {
//       marginTop: theme.spacing(2)
//     },
//     textField: {
//       marginTop: theme.spacing(2)
//     },
//     signInButton: {
//       margin: theme.spacing(2, 0)
//     }
//   }));
// const Login = props => {

//     const { history } = props;

//   const classes = useStyles();
//   const [isLoading,setIsLoading] = useState(false)

//     const [formState, setFormState] = useState({
//         isValid: false,
//         values: {},
//         touched: {},
//         errors: {}
//       });

//       useEffect(() => {
//         const errors = validate(formState.values, schema);

//         setFormState(formState => ({
//           ...formState,
//           isValid: errors ? false : true,
//           errors: errors || {}
//         }));
//       }, [formState.values]);

//     //   const handleBack = () => {
//     //     history.goBack();
//     //   };

//       const handleChange = event => {
//         event.persist();

//         setFormState(formState => ({
//           ...formState,
//           values: {
//             ...formState.values,
//             [event.target.name]:
//               event.target.type === 'checkbox'
//                 ? event.target.checked
//                 : event.target.value
//           },
//           touched: {
//             ...formState.touched,
//             [event.target.name]: true
//           }
//         }));
//       };

//     const hasError = field =>
//     formState.touched[field] && formState.errors[field] ? true : false;

//     const handleSignUp = event => {
//         event.preventDefault();
//         // console.log('formState.values.',formState.values)
//         if(formState.values.password!==formState.values.repassword){
//           NotificationManager.error('Passwords do not match!')
//           return
//         }
//         setIsLoading(true)
//         setTimeout(()=>{
//             props.history.push('/')
//         },1000)
//         // console.log('sigin up details: ',formState)
//     }

//     return (<div>
//         <div className={classes.content} >
//             {/* <div className={classes.contentHeader}>
//               <IconButton onClick={handleBack}>
//                 <ArrowBackIcon />
//               </IconButton>
//             </div> */}
//             <div className={classes.contentBody} style={{display:'flex',justifyContent:'center',backgroundColor:'white'}}>

//               <form
//                 className={classes.form}
//                 onSubmit={handleSignUp}
//               >
//                 <img src={require('../../assets/images/pepsico mexico.png')} alt='logo' style={{height:'250px',display: 'block',margin: '28px auto 0px'}} />

//                 <TextField
//                   className={classes.textField}
//                   error={hasError('email')}
//                   fullWidth
//                   helperText={
//                     hasError('email') ? formState.errors.email[0] : null
//                   }
//                   label="Email address"
//                   name="email"
//                   onChange={handleChange}
//                   type="text"
//                   value={formState.values.email || ''}
//                   variant="outlined"
//                 />
//                 <TextField
//                   className={classes.textField}
//                   error={hasError('password')}
//                   fullWidth
//                   helperText={
//                     hasError('password') ? formState.errors.password[0] : null
//                   }
//                   label="Password"
//                   name="password"
//                   onChange={handleChange}
//                   type="password"
//                   value={formState.values.password || ''}
//                   variant="outlined"
//                 />
//                 <TextField
//                   className={classes.textField}
//                   error={hasError('password')}
//                   fullWidth
//                   helperText={
//                     hasError('password') ? formState.errors.repassword[0] : null
//                   }
//                   label="Re-enter Password"
//                   name="repassword"
//                   onChange={handleChange}
//                   type="password"
//                   value={formState.values.repassword || ''}
//                   variant="outlined"
//                 />
//                 <Button
//                   className={classes.signInButton}
//                   style={{backgroundColor:'#004B93',color:'#fff',height:'50px'}}
//                   disabled={!formState.isValid}
//                   fullWidth
//                   size="large"
//                   type="submit"
//                   variant="contained"
//                 >
//                     {
//                         isLoading === true ?
//                         <CircularProgress size={25} style={{color:'#DF002C'}}/>
//                         :
//                         <span style={{fontSize:'15px'}}>Sign up</span>
//                     }
//                 </Button>
//                 <div style={{textAlign:'center',fontSize:'13px'}}>
//                 Already have an account?&nbsp;<RouterLink style={{margin:'15px 0px',color:'rgba(2,136,209 ,1)'}} to='/'>Sign In</RouterLink>
//                 </div>
//                 {/* <img src={require('../../assets/images/WiMetrix.png')} alt='logo' style={{height:'30px',display: 'block',margin: '20px auto 0px'}} />
//                 {/* <Typography */}
//                   color="textSecondary"
//                   variant="body1"
//                 >
//                   Don't have an account?{' '}
//                   <Link
//                     component={RouterLink}
//                     to="/sign-up"
//                     variant="h6"
//                   >
//                     Sign up
//                   </Link>
//                 </Typography> */}
//               </form>
//             </div>
//           </div>
//     </div>)
// }

// export default withRouter(Login);
