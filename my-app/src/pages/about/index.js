import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import people from "../../../public/people.jpg";

const Index = () => {
  return (
    <div>
      {/* Navigation */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Dashboard</Link>
          </Typography>
          <Button color="inherit">
            <Link href="/users">Users</Link>
          </Button>
          <Button color="inherit">
            <Link href="/classrooms">Classrooms</Link>
          </Button>
          <Button color="inherit">
            <Link href="/facilities">Facilities</Link>
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* About Us Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              ABOUT US
            </Typography>
            <Typography paragraph>
              We are a group of passionate students from the Institut Sains dan
              Teknologi Terpadu Surabaya (ISTTS) dedicated to creating impactful
              technological solutions. Our team consists of four members working
              together to develop a classroom reservation and facility complaint
              system for SMAK Santa Agnes Surabaya. With expertise in web
              development and information technology, we aim to simplify the
              process of reserving classrooms and managing facilities, providing
              a better experience for both students and teachers.
            </Typography>
          </Grid>

          {/* Profile Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <img
                src={people}
                alt="Project Manager"
                width={128}
                height={128}
              />
              <Typography variant="h6" gutterBottom>
                PROJECT MANAGER
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Cecilia Devina
              </Typography>
              <Typography variant="caption">222117009</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Profiles in One Row */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Profile 2 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <img
                src={people}
                alt="Front-End Developer"
                width={128}
                height={128}
              />
              <Typography variant="h6" gutterBottom>
                FRONT-END DEVELOPER
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Alexis Jovian
              </Typography>
              <Typography variant="caption">222117004</Typography>
            </Paper>
          </Grid>

          {/* Profile 3 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <img
                src={people}
                alt="Back-End Developer"
                width={128}
                height={128}
              />
              <Typography variant="h6" gutterBottom>
                BACK-END DEVELOPER
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Hanvy Hendrawan
              </Typography>
              <Typography variant="caption">222117028</Typography>
            </Paper>
          </Grid>

          {/* Profile 4 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <img
                src={people}
                alt="Database Engineer"
                width={128}
                height={128}
              />
              <Typography variant="h6" gutterBottom>
                DATABASE ENGINEER
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Jessica Wahyudi
              </Typography>
              <Typography variant="caption">222117032</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
