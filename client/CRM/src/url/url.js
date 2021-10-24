
const getUrl = (n) => {
  if (n === 0) return "https://dvmncrm.herokuapp.com"
  if (n === 1) return "http://crm.3place.ru"
  return "http://localhost:8010/proxy"
}

const Url = getUrl(0)
export default Url

// lcp --proxyUrl https://dvmncrm.herokuapp.com/
// http://crm.3place.ru
// http://crmedu.3place.ru
// list --depth=0
// http://localhost:8010/proxy


// client