import { Box, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DrawerHeader, Main, darkTheme, getDateRange, getFullForm } from '../misc/utils'
import axios from 'axios';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Graph from '../components/Graph';
import WatchList from '../components/WatchList';
import CompanyInfo from '../components/CompanyInfo';
import IncomeStatement from '../components/IncomeStatement';

export default function App() {
  const [companyList, setcompanyList] = useState(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'T', 'JPM'])
  const [selectedSymbol, setselectedSymbol] = useState('AAPL')
  const [data, setData] = useState([]);
  const [earningData, setearningData] = useState([])
  const [range, setrange] = useState('1y')
  const [earningRange, setearningRange] = useState('10y')
  const [companyInfo, setcompanyInfo] = useState(null)

  const [graphLoading, setgraphLoading] = useState(true)
  const [earningLoading, setearningLoading] = useState(true)
  const [companyInfoLoading, setcompanyInfoLoading] = useState(true)

  const [open, setOpen] = useState(false);

  const from = getDateRange(range)?.from;
  const to = getDateRange(range)?.to;
  const earningFrom = getDateRange(earningRange)?.from;
  const earningTo = getDateRange(earningRange)?.to;
  const companyName = getFullForm(selectedSymbol)

  useEffect(() => {
    if (selectedSymbol) {
      fetchEarningData()
      fetchCompanyInfo()
      setrange('1y')
    }
  }, [selectedSymbol])

  useEffect(() => {
    if (selectedSymbol) {   
      fetchData()
    }
  }, [range])

  const fetchData = async () => {
    try {
      setgraphLoading(true);
      const response = await axios.get(
        `https://api.marketdata.app/v1/stocks/candles/D/${selectedSymbol}?from=${from}&to=${to}&token=${import.meta.env.VITE_TOKEN}`
      );

      setData(response?.data)
      setgraphLoading(false)

    } catch (error) {
      setgraphLoading(false)
      console.error('Error fetching data: ', error);
    }
  }

  const fetchEarningData = async () => {
    try {
      setearningLoading(true);
      const response = await axios.get(
        `https://api.marketdata.app/v1/stocks/earnings/${selectedSymbol}?from=${earningFrom}&to=${earningTo}&token=${import.meta.env.VITE_TOKEN}`
      );

      setearningData(response?.data)
      setearningLoading(false)

    } catch (error) {
      setearningLoading(false)
      console.error('Error fetching data: ', error);
    }
  }

  const fetchCompanyInfo = async () => {
    try {
      setcompanyInfoLoading(true);
      const response = await axios.get(
        `https://api.marketdata.app/v1/stocks/quotes/${selectedSymbol}/?token=${import.meta.env.VITE_TOKEN}`
      );
      setcompanyInfo(response?.data)
      console.log(response?.data);
      setcompanyInfoLoading(false)

    } catch (error) {
      setcompanyInfoLoading(false)
      console.error('Error fetching data: ', error);
    }

  }





  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header setOpen={setOpen} open={open} companyName={companyName} companyInfoLoading={companyInfoLoading} companyList={companyList} />
        <SideMenu setOpen={setOpen} open={open} companyList={companyList} selectedSymbol={selectedSymbol} setselectedSymbol={setselectedSymbol} />
        <Main open={open} >
          <DrawerHeader />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {data && <Graph data={data} setrange={setrange} range={range} graphLoading={graphLoading} />}


            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              {earningData && <IncomeStatement earningData={earningData} earningLoading={earningLoading} />}
              {/* <CompanyInfo companyInfo={selectedCompany} companyInfoLoading={companyInfoLoading} />
            <WatchList watchlist={watchlist} watchlistLoading={watchlistLoading} /> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <CompanyInfo companyInfo={companyInfo} companyInfoLoading={companyInfoLoading} />
            </Grid>
          </Grid>
        </Main>

      </Box>
    </ThemeProvider>
  )
}
