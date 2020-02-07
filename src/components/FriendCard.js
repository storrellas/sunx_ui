import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



// Project imports
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

const styles = theme => ({
  card: {
    maxWidth: 345,
    width: "100%",
    padding: 10
  },
  media: {
    height: 140,
  },
  content: {
    padding: 0,
    width: "100%"
  }
});

class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  render() {
    const { sportDict, friend, handleAddFriend, classes } = this.props;
    const picture = `${config.BASE_API_URL}${friend.picture}`

    console.log("-- FriendCard --")
    console.log(friend)
    


    // Generate arrays 
    // NOTE: Max two items and this should be reviewed
    const like_to_try_pattern = 'like_to_try'
    const already_played_pattern = 'already_played'
    const like_to_try = []
    const already_played = []
    for (const sport of friend.sports) {
      if(sport.result == like_to_try_pattern && like_to_try.length < 2 ){
        like_to_try.push( sportDict[sport.sport] )
      }
      if(sport.result == already_played_pattern && already_played.length < 2 ){
        already_played.push( sportDict[sport.sport] )
      }
    }


    return (
      <Card className={classes.card} onClick={this.props.handleAddFriend}>
        <CardActionArea>
          <Box style={{ display:'flex', width:"100%", height: "5em"}}>
            <img height="100%" src={picture} />
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              {friend.first_name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              {friend.last_name}
            </Typography>
          </Box>
          <CardContent classes={{ root: classes.content }}>

            <Box pt={2} pl={1} pr={1} mt={0} mb={2} style={{ width:"100%"}}>
              <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div style={{ height: "20%" }}>Like to Try</div>

                    <Grid container style={{ height: "80%"}}>
                      {like_to_try.map( (sport,index) => 
                        <Grid key={index} item xs={6}>
                          <img width="100%" src={sport} />
                        </Grid>
                      )}
                    </Grid>

                  </Grid>
                  <Grid item xs={6} style={{ borderLeft : "1px solid grey"}}>
                    <div>Already Played</div>

                    <Grid container style={{ height: "80%"}}>
                      {already_played.map( (sport,index) => 
                          <Grid key={index} item xs={6}>
                            <img width="100%" src={sport} />
                          </Grid>
                        )}
                    </Grid>

                  </Grid>
                </Grid>
              </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }


}
export default withStyles(styles)(MediaCard);
