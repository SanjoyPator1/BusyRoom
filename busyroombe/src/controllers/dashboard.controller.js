import {db} from '../models/crud.js'
import { Footprint } from '../models/footprint.model.js'
import {Company} from '../models/company.model.js'
import {Product} from '../models/product.model.js'

import axios from 'axios'



//simple get for md
const getItems = async () => {
    const susiId = "susi";
    const susi = await db.getOne(Company,susiId);
    if(!susi){
        return null;
    }

    let result = []
//what if we have two update-required records
    for(let i = 0; i < susi.partner_list.length; ++i){
        let companyId = susi.partner_list[i]
        let query = {"company_id" : companyId, "status":{"$ne": "rejected"}}
        let sort = {"sort": {"reportingPeriodEnd": -1}}
        let ft_items = await db.getMany(Footprint, query, sort)
        if (!ft_items)
            return null

        if (ft_items.length == 0)
            continue

        const latest_record = ft_items[0]
        if(latest_record.status    === "update-required" && ft_items.length > 1){

            const latest_sync = ft_items[1]
            let result_record = JSON.parse(JSON.stringify(latest_sync))
            result_record.id = latest_record.id
            result_record.status = latest_record.status

            let change = 0.0
            if(ft_items.length > 2){
                const older_sync = ft_items[2]
                change = ((result_record.pcf - older_sync.pcf) / older_sync.pcf) * 100.0
            } 

            let company = await db.getOne(Company, result_record.company_id)
            let product = await db.getOne(Product, result_record.product_id)
            result_record.historical_change = change
            result_record.company_name = company.company_name
            result_record.productNameCompany = product.productNameCompany
            result.push(result_record)
        }else{
            let change = 0.0
            if(ft_items.length > 1){
                const older_sync = ft_items[1]
                change = ((latest_record.pcf - older_sync.pcf) / older_sync.pcf) * 100.0
            }
            latest_record.historical_change = change

            let company = await db.getOne(Company, latest_record.company_id)
            let product = await db.getOne(Product, latest_record.product_id)
            latest_record.historical_change = change
            latest_record.company_name = company.company_name
            latest_record.productNameCompany = product.productNameCompany
            result.push(latest_record)
        }
        
    }

    return result
    
}

// send to pfm
const accept = async (id) => {
   const updated_record =  db.updateOne(Footprint, {id: id, "status":{"$ne": "rejected"}}, {status: "synched"})

   axios.post('http://localhost:3006/api/pfm', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    // console.log(response);
  })
  .catch(function (error) {
    return null
  });

   return updated_record
}

// feedback api
const reject = async (id, feedback) => {
    const updated_record =  db.updateOne(Footprint, {id: id, "status":{"$ne": "synched"}}, {status: "rejected"})

    axios.post('http://localhost:3006/api/feedback', {
        feedback:feedback
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        return null
      });

    return updated_record
}

export const controllers = {
    getItems: getItems,
    accept: accept,
    reject: reject
}
export default controllers

