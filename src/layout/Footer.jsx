import React, { useContext } from 'react';
import { Grid, IconButton, Typography, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ThemeContext from './ThemeContext';
import Box from '@mui/material/Box';

const Footer = () => {
    const { isDarkTheme } = useContext(ThemeContext);
    const currentYear = new Date().getFullYear();

    return (
        <Box 
            sx={{ 
                width: '100%', 
                backgroundColor: isDarkTheme ? '#121212' : '#E2E2E2', 
                padding: '20px 0'
            }}
        >
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography align="left">
                            © {currentYear} Ecommerce. Todos los derechos reservados.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} align="right">
                        <IconButton color="inherit" href="https://www.facebook.com/micomercio" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://www.twitter.com/micomercio" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://www.instagram.com/micomercio" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://www.linkedin.com/in/micomercio" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
