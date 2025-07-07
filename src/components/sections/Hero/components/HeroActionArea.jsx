import CallButton from "@/components/action-buttons/CallButton/CallButton";
import { Grid } from "@mui/material";


const HeroActionArea = () => {
    return (
        <Grid container spacing={{xs:2, xl:6}} justifyContent={{xs:"center", xl: "space-between"}} alignItems="center">
              <Grid item xs={12} sm={5} md={4} >
                <CallButton />
              </Grid>
              <Grid item xs={12} sm={5} md={4} >
                <SmsButton />
              </Grid>
              <Grid item xs={12} sm={10} md={4} >
                <EstimateRequestButton fullWidth={true} />
              </Grid>
            </Grid>
    );
}

export default HeroActionArea;