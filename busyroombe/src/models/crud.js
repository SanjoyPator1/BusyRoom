export const getOne = async (model,id) => {
  try {
    var company_id= id
    console.log("trying to getOne - " + company_id)
    const doc = await model
      .findOne({ companyId: company_id })
      .lean()
      .exec()

    

    if (!doc) {
      console.log("doc not found in getOne")
      return null
    }

    return doc;
  } catch (e) {
    console.error(e)
    return null
  }
}

export const findOne = (model,query) => async (req, res) => {
  try {
    const doc = await model
      .findOne(query)
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


export const getMany =  async (model,query,sort) => {
  try {
    const docs = await model
      .find(query,null, sort)
      .lean()
      .exec()


    return docs;
  } catch (e) {
    console.error(e)
    return null;
  }
}

//getMany function for notification
export const getManyNotification =  async (model,query) => {
  try {
    const docs = await model
      .find(query)
      .lean()
      .exec()


    return docs;
  } catch (e) {
    console.error(e)
    return null;
  }
}

export const createOne = async (model, document) => {
  try {
    const doc = await model.create(document)
    return doc
  } catch (e) {
    console.error(e)
    return null
  }
}

export const updateOne = async (model, filter, update) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        filter,
        update
      )
      .lean()
      .exec()
        
    if (!updatedDoc) {
      return null
    }
    return updatedDoc
  } catch (e) {
    console.error(e)
    return null
  }
}

export const db = {
  getMany: getMany,
  getOne: getOne,
  updateOne: updateOne,
  createOne: createOne,
  getManyNotification:getManyNotification,
  findOne:findOne
}
