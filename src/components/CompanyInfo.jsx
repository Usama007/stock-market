import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';

export default function CompanyInfo({ companyInfo, companyInfoLoading }) {

    if(companyInfoLoading){
        return <Skeleton variant="rectangular" width={'100%'} height={200} sx={{mb:3}}/>
    }

    return (
        <Card sx={{ width: '100%', mb: 3 }} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {companyInfo?.symbol}
                </Typography>
                <Typography variant="h5" component="div">
                    {companyInfo?.companyName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {companyInfo?.address} {companyInfo?.address2} {companyInfo?.city} {companyInfo?.country}
                </Typography>
                <Typography variant="body2">
                    {companyInfo?.industry}
                </Typography>
            </CardContent>
            <CardActions>
                <a href={companyInfo?.website}>
                    <Button size="small">VISIT WEBSITE</Button>
                </a>
            </CardActions>
        </Card>
    );
}

// {
//     "address": "1 Apple Park Way",
//     "address2": null,
//     "ceo": "Timothy Cook",
//     "city": "Cupertino",
//     "companyName": "Apple Inc",
//     "country": "United States",
//     "date": "2024-03-25",
//     "employees": 164000,
//     "exchange": "NASDAQ",
//     "exchangeCode": null,
//     "industry": "Electronic Computer Manufacturing ",
//     "issuetype": "cs",
//     "longDescription": "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the worlds largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the worlds biggest company by market capitalization.",
//     "marketcap": null,
//     "phone": "14089961010",
//     "primarySicCode": "3571",
//     "sector": "Manufacturing",
//     "securityName": null,
//     "securityType": "cs",
//     "shortDescription": "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the worlds largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the worlds biggest company by market capitalization.",
//     "state": "California",
//     "symbol": "AAPL",
//     "website": "https://www.apple.com/",
//     "zip": "95014-0642",
//     "id": "COMPANY_HISTORICAL",
//     "key": "AAPL",
//     "subkey": "",
//     "updated": 1711332621309.512
//     }