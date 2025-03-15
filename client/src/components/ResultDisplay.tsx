import React from "react";
import { Paper, Typography, Grid, Box, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HomeIcon from "@mui/icons-material/Home";
import PushPin from "@mui/icons-material/PushPin";
import PeopleIcon from '@mui/icons-material/People';

interface ResultDisplayProps {
  results: {
    name?: string;
    dob?: string;
    relation?:string;
    gender?: string;
    aadhaarNumber?: string;
    address?: string;
    pincode?: string;
  };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  const ResultItem = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value?: string;
  }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box sx={{ mr: 2, color: "primary.main" }}>{icon}</Box>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="caption" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body1">{value || "Not detected"}</Typography>
      </Box>
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Extracted Information
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ResultItem icon={<PersonIcon />} label="Name" value={results.name} />
          <ResultItem
            icon={<CakeIcon />}
            label="Year of Birth"
            value={results.dob}
          />
          <ResultItem icon={<WcIcon />} label="Gender" value={results.gender} />
          <ResultItem
            icon={<PeopleIcon />}
            label={results.relation?.split(':')[0] || ''}
            value={results.relation?.split(':')[1]}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ResultItem
            icon={<CreditCardIcon />}
            label="Aadhaar Number"
            value={results.aadhaarNumber}
          />
          <ResultItem
            icon={<HomeIcon />}
            label="Address"
            value={results.address}
          />
          <ResultItem
            icon={<PushPin />}
            label="Pincode"
            value={results.pincode}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
        <Typography variant="caption" color="textSecondary">
          Note: Computer-processed information. Please verify all information
          for accuracy.
        </Typography>
      </Box>
    </Paper>
  );
};

export default ResultDisplay;
