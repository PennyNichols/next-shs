import { Box, Typography, List, ListItem, Divider } from '@mui/material';
import React from 'react';
import JobApplication from '../components/JobApplication/JobApplication';

const CareersPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        maxWidth: '900px', // Constrain width for better readability
        margin: 'auto', // Center the box
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Join the SHS Florida Team!
      </Typography>

      <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
        Home Service Technician (Subcontractor)
      </Typography>
      <Typography variant="body1" paragraph>
        **Location:** Charlotte County, Florida
        <br />
        **Job Type:** Subcontract
        <br />
        **Compensation:** $15 - $30 per hour, based on skill level and job performance. Pay evaluations and negotiations
        occur annually or by request.
        <br />
        **Hiring:** We are continuously seeking skilled technicians to join our team.
      </Typography>

      <Typography variant="body1" paragraph>
        Are you a highly skilled and independent home service professional seeking true flexibility and autonomy? **SHS
        Florida** is looking for dedicated **Home Service Technicians** in Charlotte County, Florida, to work as
        subcontractors. We are committed to providing you with the independence you deserve, empowering you to manage
        your own schedule, breaks, and project acceptance.
      </Typography>

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
        About SHS Florida
      </Typography>
      <Typography variant="body1" paragraph>
        Founded in 2019, SHS Florida is a family-owned company built on the principle of treating our technicians as
        valued partners, not just numbers. One of our founders experienced firsthand the challenges of working for a
        larger handyman chain, where technicians were responsible for everything from client acquisition and estimating
        to invoicing and payment collection, often with inadequate compensation.
      </Typography>
      <Typography variant="body1" paragraph>
        At SHS Florida, we handle the stressful business side of things so you can focus on what you do best: executing
        quality work. Our administrative staff takes care of finding clients, scheduling, generating estimates, landing
        jobs, managing most client communications, invoicing, and payment collection. Your primary focus will be on
        performing the work efficiently and effectively. We believe in fostering a supportive environment where our
        subcontractors thrive, and we strongly encourage open communication if anything makes you uncomfortable, whether
        internally or in the field.
      </Typography>

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
        Responsibilities
      </Typography>
      <Typography variant="body1" paragraph>
        As an SHS Florida Home Service Technician, you will be responsible for a variety of tasks, including:
      </Typography>
      <List sx={{ width: '100%', mb: 2 }}>
        <ListItem>Transporting materials to and from job sites.</ListItem>
        <ListItem>Accurately reading and implementing written instructions for projects.</ListItem>
        <ListItem>Engaging in light, professional interaction with clients on site.</ListItem>
        <ListItem>Performing worksite preparation and thorough cleanup.</ListItem>
        <ListItem>Keeping your direct supervisor fully informed on all project details and progress.</ListItem>
        <ListItem>Working collaboratively with the team to ensure successful project completion.</ListItem>
        <ListItem>
          Possibly assisting with advertising efforts, such as distributing business cards or flyers at community
          events.
        </ListItem>
      </List>

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
        Qualifications
      </Typography>
      <Typography variant="body1" paragraph>
        We are looking for self-motivated individuals with a strong work ethic and diverse skill set.
      </Typography>

      <Typography variant="h6" component="h4" sx={{ mb: 1, width: '100%' }}>
        Skills & Experience:
      </Typography>
      <List sx={{ width: '100%', mb: 2 }}>
        <ListItem>Ability to read, understand, and implement both written and verbal instructions.</ListItem>
        <ListItem>Strong spatial reasoning with the ability to visualize projects in 3-D space.</ListItem>
        <ListItem>Proficient knowledge of common tools, including their names and proper uses.</ListItem>
        <ListItem>
          A baseline understanding across a wide range of home service categories, including but not limited to:
          carpentry, masonry, plumbing, electrical, roofing, framing, sheetrock, door and window installation and
          repair, and painting.
        </ListItem>
        <ListItem>**Must possess or obtain liability insurance before beginning work.**</ListItem>
        <ListItem>Possess a valid driver's license and have reliable transportation.</ListItem>
        <ListItem>Maintain excellent hygiene and a professional appearance.</ListItem>
        <ListItem>No criminal history.</ListItem>
        <ListItem>Must be authorized to work in the U.S.</ListItem>
      </List>

      <Typography variant="h6" component="h4" sx={{ mb: 1, width: '100%' }}>
        Nice-to-Haves:
      </Typography>
      <List sx={{ width: '100%', mb: 2 }}>
        <ListItem>Industry-specific licenses and certifications.</ListItem>
        <ListItem>Willingness to wear company attire on the job.</ListItem>
        <ListItem>At least a basic understanding of geometry or trigonometry.</ListItem>
      </List>

      <Typography variant="h6" component="h4" sx={{ mb: 1, width: '100%' }}>
        Education:
      </Typography>
      <List sx={{ width: '100%', mb: 2 }}>
        <ListItem>No specific education requirements.</ListItem>
      </List>

      <Typography variant="h6" component="h4" sx={{ mb: 1, width: '100%' }}>
        Soft Skills:
      </Typography>
      <List sx={{ width: '100%', mb: 2 }}>
        <ListItem>Clear and effective communication.</ListItem>
        <ListItem>Strong problem-solving abilities.</ListItem>
        <ListItem>Willingness to ask for help when needed.</ListItem>
        <ListItem>High level of accountability.</ListItem>
        <ListItem>Collaborative team player.</ListItem>
        <ListItem>Kind and patient demeanor.</ListItem>
      </List>

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
        Benefits of Subcontracting with SHS Florida
      </Typography>
      <Typography variant="body1" paragraph>
        While our subcontractor positions do not include traditional employee benefits, the nature of subcontracting
        inherently offers:
      </Typography>
      <List sx={{ width: '100%', mb: 2 }}>
        <ListItem>**Set Your Own Schedule:** You have the freedom to choose when you work and when you don't.</ListItem>
        <ListItem>**Unlimited Time Off:** Take breaks and time off as needed, without formal requests.</ListItem>
        <ListItem>**True Freedom:** You have the autonomy to accept or decline any job for any reason.</ListItem>
        <ListItem>
          **Performance-Based Pay:** Your hourly rate can increase based on your skill level and job performance, with
          annual or requested evaluations.
        </ListItem>
      </List>

      <Divider sx={{ width: '100%', my: 3 }} />

      {/* Your JobApplication component will go here, likely handling form submission */}
      <JobApplication />
    </Box>
  );
};

export default CareersPage;
