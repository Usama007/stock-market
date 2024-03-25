import { Box, CssBaseline, Grid, ThemeProvider, createTheme, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { DrawerHeader, Main, darkTheme } from '../misc/utils';
import axios from 'axios';
import Graph from '../components/Graph';
import WatchList from '../components/WatchList';
import CompanyInfo from '../components/CompanyInfo';



export default function App() {
  const [open, setOpen] = useState(false);
  const [companyList, setcompanyList] = useState([])
  const [selectedCompany, setselectedCompany] = useState(null)
  const [range, setrange] = useState('1y')
  const [data, setData] = useState([]);
  const [watchlist, setwatchlist] = useState([])
  const [companyInfo, setcompanyInfo] = useState(null)

  const [companyInfoLoading, setcompanyInfoLoading] = useState(true)
  const [watchlistLoading, setwatchlistLoading] = useState(true)
  const [graphLoading, setgraphLoading] = useState(true)
  const [companyListLoading, setcompanyListLoading] = useState(true)


  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companyList?.length > 0) {
      fetchWatchList();
    }

  }, [companyList]);

  useEffect(() => {
    if (selectedCompany) {
      fetchData();
    }
  }, [selectedCompany, range]);

  useEffect(() => {
    if (selectedCompany) {
      document.title = selectedCompany?.companyName;

      fetchCompanyInfo();
    }
  }, [selectedCompany]);

  const fetchCompanies = async () => {
    try {
      setcompanyListLoading(true);
      const response = await axios.get(
        `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${import.meta.env.VITE_TOKEN}`
      );
      setcompanyList(response.data);
      setcompanyListLoading(false)

      if (response?.data?.length > 0) {
        let apple = response?.data?.find(item => item?.symbol === 'AAPL')
        if (apple) {
          setselectedCompany(apple)
        } else {
          const responseApple = await axios.get(
            `https://cloud.iexapis.com/stable/stock/AAPL/quote?token=${import.meta.env.VITE_TOKEN}`
          );

          if(responseApple?.data){
            setselectedCompany(responseApple?.data)
            setcompanyList([responseApple?.data,...response?.data])
          }
        }

      }
    } catch (error) {
      setcompanyListLoading(false)

      console.error('Error fetching data: ', error);
    }
  };


  const fetchData = async () => {
    try {
      setgraphLoading(true)
      const response = await axios.get(
        `https://api.iex.cloud/v1/data/core/historical_prices/${selectedCompany?.symbol}?range=${range}&token=${import.meta.env.VITE_TOKEN}&sort=ASC`
      );
      if (response?.data) {
        setData(response.data);
        setgraphLoading(false)
      }
    } catch (error) {
      setgraphLoading(false)

      console.error('Error fetching data: ', error);
    }
  };

  const fetchCompanyInfo = async () => {

    try {
      setcompanyInfoLoading(true)

      const responseCompanyInfo = await axios.get(
        `https://api.iex.cloud/v1/data/core/company_historical/${selectedCompany?.symbol}?token=${import.meta.env.VITE_TOKEN}`
      );
      if (responseCompanyInfo?.data) {
        setcompanyInfo(responseCompanyInfo.data?.[0]);
        setcompanyInfoLoading(false)
      }
    } catch (error) {
      setcompanyInfoLoading(false)
      console.error('Error fetching data: ', error);
    }

  }

  const fetchWatchList = async () => {
    try {
      setwatchlistLoading(true)
      const symbolsString = companyList.map(item => item.symbol).join(',');

      const response = await axios.get(
        `https://api.iex.cloud/v1/data/core/quote/${symbolsString}?token=${import.meta.env.VITE_TOKEN}`
      );
      if (response?.data) {
        setwatchlist(response.data);
        setwatchlistLoading(false)
      }
    } catch (error) {
      setwatchlistLoading(false)

      console.error('Error fetching data: ', error);
    }
  };


  return (
    <ThemeProvider theme={darkTheme}>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header setOpen={setOpen} open={open} selectedCompany={selectedCompany} companyInfoLoading={companyInfoLoading} />
        <SideMenu setOpen={setOpen} open={open} companyList={companyList} selectedCompany={selectedCompany} setselectedCompany={setselectedCompany} companyListLoading={companyListLoading} />
        <Main open={open} >
          <DrawerHeader />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              {data && <Graph data={data} setrange={setrange} range={range} graphLoading={graphLoading} />}
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <CompanyInfo companyInfo={companyInfo} companyInfoLoading={companyInfoLoading} />
              <WatchList watchlist={watchlist} watchlistLoading={watchlistLoading} />
            </Grid>
          </Grid>
        </Main>
      </Box>
    </ThemeProvider>
  )
}
