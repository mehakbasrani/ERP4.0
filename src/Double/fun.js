//get the total number of records in tables for all sub
//modules in Master module

export async function getPageInfo(axios, url, mod2) {
  const data = await axios.post(url, {
    mod2: mod2,
  });
  // console.log(data.data);

  return data.data;
}

//get the total number of records in tables for all sub
//modules in Master module
export async function getPageData(axios, url, records, pageno, mod2) {
  let data = await axios.post(
    //`https://arya-erp.in/simranapi/master/getPageData.php`,
    url,
    {
      records: records,
      pageno: pageno,
      mod2: mod2,
    }
  );
  // console.log(`inside getPageData function`);
  // console.log(data.data);
  return data.data;
}

export async function putNewId(axios, url, mod2) {
  let data = await axios.post(
    //`https://arya-erp.in/simranapi/master/masterNewId.php?`,
    url,
    {
      mod2: mod2,
    }
  );
  //console.log(data.data);
  return data.data;
}

//update record in master-sub-module
export async function updateRecord(axios, id, updates, mod2) {
  //console.log(`updates`);
  //console.log(updates);
  let data = await axios.post(
    //`https://arya-erp.in/simranapi/update_contact.php?`
    `https://arya-erp.in/simranapi/master/updateContact.php?`,
    {
      id: id,
      updates: updates,
      mod2: mod2,
    }
  );
  return data.data;
}

//get data against single id in master module
export async function getIdEntry(axios, url, id, mod2) {
  let data = await axios.post(
    //`https://arya-erp.in/simranapi/master/getIdEntry.php`,
    url,
    {
      id: id,
      mod2: mod2,
    }
  );
  // console.log(data.data);
  return data.data;
}
