import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import ButtonBase from 'material-ui/ButtonBase';

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';
import RestoreIcon from 'material-ui-icons/Restore';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
//   root: {
//     width: 500,
//   },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});


class RecipeReviewCard extends React.Component {
  state = { expanded: false, value: 'recents' };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const images = [
        {
            url: '../images/HeavyJets.jpg',
            title: 'Heavy Jets',
            width: '40%',
        },
        {
            url: '../images/MidsizeJets.jpg',
            title: 'Midsize to Super Midsize Jets',
            width: '30%',
        },
        {
            url: '../images/LightJets.jpg',
            title: 'Light to Super Light Jets',
            width: '30%',
        },
    ];

      return (
          <div>
        <div className={classes.root}>
        {images.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            style={{
              width: image.width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subheading"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
          <div>
              <div style={{ paddingTop: 43 }}>
                  <div style={{}}>
                      <Card className={classes.card}>
                          <CardHeader
                              avatar={
                                  <Avatar aria-label="Recipe" className={classes.avatar}>
                                      H
                            </Avatar>
                              }
                              action={
                                  <IconButton>
                                      <MoreVertIcon />
                                  </IconButton>
                              }
                              title="Heavy Jet"
                              subheader="September 14, 2016"
                          />
                          <CardMedia
                              className={classes.media}
                              image="../images/HeavyJets.jpg"
                              title="Contemplative Reptile"
                          />
                          <CardContent>
                              <Typography component="p">
                                  This impressive paella is a perfect party dish and a fun meal to cook together with
                                  your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                          </CardContent>
                          <CardActions className={classes.actions} disableActionSpacing>
                              <IconButton aria-label="Add to favorites">
                                  <FavoriteIcon />
                              </IconButton>
                              <IconButton aria-label="Share">
                                  <ShareIcon />
                              </IconButton>
                              <IconButton
                                  className={classnames(classes.expand, {
                                      [classes.expandOpen]: this.state.expanded,
                                  })}
                                  onClick={this.handleExpandClick}
                                  aria-expanded={this.state.expanded}
                                  aria-label="Show more"
                              >
                                  <ExpandMoreIcon />
                              </IconButton>
                          </CardActions>
                          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                              <CardContent>
                                  <Typography paragraph variant="body2">
                                      Method:
                            </Typography>
                                  <Typography paragraph>
                                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                      minutes.
                            </Typography>
                                  <Typography paragraph>
                                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                      chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                      salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                      minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                                  <Typography paragraph>
                                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                                      cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                                      Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                                      the rice, and cook again without stirring, until mussels have opened and rice is
                                      just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                                  <Typography>
                                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                              </CardContent>
                          </Collapse>
                      </Card>
                  </div>

                  <div style={{ paddingLeft: '35%' }}>
                      <Card className={classes.card}>
                          <CardHeader
                              avatar={
                                  <Avatar aria-label="Recipe" className={classes.avatar}>
                                      M
                            </Avatar>
                              }
                              action={
                                  <IconButton>
                                      <MoreVertIcon />
                                  </IconButton>
                              }
                              title="Midsize Jets"
                              subheader="September 14, 2016"
                          />
                          <CardMedia
                              className={classes.media}
                              image="../images/MidsizeJets.jpg"
                              title="Contemplative Reptile"
                          />
                          <CardContent>
                              <Typography component="p">
                                  This impressive paella is a perfect party dish and a fun meal to cook together with
                                  your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                          </CardContent>
                          <CardActions className={classes.actions} disableActionSpacing>
                              <IconButton aria-label="Add to favorites">
                                  <FavoriteIcon />
                              </IconButton>
                              <IconButton aria-label="Share">
                                  <ShareIcon />
                              </IconButton>
                              <IconButton
                                  className={classnames(classes.expand, {
                                      [classes.expandOpen]: this.state.expanded,
                                  })}
                                  onClick={this.handleExpandClick}
                                  aria-expanded={this.state.expanded}
                                  aria-label="Show more"
                              >
                                  <ExpandMoreIcon />
                              </IconButton>
                          </CardActions>
                          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                              <CardContent>
                                  <Typography paragraph variant="body2">
                                      Method:
                            </Typography>
                                  <Typography paragraph>
                                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                      minutes.
                            </Typography>
                                  <Typography paragraph>
                                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                      chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                      salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                      minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                                  <Typography paragraph>
                                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                                      cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                                      Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                                      the rice, and cook again without stirring, until mussels have opened and rice is
                                      just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                                  <Typography>
                                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                              </CardContent>
                          </Collapse>
                      </Card>
                  </div>

                  <div style={{ paddingLeft: '70%' }}>
                      <Card className={classes.card}>
                          <CardHeader
                              avatar={
                                  <Avatar aria-label="Recipe" className={classes.avatar}>
                                      L
                            </Avatar>
                              }
                              action={
                                  <IconButton>
                                      <MoreVertIcon />
                                  </IconButton>
                              }
                              title="Light jets"
                              subheader="September 14, 2016"
                          />
                          <CardMedia
                              className={classes.media}
                              image="../images/LightJets.jpg"
                              title="Contemplative Reptile"
                          />
                          <CardContent>
                              <Typography component="p">
                                  This impressive paella is a perfect party dish and a fun meal to cook together with
                                  your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                          </CardContent>
                          <CardActions className={classes.actions} disableActionSpacing>
                              <IconButton aria-label="Add to favorites">
                                  <FavoriteIcon />
                              </IconButton>
                              <IconButton aria-label="Share">
                                  <ShareIcon />
                              </IconButton>
                              <IconButton
                                  className={classnames(classes.expand, {
                                      [classes.expandOpen]: this.state.expanded,
                                  })}
                                  onClick={this.handleExpandClick}
                                  aria-expanded={this.state.expanded}
                                  aria-label="Show more"
                              >
                                  <ExpandMoreIcon />
                              </IconButton>
                          </CardActions>
                          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                              <CardContent>
                                  <Typography paragraph variant="body2">
                                      Method:
                            </Typography>
                                  <Typography paragraph>
                                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                      minutes.
                            </Typography>
                                  <Typography paragraph>
                                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                      chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                      salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                      minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                                  <Typography paragraph>
                                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                                      cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                                      Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                                      the rice, and cook again without stirring, until mussels have opened and rice is
                                      just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                                  <Typography>
                                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                              </CardContent>
                          </Collapse>
                      </Card>
                  </div>
              </div>
              <div style={{ paddingTop: 50 }}>
              <BottomNavigation value={value} onChange={this.handleChange} className={classes.root} style={{ width: '100%', backgroundColor:'#FFC400' }}>
                  <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
                  <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                  <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
              </BottomNavigation>
              </div>
          </div>
          </div>
      );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// import ExpansionPanel, {
//   ExpansionPanelDetails,
//   ExpansionPanelSummary,
// } from 'material-ui/ExpansionPanel';
// import Typography from 'material-ui/Typography';
// import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: '33.33%',
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
// });

// class ControlledExpansionPanels extends React.Component {
//   state = {
//     expanded: null,
//   };

//   handleChange = panel => (event, expanded) => {
//     this.setState({
//       expanded: expanded ? panel : false,
//     });
//   };

//   render() {
//     const { classes } = this.props;
//     const { expanded } = this.state;

//     return (
//       <div className={classes.root}>
//         <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
//           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography className={classes.heading}>General settings</Typography>
//             <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails>
//             <Typography>
//               Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
//               maximus est, id dignissim quam.
//             </Typography>
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//         <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
//           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography className={classes.heading}>Users</Typography>
//             <Typography className={classes.secondaryHeading}>
//               You are currently not an owner
//             </Typography>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails>
//             <Typography>
//               Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
//               diam eros in elit. Pellentesque convallis laoreet laoreet.
//             </Typography>
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//         <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
//           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography className={classes.heading}>Advanced settings</Typography>
//             <Typography className={classes.secondaryHeading}>
//               Filtering has been entirely disabled for whole web server
//             </Typography>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails>
//             <Typography>
//               Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
//               eros, vitae egestas augue. Duis vel est augue.
//             </Typography>
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//       </div>
//     );
//   }
// }

// ControlledExpansionPanels.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ControlledExpansionPanels);