import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {Storage} from '@aws-amplify/storage';
import { makeStyles } from '@material-ui/core/styles';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Collapse from '@material-ui/core/Collapse';
import { Snackbar } from '@material-ui/core';
import { Alert} from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import {CardContent } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import '../App.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#FF7F50'
  },
  button1: {
    margin: theme.spacing(1),
    backgroundColor: 'blue'
  },
  root1:{
    background:'green',
    color: 'white',
  },
  body:{ 
    width:600,
  }
}))
const muiTheme = createMuiTheme({});

export default function RecordingField(props)
{
  const classes = useStyles();
  const [DisableEdit, setDisableEdit] = useState(false)     //for Edit button
  const [urls,setUrl]=useState({})
  const [DisableUpload,setDisableUpload]=useState(false)      //for upload button
  const [open,setOpen]=useState(false)    // view for new recorder
  const [showPlay,setshow]=useState(false)    //view to open audi file
  const [success,setSuccess]=useState(false)
  const [view,setView]=useState(false)
  const [aud,setaud]=useState(
    {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    })
    const HandleEdit=()=>{
      setOpen(true)
      setView(false)
    }
  const HandleUpload=()=>{
    setOpen(true)
  }
  const HandleChange=(e)=>{           //for handling new recording
    setaud(e)
  }
  const SaveFile=(file)=>{            //for saving the new recording into s3 bucket
    Storage.put(props.name,file,{
      contentType:"audio/wav"
    }).then(()=>{
      setSuccess(true)
      setDisableUpload(true)
      setshow(false)
      setDisableEdit(false)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const handleClose = (event,reason) => {
    // setDisableEdit(false)
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  };
  const handleRest=()=> {                 //used for resetting the recording 
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    setaud(reset)
  }
  const viewPlay=(e)=>{
    Storage.get(e)
    .then((result)=>{
      setUrl(result)
      setView(true)
      setOpen(false)
    })
  }
  useEffect(()=>{
    Storage.get(props.name,{
      download:true
    })
    .then(()=>{
      console.log(props.name)
      setDisableEdit(false)
      setshow(false)
      setDisableUpload(true)
    })
    .catch(()=>{
      setDisableEdit(true)
      setshow(true)
      setDisableUpload(false)
    })
  },[props.name])
  return(
    <>
    <div class="container">
        <div><label>{props.nickname}</label></div>
        <div><Button variant="contained" disabled={showPlay} color="primary" onClick={()=>viewPlay(props.name)} className={classes.button1} startIcon={<VisibilityIcon/>}>View </Button></div>
       <div><Button variant="contained" disabled={DisableEdit} color="secondary" onClick={()=>HandleEdit()} startIcon={<EditIcon/>}>Edit</Button></div>
       <div><Button
        variant="contained"
        disabled={DisableUpload}
        className={classes.button}
        onClick={()=>HandleUpload()}
        startIcon={<CloudUploadIcon />}
      >Upload</Button></div>
       </div>
      <Collapse in={view}>
        <ThemeProvider theme={muiTheme}> 
        <AudioPlayer  src={urls} />
        </ThemeProvider>
        <br></br>
      </Collapse>
      <Collapse in={open}>
      <Card>
      <CardContent >
      {props.script}
      </CardContent>
      </Card>
      <Recorder
            record={true}
            title={"New recording"}
            audioURL={aud.url}
            handleAudioStop={data=>HandleChange(data)}
            handleAudioUpload={data=>SaveFile(data)}
            handleRest={()=>handleRest()}
            />
            <br></br>
      </Collapse>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert className={classes.root1} onClose={handleClose} severity="success">
          successfully stored data
        </Alert>
      </Snackbar>
      <br></br>     
      </>
  )
}

RecordingField.propTypes={
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    script: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}