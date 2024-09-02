import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

let Sneakers = () => {





    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={8}>
                <Item>xs=8</Item>
            </Grid>
            <Grid xs={4}>
                <Item>xs=4</Item>
            </Grid>
            <Grid xs={4}>
                <Item>xs=4</Item>
            </Grid>
            <Grid xs={4}>
                <Item>xs=8</Item>
            </Grid>
        </Grid>

    )
}

export default Sneakers