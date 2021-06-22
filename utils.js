const getQueryParams = () => {
  const qp = {};
  window.location.search
  .replace(/\?/,"")
  .split("&")
  .map(x => x.split("="))
  .filter(x => x && Array.isArray(x) && x.length === 2)
  .forEach(pair => qp[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1]));
  return qp;  
}

const setQueryParams = (qp) => {
  if (history.replaceState) {
    const queryString = !(qp && Object.keys(qp).length > 0) ? "" :
      "?" + Object.keys(qp)
      .map(key => (encodeURIComponent(key) + "=" + encodeURIComponent(qp[key])))
      .join("&");
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryString;
    window.history.replaceState({path:newurl},'',newurl);
  }
}

