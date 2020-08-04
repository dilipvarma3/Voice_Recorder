import React from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import 'react-voice-recorder/dist/index.css'
import { configureAmplify, SetS3Config } from "./service";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {CardContent } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import RecordingField from './Components/RecordingField'
import {fields} from './Components/fields'

configureAmplify()
SetS3Config("test-bucket-amplify", "private");
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  root1:{
    background:'green',
    color: 'white',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  body:{
    minWidth:1900
  }
}));

function App(){
  const classes = useStyles();
    return (
      <>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Call Customizer
          </Typography>
          <AmplifySignOut class="button" style={{ float: 'right' }}  /> 
        </Toolbar>            
        </AppBar>
        <main className="body">
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Call Customizer
            </Typography>
                <Collapse in={true} className="body">
                  <Card > 
                  <CardContent > 
                  {fields.map((data)=>{
                              return <RecordingField name={data.name} nickname={data.nickname} script={data.script}/>
                  }
                  )}
                </CardContent>
                </Card>
                </Collapse>
          </Container>
        </div>
        </main>
        <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Win-Win Homesharing
        </Typography>
      </footer>
      </>
    );
}


export default withAuthenticator(App,true);



