export interface StockIdentifiers {
  wkn: string
  isin: string
}

export const STOCK_IDENTIFIERS: Record<string, StockIdentifiers> = {
  AAPL:    { wkn: '865985',  isin: 'US0378331005' },
  META:    { wkn: 'A1JWVX',  isin: 'US30303M1027' },
  AMZN:    { wkn: '906866',  isin: 'US0231351067' },
  NFLX:    { wkn: '552484',  isin: 'US64110L1061' },
  GOOGL:   { wkn: 'A14Y6F',  isin: 'US02079K3059' },
  NVDA:    { wkn: '918422',  isin: 'US67066G1040' },
  TSLA:    { wkn: 'A1CX3T',  isin: 'US88160R1014' },
  PLTR:    { wkn: 'A2QA4J',  isin: 'US69608A1088' },
  JPM:     { wkn: '850628',  isin: 'US46625H1005' },
  AVGO:    { wkn: 'A2JG9Z',  isin: 'US11135F1012' },
  DHR:     { wkn: '866197',  isin: 'US2358511028' },
  NOC:     { wkn: '851915',  isin: 'US6668071029' },
  SAP:     { wkn: '716460',  isin: 'DE0007164600' },
  'SIE.DE':  { wkn: '723610',  isin: 'DE0007236101' },
  'ALV.DE':  { wkn: '840400',  isin: 'DE0008404005' },
  'DTE.DE':  { wkn: '555750',  isin: 'DE0005557508' },
  'BMW.DE':  { wkn: '519000',  isin: 'DE0005190003' },
  ASML:    { wkn: 'A1J4U4',  isin: 'NL0010273215' },
  'AIR.PA':  { wkn: '938914',  isin: 'NL0000235190' },
  'RHM.DE':  { wkn: '703000',  isin: 'DE0007030009' },
}
