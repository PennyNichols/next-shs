import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@/theme/theme";

const services = [
  "Window Cleaning",
  "Gutter Cleaning",
  "Pressure Washing",
  "Roof Cleaning",
  "Solar Panel Cleaning",
  "Holiday Lighting",
  "Other Exterior Services",
];

const skills = [
  "Ladder Safety",
  "Power/Pressure Washing",
  "Customer Service",
  "Team Leadership",
  "Attention to Detail",
  "Exterior Surface Care",
  "Roof Work",
  "Working at Heights",
  "Equipment Maintenance",
];

const certifications = [
  "OSHA 10/30",
  "Fall Protection",
  "First Aid/CPR",
  "Lift/Scissor Certification",
  "None",
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 700,
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius.large,
  boxShadow: theme.shadows[3],
  background: theme.palette.background.paper,
}));

const JobApplication = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    eligible: "",
    experience: "",
    desiredServices: [],
    skills: [],
    certifications: [],
    references: "",
    resume: null,
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: e.target.files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleMultiSelect = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic here (e.g., API call)
    alert("Application submitted!");
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: theme.palette.primary.main }}>
        SHS Employment Application
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 3, color: theme.palette.text.primary }}>
        We are seeking skilled, reliable, and professional team members to deliver exceptional service to our discerning clientele. Please complete the form below with care and attention to detail.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* Personal Info */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              type="email"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              fullWidth
              type="tel"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              label="ZIP"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Work Eligibility */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="eligible-label">Eligible to Work in US?</InputLabel>
              <Select
                labelId="eligible-label"
                name="eligible"
                value={form.eligible}
                label="Eligible to Work in US?"
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Experience */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Years of Relevant Experience"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              required
              fullWidth
              type="number"
              inputProps={{ min: 0, max: 50 }}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Desired Services */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="services-label">Which services are you experienced in?</InputLabel>
              <Select
                labelId="services-label"
                multiple
                value={form.desiredServices}
                onChange={(e) => setForm({ ...form, desiredServices: e.target.value })}
                renderValue={(selected) => selected.join(", ")}
                name="desiredServices"
                label="Which services are you experienced in?"
              >
                {services.map((service) => (
                  <MenuItem key={service} value={service}>
                    <Checkbox checked={form.desiredServices.indexOf(service) > -1} />
                    {service}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Skills */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Relevant Skills (select all that apply)
            </Typography>
            <FormGroup row>
              {skills.map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={form.skills.includes(skill)}
                      onChange={() => handleMultiSelect("skills", skill)}
                      name={skill}
                    />
                  }
                  label={skill}
                />
              ))}
            </FormGroup>
          </Grid>
          {/* Certifications */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Certifications (select all that apply)
            </Typography>
            <FormGroup row>
              {certifications.map((cert) => (
                <FormControlLabel
                  key={cert}
                  control={
                    <Checkbox
                      checked={form.certifications.includes(cert)}
                      onChange={() => handleMultiSelect("certifications", cert)}
                      name={cert}
                    />
                  }
                  label={cert}
                />
              ))}
            </FormGroup>
          </Grid>
          {/* References */}
          <Grid item xs={12}>
            <TextField
              label="Professional References (names & contact info)"
              name="references"
              value={form.references}
              onChange={handleChange}
              required
              fullWidth
              multiline
              minRows={2}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="Please provide at least two references."
            />
          </Grid>
          {/* Resume Upload */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Upload Resume (PDF or DOC)
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ borderRadius: theme.shape.borderRadius.medium }}
            >
              Upload File
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleChange}
              />
            </Button>
            {form.resume && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {form.resume.name}
              </Typography>
            )}
          </Grid>
          {/* Cover Letter */}
          <Grid item xs={12}>
            <TextField
              label="Cover Letter (optional)"
              name="coverLetter"
              value={form.coverLetter}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="Tell us why you would be a great fit for SHS."
            />
          </Grid>
          {/* Submit */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                borderRadius: theme.shape.borderRadius.large,
                fontWeight: 600,
                boxShadow: theme.shadows[2],
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </Box>
    </StyledPaper>
  );
};

export default JobApplication;