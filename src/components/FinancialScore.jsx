import { Card, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'
import PieChart from './PieChart';
export default function FinancialScore({ financialScoreData, financialScoreLoading }) {
    if (financialScoreLoading) {
        return <Skeleton variant="rectangular" width={'100%'} height={300} />
    }
    return (
        <Card>
            <CardContent sx={{height:260,display:'flex',justifyContent:'center',pt:0}}>
                <PieChart data={financialScoreData} />
            </CardContent>
        </Card>
    )
}
